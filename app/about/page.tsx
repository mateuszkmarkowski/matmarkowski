import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <main style={{ paddingTop: 64 }}>
      <section className="site-section" style={{ paddingBottom: '2rem' }}>
        <div className="site-inner site-inner--narrow">
          <p className="site-eyebrow">Who is Mat</p>
          <h1 className="site-headline" style={{ marginBottom: '1.25rem' }}>
            I build things to understand them.
          </h1>
          <hr className="dream-divider" />
        </div>
      </section>

      <section className="site-section site-section--alt" style={{ paddingTop: '3rem' }}>
        <div className="site-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>
          {/* Photo */}
          <div style={{
            aspectRatio: '3/4', background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', color: 'var(--text-3)', letterSpacing: '0.15em' }}>PHOTO</span>
          </div>

          {/* Bio */}
          <div className="article-body" style={{ margin: 0 }}>
            <p>My first lucid dream happened by accident. I woke up inside a dream without knowing what was happening — just this sudden, disorienting clarity that the world I was standing in wasn't real. I immediately woke up from the shock of it.</p>
            <p>I spent the next several years trying to get back in.</p>
            <p>What I found, once I learned how to reliably enter the lucid dream state, was that the practice changed more than my nights. It changed how I paid attention during the day. It changed my relationship to fear — because when you learn to recognize that you're in a dream, fear becomes interesting rather than paralyzing. It changed how I thought about the mind itself.</p>
            <h2>Why This Site</h2>
            <p>The existing resources on lucid dreaming are scattered between legitimate sleep research, forum posts from 2009, and wellness content that treats the practice like spiritual tourism. I wanted something different: clear, honest, grounded in science, written by someone who actually does this.</p>
            <p>This site is that attempt. It's a long-term project. I expect it to evolve significantly over the next few years as I write more, learn more, and hear from more people building serious practice.</p>
            <h2>What I'm Building</h2>
            <p>The free 21-day protocol is the beginning. The goal is to make this the most useful resource on the internet for anyone who wants to learn to lucid dream — without bullshit, without mysticism, without sacrificing their sleep.</p>
            <p>If you have questions, feedback, or just want to share what's working for you — I'm genuinely interested.</p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/start" className="btn btn--primary">Start the Protocol</Link>
              <Link href="/articles" className="btn btn--ghost">Read the Articles</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
