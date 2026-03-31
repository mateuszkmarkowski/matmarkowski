'use client'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useReveal } from '@/components/useReveal'
import EmailCapture from '@/components/site/EmailCapture'
import { useState } from 'react'

const WEEK1 = [
  { day: 1, title: 'Start Your Dream Journal', desc: 'Keep a notebook beside your bed. The moment you wake — before checking your phone, before speaking — write down everything you remember. Even a single image. Even a feeling. This is the foundation everything else is built on.' },
  { day: 2, title: 'Sleep Hygiene Audit', desc: 'Consistent wake time. No screens 30 minutes before bed. Cool, dark room. This isn\'t optional — poor sleep architecture means fewer REM cycles, which means fewer dreams, which means fewer opportunities.' },
  { day: 3, title: 'Reality Checks', desc: 'Throughout the day, ask yourself: am I dreaming right now? Look at your hands. Try to push a finger through your palm. The habit you build in waking life will appear in your dreams — and one day, it\'ll work.' },
  { day: 4, title: 'Intention Setting', desc: 'Before sleep, tell yourself clearly: "Tonight I will remember my dreams. Tonight I will become lucid." This isn\'t affirmation magic — it primes your attention. Your brain acts on what you prioritize.' },
  { day: 5, title: 'Meditation Basics', desc: 'Ten minutes of focused attention meditation before bed. You\'re training the observer — the part of your mind that will notice you\'re dreaming. You can\'t become lucid without that observer being active.' },
  { day: 6, title: 'Dream Recall Training', desc: 'Read your dream journal from the past 5 days. Look for patterns — recurring places, people, emotions. These are your personal dream signs. Recognizing them is often the thing that triggers lucidity.' },
  { day: 7, title: 'Week 1 Review', desc: 'How many dreams did you recall this week? Even one is progress. The journal is working even when it doesn\'t feel like it. Your recall will improve. Stay consistent.' },
]

const WEEK2 = [
  { day: 8, title: 'Introduction to WBTB', desc: 'Wake-Back-To-Bed. Set an alarm for 5-6 hours after you fall asleep. Stay awake for 20-30 minutes — read about lucid dreaming, journal, think about your goals. Then go back to sleep. You\'re re-entering REM at its most active phase.' },
  { day: 9, title: 'MILD Technique', desc: 'Mnemonic Induction of Lucid Dreams. As you fall back asleep after WBTB, repeat: "Next time I\'m dreaming, I will know I\'m dreaming." Visualize becoming lucid in your last dream. The combination of WBTB + MILD is the most studied and effective method for beginners.' },
  { day: 10, title: 'SSILD Technique', desc: 'Senses Initiated Lucid Dream. Cycle through your senses slowly: what do you see (eyes closed), what do you hear, what do you feel? Three cycles. Then fall asleep naturally. SSILD induces hypnagogia that transitions smoothly into lucid dreams.' },
  { day: 11, title: 'Your First Attempt', desc: 'Tonight: WBTB at the 5-hour mark. 25 minutes awake with MILD practice. Return to sleep with SSILD. Keep your journal close. Even a semi-lucid moment — a flicker of awareness — counts. Write it down.' },
  { day: 12, title: 'Optimizing Your WBTB', desc: 'The sweet spot for WBTB is different for everyone. Some do better at 4.5 hours, others at 6. Experiment. Too little sleep before the alarm and you\'ll be too groggy. Too much and the REM window narrows.' },
  { day: 13, title: 'Dream Sign Recognition', desc: 'Review your journal. What appears in your dreams that never appears in waking life? Flying? A specific building? A deceased person? Write these down. Tonight, before sleep, rehearse noticing them.' },
  { day: 14, title: 'Week 2 Review', desc: 'Have you had a lucid dream yet? Many people do in Week 2. If not — that\'s completely normal. The techniques are working subconsciously. The moment is coming. Stay consistent.' },
]

