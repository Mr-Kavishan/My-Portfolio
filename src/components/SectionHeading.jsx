import { useReveal } from '../hooks/useReveal.js'

/** Shared section heading: small teal eyebrow + display-font title. */
export default function SectionHeading({ eyebrow, title, subtitle }) {
  const ref = useReveal()

  return (
    <header ref={ref} data-reveal className="mb-12 text-center md:mb-16">
      <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-teal-500 dark:text-teal-300">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
    </header>
  )
}
