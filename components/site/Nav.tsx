'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/start', label: 'Start Here' },
  { href: '/articles', label: 'Articles' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Hide on /os routes — dashboard has its own shell
  if (pathname?.startsWith('/os')) return null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        background: scrolled ? 'rgba(7,5,20,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex', alignItems: 'center', padding: '0 1.5rem',
      }}>
        <div style={{ maxWidth: 960, width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, letterSpacing: '0.08em', color: 'var(--text)', textDecoration: 'none' }}>
            Mat Markowski
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} aria-label="Main navigation">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 400,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: pathname === l.href ? 'var(--text)' : 'var(--text-3)',
                textDecoration: 'none', transition: 'color 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href ? 'var(--text)' : 'var(--text-3)')}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/start" className="btn btn--primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.68rem' }}>
              Start Free
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', color: 'var(--text)',
            }}
            className="nav-hamburger"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {open
                ? <><line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5"/><line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5"/></>
                : <><line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5"/><line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.5"/></>
              }
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(7,5,20,0.97)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem',
        }} onClick={() => setOpen(false)}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300,
              color: 'var(--text)', textDecoration: 'none', letterSpacing: '0.06em',
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/start" className="btn btn--primary" style={{ marginTop: '1rem' }}>
            Start Free
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          nav[aria-label="Main navigation"] { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  )
}
