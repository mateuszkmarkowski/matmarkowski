import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy-initialized clients — only throws when first called, not at import time
let _supabase: SupabaseClient | null = null
let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Supabase env vars not configured. Copy .env.local.example → .env.local')
    _supabase = createClient(url, key)
  }
  return _supabase
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase admin env vars not configured. Copy .env.local.example → .env.local')
    _supabaseAdmin = createClient(url, key)
  }
  return _supabaseAdmin
}

// Named export used by API routes — call inside request handlers, never at module top level
export const supabaseAdmin = {
  from: (...args: Parameters<SupabaseClient['from']>) => getSupabaseAdmin().from(...args),
  storage: { from: (bucket: string) => getSupabaseAdmin().storage.from(bucket) },
}

// ─── Type Definitions ──────────────────────────────────────────────────────────

export type Workout = {
  id: string
  logged_at: string
  duration_minutes: number | null
  notes: string | null
  source: 'whatsapp' | 'dashboard'
  exercises?: Exercise[]
}

export type Exercise = {
  id: string
  workout_id: string
  name: string
  sets: { weight: number; reps: number; form?: string }[]
  muscle_groups: string[]
  notes: string | null
}

export type BodyStat = {
  id: string
  logged_at: string
  weight_lbs: number | null
  measurements: Record<string, number> | null
  photo_url: string | null
  notes: string | null
}

export type Meal = {
  id: string
  logged_at: string
  description: string
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  calories_est: number | null
  protein_est: number | null
  carbs_est: number | null
  fat_est: number | null
  location: string
  photo_url: string | null
  source: 'whatsapp' | 'dashboard' | 'photo'
}

export type Transaction = {
  id: string
  transaction_date: string
  amount: number
  category: string
  subcategory: string | null
  description: string
  type: 'expense' | 'income' | 'investment' | 'transfer'
  account: string | null
  source: 'manual' | 'plaid' | 'whatsapp'
}

export type Habit = {
  id: string
  name: string
  description: string | null
  frequency: '3x_week' | 'daily' | 'weekly'
  category: 'fitness' | 'finance' | 'mindset' | 'growth'
}

export type HabitLog = {
  id: string
  habit_id: string
  logged_at: string
  notes: string | null
  quality: number | null
}

export type GroceryList = {
  id: string
  created_at: string
  status: 'suggested' | 'approved' | 'ordered' | 'delivered'
  items: { name: string; quantity: string; category: string; estimated_price?: number }[]
  store: 'instacart' | 'heb' | null
}

export type WaMessage = {
  id: string
  received_at: string
  direction: 'inbound' | 'outbound'
  body: string
  media_url: string | null
  intent: string | null
  processed: boolean
}

// ─── Query helpers ─────────────────────────────────────────────────────────────

export async function getRecentWorkouts(limit = 10): Promise<Workout[]> {
  const { data, error } = await supabaseAdmin
    .from('workouts')
    .select('*, exercises(*)')
    .order('logged_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

export async function getWorkoutsThisWeek(): Promise<Workout[]> {
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1) // Monday
  startOfWeek.setHours(0, 0, 0, 0)

  const { data, error } = await supabaseAdmin
    .from('workouts')
    .select('*')
    .gte('logged_at', startOfWeek.toISOString())
    .order('logged_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getLatestBodyStat(): Promise<BodyStat | null> {
  const { data, error } = await supabaseAdmin
    .from('body_stats')
    .select('*')
    .order('logged_at', { ascending: false })
    .limit(1)
    .single()
  if (error) return null
  return data
}

export async function getBodyStatsLast30Days(): Promise<BodyStat[]> {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const { data, error } = await supabaseAdmin
    .from('body_stats')
    .select('*')
    .gte('logged_at', thirtyDaysAgo.toISOString())
    .order('logged_at', { ascending: true })
  if (error) throw error
  return data || []
}

export async function getMealsToday(): Promise<Meal[]> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const { data, error } = await supabaseAdmin
    .from('meals')
    .select('*')
    .gte('logged_at', today.toISOString())
    .order('logged_at', { ascending: true })
  if (error) throw error
  return data || []
}

export async function getTransactionsThisMonth(): Promise<Transaction[]> {
  const firstOfMonth = new Date()
  firstOfMonth.setDate(1)
  firstOfMonth.setHours(0, 0, 0, 0)
  const { data, error } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .gte('transaction_date', firstOfMonth.toISOString().split('T')[0])
    .order('transaction_date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getHabitsWithStreak(): Promise<(Habit & { streak: number; lastLogged: string | null })[]> {
  const { data: habits, error } = await supabaseAdmin.from('habits').select('*')
  if (error) throw error

  const result = []
  for (const habit of habits || []) {
    const { data: logs } = await supabaseAdmin
      .from('habit_logs')
      .select('logged_at')
      .eq('habit_id', habit.id)
      .order('logged_at', { ascending: false })
      .limit(30)

    const streak = calculateStreak(logs?.map(l => l.logged_at) || [], habit.frequency)
    result.push({ ...habit, streak, lastLogged: logs?.[0]?.logged_at || null })
  }
  return result
}

function calculateStreak(logDates: string[], frequency: string): number {
  if (!logDates.length) return 0
  // Simplified streak: count consecutive days/weeks with logs
  const sorted = [...logDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  let streak = 0
  let checkDate = new Date()
  for (const dateStr of sorted) {
    const logDate = new Date(dateStr)
    const daysDiff = Math.floor((checkDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))
    if (daysDiff <= (frequency === 'daily' ? 1 : 7)) {
      streak++
      checkDate = logDate
    } else {
      break
    }
  }
  return streak
}
