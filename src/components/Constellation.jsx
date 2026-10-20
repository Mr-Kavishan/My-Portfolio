import { useMemo } from 'react'

/**
 * Deterministic constellation field: nodes joined by thin lines, like the
 * connected-dots background in the reference design.
 * Deterministic (seeded) so the layout doesn't jump between renders.
 */
export default function Constellation({ className = '' }) {
  const { nodes, links } = useMemo(() => {
    let seed = 42
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }

    const points = Array.from({ length: 46 }, (_, i) => ({
      id: i,
      x: 20 + rand() * 760,
      y: 15 + rand() * 570,
      r: rand() > 0.86 ? 2.4 : rand() > 0.5 ? 1.5 : 1,
      accent: rand() > 0.78,
    }))

    // Join each node to its two closest neighbours
    const links = []
    points.forEach((a) => {
      const nearest = points
        .filter((b) => b.id !== a.id)
        .map((b) => ({ b, d: Math.hypot(a.x - b.x, a.y - b.y) }))
        .sort((m, n) => m.d - n.d)
        .slice(0, 2)
      nearest.forEach(({ b }) => {
        const key = [a.id, b.id].sort((x, y) => x - y).join('-')
        if (!links.some((l) => l.key === key)) links.push({ key, a, b })
      })
    })

    return { nodes: points, links }
  }, [])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Very faint emerald wash — kept subtle so it doesn't lighten the portrait */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_20%,rgb(16_185_129/0.04),transparent_70%)]" />

      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-slate-400/70 dark:text-white/25"
      >
        {/* Connections */}
        <g stroke="currentColor" strokeWidth="0.7" opacity="0.55">
          {links.map(({ key, a, b }) => (
            <line key={key} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
          ))}
        </g>

        {/* Nodes */}
        <g fill="currentColor">
          {nodes.map((n) => (
            <circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={n.r}
              className={n.accent ? 'text-emerald-500 dark:text-emerald-400' : undefined}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
