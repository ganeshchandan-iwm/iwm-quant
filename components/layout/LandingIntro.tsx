"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "> IWM QUANT SECURE SHELL v2026.07",
  "> authenticating visitor .......... OK",
  "> handshake with market data bus .. OK",
  "> decrypting market feed .......... OK",
  "> ACCESS GRANTED — welcome inside.",
];

const GLYPHS = "アイウエオ01$#%&@≠∑∆πλ<>{}[]|/\\+=-";
const LOGO = "IWM·QUANT";

/**
 * Unique landing animation: a full-screen terminal boot sequence that types
 * authentication lines, scramble-resolves the logo, then splits open like a
 * vault door to reveal the site. Plays once per session; click/Esc skips it.
 */
export default function LandingIntro() {
  const [phase, setPhase] = useState<"hidden" | "boot" | "split" | "done">("hidden");
  const [lineCount, setLineCount] = useState(0);
  const [logo, setLogo] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("iwm-intro-seen");
    if (reduced || seen) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("iwm-intro-seen", "1");
    setPhase("boot");
    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;

    // 1) boot lines appear one by one
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLineCount(i + 1), 260 + i * 330));
    });

    // 2) progress bar fills
    const progStart = performance.now();
    const progTick = (now: number) => {
      const t = Math.min((now - progStart) / 1900, 1);
      setProgress(t * 100);
      if (t < 1) raf = requestAnimationFrame(progTick);
    };
    raf = requestAnimationFrame(progTick);

    // 3) logo scramble-resolves
    timers.push(
      setTimeout(() => {
        let resolved = 0;
        const scramble = setInterval(() => {
          resolved += 0.5;
          setLogo(
            LOGO.split("")
              .map((ch, i) =>
                i < resolved ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              )
              .join("")
          );
          if (resolved >= LOGO.length) clearInterval(scramble);
        }, 40);
        timers.push(setTimeout(() => clearInterval(scramble), 2000));
      }, 1000)
    );

    // 4) split open and hand over to the page
    timers.push(setTimeout(() => setPhase("split"), 2450));
    timers.push(
      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, 3250)
    );

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "boot") return;
    const skip = () => {
      setPhase("done");
      document.body.style.overflow = "";
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  if (phase === "hidden" || phase === "done") return null;

  const splitting = phase === "split";

  return (
    <div
      className="fixed inset-0 z-[100] cursor-pointer"
      onClick={() => {
        setPhase("done");
        document.body.style.overflow = "";
      }}
      role="presentation"
      aria-hidden
    >
      {/* two vault halves */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-ink border-b border-sky/40 transition-transform duration-700 ease-in-out"
        style={{ transform: splitting ? "translateY(-100%)" : "translateY(0)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink border-t border-sky/40 transition-transform duration-700 ease-in-out"
        style={{ transform: splitting ? "translateY(100%)" : "translateY(0)" }}
      />

      {/* boot console */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 transition-opacity duration-300"
        style={{ opacity: splitting ? 0 : 1 }}
      >
        <p className="font-mono text-3xl md:text-5xl font-bold tracking-[0.2em] text-sky min-h-[1.2em]">
          {logo || " "}
        </p>

        <div className="w-full max-w-md font-mono text-xs md:text-sm text-sky/80 space-y-1.5 min-h-[7.5em]">
          {BOOT_LINES.slice(0, lineCount).map((l, i) => (
            <p key={i} className={i === BOOT_LINES.length - 1 ? "text-sky font-semibold" : ""}>
              {l}
            </p>
          ))}
          <span className="animate-blink text-sky">▌</span>
        </div>

        {/* progress bar */}
        <div className="w-full max-w-md">
          <div className="h-1 w-full rounded bg-ink-2 overflow-hidden">
            <div
              className="h-full rounded bg-gradient-to-r from-primary via-sky to-cyan transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-sky/50">
            <span>decrypting…</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <p className="font-mono text-[10px] text-sky/40">click anywhere to skip</p>
      </div>
    </div>
  );
}
