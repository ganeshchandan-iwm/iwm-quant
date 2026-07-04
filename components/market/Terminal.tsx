"use client";

import { useEffect, useRef, useState } from "react";
import { TERMINAL_LINES } from "@/lib/content";

/** Dark research-shell window that types out a status feed, then loops. */
export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLines(TERMINAL_LINES);
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      if (cancelled) return;
      const line = TERMINAL_LINES[lineIdx];
      if (charIdx <= line.length) {
        setCurrent(line.slice(0, charIdx));
        charIdx += 2;
        timer = setTimeout(type, 24);
      } else {
        setLines((prev) => [...prev, line]);
        setCurrent("");
        lineIdx++;
        charIdx = 0;
        if (lineIdx >= TERMINAL_LINES.length) {
          // hold, then restart the feed
          timer = setTimeout(() => {
            if (cancelled) return;
            setLines([]);
            lineIdx = 0;
            type();
          }, 6000);
        } else {
          timer = setTimeout(type, 260);
        }
      }
    };
    timer = setTimeout(type, 600);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, current]);

  return (
    <div className="corner-frame rounded-lg border border-ink-2 bg-ink shadow-2xl shadow-primary/15 overflow-hidden relative">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-ink-2 bg-ink-2/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-down/70" />
          <span className="w-3 h-3 rounded-full bg-amber/70" />
          <span className="w-3 h-3 rounded-full bg-primary/70" />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-sky/70 uppercase">
          iwm://research-shell — live
        </span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-sky opacity-60 [animation:ping-dot_1.6s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
        </span>
      </div>
      {/* body */}
      <div
        ref={bodyRef}
        className="h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-sky"
      >
        {lines.map((l, i) => (
          <p key={i} className="whitespace-pre-wrap">
            {l}
          </p>
        ))}
        <p className="whitespace-pre-wrap">
          {current}
          <span className="animate-blink text-sky">▌</span>
        </p>
      </div>
    </div>
  );
}
