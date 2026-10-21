import { useEffect, useState } from 'react'
import { content } from '../data/content.js'
import Icon from './Icon.jsx'

/** Footer: contact prompt, social icons, copyright and back-to-top button. */
export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-slate-200/70 bg-white/50 pb-8 dark:border-white/10 dark:bg-ink-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + contact prompt */}
          <div>
            <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {content.site.initials}
              <span className="text-emerald-600 dark:text-emerald-300">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {content.contact.blurb}
            </p>
           
          </div>

          {/* Socials */}
          <div className="grid grid-cols-4 gap-4 text-center">
            {content.contact.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${social.name} profile (opens in a new tab)`}
                className="flex items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
              >
                <Icon name={social.icon} className="h-4 w-4" />
                {social.name}
              </a>
            ))}
          </div>

          {/* Copyright + back to top */}
          <div className="flex justify-center md:justify-end">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {content.footer.year} {content.site.name}. {content.footer.text}
            </p>
            <a
              href="#home"
              onClick={toTop}
              aria-label="Back to top"
              className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-all duration-300 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-300 ${
                showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
              }`}
            >
              <Icon name="arrow-up" className="h-4 w-4" />
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
