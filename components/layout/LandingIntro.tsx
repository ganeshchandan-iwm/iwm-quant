"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "> IWM QUANT SECURE SHELL v2026.07",
  "> authenticating visitor .......... OK",
  "> handshake with market data bus .. OK",
  "> decrypting market feed .......... OK",
  "> ACCESS GRANTED - welcome inside.",
];

// ASCII-only so the mono logo never changes width mid-scramble
const GLYPHS = "01$#%&@<>{}[]|/\\+=*-";
const LOGO = "IWM QUANT";

const SPLIT_AT = 2450; // vault doors open, logo flies to the navbar
const FLIGHT_MS = 700; // flight + door slide duration
const DONE_AT = SPLIT_AT + FLIGHT_MS + 120; // small buffer after handoff

function restoreNavLogo() {
  const navLogo = document.getElementById("nav-logo");
  if (!navLogo) return;
  navLogo.style.transition = "";
  navLogo.style.opacity = "";
}



export default function LandingIntro() {
  const [phase, setPhase] = useState<"hidden" | "boot" | "split" | "done">("hidden");
  const [lineCount, setLineCount] = useState(0);
  const [logo, setLogo] = useState(LOGO);
  const [progress, setProgress] = useState(0);
  const [anchor, setAnchor] = useState<{ top: number; left: number } | null>(null);
  const [flyTransform, setFlyTransform] = useState("");
  const [flying, setFlying] = useState(false);

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

    const navLogo = document.getElementById("nav-logo");
    if (navLogo) navLogo.style.opacity = "0";

    // pin the clone at the nav logo's true position, then push it to screen
    // centre with one transform — flying home is just "back to identity"
    const to = navLogo?.getBoundingClientRect();
    if (to) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min((vw * 0.7) / to.width, 2.4);
      const dx = vw / 2 - (to.left + to.width / 2);
      const dy = vh * 0.36 - (to.top + to.height / 2);
      setAnchor({ top: to.top, left: to.left });
      setFlyTransform(`translate(${dx}px, ${dy}px) scale(${scale})`);
    }

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

    // 3) logo scramble-resolves (spaces stay fixed so the layout is stable)
    timers.push(
      setTimeout(() => {
        let resolved = 0;
        const scramble = setInterval(() => {
          resolved += 0.5;
          setLogo(
            LOGO.split("")
              .map((ch, i) =>
                ch === " " || i < resolved
                  ? ch
                  : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              )
              .join("")
          );
          if (resolved >= LOGO.length) clearInterval(scramble);
        }, 40);
        timers.push(setTimeout(() => clearInterval(scramble), 2000));
      }, 1000)
    );

    // 4) vault doors open + the logo flies home (transform → identity)
    timers.push(
      setTimeout(() => {
        setPhase("split");
        setFlying(true);
        setFlyTransform("translate(0px, 0px) scale(1)");
      }, SPLIT_AT)
    );

    // 5) pixels now match exactly — reveal the real logo, retire the clone
    timers.push(
      setTimeout(() => {
        const navLogoEl = document.getElementById("nav-logo");
        if (navLogoEl) navLogoEl.style.opacity = "1";
      }, SPLIT_AT + FLIGHT_MS)
    );

    // 6) hand over to the page
    timers.push(
      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
        restoreNavLogo();
      }, DONE_AT)
    );

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      restoreNavLogo();
    };
  }, []);

  useEffect(() => {
    if (phase !== "boot") return;
    const skip = () => {
      setPhase("done");
      document.body.style.overflow = "";
      restoreNavLogo();
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
        restoreNavLogo();
      }}
      role="presentation"
      aria-hidden
    >
      {/* two vault halves — slide apart and dissolve into the light page */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-ink border-b border-sky/30"
        style={{
          transform: splitting ? "translateY(-100%)" : "translateY(0)",
          opacity: splitting ? 0 : 1,
          transition: `transform ${FLIGHT_MS}ms ease-in-out, opacity 520ms ease-in 180ms`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink border-t border-sky/30"
        style={{
          transform: splitting ? "translateY(100%)" : "translateY(0)",
          opacity: splitting ? 0 : 1,
          transition: `transform ${FLIGHT_MS}ms ease-in-out, opacity 520ms ease-in 180ms`,
        }}
      />

      {/* boot console */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 transition-opacity duration-300"
        style={{ opacity: splitting ? 0 : 1 }}
      >
        {/* spacer where the (fixed-position) logo visually sits */}
        <div className="h-14 md:h-20" />

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

      {/* THE logo — an exact clone of #nav-logo, one element from boot to
          navbar. Same markup and classes as the real thing, so when the
          transform reaches identity it sits pixel-for-pixel on the original. */}
      {anchor && (
        <span
          aria-hidden
          className={`pointer-events-none fixed font-mono font-bold tracking-tight whitespace-nowrap transition-colors ${
            flying ? "text-fg" : "text-sky"
          }`}
          style={{
            top: anchor.top,
            left: anchor.left,
            transform: flyTransform,
            transformOrigin: "center",
            transition: `transform ${FLIGHT_MS}ms cubic-bezier(0.65,0,0.35,1), color ${FLIGHT_MS}ms ease`,
          }}
        >
          <span className="text-3xl">{logo.slice(0, 3)}</span>
          {logo.slice(3)}
        </span>
      )}
    </div>
  );
}
