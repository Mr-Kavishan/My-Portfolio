import { useEffect, useState } from 'react'
import { content } from '../data/content.js'
import Icon from './Icon.jsx'

/** Types, pauses, deletes and re-types the roles from content.hero.roles. */
function useTyping(roles) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0) // which role
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = roles[index % roles.length]
    let delay = deleting ? 45 : 90 // ms per character

    if (!deleting && text === word) {
      delay = 1800 // pause on the full word
    } else if (deleting && text === '') {
      delay = 400 // pause before typing the next word
    }

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % roles.length)
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, roles])

  return text
}

/** Floating gradient blobs: the hero's animated backdrop. */
function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Faint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(15_23_42/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(15_23_42/0.06)_1px,transparent_1px)] bg-[size:56px_56px] dark:bg-[linear-gradient(to_right,rgb(16_24_40/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(16_24_40/0.05)_1px,transparent_1px)]" />
      {/* Blobs */}
      <div className="animate-blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-400/30 blur-3xl dark:bg-emerald-400/20" />
      <div
        className="animate-blob absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-400/15"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-blob absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl dark:bg-emerald-600/10"
        style={{ animationDelay: '-12s' }}
      />
    </div>
  )
}

/** Keycap: the big availability chip in the hero side panel. */
function Keycap({ label, value }) {
  return (
    <div className="relative flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-emerald-500/20 px-4 py-3 backdrop-blur-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
        <Icon name="check" className="h-5 w-5" />
      </span>
      <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600/70 dark:text-emerald-300/70">
        Status
      </span>
      <span className="text-sm font-bold text-slate-800 dark:text-white">{value}</span>
    </div>
  )
}

/** Hero: oversized diagonal type, tagline, CTAs and a scrolling tech marquee. */
export default function Hero() {
  const { greeting, name, roles, tagline } = content.hero
  const typed = useTyping(roles)

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-20"
    >
      <HeroBackdrop />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="mb-4 font-display text-lg font-medium text-emerald-600 dark:text-emerald-300">
              {greeting}
            </p>

            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
              <span className="gradient-text">{name}</span>
            </h1>

            {/* Typing animation */}
            <p className="mt-5 font-display text-2xl font-semibold text-slate-800 sm:text-3xl lg:text-4xl dark:text-slate-100">
              I'm a{' '}
              <span className="text-emerald-600 dark:text-emerald-300">{typed}</span>
              <span
                className="animate-caret ml-0.5 inline-block w-[3px] translate-y-1 bg-emerald-500 dark:bg-emerald-300"
                style={{ height: '1.1em' }}
                aria-hidden="true"
              />
              <span className="sr-only">{roles.join(', ')}</span>
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {tagline}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-7 py-3.5 font-display font-semibold text-white shadow-lg shadow-emerald-500/25 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-emerald-500/40"
              >
                View Projects
                <Icon name="arrow-down" className="h-4 w-4" />
              </a>
              <a
                href={content.site.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-7 py-3.5 font-display font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-600 dark:border-white/15 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              >
                <Icon name="download" className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* Side panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <Keycap label="Status" value="Open to work" />
              <div className="flex gap-3">
                <div className="flex-1 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-navy-900 to-sky-500/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Currently studying
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-slate-800 dark:text-white">
                    BSc (Hons) Software Engineering
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">NSBM Green University · 2022–2026</p>
                </div>
                <div className="flex-1 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-navy-900 to-sky-500/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    CGPA
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-slate-800 dark:text-white">
                    3.48 / 4.00
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Final year · 2026</p>
                </div>
              </div>
              <Keycap label="Experience" value="6 mo + leading roles" />
            </div>
          </div>
        </div>

        {/* Tech marquee */}
        <div className="mt-14 overflow-hidden" aria-hidden="true">
          <div className="marquee">
            <div className="marquee-track">
              {[...content.skills.map((g) => g.skills.map((s) => s.name)).flat()].map((name, i) => (
                <span
                  key={`${i}-a`}
                  className="flex h-10 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 text-sm font-medium text-slate-600 dark:border-emerald-500/10 dark:bg-emerald-500/8 dark:text-slate-300"
                >
                  <Icon name="code" className="h-3.5 w-3.5 text-emerald-500" />
                  {name}
                </span>
              ))}
              {[...content.skills.map((g) => g.skills.map((s) => s.name)).flat()].map((name, i) => (
                <span
                  key={`${i}-b`}
                  className="flex h-10 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 text-sm font-medium text-slate-600 dark:border-emerald-500/10 dark:bg-emerald-500/8 dark:text-slate-300"
                >
                  <Icon name="code" className="h-3.5 w-3.5 text-emerald-500" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to the About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 transition-colors hover:text-emerald-500 dark:text-slate-500"
      >
        <Icon name="arrow-down" className="animate-scroll-hint h-6 w-6" />
      </a>
    </section>
  )
}
