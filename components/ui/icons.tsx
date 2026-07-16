/**
 * Inline line-icons used in place of the old →/←/↺ text glyphs.
 * Each renders at 1em and inherits the surrounding text colour (currentColor),
 * so they drop into buttons and links exactly where a glyph used to sit.
 */
type IconProps = { className?: string };

const base = "inline-block h-[1em] w-[1em] align-[-0.125em]";

function Svg({ className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={`${base} ${className}`}
    >
      {children}
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </Svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M19 12H5" />
      <path d="m11 5-7 7 7 7" />
    </Svg>
  );
}

/** Repeat / play-again — replaces the ↺ glyph. */
export function Refresh({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </Svg>
  );
}

/** "Life at IWM Quant" perk icons — plain line icons, no emoji. */

export function Dice({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8" cy="16" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function BookOpen({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 6.5c-1.5-1-4-1.5-6-1.5v13c2 0 4.5.5 6 1.5 1.5-1 4-1.5 6-1.5V5c-2 0-4.5.5-6 1.5Z" />
      <path d="M12 6.5v12" />
    </Svg>
  );
}

export function Globe({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9Z" />
    </Svg>
  );
}

/** Balance / scales — "flat by design", the best argument wins. */
export function Scale({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M5 7 2 13a3 3 0 0 0 6 0L5 7Z" />
      <path d="M19 7l-3 6a3 3 0 0 0 6 0l-3-6Z" />
    </Svg>
  );
}

export function Zap({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </Svg>
  );
}

export function HeartPulse({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M20 8.5c0-2.5-2-4.5-4.5-4.5-1.5 0-2.8.7-3.5 1.8-.7-1.1-2-1.8-3.5-1.8C6 4 4 6 4 8.5c0 4 5 7.5 8 10.5 3-3 8-6.5 8-10.5Z" />
      <path d="M5 12h3l1.5-3 2 5 1.5-3H19" />
    </Svg>
  );
}
