import { useReveal } from '../hooks/useReveal.js'

/**
 * One oversized, full-width statement — breaks the uniform section grid.
 * Uses the same stage as the hero: faint grid + a soft emerald aura.
 */
export default function Statement() {
  const ref = useReveal(200)

  return (
    <section
      ref={ref}
      data-reveal
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="statement-heading"
    >
      {/* Faint grid + emerald aura, matching the hero stage */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgb(15_23_42/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(15_23_42/0.06)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(16_185_129/0.10),transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600 dark:text-emerald-300">
          Statement
        </p>
        <h2
          id="statement-heading"
          className="font-display text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-7xl dark:text-white"
        >
          I build{' '}
          <span className="gradient-text">fast, human products</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Thoughtful by design, engineered to scale. Shiny in-dark or bright,
          this portfolio site itself — I keep shipping it, and I'd love to
          ship more.
        </p>
      </div>
    </section>
  )
}
