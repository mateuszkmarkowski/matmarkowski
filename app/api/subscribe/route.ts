import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  try {
    const db = getSupabaseAdmin()
    const { error } = await db.from('subscribers').upsert(
      { email: email.toLowerCase().trim(), source: 'website' },
      { onConflict: 'email', ignoreDuplicates: true }
    )

    if (error) throw error

    // Notify via WhatsApp if configured
    if (process.env.TWILIO_AUTH_TOKEN && process.env.OWNER_WHATSAPP_NUMBER) {
      try {
        const { sendMessage } = await import('@/lib/whatsapp')
        await sendMessage(`New subscriber: ${email}`)
      } catch {
        // Non-critical — don't fail the request
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 })
  }
}
