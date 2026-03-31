import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Shop' }

export default function ShopPage() {
  return (
    <main style={{ paddingTop: 64 }}>
      <section className="site-section" style={{ paddingBottom: '2rem' }}>
        <div className="site-inner">
          <p className="site-eyebrow">Digital Products</p>
          <h1 className="site-headline">Shop</h1>
        </div>
      </section>

      <section className="site-section site-section--alt" style={{ paddingTop: '2rem' }}>
        <div className="site-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

            {/* Product image */}
            <div style={{
              aspectRatio: '3/4',
              background: 'linear-gradient(160deg, #1A0B3B 0%, #4A1080 50%, #0A1628 100%)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem',
              padding: '2rem',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 300, color: 'var(--text)', lineHeight: 1.2 }}>
                The Complete<br />Lucid Dreaming<br />System
              </div>
              <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, var(--violet), var(--pink))' }} />
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Mat Markowski
              </div>
            </div>

            {/* Product info */}
            <div>
              <p className="site-eyebrow" style={{ marginBottom: '0.5rem' }}>Digital Product</p>
              <h2 className="site-headline" style={{ marginBottom: '1.25rem' }}>
                The Complete Lucid Dreaming System
              </h2>
              <hr className="dream-divider" style={{ marginBottom: '1.5rem' }} />

              <p className="site-body" style={{ marginBottom: '1rem' }}>
                Everything in the free 21-day protocol — plus the tools that make the difference between occasional lucidity and consistent practice.
              </p>

              <div style={{ margin: '1.5rem 0' }}>
                {[
                  'Complete 21-day protocol (PDF + printable)',
                  'Dream journal templates (7 formats)',
                  'Audio guides for SSILD and MILD induction',
                  'Supplement timing and dosage reference',
                  'Advanced techniques: WILD, DEILD, FILD',
                  'Dream sign identification worksheet',
                  'Troubleshooting guide (40+ common problems)',
                  'Lifetime updates as new research emerges',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--violet)', fontSize: '0.8rem', flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-2)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ margin: '2rem 0 1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--text)' }}>$19</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', color: 'var(--text-3)', marginLeft: '0.5rem' }}>one-time · instant download</span>
              </div>

              <button
                disabled
                style={{
                  width: '100%', padding: '1rem', borderRadius: 2,
                  background: 'linear-gradient(135deg, var(--violet), var(--pink))',
                  border: 'none', color: '#fff',
                  fontFamily: 'var(--font-ui)', fontSize: '0.78rem', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  cursor: 'not-allowed', opacity: 0.6,
                }}
              >
                Coming Soon
              </button>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'var(--text-3)', textAlign: 'center', marginTop: '0.75rem' }}>
                Get notified when it launches →{' '}
                <Link href="/start" style={{ color: 'var(--violet)', textDecoration: 'underline' }}>
                  join the list
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
