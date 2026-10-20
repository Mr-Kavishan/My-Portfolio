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

/**
 * Hero styled after the reference banner: near-black stage, green eyebrow,
 * oversized white headline and a large portrait on the right over a
 * constellation field.
 */
export default function Hero() {
  const { greeting, name, roles, tagline } = content.hero
  const typed = useTyping(roles)

  // "Kavishan Hettiarachchi" → first word on its own line, the rest beneath it
  const [first, ...rest] = name.split(' ')
  const last = rest.join(' ')

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen flex-col overflow-hidden"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-6 pt-24 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Copy */}
          <div className="lg:col-span-6">
            <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
              {greeting}
            </p>

            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.03] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
              I&apos;m {first}
              {last && (
                <>
                  <br />
                  {last}
                </>
              )}
            </h1>

            {/* Typing animation */}
            <p className="mt-5 font-display text-xl font-semibold text-emerald-600 sm:text-2xl dark:text-emerald-400">
              {typed}
              <span
                className="animate-caret ml-0.5 inline-block w-[3px] translate-y-1 bg-emerald-500 dark:bg-emerald-400"
                style={{ height: '1.1em' }}
                aria-hidden="true"
              />
              <span className="sr-only">{roles.join(', ')}</span>
            </p>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              {tagline}
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-400/40"
              >
                View Projects
                <Icon name="arrow-down" className="h-4 w-4" />
              </a>
              <a
                href={content.site.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 font-display text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-600 dark:border-white/20 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              >
                <Icon name="download" className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div className="relative flex justify-center lg:col-span-6 lg:justify-end">
            <div className="relative w-[19rem] max-w-full sm:w-[23rem] lg:w-[30rem]">
              <img
                src="/me.png"
                alt="Portrait of Kavishan Hettiarachchi"
                width={1254}
                height={1254}
                fetchPriority="high"
                decoding="async"
                className="relative aspect-square w-full select-none object-cover [-webkit-mask-image:radial-gradient(circle_at_50%_45%,#000_58%,transparent_92%)] [mask-image:radial-gradient(circle_at_50%_45%,#000_58%,transparent_92%)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tech marquee along the bottom edge */}
      <div className="relative overflow-hidden pb-8" aria-hidden="true">
        <div className="marquee">
          <div className="marquee-track">
            {[...content.skills.map((g) => g.skills.map((s) => s.name)).flat()].map((skill, i) => (
              <span
                key={`${i}-a`}
                className="flex h-9 items-center gap-2 rounded-full border border-slate-300/60 bg-white/40 px-3.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
              >
                <Icon name="code" className="h-3 w-3 text-emerald-500" />
                {skill}
              </span>
            ))}
            {[...content.skills.map((g) => g.skills.map((s) => s.name)).flat()].map((skill, i) => (
              <span
                key={`${i}-b`}
                className="flex h-9 items-center gap-2 rounded-full border border-slate-300/60 bg-white/40 px-3.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
              >
                <Icon name="code" className="h-3 w-3 text-emerald-500" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
