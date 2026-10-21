import { useReveal } from '../hooks/useReveal.js'

/**
 * Shared section heading: small emerald eyebrow + display-font title.
 * `align="left"` is used by sections that sit beside other content.
 * `spacing` overrides the default bottom margin (pass a single `mb-*` utility).
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  titleClassName = 'text-3xl md:text-4xl',
  className = '',
  spacing = '',
}) {
  const ref = useReveal()
  const isLeft = align === 'left'

  return (
    <header
      ref={ref}
      data-reveal
      className={`${isLeft ? 'max-w-2xl' : 'text-center'} ${
        spacing || (isLeft ? 'mb-10' : 'mb-12 md:mb-16')
      } ${className}`}
    >
      {eyebrow && (
        <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display font-bold tracking-tight text-slate-900 dark:text-white ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base text-slate-600 dark:text-slate-400 ${
            isLeft ? '' : 'mx-auto max-w-2xl'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
    </header>
  )
}
