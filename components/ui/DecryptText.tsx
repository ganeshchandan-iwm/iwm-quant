"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "アイウエオ01$#%&@≠∑∆πλ<>{}[]|/\\+=-";

/**
 * Renders text as scrambled cipher glyphs that resolve left-to-right
 * into the real string — the site's signature "decrypt" reveal.
 */
export default function DecryptText({
  text,
  className = "",
  delay = 0,
  speed = 28,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);
  const frame = useRef<number>(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(text);
      setStarted(true);
      return;
    }

    let raf = 0;
    let resolved = 0;
    let last = 0;

    const timer = setTimeout(() => {
      setStarted(true);
      const tick = (now: number) => {
        if (now - last >= speed) {
          last = now;
          frame.current++;
          if (frame.current % 2 === 0) resolved++;
          setDisplay(
            text
              .split("")
              .map((ch, i) => {
                if (ch === " " || ch === "\n") return ch;
                if (i < resolved) return ch;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              })
              .join("")
          );
        }
        if (resolved <= text.length) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, speed]);

  return (
    <span className={className} style={{ opacity: started ? 1 : 0 }} aria-label={text}>
      {display}
    </span>
  );
}
