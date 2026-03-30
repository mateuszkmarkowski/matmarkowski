'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import '../../os/dojo.css'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/os'

  useEffect(() => {
    // Focus input on mount
    document.getElementById('pwd-input')?.focus()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push(redirect)
      } else {
        setError('Wrong.')
        setPassword('')
        setLoading(false)
      }
    } catch {
      setError('System error. Try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#080808',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Background grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(30,30,30,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,30,30,0.4) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', width: 320 }}>
        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 48, height: 48,
            background: '#8B1A1A',
            borderRadius: 6,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: '#E8E0D0', letterSpacing: '-1px' }}>M</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: '#E8E0D0', textTransform: 'uppercase' }}>
            Mateusz OS
          </div>
          <div style={{ fontSize: 10, color: '#444', marginTop: 6, letterSpacing: '0.1em' }}>
            ACCESS REQUIRES DISCIPLINE
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            id="pwd-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter yours."
            style={{
              width: '100%',
              background: '#0F0F0F',
              border: `1px solid ${error ? '#8B1A1A' : '#1E1E1E'}`,
              borderRadius: 4,
              color: '#E8E0D0',
              fontSize: 14,
              padding: '12px 16px',
              outline: 'none',
              fontFamily: 'inherit',
              letterSpacing: '0.1em',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s',
              textAlign: 'center',
            }}
            disabled={loading}
            autoComplete="current-password"
          />

          {error && (
            <div style={{
              marginTop: 8, fontSize: 11, color: '#B22222',
              textAlign: 'center', letterSpacing: '0.05em',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              marginTop: 10,
              padding: '10px',
              background: password ? '#8B1A1A' : 'transparent',
              border: `1px solid ${password ? '#8B1A1A' : '#1E1E1E'}`,
              borderRadius: 4,
              color: password ? '#E8E0D0' : '#333',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: password ? 'pointer' : 'default',
              transition: 'all 0.15s',
              fontFamily: 'inherit',
            }}
          >
            {loading ? '...' : 'Enter'}
          </button>
        </form>

        {/* Three obsessions */}
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'I. Discipline above all.',
            'II. The present moment is the only reality.',
            'III. Every action is a long-term vote.',
          ].map((line, i) => (
            <div key={i} style={{
              fontSize: 10, color: '#2A2A2A',
              letterSpacing: '0.05em',
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <div style={{ width: 16, height: 1, background: '#1E1E1E', flexShrink: 0 }} />
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
