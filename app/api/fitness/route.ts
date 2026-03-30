import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const period = searchParams.get('period') || 'all'

  let query = supabaseAdmin
    .from('workouts')
    .select('*, exercises(*)')
    .order('logged_at', { ascending: false })
    .limit(limit)

  if (period === 'week') {
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1)
    weekStart.setHours(0, 0, 0, 0)
    query = query.gte('logged_at', weekStart.toISOString())
  } else if (period === 'month') {
    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)
    query = query.gte('logged_at', monthStart.toISOString())
  }

  const { data: workouts, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: bodyStats } = await supabaseAdmin
    .from('body_stats')
    .select('*')
    .order('logged_at', { ascending: false })
    .limit(30)

  return NextResponse.json({ workouts, bodyStats })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { exercises, notes, duration_minutes } = body

  const { data: workout, error } = await supabaseAdmin
    .from('workouts')
    .insert({ notes, duration_minutes, source: 'dashboard' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (exercises && exercises.length > 0) {
    await supabaseAdmin.from('exercises').insert(
      exercises.map((ex: { name: string; sets: unknown[]; muscle_groups?: string[]; notes?: string }) => ({
        workout_id: workout.id,
        name: ex.name,
        sets: ex.sets,
        muscle_groups: ex.muscle_groups || [],
        notes: ex.notes || null,
      }))
    )
  }

  const { data: fitnessHabit } = await supabaseAdmin
    .from('habits')
    .select('id')
    .eq('category', 'fitness')
    .single()
  if (fitnessHabit) {
    await supabaseAdmin.from('habit_logs').insert({ habit_id: fitnessHabit.id, quality: 4 })
  }

  return NextResponse.json({ workout })
}
