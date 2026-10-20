import { useReveal } from '../hooks/useReveal.js'

/**
 * Small wrapper that applies the scroll-reveal behaviour to its children.
 * Keeps card components free of hook boilerplate.
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useReveal(delay)

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  )
}