const WEEK3 = [
  { day: 15, title: 'Dream Stabilization', desc: 'When you become lucid, the dream often starts to collapse — you wake up from the excitement. The fix: rub your hands together. Shout "stabilize!" Spin in place. These ground your attention in the dream and extend the experience.' },
  { day: 16, title: 'Goal Setting in Dreams', desc: 'Enter your next lucid dream with a specific goal. Fly. Open a door. Talk to a dream character. Ask them a question. Vague intentions lead to vague experiences. Specificity is everything.' },
  { day: 17, title: 'Dream Control Basics', desc: 'You can change a dream — but fighting it usually fails. Work with the dream\'s logic. Turn around and expect something to be there. Reach into your pocket for an object. Believe before you act.' },
  { day: 18, title: 'Advanced Induction Options', desc: 'WILD (Wake-Initiated Lucid Dream): maintaining consciousness as your body falls asleep, transitioning directly from waking into a dream. High skill ceiling, very powerful. Explore only once you have a solid foundation.' },
  { day: 19, title: 'Integration', desc: 'Lucid dreaming is most valuable when it connects to your waking life. Practice a skill. Rehearse a conversation. Confront a fear in a controlled environment. The experience carries over more than you expect.' },
  { day: 20, title: 'Dealing with Dry Spells', desc: 'Every practitioner goes through periods of few or no lucid dreams. This is normal. Don\'t abandon the journal. Return to basics: sleep hygiene, consistent schedule, reality checks. The practice is the point — not the results.' },
  { day: 21, title: 'What Comes Next', desc: 'You\'ve built the foundation. You have the techniques. You have the journal. The path forward is simply: keep going. Lucid dreaming gets easier with time. The mind learns to recognize itself. Stay curious.' },
]

export default function StartPage() {
  useReveal()
  const [unlocked, setUnlocked] = useState(false)

  return (
    <main style={{ paddingTop: 64 }}>

      {/* Hero */}
      <section className="site-section" style={{ background: 'var(--gradient-dream)', textAlign: 'center', padding: '6rem 1.5rem 5rem' }}>
        <div className="site-inner site-inner--narrow">
          <p className="site-eyebrow reveal">Free Protocol</p>
          <h1 className="site-headline site-headline--hero reveal">The 21-Day Lucid<br />Dreaming Protocol</h1>
          <hr className="dream-divider dream-divider--center reveal" />
          <p className="site-subheadline reveal">
            A day-by-day guide from zero to your first lucid dream. Built on science. Designed to not destroy your sleep.
          </p>
        </div>
      </section>

      {/* Week 1 — free preview */}
      <section className="site-section site-section--alt">
        <div className="site-inner site-inner--narrow">
          <div className="protocol-week">
            <div className="protocol-week__label">Week One</div>
            <div className="protocol-week__title">Foundation — Dream Recall &amp; Awareness</div>
            {WEEK1.map(d => (
              <div key={d.day} className="protocol-day reveal">
                <div className="protocol-day__num">Day {d.day}</div>
                <div className="protocol-day__title">{d.title}</div>
                <div className="protocol-day__desc">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gate */}
      {!unlocked ? (
        <section className="site-section" style={{ textAlign: 'center' }}>
          <div className="site-inner site-inner--narrow">
            <div className="gate-blur" style={{ maxHeight: 120, overflow: 'hidden' }}>
              <div className="protocol-week" style={{ opacity: 0.3 }}>
                <div className="protocol-week__label">Week Two</div>
                <div className="protocol-week__title">Active Induction — WBTB, MILD &amp; SSILD</div>
              </div>
            </div>
            <div style={{ marginTop: '3rem' }}>
              <p className="site-eyebrow" style={{ marginBottom: '1rem' }}>Weeks 2 &amp; 3 are free — just enter your email</p>
              <h2 className="site-headline" style={{ marginBottom: '1.5rem' }}>Continue the Protocol</h2>
              <EmailCapture
                buttonLabel="Unlock Weeks 2 & 3 — Free"
                successMessage="You're in. Weeks 2 & 3 are now unlocked below."
                size="large"
              />
              <div style={{ marginTop: '1rem' }}>
                <button
                  onClick={() => setUnlocked(true)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '0.68rem', color: 'var(--text-3)', textDecoration: 'underline' }}
                >
                  Continue without email
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Week 2 */}
          <section className="site-section">
            <div className="site-inner site-inner--narrow">
              <div className="protocol-week">
                <div className="protocol-week__label">Week Two</div>
                <div className="protocol-week__title">Active Induction — WBTB, MILD &amp; SSILD</div>
                {WEEK2.map(d => (
                  <div key={d.day} className="protocol-day reveal">
                    <div className="protocol-day__num">Day {d.day}</div>
                    <div className="protocol-day__title">{d.title}</div>
                    <div className="protocol-day__desc">{d.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Week 3 */}
          <section className="site-section site-section--alt">
            <div className="site-inner site-inner--narrow">
              <div className="protocol-week">
                <div className="protocol-week__label">Week Three</div>
                <div className="protocol-week__title">Deepening — Stability, Control &amp; Integration</div>
                {WEEK3.map(d => (
                  <div key={d.day} className="protocol-day reveal">
                    <div className="protocol-day__num">Day {d.day}</div>
                    <div className="protocol-day__title">{d.title}</div>
                    <div className="protocol-day__desc">{d.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
