import { content } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'

/** One quick-stat card (bento tile). */
function StatCard({ stat, delay }) {
  const ref = useReveal(delay)

  return (
    <div
      ref={ref}
      data-reveal
      className="glass flex items-center gap-4 rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-1"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
        <Icon name={stat.icon} />
      </span>
      <div>
        <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
      </div>
    </div>
  )
}

/**
 * Big abstract avatar: a CSS/SVG gradient composition to replace a stock photo.
 * Swap it for a real portrait later by pointing content.about.photo at a file in public/.
 */
function Avatar() {
  const size = 420
  return (
    <div
      className="relative mx-auto w-full max-w-sm select-none"
      role="img"
      aria-label="Abstract portrait placeholder for Kavishan Hettiarachchi"
    >
      {/* Base gradient silhouette-ish shape */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/40 via-sky-400/30 to-violet-400/30 dark:from-emerald-400/20 dark:via-sky-400/15 dark:to-violet-400/20 shadow-2xl shadow-emerald-500/10" />
      {/* Brighter accent circles */}
      <div className="absolute -bottom-8 left-8 right-8 flex justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
          <span className="font-display text-5xl font-bold text-white">KH</span>
        </div>
      </div>
      {/* Scattered accent orbs */}
      <div className="absolute -left-8 top-8 h-20 w-20 rounded-full bg-emerald-400/30 blur-2xl" />
      <div className="absolute -bottom-6 right-6 h-24 w-24 rounded-full bg-sky-400/30 blur-2xl" />
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-violet-400/20 blur-xl" />
      {/* Subtle inner ring */}
      <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20" />
    </div>
  )
}

/**
 * Right-side portrait placeholder on the About section.
 * Abstract gradient composition used for the 'me.png' on the right side.
 */
export function RightSidePortrait() {
  return (
    <div className="mx-auto w-full max-w-sm select-none">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/40 via-sky-400/30 to-violet-400/30 dark:from-emerald-400/20 dark:via-sky-400/15 dark:to-violet-400/20 shadow-2xl shadow-emerald-500/10" />
        <div className="absolute -bottom-8 left-8 right-8 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <span className="font-display text-5xl font-bold text-white">KH</span>
          </div>
        </div>
        <div className="absolute -left-8 top-8 h-20 w-20 rounded-full bg-emerald-400/30 blur-2xl" />
        <div className="absolute -bottom-6 right-6 h-24 w-24 rounded-full bg-sky-400/30 blur-2xl" />
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-violet-400/20 blur-xl" />
        <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20" />
      </div>
    </div>
  )
}

/** About: bento grid of photo/monogram tile, bio tiles and stats. */
export default function About() {
  const { about } = content

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="About" title="A little about me" />

        <div className="grid items-start gap-8 md:grid-cols-12">
          {/* Left: centred abstract avatar */}
          <div className="md:col-span-4">
            <div className="glass rounded-3xl p-4">
              <Avatar />
            </div>
          </div>

          {/* Right: the requested me.png placeholder on the right side */}
          <div className="md:col-span-4">
            <div className="glass rounded-3xl p-4">
              <RightSidePortrait />
            </div>
          </div>

          {/* Right: bio + stats tiles */}
          <div className="md:col-span-8 grid gap-6 sm:grid-cols-2">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {about.bio[0]}
              </p>
            </div>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {about.bio[1]}
              </p>
            </div>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {about.bio[2]}
              </p>
            </div>
            <ul className="sm:col-span-2 grid grid-cols-3 gap-4">
              {about.stats.map((stat, i) => (
                <li key={stat.label}>
                  <StatCard stat={stat} delay={i * 100} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
