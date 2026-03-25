'use client'

import { useReveal } from '@/components/useReveal'

export default function Home() {
  useReveal()

  return (
    <main>
      {/* ═══════════════════════════════════════
          SECTION 01 — THE OPENING
          ═══════════════════════════════════════ */}
      <section className="section section--alt">
        <div className="section__inner">
          <p className="label reveal" style={{ marginBottom: '1.5rem' }}>
            est. mmxxvi
          </p>
          <h1 className="display display--hero reveal">
            matmarkowski
          </h1>
          <hr className="hr reveal" />
          <p className="tagline reveal">
            This is where the dream begins.
          </p>
        </div>
        <div className="scroll-hint">
          <div className="scroll-hint__line" />
          <span className="scroll-hint__text">Scroll</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 02 — THE PREMISE
          ═══════════════════════════════════════ */}
      <section className="section">
        <div className="section__inner reveal-stagger">
          <p className="body-text reveal">
            <span className="manifesto-line">Most people forget their dreams.</span>
            <span className="manifesto-line">
              Not because they&rsquo;re unimportant&mdash;
            </span>
            <span className="manifesto-line">
              but because remembering would change everything.
            </span>
          </p>
          <hr className="hr reveal" />
          <p className="body-text body-text--large reveal">
            <span className="manifesto-line">Lucid dreaming is not a trick.</span>
            <span className="manifesto-line">It&rsquo;s not a hack.</span>
            <span className="manifesto-line">It&rsquo;s not escapism.</span>
          </p>
          <p className="display display--section reveal" style={{ marginTop: '1.5rem' }}>
            It&rsquo;s a canvas.
          </p>
        </div>
      </section>

      <div className="dots" aria-hidden="true">&#9702; &#9702; &#9702;</div>

      {/* ═══════════════════════════════════════
          SECTION 03 — THE CANVAS
          ═══════════════════════════════════════ */}
      <section className="section section--alt">
        <div className="section__inner">
          <p className="label reveal">A place where</p>
          <ul className="manifesto-list reveal-stagger" style={{ marginTop: '2rem' }}>
            <li className="reveal">curiosity is unchained</li>
            <li className="reveal">reality becomes editable</li>
            <li className="reveal">the mind reveals itself</li>
          </ul>
          <hr className="hr reveal" />
          <p className="label reveal">This is a space to</p>
          <ul className="manifesto-list reveal-stagger" style={{ marginTop: '2rem' }}>
            <li className="reveal">explore consciousness</li>
            <li className="reveal">study the edge of science</li>
            <li className="reveal">integrate Jung, archetypes, the shadow</li>
            <li className="reveal">create, experiment, and push limits</li>
          </ul>
        </div>
      </section>

      <div className="dots" aria-hidden="true">&#9702; &#9702; &#9702;</div>

      {/* ═══════════════════════════════════════
          SECTION 04 — THE SYSTEM
          ═══════════════════════════════════════ */}
      <section className="section">
        <div className="section__inner">
          <p className="body-text reveal">
            I&rsquo;ve been deprived of creation.
          </p>
          <p className="display display--section reveal" style={{ margin: '1.5rem 0' }}>
            That ends now.
          </p>
          <hr className="hr reveal" />
          <p className="body-text reveal" style={{ marginTop: '2rem' }}>
            This is not just a website.
          </p>
          <p className="body-text body-text--large reveal">
            <em>It&rsquo;s a system.</em>
          </p>
          <p className="label reveal" style={{ marginTop: '2.5rem' }}>A system to</p>
          <ul className="manifesto-list reveal-stagger" style={{ marginTop: '1.5rem' }}>
            <li className="reveal">understand yourself</li>
            <li className="reveal">align your inner layers</li>
            <li className="reveal">act with clarity</li>
            <li className="reveal">close loops instead of living inside them</li>
          </ul>
        </div>
      </section>

      <div className="dots" aria-hidden="true">&#9702; &#9702; &#9702;</div>

      {/* ═══════════════════════════════════════
          SECTION 05 — THE TELESCOPE
          ═══════════════════════════════════════ */}
      <section className="section section--alt">
        <div className="section__inner">
          <p className="body-text reveal">
            We are entering a decade of acceleration.
          </p>
          <p className="body-text reveal">
            AI. Neuroscience. Technology.
          </p>
          <p className="body-text reveal">
            The external world is evolving rapidly.
          </p>
          <p className="body-text body-text--large reveal" style={{ marginTop: '1.5rem' }}>
            But most people<br />
            <em>don&rsquo;t know how to evolve internally.</em>
          </p>
          <hr className="hr reveal" />
          <p className="body-text reveal">
            Lucid dreaming is not the answer.
          </p>
          <p className="display display--section reveal" style={{ marginTop: '0.5rem' }}>
            It&rsquo;s the telescope.
          </p>
          <p className="label reveal" style={{ marginTop: '2.5rem' }}>A way to</p>
          <ul className="manifesto-list reveal-stagger" style={{ marginTop: '1.5rem' }}>
            <li className="reveal">observe your mind</li>
            <li className="reveal">question your reality</li>
            <li className="reveal">uncover what you actually want</li>
          </ul>
        </div>
      </section>

      <div className="dots" aria-hidden="true">&#9702; &#9702; &#9702;</div>

      {/* ═══════════════════════════════════════
          SECTION 06 — THE MISSION
          ═══════════════════════════════════════ */}
      <section className="section">
        <div className="section__inner">
          <p className="body-text reveal">
            Because the real question is not:
          </p>
          <p className="body-text body-text--large reveal">
            &ldquo;What can you do?&rdquo;
          </p>
          <p className="body-text reveal" style={{ marginTop: '0.5rem' }}>
            It&rsquo;s:
          </p>
          <p className="display display--section reveal" style={{ margin: '1rem 0 2rem' }}>
            &ldquo;Where are you going&mdash;and why?&rdquo;
          </p>
          <hr className="gold-line reveal" />
          <p className="label reveal" style={{ marginTop: '2rem' }}>The mission</p>
          <p className="body-text body-text--large reveal" style={{ marginTop: '1.5rem' }}>
            Through a holistic view of a person, drive meaningful and positive life change
            across mind, body, technology, relationships, creativity, and the future.
          </p>
          <hr className="hr reveal" />
          <p className="label reveal" style={{ marginTop: '2rem' }}>I want</p>
          <ul className="manifesto-list reveal-stagger" style={{ marginTop: '1.5rem' }}>
            <li className="reveal">freedom</li>
            <li className="reveal">creation</li>
            <li className="reveal">curiosity without constraint</li>
            <li className="reveal">to see what I&rsquo;m capable of</li>
          </ul>
        </div>
      </section>

      <div className="dots" aria-hidden="true">&#9702; &#9702; &#9702;</div>

      {/* ═══════════════════════════════════════
          SECTION 07 — THE THRESHOLD
          ═══════════════════════════════════════ */}
      <section className="section section--alt">
        <div className="section__inner">
          <p className="body-text reveal">
            This is an experiment.
          </p>
          <p className="body-text reveal">
            A long one.
          </p>
          <hr className="hr reveal" />
          <p className="display display--section reveal" style={{ marginTop: '1.5rem' }}>
            If you&rsquo;re here,<br />
            you&rsquo;re already inside.
          </p>
          <div className="reveal" style={{ marginTop: '3rem' }}>
            <p className="label" style={{ marginBottom: '0.5rem' }}>Enter the loop</p>
            <form
              className="email-form"
              onSubmit={(e) => {
                e.preventDefault()
                // TODO: Connect to your email provider
                alert('Coming soon — email capture will be connected.')
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                aria-label="Email address"
              />
              <button type="submit">Begin</button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="footer">
        matmarkowski.com &middot; mmxxvi
      </footer>
    </main>
  )
}
