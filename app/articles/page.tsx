import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Articles' }

const ARTICLES = [
  { slug: 'lucid-dreaming-without-ruining-sleep', cat: 'Sleep Science', title: 'How to Lucid Dream Without Destroying Your Sleep', excerpt: 'Most induction techniques come at a cost. Here\'s how to get lucid without wrecking your sleep quality or daytime function.', time: '8 min' },
  { slug: 'galantamine-complete-guide', cat: 'Supplements', title: 'Galantamine: The Complete Lucid Dreaming Guide', excerpt: 'The most researched lucid dreaming supplement. Dosage, timing, risks, and what to actually expect.', time: '12 min' },
  { slug: 'fall-asleep-fast', cat: 'Technique', title: 'How to Fall Asleep in Under 5 Minutes', excerpt: 'The cognitive shuffle technique, box breathing, and three other evidence-based methods that actually work.', time: '6 min' },
  { slug: 'thc-and-dreaming', cat: 'Research', title: 'THC and Dreaming: What Cannabis Does to Your Sleep', excerpt: 'Cannabis suppresses REM. Here\'s the full picture — including how to use this to your advantage.', time: '9 min' },
]

export default function ArticlesPage() {
  return (
    <main style={{ paddingTop: 64 }}>
      <section className="site-section" style={{ paddingBottom: '2rem' }}>
        <div className="site-inner">
          <p className="site-eyebrow">Archive</p>
          <h1 className="site-headline" style={{ marginBottom: '0.5rem' }}>Articles</h1>
          <p className="site-subheadline" style={{ maxWidth: 480 }}>
            Long-form writing on lucid dreaming, sleep science, consciousness, and practice.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 1.5rem 6rem' }}>
        <div className="site-inner">
          <div className="article-grid">
            {ARTICLES.map(a => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="article-card">
                <div className="article-card__cat">{a.cat}</div>
                <div className="article-card__title">{a.title}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {a.excerpt}
                </p>
                <div className="article-card__meta">{a.time} read</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
