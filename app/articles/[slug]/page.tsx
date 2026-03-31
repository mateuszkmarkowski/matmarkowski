import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = { params: { slug: string } }

const ARTICLES: Record<string, {
  title: string; cat: string; time: string; date: string; body: string
}> = {
  'lucid-dreaming-without-ruining-sleep': {
    title: 'How to Lucid Dream Without Destroying Your Sleep',
    cat: 'Sleep Science', time: '8 min', date: 'March 2026',
    body: `
<p>The most common complaint about lucid dreaming isn't that it doesn't work. It's that it works — but leaves you exhausted. Most popular techniques, done wrong, fragment your sleep into something that barely qualifies as rest.</p>

<p>This doesn't have to be the case. With the right approach, lucid dreaming and good sleep aren't in conflict. They're complementary.</p>

<h2>The Problem With Most Advice</h2>

<p>Wake-Back-To-Bed (WBTB) is the most effective induction technique available. But most guides tell you to stay awake for 30-60 minutes in the middle of the night. For anyone who needs to function the next day, this is unsustainable as a nightly practice.</p>

<p>The result is a community full of people who either burn out on the technique or start accepting chronic sleep deprivation as the price of admission. Neither is necessary.</p>

<h2>The Sleep-Safe Approach</h2>

<p><strong>Limit active induction to 2-3 nights per week.</strong> On the other nights, practice passive techniques: reality checks, intention setting, dream journaling. These build the foundation without touching your sleep architecture.</p>

<p><strong>Shorten your WBTB window.</strong> 20 minutes of wakefulness is enough to shift your brain state without seriously disrupting sleep. Most of the benefit of WBTB comes from the act of waking and the intention you set — not the duration.</p>

<p><strong>Choose your WBTB timing carefully.</strong> The 5-6 hour mark hits the longest REM period of the night. Setting your alarm for 90 minutes before your natural wake time achieves a similar effect with less disruption.</p>

<h2>The Techniques That Don't Require WBTB</h2>

<p>MILD (Mnemonic Induction) done at normal bedtime — not as part of WBTB — is underrated. Combined with strong dream recall practice, it produces consistent results without any sleep interruption.</p>

<p>SSILD (Senses Initiated Lucid Dream) is similarly gentle. Cycle through your senses slowly before sleep. No alarm required. Many practitioners report their first lucid dreams with this technique within two weeks.</p>

<h2>What to Prioritize</h2>

<p>Sleep depth matters more than technique frequency. A rested brain produces better, more memorable dreams. A sleep-deprived brain produces fragmented, low-quality REM — which means fewer opportunities for lucidity even when you're using good techniques.</p>

<p>The counterintuitive truth: sleeping better is the fastest path to more lucid dreams.</p>
    `,
  },
  'galantamine-complete-guide': {
    title: 'Galantamine: The Complete Lucid Dreaming Guide',
    cat: 'Supplements', time: '12 min', date: 'February 2026',
    body: `
<p>Galantamine is the most studied substance for lucid dreaming induction. It works. It also requires respect. This is the complete picture.</p>

<h2>What It Is</h2>

<p>Galantamine is an acetylcholinesterase inhibitor — it prevents the breakdown of acetylcholine, a neurotransmitter deeply involved in REM sleep and conscious awareness. It's used medically for Alzheimer's treatment. In smaller doses, combined with WBTB, it produces a dramatic increase in dream vividness and lucid dream frequency.</p>

<h2>Dosage</h2>

<p>Start at <strong>4mg</strong>. Many practitioners find this sufficient. The standard "advanced" dose is 8mg. There's no evidence that higher doses produce proportionally better results — and the side effect risk increases significantly above 8mg.</p>

<p>Do not take galantamine at normal bedtime. It will suppress sleep onset and cause vivid, unpleasant hypnagogia.</p>

<h2>Timing</h2>

<p>Take it during WBTB — 5-6 hours after falling asleep. This is when REM cycles are longest and most frequent. The galantamine amplifies the heightened REM state you're already entering.</p>

<h2>Stacking</h2>

<p>Galantamine is commonly paired with choline (Alpha-GPC or CDP-Choline) to support acetylcholine synthesis. The combination is more effective than galantamine alone. A typical stack: 4mg galantamine + 300mg Alpha-GPC during WBTB.</p>

<h2>Side Effects and Precautions</h2>

<p>Nausea is the most common side effect, especially above 4mg. Take with a small amount of food during WBTB. Some people experience vivid but frightening dreams — sleep paralysis imagery, shadow figures, intense anxiety. These are not dangerous but can be unpleasant if unexpected.</p>

<p><strong>Do not use galantamine more than twice per week.</strong> Tolerance develops quickly. More importantly, frequent use disrupts natural sleep architecture in ways that accumulate over time.</p>

<p>Galantamine interacts with several medications and is contraindicated in various conditions. Consult a physician before use if you take any prescription medications.</p>

<h2>Realistic Expectations</h2>

<p>Galantamine doesn't work if you have no foundation. If you haven't built dream recall, reality check habits, and basic intention-setting practice first, galantamine will produce vivid dreams you won't remember or won't recognize as dreams. Build the foundation. Then, if you want, add galantamine.</p>
    `,
  },
  'fall-asleep-fast': {
    title: 'How to Fall Asleep in Under 5 Minutes',
    cat: 'Technique', time: '6 min', date: 'January 2026',
    body: `
<p>The ability to fall asleep quickly is a skill. It can be learned. Here are the methods with the most evidence behind them.</p>

<h2>The Cognitive Shuffle</h2>

<p>Developed by cognitive scientist Luc Beaulieu-Prévost, the cognitive shuffle is the most effective technique most people have never heard of. The idea: give your brain random, unconnected images to process, preventing it from engaging in the narrative thinking that keeps you awake.</p>

<p>How to do it: Pick a word — any word. Visualize the first image it suggests. Hold it briefly, then move to the next letter of the word and a new image. Don't look for connections. Embrace incoherence. Most people are asleep within minutes.</p>

<h2>Box Breathing</h2>

<p>Inhale for 4 counts. Hold for 4. Exhale for 4. Hold for 4. Repeat. This activates the parasympathetic nervous system — the physiological state of rest. It's used by Navy SEALs for stress regulation under fire. It works equally well for falling asleep.</p>

<h2>Temperature</h2>

<p>Your core body temperature needs to drop 1-2°F for sleep onset. A cool room (65-68°F / 18-20°C) accelerates this. A warm shower or bath 1-2 hours before bed also helps — the subsequent cooling of your body acts as a sleep trigger.</p>

<h2>The Military Method</h2>

<p>Relax your face completely. Drop your shoulders. Release your chest. Let your legs go limp. Clear your mind for 10 seconds by visualizing a static scene. If thoughts intrude, repeat "don't think" slowly for 10 seconds. Reported to work for 96% of people within 2 minutes, after 6 weeks of practice.</p>

<h2>What Doesn't Work</h2>

<p>Lying in bed trying to force sleep. Checking the time. Running through tomorrow's tasks. Scrolling as a "wind-down." These all increase cortisol and arousal — the opposite of what you need.</p>

<p>If you're not asleep within 20 minutes, get up. Do something quiet and non-stimulating until you feel sleepy. Return to bed. The anxiety of trying to sleep often matters more than the specific technique you choose.</p>
    `,
  },
  'thc-and-dreaming': {
    title: 'THC and Dreaming: What Cannabis Does to Your Sleep',
    cat: 'Research', time: '9 min', date: 'March 2026',
    body: `
<p>Cannabis and dreaming have a complicated relationship. Understanding it gives you more control over both.</p>

<h2>What THC Does to REM Sleep</h2>

<p>THC suppresses REM sleep. This is well-established in sleep research. Regular cannabis users report fewer dreams, less dream recall, and reduced dream vividness. The mechanism is direct: cannabinoids act on receptors in the brainstem areas that regulate REM onset and duration.</p>

<p>This is why many people who use cannabis regularly say they don't dream at all. They're dreaming — they're just spending less time in REM and remembering less of it.</p>

<h2>REM Rebound</h2>

<p>When someone stops using cannabis after a period of regular use, REM sleep rebounds dramatically. The brain, deprived of normal REM cycles, compensates. The result is unusually vivid, intense, often disturbing dreams for 1-3 weeks after cessation.</p>

<p>This rebound period is known to some lucid dreamers. The heightened REM state — combined with the right techniques — produces some of the most vivid and extended lucid dreams they've experienced. The catch: the early nights of rebound often involve nightmares before stabilizing into more positive experiences.</p>

<h2>CBD</h2>

<p>The picture for CBD is less clear. Some research suggests CBD may actually increase total sleep and improve sleep quality without the REM suppression associated with THC. CBD also appears to reduce anxiety, which is a common barrier to restful sleep.</p>

<p>For lucid dreamers, CBD-dominant products may be preferable to THC-dominant ones if maintaining dream quality matters.</p>

<h2>Strategic Use</h2>

<p>Some practitioners use cannabis periodically and treat the rebound period intentionally — preparing with journaling, technique practice, and intention setting in advance of stopping. This is anecdotal, but the pattern is consistent enough across reports to be worth noting.</p>

<p>The most straightforward advice: if consistent, high-quality dreaming matters to you, regular THC use works against that goal. Occasional use has a smaller effect. The choice depends on how seriously you take the practice.</p>
    `,
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = ARTICLES[params.slug]
  if (!article) return {}
  return { title: article.title }
}

export default function ArticlePage({ params }: Props) {
  const article = ARTICLES[params.slug]
  if (!article) notFound()

  return (
    <main style={{ paddingTop: 64 }}>
      {/* Header */}
      <section className="site-section" style={{ paddingBottom: '3rem' }}>
        <div className="site-inner site-inner--narrow">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Link href="/articles" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              ← Articles
            </Link>
            <span style={{ color: 'var(--border-lit)' }}>·</span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {article.cat}
            </span>
          </div>
          <h1 className="site-headline" style={{ marginBottom: '1.25rem', fontSize: 'clamp(2rem,4vw,3rem)' }}>
            {article.title}
          </h1>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', color: 'var(--text-3)', display: 'flex', gap: '1rem' }}>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.time} read</span>
          </div>
          <hr className="dream-divider" style={{ marginTop: '2rem' }} />
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: '0 1.5rem 6rem' }}>
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </section>

      {/* Next article CTA */}
      <section className="site-section site-section--alt" style={{ textAlign: 'center' }}>
        <div className="site-inner site-inner--narrow">
          <p className="site-eyebrow" style={{ marginBottom: '1rem' }}>Continue reading</p>
          <Link href="/articles" className="btn btn--ghost">All Articles</Link>
          <div style={{ margin: '2rem 0 1rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-3)', marginBottom: '1.5rem' }}>
              Get new articles and the free 21-day protocol.
            </p>
            <Link href="/start" className="btn btn--primary">Start the Protocol Free</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
