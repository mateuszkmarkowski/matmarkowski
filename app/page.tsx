'use client'
import Link from 'next/link'
import { useReveal } from '@/components/useReveal'
import EmailCapture from '@/components/site/EmailCapture'

const ARTICLES = [
  { slug: 'lucid-dreaming-without-ruining-sleep', cat: 'Sleep Science', title: 'How to Lucid Dream Without Destroying Your Sleep', time: '8 min' },
  { slug: 'galantamine-complete-guide', cat: 'Supplements', title: 'Galantamine: The Complete Lucid Dreaming Guide', time: '12 min' },
  { slug: 'fall-asleep-fast', cat: 'Technique', title: 'How to Fall Asleep in Under 5 Minutes', time: '6 min' },
  { slug: 'thc-and-dreaming', cat: 'Research', title: 'THC and Dreaming: What Cannabis Does to Your Sleep', time: '9 min' },
]

// SVG lily pad scene
function WaterScene() {
  return (
    <svg viewBox="0 0 1200 180" preserveAspectRatio="xMidYMax slice"
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', pointerEvents: 'none' }}>
      {/* Water surface */}
      <path d="M0 120 Q150 100 300 115 Q450 130 600 112 Q750 95 900 118 Q1050 135 1200 110 L1200 180 L0 180 Z"
        fill="rgba(10,22,40,0.85)" />
      {/* Lily pads */}
      <ellipse cx="180" cy="118" rx="38" ry="14" fill="#1A3A2A" opacity="0.85" />
      <ellipse cx="420" cy="128" rx="28" ry="10" fill="#1A3A2A" opacity="0.7" />
      <ellipse cx="750" cy="112" rx="44" ry="16" fill="#1A3A2A" opacity="0.8" />
      <ellipse cx="980" cy="122" rx="32" ry="11" fill="#1A3A2A" opacity="0.75" />
      <ellipse cx="1100" cy="115" rx="22" ry="8" fill="#1A3A2A" opacity="0.6" />
      {/* Lotus on large pad */}
      <ellipse cx="750" cy="104" rx="10" ry="6" fill="#E91E8C" opacity="0.7" />
      <ellipse cx="742" cy="107" rx="7" ry="10" fill="#9B2D7F" opacity="0.6" transform="rotate(-20,742,107)" />
      <ellipse cx="758" cy="107" rx="7" ry="10" fill="#9B2D7F" opacity="0.6" transform="rotate(20,758,107)" />
      {/* Reflections */}
      <line x1="180" y1="132" x2="180" y2="155" stroke="rgba(122,180,122,0.15)" strokeWidth="1" />
      <line x1="750" y1="128" x2="750" y2="160" stroke="rgba(233,30,140,0.12)" strokeWidth="1.5" />
    </svg>
  )
}

