import { useEffect, useState } from 'react'
import { content } from '../data/content.js'
import { useTheme } from '../hooks/useTheme.js'
import Icon from './Icon.jsx'

const THEME_LABEL = 'Toggle colour theme'

/** Sticky glass navbar with active-link highlight, theme toggle and mobile menu. */
export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [open, setOpen] = useState(false) // mobile menu
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  /* Shadow after scrolling + track the section in view for the active link */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)

      const sections = content.nav
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean)
      const line = window.scrollY + window.innerHeight * 0.35
      let current = 'home'
      for (const section of sections) {
        if (section.offsetTop <= line) current = section.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close the mobile menu on Escape */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const linkClasses = (id) =>
    [
      'nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      active === id
        ? 'text-emerald-600 dark:text-emerald-300'
        : 'text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300',
    ].join(' ')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-lg dark:border-white/10 dark:bg-navy-950/70'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo / monogram */}
        <a
          href="#home"
          className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          aria-label={`${content.site.name} — home`}
        >
          K<span className="text-emerald-500 dark:text-emerald-300">.</span>
          <span className="sr-only">{content.site.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {content.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={linkClasses(item.id)}
                aria-current={active === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={THEME_LABEL}
            title={THEME_LABEL}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-emerald-300"
          >
            <Icon name={dark ? 'sun' : 'moon'} />
          </button>

          {/* Hamburger (small screens) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-emerald-300 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-lg transition-[max-height,opacity] duration-300 dark:border-white/10 dark:bg-navy-950/95 lg:hidden ${
          open ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-4 py-4">
          {content.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                  active === item.id
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
