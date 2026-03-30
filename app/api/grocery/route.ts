import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { suggestGroceries } from '@/lib/claude'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('grocery_lists')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ lists: data })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const action = body.action as 'suggest' | 'approve' | 'order'

  if (action === 'suggest') {
    // Fetch recent meals to inform suggestions
    const { data: recentMeals } = await supabaseAdmin
      .from('meals')
      .select('description, meal_type, calories_est, protein_est')
      .order('logged_at', { ascending: false })
      .limit(30)

    const { data: lastOrder } = await supabaseAdmin
      .from('grocery_lists')
      .select('items')
      .eq('status', 'ordered')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const items = await suggestGroceries({
      recentMeals: recentMeals || [],
      lastGroceryOrder: lastOrder,
      fitnessGoals: 'High protein, body recomposition, ~2200 cal/day',
    })

    const { data: list, error } = await supabaseAdmin
      .from('grocery_lists')
      .insert({ items, status: 'suggested' })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ list })
  }

  if (action === 'approve') {
    const { id } = body
    const { data, error } = await supabaseAdmin
      .from('grocery_lists')
      .update({ status: 'approved' })
      .eq('id', id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ list: data })
  }

  if (action === 'order') {
    const { id, store } = body
    // TODO: Integrate with Instacart or HEB API
    // For now, mark as ordered
    const { data, error } = await supabaseAdmin
      .from('grocery_lists')
      .update({ status: 'ordered', store: store || 'instacart' })
      .eq('id', id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ list: data, message: 'Order placed. (Instacart integration pending — add INSTACART_API_KEY)' })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
