import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateWeeklyReport } from '@/lib/claude'
import { sendMessage } from '@/lib/whatsapp'

export async function POST() {
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1)
  weekStart.setHours(0, 0, 0, 0)

  const [
    { data: workouts },
    { data: bodyStats },
    { data: meals },
    { data: transactions },
    { data: habits },
  ] = await Promise.all([
    supabaseAdmin.from('workouts').select('*, exercises(*)').gte('logged_at', weekStart.toISOString()),
    supabaseAdmin.from('body_stats').select('*').order('logged_at', { ascending: false }).limit(5),
    supabaseAdmin.from('meals').select('*').gte('logged_at', weekStart.toISOString()),
    supabaseAdmin.from('transactions').select('*').gte('transaction_date', weekStart.toISOString().split('T')[0]),
    supabaseAdmin.from('habits').select('*'),
  ])

  const report = await generateWeeklyReport({
    workouts: workouts || [],
    bodyStats: bodyStats || [],
    meals: meals || [],
    transactions: transactions || [],
    habits: habits || [],
  })

  await sendMessage(report)

  await supabaseAdmin.from('wa_messages').insert({
    direction: 'outbound',
    body: report,
    intent: 'WEEKLY_REPORT',
    processed: true,
  })

  return NextResponse.json({ ok: true, report })
}
