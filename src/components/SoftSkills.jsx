import { useMemo } from 'react'
import { content } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'

/** One compact soft-skill badge. */
function SoftSkillBadge({ skill, index }) {
  const ref = useReveal(index * 50)

  return (
    <li
      ref={ref}
      data-reveal
      className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-500/40"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-colors group-hover:text-emerald-500 dark:text-emerald-300">
        <Icon name={skill.icon} />
      </span>
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
    </li>
  )
}

/** Soft skills: compact row of icon badges. */
export default function SoftSkills() {
  return (
    <section id="soft-skills" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Soft Skills"
          title="Beyond the code"
          subtitle="How I work with people, problems and deadlines."
        />

        <div className="flex flex-wrap justify-center gap-3">
          {content.softSkills.map((skill, i) => (
            <SoftSkillBadge key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
