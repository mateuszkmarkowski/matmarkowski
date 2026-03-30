import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') || 'today'

  let startDate: Date
  if (period === 'today') {
    startDate = new Date(); startDate.setHours(0,0,0,0)
  } else if (period === 'week') {
    startDate = new Date(); startDate.setDate(startDate.getDate() - 7)
  } else {
    startDate = new Date(); startDate.setDate(startDate.getDate() - 30)
  }

  const { data: meals, error } = await supabaseAdmin
    .from('meals')
    .select('*')
    .gte('logged_at', startDate.toISOString())
    .order('logged_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const totalCal = meals?.reduce((s, m) => s + (m.calories_est || 0), 0) || 0
  const totalProtein = meals?.reduce((s, m) => s + (m.protein_est || 0), 0) || 0

  return NextResponse.json({ meals, summary: { totalCal, totalProtein } })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { description, meal_type, calories_est, protein_est, carbs_est, fat_est, location } = body

  const { data, error } = await supabaseAdmin
    .from('meals')
    .insert({
      description,
      meal_type: meal_type || 'snack',
      calories_est: calories_est || null,
      protein_est: protein_est || null,
      carbs_est: carbs_est || null,
      fat_est: fat_est || null,
      location: location || 'home',
      source: 'dashboard',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ meal: data })
}
