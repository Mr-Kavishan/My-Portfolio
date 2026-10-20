import { useState } from 'react'
import { content } from '../data/content.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

/** Small labelled card header used by the bento tiles. */
function CardHeader({ icon, label, title }) {
  return (
    <header className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600/80 dark:text-emerald-300/70">
          {label}
        </p>
        {title && (
          <h3 className="mt-1 font-display text-lg font-bold leading-snug text-slate-900 dark:text-white">
            {title}
          </h3>
        )}
      </div>
    </header>
  )
}

/** Portrait tile: photo, availability badge and a short caption. */
function PortraitCard({ photo }) {
  return (
    <div className="glass flex h-full flex-col rounded-3xl p-3">
      <div className="relative overflow-hidden rounded-2xl bg-ink-900">
        <img
          src={photo}
          alt="Portrait of Kavishan Hettiarachchi"
          width={1254}
          height={1254}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover"
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/80 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Open to work
        </span>
      </div>

      {/* Caption fills the card when the summary column is taller */}
      <div className="mt-auto px-2 pb-1 pt-4">
        <p className="font-display text-base font-bold leading-tight text-slate-900 dark:text-white">
          {content.site.name}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Software Engineering undergraduate · NSBM Green University
        </p>
      </div>
    </div>
  )
}

/** Profile summary tile: narrative + quick facts + headline stats. */
function SummaryCard({ about }) {
  return (
    <div className="glass flex h-full flex-col rounded-3xl p-6 md:p-8">
      <CardHeader icon="user" label="Profile summary" />

      <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
        {about.summary}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {about.facts.map((fact) => (
          <li
            key={fact.value}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <Icon name={fact.icon} className="h-3.5 w-3.5 text-emerald-500" />
            {fact.value}
          </li>
        ))}
      </ul>

      <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-slate-200/70 pt-5 dark:border-white/10">
        {about.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </dd>
            <p className="mt-0.5 text-[11px] leading-tight text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Academics tile: degree, university, period and CGPA progress. */
function AcademicsCard({ education }) {
  const percent = Math.round((education.cgpa / education.cgpaMax) * 100)

  return (
    <div className="glass h-full rounded-3xl p-6">
      <CardHeader icon="graduation" label="Academics" />

      <h3 className="mt-5 font-display text-lg font-bold leading-snug text-slate-900 dark:text-white">
        {education.degree}
      </h3>
      <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-300">
        {education.school}
      </p>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{education.period}</p>

      {/* CGPA progress */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between text-xs">
          <span className="font-medium text-slate-500 dark:text-slate-400">CGPA</span>
          <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
            {education.cgpa.toFixed(2)} / {education.cgpaMax.toFixed(2)}
          </span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
          role="img"
          aria-label={`CGPA ${education.cgpa} out of ${education.cgpaMax}`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {education.note}
      </p>
    </div>
  )
}

/** Experience tile: compact roles list + link to the full timeline. */
function ExperienceCard({ experience }) {
  return (
    <div className="glass flex h-full flex-col rounded-3xl p-6">
      <CardHeader icon="briefcase" label="Experience" />

      <ol className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {experience.map((item) => (
          <li key={`${item.org}-${item.role}`} className="relative flex gap-3 pl-1">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-400 ring-4 ring-emerald-500/15" />
            <div>
              <p className="text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100">
                {item.role}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.org} · {item.period}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <a
        href="#experience"
        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
      >
        See the full timeline
        <Icon name="arrow-down" className="h-4 w-4" />
      </a>
    </div>
  )
}

/** About: profile summary, academics and experience at a glance. */
export default function About() {
  const { about, education, experience } = content
  const [degree] = education

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="About"
          title="About Me"
          titleClassName="text-4xl md:text-5xl lg:text-6xl"
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Portrait */}
          <Reveal className="lg:col-span-4">
            <PortraitCard photo={about.photo} />
          </Reveal>

          {/* Profile summary */}
          <Reveal delay={80} className="lg:col-span-8">
            <SummaryCard about={about} />
          </Reveal>

          {/* Academics */}
          <Reveal delay={140} className="lg:col-span-4">
            <AcademicsCard education={degree} />
          </Reveal>

          {/* Experience */}
          <Reveal delay={200} className="lg:col-span-8">
            <ExperienceCard experience={experience} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
