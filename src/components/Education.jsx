import { useReveal } from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'

/** One education card in a light timeline. */
import { content } from '../data/content.js'

function EducationCard({ item, index }) {
  const ref = useReveal(index * 100)

  return (
    <li ref={ref} data-reveal className="relative pl-10 md:pl-14">
      {/* Timeline dot + line */}
      <span
        aria-hidden="true"
        className="absolute left-3 top-7 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 md:left-5"
      />
      <span
        aria-hidden="true"
        className="absolute left-[1.35rem] top-10 h-full w-px bg-gradient-to-b from-emerald-500/40 to-transparent md:left-[2.1rem]"
      />

      <article className="glass rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/15 text-emerald-600 dark:text-emerald-300">
            <Icon name="graduation" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
            <Icon name="calendar" className="h-3.5 w-3.5" />
            {item.period}
          </span>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {item.result}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          {item.degree}
        </h3>
        <p className="mt-1 font-medium text-emerald-600 dark:text-emerald-300">{item.school}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {item.note}
        </p>
      </article>
    </li>
  )
}

/** Education: timeline card(s). */
export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Education"
          title="Where I study"
          subtitle="My academic journey and the CGPA that keeps me grinding."
        />
        <ol className="space-y-10">
          {content.education.map((item, i) => (
            <EducationCard key={item.degree} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
