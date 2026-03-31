'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/os')) return null

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: '3rem 1.5rem',
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>

        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--text)', marginBottom: '0.75rem' }}>
            Mat Markowski
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-3)', lineHeight: 1.7 }}>
            The best lucid dreaming hub on the internet.
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1rem' }}>
            Explore
          </div>
          {[
            { href: '/start', label: 'Start Here' },
            { href: '/articles', label: 'Articles' },
            { href: '/shop', label: 'Shop' },
            { href: '/about', label: 'About' },
          ].map(l => (
            <div key={l.href} style={{ marginBottom: '0.5rem' }}>
              <Link href={l.href} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', color: 'var(--text-3)', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                {l.label}
              </Link>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1rem' }}>
            Connect
          </div>
          {[
            { href: 'https://x.com/matmarkowski', label: 'X / Twitter' },
            { href: 'https://instagram.com/matmarkowski', label: 'Instagram' },
          ].map(l => (
            <div key={l.href} style={{ marginBottom: '0.5rem' }}>
              <a href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', color: 'var(--text-3)', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                {l.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} Mat Markowski
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.08em' }}>
          matmarkowski.com
        </span>
      </div>
    </footer>
  )
}
