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

/** Same SVG icon set used across the site, inlined so images/stories stay inside the work card. */
const THEME_IMAGES = [
  { id: 'legal',     caption: 'Legal guidance chatbot',  light: '#f9f5ff', dark: '#0d0a1a', accent: 'bg-violet-400' },
  { id: 'event',     caption: 'Secure event ticketing',  light: '#ecfdf3', dark: '#08120f', accent: 'bg-emerald-400' },
  { id: 'spice',     caption: 'Spice inventory control', light: '#fdf6e3', dark: '#1a1607', accent: 'bg-amber-400' },
  { id: 'portfolio', caption: 'Portfolio site',          light: '#f1faf7', dark: '#052215', accent: 'bg-emerald-400' },
]

/** Small monochrome SVG icon per project (decision-themed chip). */
function ProjectIcon({ category }) {
  const isMobile = category === 'mobile'

  return (
    <div
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-ink-950/60 ${
        isMobile ? 'from-violet-500/15 to-ink-900/60' : 'from-emerald-500/15 to-ink-900/60'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${isMobile ? 'bg-gradient-to-br from-violet-400/20 to-ink-950/80' : 'bg-gradient-to-br from-emerald-400/20 to-ink-950/80'}`}
      />
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className={`drop-shadow-sm ${isMobile ? 'text-violet-400' : 'text-emerald-600 dark:text-emerald-300'}`}
      >
        {isMobile ? (
          <>
            <rect x="7" y="2" width="10" height="20" rx="3" stroke="currentColor" strokeWidth="1.75" />
            <circle cx="12" cy="9" r="2.75" stroke="currentColor" strokeWidth="1.75" />
            <circle cx="9.2" cy="13.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.8" cy="13.5" r="1" fill="currentColor" stroke="none" />
          </>
        ) : (
          <>
            <rect x="2.5" y="4" width="19" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" />
            <path d="M2.5 10h20M7 2v4M17 2v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            <circle cx="9.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
          </>
        )}
      </svg>
    </div>
  )
}

/** Tiny illustrated scene that visually summarizes each project (no external image needed). */
function ProjectScene({ project }) {
  const theme = THEME_IMAGES.find((t) => t.id === project.sceneId) ?? THEME_IMAGES[0]
  const isMobile = project.category === 'mobile'

  return (      <div className="relative overflow-hidden bg-white dark:bg-ink-950">
      {/* decorative panel + caption chip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 rounded-xl border border-white/60 bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-ink-950/70 dark:text-slate-300"
      >
        {theme.caption}
      </div>

      {/* Illustration: different concrete scene per project */}    { project.sceneId === 'lawadviser' && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5 sm:p-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-200">
            <Icon name="code" className="h-5 w-5" />
          </div>
          <div className="w-full max-w-xs text-center">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              AI-powered legal guidance, in your language
            </p>
            <p className="mt-2 h-2 w-3/4 rounded-full bg-slate-200 dark:bg-white/10" />
            <p className="mt-2 h-2 w-1/2 rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
          <div className="flex gap-2">
            <span className="h-9 w-24 rounded-xl bg-violet-500/20 text-violet-700 dark:bg-violet-900/50 dark:text-violet-200" />
            <span className="h-9 w-20 rounded-xl bg-sky-500/20 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200" />
          </div>
        </div>
      )}

      {project.sceneId === 'secure-event-management-system' && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5 sm:p-7">
          <div className="flex gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-600 bg-sky-50 text-emerald-700 dark:border-emerald-400 dark:bg-sky-900/40 dark:text-emerald-200">
              <Icon name="qrcode" className="h-5 w-5" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              <Icon name="mail" className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            QR tickets · no duplicates · verified on the day
          </p>
          <div className="mt-auto flex gap-2">
            <div className="h-2 w-20 rounded-full bg-emerald-600/40" />
            <div className="h-2 w-12 rounded-full bg-slate-200 dark:bg-white/20" />
          </div>
        </div>
      )}

      {project.sceneId === 'spice-management-system' && (
        <div className="flex h-full w-full flex-col justify-center gap-3 p-5 sm:p-7">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-xl bg-amber-200/80 p-1.5 text-amber-900 dark:bg-amber-900/50 dark:text-amber-100">
              <span className="sr-only">stock card</span>
              <div className="h-9 w-full rounded bg-white/60" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-200/80 p-1.5 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100">
              <span className="sr-only">sales card</span>
              <div className="h-9 w-full rounded bg-white/60" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-rose-200/80 p-1.5 text-rose-900 dark:bg-rose-900/50 dark:text-rose-100">
              <span className="sr-only">supplier card</span>
              <div className="h-9 w-full rounded bg-white/60" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Stock · sales · suppliers — one place
          </p>
        </div>
      )}

      {project.sceneId === 'portfolio-website' && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5 sm:p-7">
          <div className="flex gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
              <Icon name="code" className="h-4 w-4" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-200 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200">
              <Icon name="globe" className="h-4 w-4" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-200 text-violet-700 dark:bg-violet-900/50 dark:text-violet-200">
              <Icon name="tool" className="h-4 w-4" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Responsive · fast · accessible
          </p>
          <div className="flex gap-2">
            <div className="h-2 w-2/3 rounded-full bg-emerald-600/50" />
            <div className="h-2 w-1/2 rounded-full bg-slate-200 dark:bg-white/20" />
          </div>
        </div>
      )}
    </div>
  )
}

/** Quick metadata strip: built, type, live status. */
function ProjectStats({ project }) {
  const live = Boolean(project.live)

  const items = [
    {
      label: 'Built',
      value: project.yearBuilt ?? '…',
      icon: 'calendar',
    },
    {
      label: 'Type',
      value: project.category === 'mobile' ? 'Mobile app' : 'Web app',
      icon: project.category === 'mobile' ? 'phoneSmart' : 'globe',
    },
  ]

  if (live) {
    items.push({ label: 'Live', value: 'Yes', icon: 'external-link' })
  }

  return (
    <ul
      className="flex flex-wrap gap-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
      aria-label="Project metadata"
    >
      {items.map((item) => (
        <li
          key={item.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 px-2.5 py-1 dark:border-white/10 dark:bg-white/[0.035]"
        >
          <Icon name={item.icon} className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-300" />
          <span className="font-semibold">{item.label}</span>
          <span className="font-normal">·</span>
          <span className="text-slate-700 dark:text-slate-200">{item.value}</span>
        </li>
      ))}
    </ul>
  )
}

/** One project card: icon, name, short summary, tech tags and actions. */
function ProjectCard({ project, index }) {
  const ref = useReveal(index * 90)
  const isMobile = project.category === 'mobile'

  return (
    <article
      ref={ref}
      data-reveal
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/75 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.035]`}
    >
      {/* Top accent bar + category badge */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 px-6 pb-4 dark:border-white/10">
        <ProjectIcon category={project.category} />
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
            isMobile
              ? 'border-violet-200/80 bg-violet-50/80 text-violet-700 dark:border-violet-800/30 dark:bg-violet-950/50 dark:text-violet-200'
              : 'border-emerald-200/80 bg-emerald-50/80 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-950/50 dark:text-emerald-200'
          }`}
        >
          {isMobile ? 'Mobile' : 'Web'}
        </span>
      </div>

      {/* Project scene (visual story) */}
      <div className="relative overflow-hidden border-b border-slate-200/80 p-3 sm:p-4 dark:border-white/10">
        <ProjectScene project={project} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="px-1 pt-2">
          <h3 className="font-display text-base sm:text-lg font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
            {project.title}
          </h3>
        </div>

        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.short}
        </p>

        {/* Tech tags */}
        {project.tech?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-200/80 bg-slate-50/80 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Stats strip */}
        {project.yearBuilt != null && (
          <div className="mt-auto border-t border-slate-200/70 px-1 py-2 dark:border-white/10">
            <ProjectStats project={project} />
          </div>
        )}

        {/* Actions */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 px-1 pt-3 dark:border-white/10">
          <a
            href={project.code}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-offset-4 dark:bg-white/10 dark:hover:bg-emerald-500"
          >
            <Icon name="github" className="h-3.5 w-3.5" />
            View code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-white/10 dark:text-slate-300 dark:hover:text-emerald-300"
            >
              Live demo
              <Icon name="external-link" className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/** Projects: filterable card grid with icons, stats and bullet points. */
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
    <section id="projects" className="relative overflow-hidden py-20 md:py-28">
      {/* Background ornament */}
      {/* Background ornament */}
      {/* Background ornament */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-80 max-w-5xl rounded-full bg-emerald-400/5 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects I've brought to life"
          subtitle="A selection of web and mobile experiences built to solve real problems and make everyday tasks easier."
          titleClassName="text-3xl md:text-4xl lg:text-5xl"
          className="mb-10"
        />

        {/* Filter bar */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {visibleProjects.length}
            </span>{' '}
            {visibleProjects.length === 1 ? 'project' : 'projects'}
          </p>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-slate-200/80 bg-white/70 p-1.5 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
          >
            {FILTERS.map((filterOption) => (
              <button
                key={filterOption.id}
                type="button"
                onClick={() => setFilter(filterOption.id)}
                aria-pressed={filter === filterOption.id}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  filter === filterOption.id
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-md shadow-emerald-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-emerald-300'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
