import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── Intent Classification ─────────────────────────────────────────────────────

export type MessageIntent =
  | 'LOG_WORKOUT'
  | 'LOG_WEIGHT'
  | 'LOG_FOOD'
  | 'LOG_EXPENSE'
  | 'LOG_INCOME'
  | 'GET_STATUS'
  | 'GET_REPORT'
  | 'APPROVE_GROCERIES'
  | 'ORDER_GROCERIES'
  | 'QUERY_FINANCE'
  | 'UNKNOWN'

export type ParsedMessage = {
  intent: MessageIntent
  data: Record<string, unknown>
  confidence: number
}

const SYSTEM_PROMPT = `You are Mateusz's AI operating system — a severe, no-nonsense accountability partner.
You speak like a sensei who has no patience for excuses. Direct. Precise. Occasionally fierce.
You track: fitness (strength training 3x/week), nutrition, finances, and income growth.
The three obsessions: 1) Discipline. 2) Present moment. 3) Long-term thinking.
When logging data, extract it perfectly. When responding, be brief. No coddling.`

// ─── Parse incoming WhatsApp message ──────────────────────────────────────────

export async function parseMessage(text: string, mediaUrl?: string): Promise<ParsedMessage> {
  const prompt = `Analyze this message and return a JSON object:

Message: "${text}"
${mediaUrl ? 'Media: Yes (food photo likely)' : ''}

Return ONLY valid JSON with this shape:
{
  "intent": "LOG_WORKOUT" | "LOG_WEIGHT" | "LOG_FOOD" | "LOG_EXPENSE" | "LOG_INCOME" | "GET_STATUS" | "GET_REPORT" | "APPROVE_GROCERIES" | "ORDER_GROCERIES" | "QUERY_FINANCE" | "UNKNOWN",
  "confidence": 0.0-1.0,
  "data": {
    // For LOG_WORKOUT: exercises: [{name, sets: [{weight, reps, form?}], notes?}]
    // For LOG_WEIGHT: weight_lbs: number, notes?: string
    // For LOG_FOOD: description, meal_type, calories_est?, protein_est?, location?
    // For LOG_EXPENSE: amount, category, description, account?
    // For LOG_INCOME: amount, source, description
    // For GET_STATUS/GET_REPORT: period? ("today"|"week"|"month")
    // For QUERY_FINANCE: query: string
  }
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  try {
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
  } catch {
    // fallthrough
  }
  return { intent: 'UNKNOWN', data: {}, confidence: 0 }
}

// ─── Generate WhatsApp response after logging ──────────────────────────────────

export async function generateLogResponse(intent: MessageIntent, data: Record<string, unknown>, context: string): Promise<string> {
  const prompt = `The user just logged: ${intent}
Data: ${JSON.stringify(data)}
Context: ${context}

Generate a SHORT WhatsApp response (max 5 lines). Be direct. Show what was logged.
Add ONE insight or challenge if relevant. Never soft. Think drill sergeant meets philosopher.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 256,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  return response.content[0].type === 'text' ? response.content[0].text : 'Logged.'
}

// ─── Daily brief (sent twice a day) ───────────────────────────────────────────

export async function generateDailyBrief(data: {
  weight?: number
  todayCalories?: number
  weekWorkouts?: number
  monthSpend?: number
  monthBudget?: number
  streak?: number
  dayOfYear?: number
  session?: 'morning' | 'evening'
}): Promise<string> {
  const prompt = `Generate a ${data.session || 'morning'} WhatsApp brief for Mateusz.

Data:
- Day of year: ${data.dayOfYear || '?'}
- Weight: ${data.weight ? `${data.weight} lbs` : 'not logged'}
- Training this week: ${data.weekWorkouts || 0}/3 sessions
- Today calories: ${data.todayCalories ? `${data.todayCalories} cal` : 'not logged'}
- Month spend: $${data.monthSpend || 0} / $${data.monthBudget || 4500} budget
- Discipline streak: ${data.streak || 0} days

Format: 4-6 lines max. Date line, key stats, ONE directive. No emojis. Severe and clear.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  return response.content[0].type === 'text' ? response.content[0].text : ''
}

// ─── Weekly report ─────────────────────────────────────────────────────────────

export async function generateWeeklyReport(data: {
  workouts: unknown[]
  bodyStats: unknown[]
  meals: unknown[]
  transactions: unknown[]
  habits: unknown[]
}): Promise<string> {
  const prompt = `Generate a weekly performance report for Mateusz.

TRAINING: ${data.workouts.length} sessions this week
BODY: ${JSON.stringify(data.bodyStats.slice(0, 3))}
NUTRITION: ${data.meals.length} meals logged
FINANCE: ${JSON.stringify(data.transactions.slice(0, 10))}
HABITS: ${JSON.stringify(data.habits)}

Write a brutally honest assessment. What's improving? What's failing? What is the ONE thing that must change next week? Max 10 lines. Sign it "—The System".`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  return response.content[0].type === 'text' ? response.content[0].text : ''
}

// ─── Grocery suggestions ───────────────────────────────────────────────────────

export async function suggestGroceries(data: {
  recentMeals: unknown[]
  lastGroceryOrder?: unknown
  fitnessGoals: string
}): Promise<{ name: string; quantity: string; category: string; estimated_price: number }[]> {
  const prompt = `Based on recent meals and fitness goals, suggest a grocery list.

Recent meals: ${JSON.stringify(data.recentMeals.slice(0, 20))}
Fitness goals: ${data.fitnessGoals}
Last order: ${JSON.stringify(data.lastGroceryOrder) || 'none'}

Return ONLY a JSON array:
[{"name": "item", "quantity": "amount", "category": "produce|protein|dairy|grains|other", "estimated_price": 0.00}]

Focus: high protein, whole foods, minimize processed. Max 20 items.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  try {
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const match = text.match(/\[[\s\S]*\]/)
    if (match) return JSON.parse(match[0])
  } catch {
    // fallthrough
  }
  return []
}

// ─── Financial warning ─────────────────────────────────────────────────────────

export async function analyzeFinances(transactions: unknown[], budget: number): Promise<{
  alert: boolean
  message: string
  projectedMonthEnd: number
}> {
  const prompt = `Analyze these transactions and budget.
Transactions: ${JSON.stringify(transactions)}
Monthly budget: $${budget}

Return JSON: {"alert": boolean, "message": "1-2 sentence analysis", "projectedMonthEnd": number}
Be direct. Alert if projected > budget or if any category is 30%+ over normal.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 256,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  try {
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
  } catch {
    // fallthrough
  }
  return { alert: false, message: '', projectedMonthEnd: 0 }
}
