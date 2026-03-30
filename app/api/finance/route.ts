import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') || 'month'

  let startDate: string
  if (period === 'month') {
    const d = new Date(); d.setDate(1); d.setHours(0,0,0,0)
    startDate = d.toISOString().split('T')[0]
  } else if (period === 'week') {
    const d = new Date(); d.setDate(d.getDate() - d.getDay() + 1); d.setHours(0,0,0,0)
    startDate = d.toISOString().split('T')[0]
  } else {
    const d = new Date(); d.setFullYear(d.getFullYear() - 1)
    startDate = d.toISOString().split('T')[0]
  }

  const [{ data: transactions, error }, { data: incomeStreams }] = await Promise.all([
    supabaseAdmin
      .from('transactions')
      .select('*')
      .gte('transaction_date', startDate)
      .order('transaction_date', { ascending: false }),
    supabaseAdmin.from('income_streams').select('*'),
  ])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Calculate summary
  const expenses = transactions?.filter(t => t.type === 'expense') || []
  const income = transactions?.filter(t => t.type === 'income') || []
  const investments = transactions?.filter(t => t.type === 'investment') || []

  const totalExpenses = expenses.reduce((s, t) => s + Number(t.amount), 0)
  const totalIncome = income.reduce((s, t) => s + Number(t.amount), 0)
  const totalInvested = investments.reduce((s, t) => s + Number(t.amount), 0)

  const byCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
    return acc
  }, {} as Record<string, number>)

  return NextResponse.json({
    transactions,
    incomeStreams,
    summary: { totalExpenses, totalIncome, totalInvested, byCategory },
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { amount, category, description, type, account, transaction_date } = body

  const { data, error } = await supabaseAdmin
    .from('transactions')
    .insert({
      amount,
      category: category || 'Other',
      description,
      type: type || 'expense',
      account: account || 'checking',
      transaction_date: transaction_date || new Date().toISOString().split('T')[0],
      source: 'dashboard',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ transaction: data })
}
