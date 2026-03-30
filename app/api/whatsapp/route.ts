import { NextRequest, NextResponse } from 'next/server'
import { parseTwilioPayload, twimlResponse, formatDojoMessage } from '@/lib/whatsapp'
import { parseMessage, generateLogResponse, generateWeeklyReport } from '@/lib/claude'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const body: Record<string, string> = {}
  formData.forEach((value, key) => { body[key] = value.toString() })

  const payload = parseTwilioPayload(body)
  const mediaUrl = payload.NumMedia !== '0' ? payload.MediaUrl0 : undefined

  // Log inbound message
  await supabaseAdmin.from('wa_messages').insert({
    direction: 'inbound',
    body: payload.Body,
    media_url: mediaUrl || null,
    processed: false,
    twilio_sid: payload.MessageSid,
  })

  let responseText = ''

  try {
    const parsed = await parseMessage(payload.Body, mediaUrl)

    // Fetch context for response generation
    const now = new Date()
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay() + 1); weekStart.setHours(0,0,0,0)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    const [{ count: weekWorkouts }, { data: latestWeight }] = await Promise.all([
      supabaseAdmin.from('workouts').select('*', { count: 'exact', head: true }).gte('logged_at', weekStart.toISOString()),
      supabaseAdmin.from('body_stats').select('weight_lbs').order('logged_at', { ascending: false }).limit(1).single(),
    ])

    const context = `Week training: ${weekWorkouts || 0}/3 | Weight: ${latestWeight?.weight_lbs || 'unknown'} lbs`

    switch (parsed.intent) {
      case 'LOG_WORKOUT': {
        const { data: workout } = await supabaseAdmin
          .from('workouts')
          .insert({ source: 'whatsapp', notes: payload.Body })
          .select()
          .single()

        if (workout && parsed.data.exercises) {
          const exercises = parsed.data.exercises as Array<{name: string; sets: unknown[]; notes?: string}>
          await supabaseAdmin.from('exercises').insert(
            exercises.map(ex => ({
              workout_id: workout.id,
              name: ex.name,
              sets: ex.sets,
              notes: ex.notes || null,
            }))
          )
        }

        // Log habit
        const { data: fitnessHabit } = await supabaseAdmin
          .from('habits')
          .select('id')
          .eq('category', 'fitness')
          .single()
        if (fitnessHabit) {
          await supabaseAdmin.from('habit_logs').insert({ habit_id: fitnessHabit.id, quality: 4 })
        }

        responseText = await generateLogResponse('LOG_WORKOUT', parsed.data, context)
        break
      }

      case 'LOG_WEIGHT': {
        await supabaseAdmin.from('body_stats').insert({
          weight_lbs: parsed.data.weight_lbs,
          notes: parsed.data.notes || null,
        })
        responseText = await generateLogResponse('LOG_WEIGHT', parsed.data, context)
        break
      }

      case 'LOG_FOOD': {
        await supabaseAdmin.from('meals').insert({
          description: parsed.data.description || payload.Body,
          meal_type: parsed.data.meal_type || 'snack',
          calories_est: parsed.data.calories_est || null,
          protein_est: parsed.data.protein_est || null,
          location: parsed.data.location || 'home',
          photo_url: mediaUrl || null,
          source: mediaUrl ? 'photo' : 'whatsapp',
        })
        responseText = await generateLogResponse('LOG_FOOD', parsed.data, context)
        break
      }

      case 'LOG_EXPENSE': {
        await supabaseAdmin.from('transactions').insert({
          amount: parsed.data.amount,
          category: parsed.data.category || 'Other',
          description: parsed.data.description || payload.Body,
          type: 'expense',
          source: 'whatsapp',
        })
        responseText = await generateLogResponse('LOG_EXPENSE', parsed.data, context)
        break
      }

      case 'LOG_INCOME': {
        await supabaseAdmin.from('transactions').insert({
          amount: parsed.data.amount,
          category: 'Income',
          description: parsed.data.description || payload.Body,
          type: 'income',
          source: 'whatsapp',
        })
        responseText = await generateLogResponse('LOG_INCOME', parsed.data, context)
        break
      }

      case 'GET_STATUS': {
        const [{ data: workouts }, { data: meals }, { data: txns }] = await Promise.all([
          supabaseAdmin.from('workouts').select('logged_at').gte('logged_at', weekStart.toISOString()),
          supabaseAdmin.from('meals').select('calories_est, protein_est').gte('logged_at', new Date(now.setHours(0,0,0,0)).toISOString()),
          supabaseAdmin.from('transactions').select('amount').gte('transaction_date', monthStart.toISOString().split('T')[0]).eq('type', 'expense'),
        ])

        const todayCal = meals?.reduce((s, m) => s + (m.calories_est || 0), 0) || 0
        const monthSpend = txns?.reduce((s, t) => s + Number(t.amount), 0) || 0

        responseText = formatDojoMessage(
          `STATUS REPORT\n` +
          `Training: ${workouts?.length || 0}/3 this week\n` +
          `Weight: ${latestWeight?.weight_lbs || '—'} lbs\n` +
          `Today: ${todayCal} cal\n` +
          `Month spend: $${monthSpend.toFixed(0)} / $4,500`
        )
        break
      }

      case 'GET_REPORT': {
        const [{ data: workouts }, { data: bodyStats }, { data: meals }, { data: transactions }, { data: habits }] = await Promise.all([
          supabaseAdmin.from('workouts').select('*, exercises(*)').gte('logged_at', weekStart.toISOString()),
          supabaseAdmin.from('body_stats').select('*').order('logged_at', { ascending: false }).limit(5),
          supabaseAdmin.from('meals').select('*').gte('logged_at', weekStart.toISOString()),
          supabaseAdmin.from('transactions').select('*').gte('transaction_date', weekStart.toISOString().split('T')[0]),
          supabaseAdmin.from('habits').select('*'),
        ])

        responseText = await generateWeeklyReport({
          workouts: workouts || [],
          bodyStats: bodyStats || [],
          meals: meals || [],
          transactions: transactions || [],
          habits: habits || [],
        })
        break
      }

      default:
        responseText = `Command not recognized. Try:\n"trained: squat 5x5 @ 135"\n"weight 183"\n"spent $45 at HEB"\n"status"\n"report"`
    }

    // Log outbound message
    await supabaseAdmin.from('wa_messages').insert({
      direction: 'outbound',
      body: responseText,
      intent: parsed.intent,
      processed: true,
    })

    // Update inbound as processed
    await supabaseAdmin
      .from('wa_messages')
      .update({ processed: true, intent: parsed.intent })
      .eq('twilio_sid', payload.MessageSid)

  } catch (err) {
    console.error('WhatsApp webhook error:', err)
    responseText = 'System error. Try again.'
  }

  return new NextResponse(twimlResponse(responseText), {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  })
}
