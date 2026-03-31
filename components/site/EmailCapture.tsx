'use client'
import { useState } from 'react'

type Props = {
  placeholder?: string
  buttonLabel?: string
  successMessage?: string
  size?: 'normal' | 'large'
}

export default function EmailCapture({
  placeholder = 'your@email.com',
  buttonLabel = 'Start the 21-Day Protocol — Free',
  successMessage = 'You\'re in. Check your inbox.',
  size = 'normal',
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div style={{
        fontFamily: 'var(--font-body)', fontStyle: 'italic',
        fontSize: size === 'large' ? '1.15rem' : '1rem',
        color: 'var(--text-2)', textAlign: 'center', padding: '0.5rem 0',
      }}>
        {successMessage}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
      width: '100%', maxWidth: size === 'large' ? 480 : 400,
      margin: '0 auto',
    }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid var(--border-lit)',
          borderRadius: 2,
          color: 'var(--text)',
          fontFamily: 'var(--font-body)',
          fontSize: size === 'large' ? '1.1rem' : '1rem',
          padding: size === 'large' ? '0.95rem 1.4rem' : '0.8rem 1.2rem',
          outline: 'none',
          textAlign: 'center',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--violet)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-lit)')}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn--primary"
        style={{
          width: '100%',
          fontSize: size === 'large' ? '0.8rem' : '0.72rem',
          padding: size === 'large' ? '1rem 2rem' : '0.85rem 2rem',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'Sending...' : buttonLabel}
      </button>
      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: '#FF6B6B' }}>
          Something went wrong. Try again.
        </p>
      )}
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', color: 'var(--text-3)', letterSpacing: '0.05em' }}>
        Free. No spam. Unsubscribe anytime.
      </p>
    </form>
  )
}
