import { useMemo, useState } from 'react'
import { content } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
]

/**
 * One project card.
 * Screenshots: abstract gradient composition until you drop a real image into
 * content.projects[].image (any file in public/).
 */
function ProjectCard({ project, index }) {
  const ref = useReveal(index * 90)

  return (
    <article
      ref={ref}
      data-reveal
      className="flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/5"
    >
      {/* Screenshot / abstract placeholder */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-emerald-500/15 via-navy-800 to-sky-500/10 dark:from-navy-800 dark:to-navy-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(16_24_40/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(16_24_40/0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* Abstract placeholder until a real screenshot replaces it */
          <div className="flex h-full w-full flex-col p-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600/60 dark:text-emerald-300/60">
              {project.category === 'mobile' ? 'Mobile' : 'Web'}
            </span>
            <div className="mt-3 flex h-14 w-full gap-2 rounded-xl bg-white/10" />
            <div className="mt-3 flex gap-2">
              <span className="h-6 w-16 rounded-full bg-emerald-500/30" />
              <span className="h-6 w-16 rounded-full bg-sky-500/30" />
              <span className="h-6 w-20 rounded-full bg-violet-500/30" />
            </div>
          </div>
        )}
        {/* Hover overlay with buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-navy-950/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <a
            href={project.code}
            target="_blank"
            rel="noreferrer noopener"
            className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer noopener"
            className="flex-1 rounded-xl bg-slate-700/80 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 dark:bg-white/10"
          >
            Live demo
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-300">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

/** Projects: heading + filter on the left, scrolling cards on the right. */
export default function Projects() {
  const [filter, setFilter] = useState('all')

  const visibleProjects = useMemo(
    () =>
      filter === 'all'
        ? content.projects
        : content.projects.filter((p) => p.category === filter),
    [filter],
  )

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[24rem_1fr]">
          {/* Left: heading + filter */}
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Projects"
              title="Things I've built"
              subtitle="Web and mobile projects from coursework and personal practice."
            />
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap justify-start gap-2"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                    filter === f.id
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-md shadow-emerald-500/20'
                      : 'border border-slate-300 bg-white/70 text-slate-600 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: scrolling cards */}
          <div className="order-1 lg:order-2 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {visibleProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
