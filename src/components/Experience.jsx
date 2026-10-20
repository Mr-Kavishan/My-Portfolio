import { content } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'

/** One timeline entry: dot + card, alternating sides on large screens. */
function TimelineItem({ item, index }) {
  const ref = useReveal(index * 90)
  const isInternship = item.type === 'Internship'
  const isLeft = index % 2 === 0

  return (
    <li ref={ref} data-reveal className="relative grid gap-6 md:grid-cols-2 md:gap-12">
      {/* Timeline dot on the centre line (desktop) */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 md:block"
      />

      <div className={`${isLeft ? '' : 'md:col-start-2'} pl-8 md:pl-0`}>
        <article className="card rounded-3xl p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
                isInternship
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                  : 'bg-sky-400/15 text-sky-700 dark:text-sky-300'
              }`}
            >
              {item.type}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Icon name="calendar" className="h-3.5 w-3.5" />
              {item.period}
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {item.role}
          </h3>
          <p className="mt-1 font-medium text-emerald-600 dark:text-emerald-300">{item.org}</p>
        </article>
      </div>
    </li>
  )
}

/** Experience: vertical centre-line timeline (single column on mobile). */
export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          subtitle="Internship and leadership experience that taught me how software gets built with a team."
          className="mb-2"
        />

        <div className="relative">
          {/* Centre line (desktop) */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-emerald-400/60 via-emerald-400/20 to-transparent md:block"
          />
          {/* Left line (mobile) */}
          <span
            aria-hidden="true"
            className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-emerald-400/60 via-emerald-400/20 to-transparent md:hidden"
          />

          <ol className="space-y-10 md:space-y-14">
            {content.experience.map((item, i) => (
              <TimelineItem key={`${item.org}-${item.role}`} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
