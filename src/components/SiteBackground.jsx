import Constellation from './Constellation.jsx'

/**
 * The page-wide stage: the same near-black surface + constellation field used
 * by the hero, rendered once behind every section so the whole site shares
 * one background theme. Fixed, so the dots stay put while content scrolls.
 */
export default function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-white dark:bg-ink-950"
    >
      <Constellation />

      {/* Soft emerald auras top and bottom of the stage */}
      <div className="absolute -top-48 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/10" />
      <div className="absolute -bottom-56 -right-24 h-[28rem] w-[40rem] rounded-full bg-sky-500/5 blur-3xl dark:bg-emerald-500/5" />
    </div>
  )
}
