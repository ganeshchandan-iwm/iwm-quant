/**
 * IWM bar-mark. Built to the construction spec:
 *   heights h(I):h(W):h(M) = 9:15:11.5   (units below use those values)
 *   bar width = 2u · gap = 3u
 *   cap tick = 3.5×2.5u, centred over the W, floating 1u above it
 *   baseline rule = 0.8u thick, 1u below the bars, overhanging 1u each side
 *
 * Monochrome by design — fills with currentColor so it inherits the
 * surrounding text colour (and therefore the theme). Decorative: it is always
 * paired with the "IWM QUANT" wordmark, so it is hidden from assistive tech.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-1 0 14 20.3"
      fill="currentColor"
      className={className}
      aria-hidden
      focusable="false"
    >
      {/* cap tick, centred over the W */}
      <rect x="4.25" y="0" width="3.5" height="2.5" />
      {/* I */}
      <rect x="0" y="9.5" width="2" height="9" />
      {/* W (tallest) */}
      <rect x="5" y="3.5" width="2" height="15" />
      {/* M */}
      <rect x="10" y="7" width="2" height="11.5" />
      {/* baseline rule */}
      <rect x="-1" y="19.5" width="14" height="0.8" />
    </svg>
  );
}
