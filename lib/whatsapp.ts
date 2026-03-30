import twilio from 'twilio'
import crypto from 'crypto'

const accountSid = process.env.TWILIO_ACCOUNT_SID!
const authToken = process.env.TWILIO_AUTH_TOKEN!
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER! // e.g. 'whatsapp:+14155238886'
const toNumber = process.env.OWNER_WHATSAPP_NUMBER!    // Mateusz's number e.g. 'whatsapp:+1...'

export function getTwilioClient() {
  return twilio(accountSid, authToken)
}

// ─── Send a text message to Mateusz ───────────────────────────────────────────

export async function sendMessage(body: string, to: string = toNumber): Promise<void> {
  const client = getTwilioClient()
  await client.messages.create({ from: fromNumber, to, body })
}

// ─── Send a message with media (screenshot, chart image, etc.) ────────────────

export async function sendMediaMessage(body: string, mediaUrl: string, to: string = toNumber): Promise<void> {
  const client = getTwilioClient()
  await client.messages.create({ from: fromNumber, to, body, mediaUrl: [mediaUrl] })
}

// ─── Validate that the webhook request came from Twilio ───────────────────────

export function validateTwilioSignature(
  signature: string,
  url: string,
  params: Record<string, string>
): boolean {
  const expectedSig = twilio.validateRequest(authToken, signature, url, params)
  return expectedSig
}

// ─── Parse Twilio webhook body into a clean object ────────────────────────────

export type TwilioWebhookPayload = {
  Body: string
  From: string
  To: string
  MessageSid: string
  NumMedia: string
  MediaUrl0?: string
  MediaContentType0?: string
  ProfileName?: string
}

export function parseTwilioPayload(body: Record<string, string>): TwilioWebhookPayload {
  return {
    Body: body.Body || '',
    From: body.From || '',
    To: body.To || '',
    MessageSid: body.MessageSid || '',
    NumMedia: body.NumMedia || '0',
    MediaUrl0: body.MediaUrl0,
    MediaContentType0: body.MediaContentType0,
    ProfileName: body.ProfileName,
  }
}

// ─── Format a WhatsApp message with the Dojo header ───────────────────────────

export function formatDojoMessage(content: string): string {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  return `[${dateStr} · ${timeStr}]\n\n${content}`
}

// ─── Build TwiML response string ──────────────────────────────────────────────

export function twimlResponse(message: string): string {
  const escaped = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escaped}</Message></Response>`
}