export default function Home() {
  useReveal()

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        background: 'var(--gradient-dream)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '8rem 1.5rem 10rem',
        textAlign: 'center',
      }}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155,45,127,0.35) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 760, zIndex: 1 }}>
          <p className="site-eyebrow reveal">Lucid Dreaming · Mat Markowski</p>
          <h1 className="site-headline site-headline--hero reveal" style={{ marginBottom: '1.5rem' }}>
            Every night, a world opens.<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(240,234,248,0.7)' }}>You've been sleeping through it.</em>
          </h1>
          <p className="site-subheadline reveal" style={{ maxWidth: 520, margin: '0 auto 2.5rem' }}>
            Learn to wake up inside your dreams. Free 21-day protocol, science-backed techniques, and everything you need to start tonight.
          </p>
          <div className="reveal">
            <EmailCapture size="large" />
          </div>
        </div>

        <WaterScene />
      </section>

      {/* ── WHAT IS LUCID DREAMING ───────────────────────────────────── */}
      <section className="site-section site-section--alt">
        <div className="site-inner site-inner--narrow" style={{ textAlign: 'center' }}>
          <p className="site-eyebrow reveal">What is this</p>
          <h2 className="site-headline reveal" style={{ marginBottom: '1.5rem' }}>
            Consciousness doesn't stop<br />when you close your eyes.
          </h2>
          <hr className="dream-divider dream-divider--center reveal" />
          <p className="site-body reveal" style={{ marginBottom: '1rem' }}>
            A lucid dream is a dream where you know you're dreaming — and can act on that knowledge. You can fly, create, confront fears, practice skills, and explore a world built entirely from your mind.
          </p>
          <p className="site-body reveal">
            It's not magic. It's a learnable skill. The science is solid. The techniques are documented. What's missing is a clear path to get there — without sacrificing your sleep in the process.
          </p>
          <div className="reveal" style={{ marginTop: '2.5rem' }}>
            <Link href="/start" className="btn btn--ghost">See the 21-Day Protocol</Link>
          </div>
        </div>
      </section>

      {/* ── WHO IS MAT ───────────────────────────────────────────────── */}
      <section className="site-section">
        <div className="site-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="reveal">
            {/* Photo placeholder */}
            <div style={{
              aspectRatio: '4/5', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.15em' }}>
                PHOTO
              </span>
            </div>
          </div>
          <div>
            <p className="site-eyebrow reveal">Who is Mat</p>
            <h2 className="site-headline reveal" style={{ marginBottom: '1.5rem' }}>
              I've been lucid dreaming<br />for over a decade.
            </h2>
            <hr className="dream-divider reveal" />
            <p className="site-body reveal" style={{ marginBottom: '1rem' }}>
              I started because I wanted to understand my own mind. What I found was a practice that changed how I see waking life — not just sleep.
            </p>
            <p className="site-body reveal" style={{ marginBottom: '2rem' }}>
              This site is my attempt to build the resource I wish had existed when I started. Clear, honest, science-grounded — without the mysticism.
            </p>
            <div className="reveal">
              <Link href="/about" className="btn btn--ghost">Read My Story</Link>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:640px){.home-about-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── PROTOCOL PREVIEW ─────────────────────────────────────────── */}
      <section className="site-section site-section--alt">
        <div className="site-inner">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="site-eyebrow reveal">The free protocol</p>
            <h2 className="site-headline reveal">21 Days to Your First Lucid Dream</h2>
            <hr className="dream-divider dream-divider--center reveal" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5px' }} className="reveal">
            {[
              { week: 'Week 1', title: 'Foundation', desc: 'Dream journal, sleep hygiene, reality checks, and setting your intention.', color: 'var(--violet)' },
              { week: 'Week 2', title: 'Induction', desc: 'WBTB + MILD + SSILD. The techniques that actually work for beginners.', color: 'var(--pink)' },
              { week: 'Week 3', title: 'Deepening', desc: 'Stabilization, dream control, and advanced options once you\'re inside.', color: 'var(--orange)' },
            ].map(w => (
              <div key={w.week} style={{ background: 'var(--void)', border: '1px solid var(--border)', padding: '2rem 1.75rem' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: w.color, marginBottom: '0.6rem' }}>
                  {w.week}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 300, color: 'var(--text)', marginBottom: '0.75rem' }}>
                  {w.title}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }} className="reveal">
            <Link href="/start" className="btn btn--primary">Start the Protocol Free</Link>
          </div>
        </div>
      </section>

      {/* ── ARTICLES ─────────────────────────────────────────────────── */}
      <section className="site-section">
        <div className="site-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <p className="site-eyebrow reveal">From the archive</p>
              <h2 className="site-headline reveal">Read</h2>
            </div>
            <Link href="/articles" className="btn btn--ghost reveal" style={{ fontSize: '0.68rem', padding: '0.6rem 1.2rem' }}>
              All Articles
            </Link>
          </div>
          <div className="article-grid reveal">
            {ARTICLES.map(a => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="article-card">
                <div className="article-card__cat">{a.cat}</div>
                <div className="article-card__title">{a.title}</div>
                <div className="article-card__meta">{a.time} read</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP PREVIEW ─────────────────────────────────────────────── */}
      <section className="site-section site-section--alt">
        <div className="site-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p className="site-eyebrow reveal">From the shop</p>
            <h2 className="site-headline reveal" style={{ marginBottom: '1rem' }}>
              The Complete Lucid Dreaming System
            </h2>
            <hr className="dream-divider reveal" />
            <p className="site-body reveal" style={{ marginBottom: '0.75rem' }}>
              Everything in the free protocol, plus journal templates, audio guides, supplement timing charts, and advanced techniques for consistent lucidity.
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--text)', margin: '1.5rem 0' }} className="reveal">
              $19 <span style={{ fontSize: '1rem', color: 'var(--text-3)' }}>one-time</span>
            </p>
            <div className="reveal">
              <Link href="/shop" className="btn btn--primary">View in Shop</Link>
            </div>
          </div>
          <div className="reveal">
            <div style={{
              aspectRatio: '3/4', background: 'linear-gradient(160deg,var(--violet-deep),var(--surface))',
              border: '1px solid var(--border)', borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300, color: 'var(--text-3)' }}>
                Product Image
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="site-section" style={{ textAlign: 'center', background: 'var(--gradient-dream)', minHeight: 'auto', padding: '6rem 1.5rem' }}>
        <div className="site-inner site-inner--narrow">
          <h2 className="site-headline reveal" style={{ marginBottom: '1rem' }}>
            Start tonight.
          </h2>
          <p className="site-subheadline reveal" style={{ marginBottom: '2.5rem' }}>
            The 21-day protocol is free. All you need is a notebook and the willingness to pay attention.
          </p>
          <div className="reveal">
            <EmailCapture />
          </div>
        </div>
      </section>
    </main>
  )
}
