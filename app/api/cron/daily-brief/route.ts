import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateDailyBrief } from '@/lib/claude'
import { sendMessage, formatDojoMessage } from '@/lib/whatsapp'

// Called by Vercel Cron at 06:30 and 21:00
// Configure in vercel.json:
// { "crons": [
//   { "path": "/api/cron/daily-brief?session=morning", "schedule": "30 6 * * *" },
//   { "path": "/api/cron/daily-brief?session=evening", "schedule": "0 21 * * *" }
// ]}

export async function GET(request: NextRequest) {
  // Verify this is called by Vercel Cron (or manually with secret)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const session = (request.nextUrl.searchParams.get('session') || 'morning') as 'morning' | 'evening'

  const now = new Date()
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay() + 1); weekStart.setHours(0,0,0,0)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const todayStart = new Date(now); todayStart.setHours(0,0,0,0)
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)

  const [
    { count: weekWorkouts },
    { data: latestWeight },
    { data: todayMeals },
    { data: monthTxns },
  ] = await Promise.all([
    supabaseAdmin.from('workouts').select('*', { count: 'exact', head: true }).gte('logged_at', weekStart.toISOString()),
    supabaseAdmin.from('body_stats').select('weight_lbs').order('logged_at', { ascending: false }).limit(1).single(),
    supabaseAdmin.from('meals').select('calories_est').gte('logged_at', todayStart.toISOString()),
    supabaseAdmin.from('transactions').select('amount').gte('transaction_date', monthStart.toISOString().split('T')[0]).eq('type', 'expense'),
  ])

  const todayCalories = todayMeals?.reduce((s, m) => s + (m.calories_est || 0), 0) || 0
  const monthSpend = monthTxns?.reduce((s, t) => s + Number(t.amount), 0) || 0

  const brief = await generateDailyBrief({
    weight: latestWeight?.weight_lbs || undefined,
    todayCalories,
    weekWorkouts: weekWorkouts || 0,
    monthSpend,
    monthBudget: 4500,
    dayOfYear,
    session,
  })

  await sendMessage(formatDojoMessage(brief))

  // Log outbound
  await supabaseAdmin.from('wa_messages').insert({
    direction: 'outbound',
    body: brief,
    intent: `CRON_${session.toUpperCase()}_BRIEF`,
    processed: true,
  })

  return NextResponse.json({ ok: true, session, sent: brief })
}
