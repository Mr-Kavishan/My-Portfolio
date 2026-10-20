import { content } from '../data/content.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

const ACCENTS = [
  'from-emerald-400/15 to-teal-400/5 text-emerald-700 dark:text-emerald-300',
  'from-sky-400/15 to-cyan-400/5 text-sky-700 dark:text-sky-300',
  'from-violet-400/15 to-fuchsia-400/5 text-violet-700 dark:text-violet-300',
  'from-amber-400/15 to-orange-400/5 text-amber-700 dark:text-amber-300',
  'from-rose-400/15 to-pink-400/5 text-rose-700 dark:text-rose-300',
]

/** Skills grouped into scannable cards, with the web category given room to breathe. */
export default function Skills() {
  return (
    <section id="skills" className="relative isolate overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-80 max-w-5xl rounded-full bg-sky-400/5 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="My technical toolkit"
          subtitle="A growing set of languages, frameworks and tools I use to turn ideas into useful products."
        />

        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {content.skills.map((group, index) => (
            <Reveal
              key={group.category}
              as="li"
              delay={index * 80}
              className={group.category === 'Web' ? 'xl:col-span-2' : ''}
            >
              <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/75 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.035] md:p-7">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/10 to-sky-400/5 blur-2xl transition-transform duration-500 group-hover:scale-150"
                />

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${ACCENTS[index % ACCENTS.length]}`}
                    >
                      <Icon name={group.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                        {group.category}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                        Skill category
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold tabular-nums text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                    {String(group.skills.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="relative mt-6 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/70 px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/5 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/5"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500/80"
                      />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
