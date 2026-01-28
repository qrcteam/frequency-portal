import Link from "next/link";
import { NOTES, DOMAINS } from "@/types";

export default function Home() {
  return (
    <>
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-text-primary">
            Frequency Activator
          </Link>
          <Link
            href="/tune"
            className="font-ui text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Begin Activation &rarr;
          </Link>
        </div>
      </nav>

      <main className="bg-bg-primary">
        {/* ============ HERO SECTION ============ */}
        <section className="bg-mesh bg-mesh-animated min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
          {/* Decorative glow orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-breathe pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--safety-dim) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full glow-breathe pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--light-dim) 0%, transparent 70%)",
              animationDelay: "2s",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <p
              className="font-ui text-xs tracking-[0.3em] uppercase text-text-secondary mb-8 fade-up"
              style={{ animationFillMode: "both" }}
            >
              Quantum Reality Creators
            </p>

            {/* Main headline */}
            <h1
              className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-text-primary leading-tight mb-8 fade-up delay-100"
              style={{ animationFillMode: "both" }}
            >
              The Frequency{" "}
              <span className="italic text-safety-high">Activator</span>
            </h1>

            {/* Subtext */}
            <p
              className="font-body text-lg sm:text-xl text-text-secondary leading-relaxed mb-6 max-w-2xl mx-auto fade-up delay-200"
              style={{ animationFillMode: "both" }}
            >
              A transformational journey that reveals what&apos;s possible when your
              energy aligns — across six fundamental frequencies that shape
              everything you create.
            </p>

            <p
              className="font-body text-base text-text-muted leading-relaxed mb-12 fade-up delay-300"
              style={{ animationFillMode: "both" }}
            >
              Not a test. Not a score. A recognition of what&apos;s already within you.
            </p>

            {/* CTA Button */}
            <div
              className="fade-up delay-400"
              style={{ animationFillMode: "both" }}
            >
              <Link href="/tune" className="btn-primary text-lg px-10 py-4">
                Activate Your Frequency
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>

            {/* Scroll indicator */}
            <a
              href="#what-is-this"
              className="inline-flex flex-col items-center gap-2 mt-12 text-text-muted hover:text-text-secondary transition-colors cursor-pointer fade-up delay-500"
              style={{ animationFillMode: "both" }}
            >
              <span className="font-ui text-xs tracking-wider">Explore</span>
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* ============ WHAT IS THIS SECTION ============ */}
        <section id="what-is-this" className="py-24 px-6 bg-bg-secondary scroll-mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-surface border border-text-muted/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-elevated flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-ui text-sm text-text-muted">
                      Image: Activation visualization
                    </p>
                  </div>
                </div>
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-safety-dim/20 to-light-dim/20" />
              </div>

              {/* Content */}
              <div>
                <p className="font-ui text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
                  What is this?
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-light text-text-primary mb-6">
                  Not a quiz.{" "}
                  <span className="italic text-pleasure-high">An activation.</span>
                </h2>
                <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                  <p>
                    Your frequencies are already within you — some fully lit,
                    others waiting to be recognized. This isn&apos;t about fixing
                    what&apos;s broken. It&apos;s about seeing what&apos;s possible.
                  </p>
                  <p>
                    Through honest reflection, you&apos;ll discover where your energy
                    flows freely and where it&apos;s ready to expand. No grades.
                    No judgment. Just clarity and invitation.
                  </p>
                  <p className="text-text-muted italic">
                    &ldquo;You can&apos;t activate what you don&apos;t recognize.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ THE SIX NOTES SECTION ============ */}
        <section className="py-24 px-6 bg-bg-primary">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
                The Framework
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-text-primary mb-4">
                Six Frequencies of{" "}
                <span className="italic text-power-high">Creation</span>
              </h2>
              <p className="font-body text-lg text-text-muted max-w-2xl mx-auto">
                Every aspect of your life resonates through these six
                fundamental frequencies — organized into two triads.
              </p>
            </div>

            {/* Triads */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Feminine Triad */}
              <div className="p-8 rounded-2xl bg-bg-surface/50 border border-text-muted/10">
                <h3 className="font-display text-xl text-text-primary mb-2">
                  The Feminine Triad
                </h3>
                <p className="font-body text-sm text-text-muted mb-6">
                  Receiving, allowing, being
                </p>
                <div className="space-y-4">
                  {NOTES.filter((n) => n.triad === "feminine").map((note) => (
                    <div key={note.id} className="flex items-start gap-4">
                      <div
                        className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: `var(--${note.id}-mid)` }}
                      />
                      <div>
                        <h4
                          className="font-display text-lg"
                          style={{ color: `var(--${note.id}-high)` }}
                        >
                          {note.name}
                        </h4>
                        <p className="font-body text-sm text-text-muted">
                          {note.essence}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Masculine Triad */}
              <div className="p-8 rounded-2xl bg-bg-surface/50 border border-text-muted/10">
                <h3 className="font-display text-xl text-text-primary mb-2">
                  The Masculine Triad
                </h3>
                <p className="font-body text-sm text-text-muted mb-6">
                  Directing, creating, expressing
                </p>
                <div className="space-y-4">
                  {NOTES.filter((n) => n.triad === "masculine").map((note) => (
                    <div key={note.id} className="flex items-start gap-4">
                      <div
                        className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: `var(--${note.id}-mid)` }}
                      />
                      <div>
                        <h4
                          className="font-display text-lg"
                          style={{ color: `var(--${note.id}-high)` }}
                        >
                          {note.name}
                        </h4>
                        <p className="font-body text-sm text-text-muted">
                          {note.essence}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual: Six colored dots */}
            <div className="flex items-center justify-center gap-4">
              {NOTES.map((note) => (
                <div
                  key={note.id}
                  className="w-4 h-4 rounded-full transition-transform hover:scale-150"
                  style={{ backgroundColor: `var(--${note.id}-mid)` }}
                  title={note.name}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============ THE SEVEN DOMAINS SECTION ============ */}
        <section className="py-24 px-6 bg-bg-secondary">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
                Where Frequencies Play
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-text-primary mb-4">
                Seven Life{" "}
                <span className="italic text-light-high">Domains</span>
              </h2>
              <p className="font-body text-lg text-text-muted max-w-2xl mx-auto">
                Choose which areas of life to explore. The more domains you
                select, the deeper the activation.
              </p>
            </div>

            {/* Domain Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {DOMAINS.map((domain, index) => (
                <div
                  key={domain.id}
                  className="group p-6 rounded-xl bg-bg-surface/30 border border-text-muted/10 hover:bg-bg-surface hover:border-text-muted/20 transition-all duration-300"
                >
                  <h3 className="font-display text-xl text-text-primary mb-2 group-hover:text-light-high transition-colors">
                    {domain.name}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {domain.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS SECTION ============ */}
        <section className="py-24 px-6 bg-bg-primary">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
                The Journey
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-text-primary mb-4">
                How It <span className="italic text-now-high">Works</span>
              </h2>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Choose Your Domains",
                  description:
                    "Select which areas of life you want to explore — from relationships to purpose to play.",
                },
                {
                  number: "02",
                  title: "Reflect Honestly",
                  description:
                    "Move through questions at your own pace. There are no wrong answers, only honest recognition.",
                },
                {
                  number: "03",
                  title: "See What&apos;s Possible",
                  description:
                    "Receive a visual map of your frequencies — where they're lit and where they're ready to activate.",
                },
              ].map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-surface border border-text-muted/20 flex items-center justify-center">
                    <span className="font-display text-2xl text-text-secondary">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHAT YOU'LL DISCOVER SECTION ============ */}
        <section className="py-24 px-6 bg-bg-secondary">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
                <p className="font-ui text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
                  What You&apos;ll Discover
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-light text-text-primary mb-8">
                  Clarity That{" "}
                  <span className="italic text-heat-high">Activates</span>
                </h2>

                <ul className="space-y-6">
                  {[
                    {
                      title: "Your Lit Frequencies",
                      description:
                        "See where your energy already flows freely — these are your natural sources of power and creation.",
                    },
                    {
                      title: "Your Ready Frequencies",
                      description:
                        "Identify where energy is waiting to activate — not broken, just ready for your attention.",
                    },
                    {
                      title: "Patterns Across Domains",
                      description:
                        "Notice how the same frequency might show up differently in relationships versus purpose.",
                    },
                    {
                      title: "Your Activation Path",
                      description:
                        "Receive invitations for where small shifts might create the biggest transformation.",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-heat-dim/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3 h-3 text-heat-high"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-display text-lg text-text-primary mb-1">
                          {item.title}
                        </h4>
                        <p className="font-body text-sm text-text-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image placeholder */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-surface border border-text-muted/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-elevated flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-ui text-sm text-text-muted">
                      Image: Results visualization
                    </p>
                  </div>
                </div>
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tl from-heat-dim/20 to-power-dim/20" />
              </div>
            </div>
          </div>
        </section>

        {/* ============ QUOTE SECTION ============ */}
        <section className="py-24 px-6 bg-bg-primary relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--power-dim) 0%, transparent 70%)",
              opacity: 0.3,
            }}
          />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-text-primary leading-relaxed mb-8 italic">
              &ldquo;The quality of your life is determined by the frequency
              you hold. Not the one you think about — the one you{" "}
              <span className="text-pleasure-high">embody</span>.&rdquo;
            </blockquote>
            <cite className="font-ui text-sm tracking-wider uppercase text-text-muted not-italic">
              — Oz & Mazix
            </cite>
          </div>
        </section>

        {/* ============ FAQ SECTION ============ */}
        <section className="py-24 px-6 bg-bg-secondary">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
                Questions
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-text-primary">
                Common <span className="italic text-safety-high">Questions</span>
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-6">
              {[
                {
                  q: "How long does it take?",
                  a: "A full activation across all seven domains takes about 10-15 minutes. You can also choose fewer domains for a quicker exploration.",
                },
                {
                  q: "Is this like a personality test?",
                  a: "No. This isn't about categorizing who you are — it's about recognizing where your energy is right now and what's possible when it aligns.",
                },
                {
                  q: "What if I don't like my results?",
                  a: "There are no bad results. Frequencies that aren't fully lit aren't failures — they're invitations. Every state is a starting point for activation.",
                },
                {
                  q: "Can I take it more than once?",
                  a: "Absolutely. Many people activate weekly or monthly to track shifts and notice patterns over time. Your frequencies are always evolving.",
                },
                {
                  q: "Is my data saved?",
                  a: "Your results are stored locally on your device. Nothing is sent to a server unless you choose to create an account.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-bg-surface/50 border border-text-muted/10"
                >
                  <h3 className="font-display text-lg text-text-primary mb-2">
                    {faq.q}
                  </h3>
                  <p className="font-body text-text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA SECTION ============ */}
        <section className="py-32 px-6 bg-mesh relative overflow-hidden">
          {/* Decorative elements */}
          <div
            className="absolute top-0 left-1/4 w-72 h-72 rounded-full glow-breathe pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--safety-dim) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full glow-breathe pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--light-dim) 0%, transparent 70%)",
              animationDelay: "2s",
            }}
          />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="font-display text-4xl sm:text-5xl font-light text-text-primary mb-6">
              Ready to{" "}
              <span className="italic text-safety-high">activate</span>?
            </h2>
            <p className="font-body text-lg text-text-secondary mb-10 max-w-xl mx-auto">
              Take 10 minutes to discover where your energy is lit, where
              it&apos;s ready, and what becomes possible when you align.
            </p>
            <Link href="/tune" className="btn-primary text-lg px-12 py-5">
              Activate Your Frequency
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            <p className="font-body text-sm text-text-muted mt-8">
              Free. No account required. Results stay on your device.
            </p>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="py-12 px-6 bg-bg-primary border-t border-text-muted/10">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="font-display text-lg text-text-secondary hover:text-text-primary transition-colors"
              >
                Frequency Activator
              </Link>
              <span className="text-text-muted/30">|</span>
              <a
                href="https://quantumrealitycreators.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-sm text-text-muted hover:text-text-secondary transition-colors"
              >
                Quantum Reality Creators
              </a>
            </div>
            <p className="font-ui text-xs text-text-muted">
              &copy; {new Date().getFullYear()} Oz & Mazix. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
