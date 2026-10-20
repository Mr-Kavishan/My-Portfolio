import { useMemo } from 'react'
import { content } from '../data/content.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'

/**
 * Skills: a two-row, auto-scrolling marquee strip (one direction per row).
 * The duplicate row makes the loop seamless — steal anywhere and remove.
 */
function SkillStrip({ skills, className }) {
  const strip = useMemo(() => {
    const rows = skills
      .map((group) => group.skills.map((s) => s.name))
      .flat()
      .filter(Boolean)
    return [...rows, ...rows]
  }, [skills])

  return (
    <div
      className={`${
        className ?? 'flex justify-center'
      } overflow-hidden py-6`}
      aria-label="Skills covered"
    >
      <div className="marquee flex w-max items-center gap-3">
        {strip.map((name, i) => (
          <span
            key={`${i}-a`}
            className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-slate-600 dark:border-emerald-500/10 dark:bg-emerald-500/8 dark:text-slate-300"
          >
            <Icon name="code" className="h-3.5 w-3.5 text-emerald-500" />
            {name}
          </span>
        ))}
        {strip.map((name, i) => (
          <span
            key={`${i}-b`}
            className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-slate-600 dark:border-emerald-500/10 dark:bg-emerald-500/8 dark:text-slate-300"
          >
            <Icon name="code" className="h-3.5 w-3.5 text-emerald-500" />
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Skills: infinite marquee of skill chips (no grouped card grid). */
export default function Skills() {
  const chips = useMemo(
    () =>
      content.skills
        .map((group) => group.skills.map((s) => s.name))
        .flat(),
    [],
  )

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="What I can build with"
          subtitle="Languages, frameworks and tools I use to take ideas from sketch to shipping."
        />

        <SkillStrip skills={content.skills} />
      </div>
    </section>
  )
}
