import { content } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'

/** One timeline entry, alternating sides on large screens. */
function TimelineItem({ item, index }) {
  const ref = useReveal(index * 90)
  const isInternship = item.type === 'Internship'
  const isLeft = index % 2 === 0

  return (
    <li ref={ref} data-reveal className="relative grid gap-6 md:grid-cols-2 md:gap-12">
      <span
        aria-hidden="true"
        className="absolute left-3 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_0_4px_rgb(16_185_129/0.16)] dark:border-ink-950 md:left-1/2"
      />

      <div className={`${isLeft ? '' : 'md:col-start-2'} pl-8 md:pl-0`}>
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/75 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.035] md:p-7">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-sky-400 opacity-70 transition-opacity group-hover:opacity-100"
          />

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] ${
                isInternship
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                  : 'bg-sky-500/10 text-sky-700 dark:text-sky-300'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {item.type}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              <Icon name="calendar" className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <time>{item.period}</time>
            </span>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-sky-500/15 text-emerald-700 dark:text-emerald-300">
              <Icon name="briefcase" className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold leading-snug text-slate-900 dark:text-white md:text-2xl">
                {item.role}
              </h3>
              <p className="mt-1.5 font-medium text-emerald-700 dark:text-emerald-300">
                {item.org}
              </p>
            </div>
          </div>
        </article>
      </div>
    </li>
  )
}

/** Experience: vertical centre-line timeline (single column on mobile). */
export default function Experience() {
  return (
    <section id="experience" className="relative isolate overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-80 max-w-5xl rounded-full bg-emerald-400/5 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Professional Experiences"
          subtitle="My journey in software development"
          titleClassName="text-3xl md:text-4xl lg:text-5xl"
          className="mb-14"
        />

        <div className="relative mx-auto max-w-5xl">
          <span
            aria-hidden="true"
            className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-emerald-400/70 via-emerald-400/25 to-transparent md:left-1/2"
          />

          <ol className="space-y-8 md:space-y-12">
            {content.experience.map((item, i) => (
              <TimelineItem key={`${item.org}-${item.role}`} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
