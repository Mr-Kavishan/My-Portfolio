import { useEffect, useRef } from 'react'

/**
 * Adds `is-visible` to the element once it scrolls into view.
 * Usage: <div ref={revealRef} data-reveal>...</div>
 * `delay` (ms) staggers sibling elements via the --reveal-delay CSS var.
 */
export function useReveal(delay = 0) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target) // animate once
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}
