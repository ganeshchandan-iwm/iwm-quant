"use client";

import { useEffect, useRef, useState } from "react";

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

const SPLIT_AT = 2450; // vault doors start opening, logo takes flight
const FLIGHT_MS = 700; // matches the vault doors' slide duration
const CROSSFADE_MS = 200; // flying logo melts into the real nav logo
const DONE_AT = SPLIT_AT + FLIGHT_MS + CROSSFADE_MS + 50;

type Box = { top: number; left: number; width: number; height: number };

function restoreNavLogo() {
  const navLogo = document.getElementById("nav-logo");
  if (!navLogo) return;
  navLogo.style.transition = "";
  navLogo.style.opacity = "";
}

/**
 * Unique landing animation: a full-screen terminal boot sequence that types
 * authentication lines, scramble-resolves the logo, then splits open like a
 * vault door. As the doors open, the logo detaches from the console and
 * flies - in real measured screen coordinates - into the navbar, landing
 * exactly on top of the real nav logo and crossfading into it. Plays once
 * per session; click/Esc skips it.
 */
export default function LandingIntro() {
  const [phase, setPhase] = useState<"hidden" | "boot" | "split" | "done">("hidden");
  const [lineCount, setLineCount] = useState(0);
  const [logo, setLogo] = useState("");
  const [progress, setProgress] = useState(0);
  const [flightBox, setFlightBox] = useState<Box | null>(null);
  const [flyTransform, setFlyTransform] = useState("translate(0, 0) scale(1)");
  const [landed, setLanded] = useState(false);
  const [handoff, setHandoff] = useState(false);

  const logoRef = useRef<HTMLParagraphElement>(null);

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

    // 4) vault doors open + logo takes flight toward the navbar
    timers.push(
      setTimeout(() => {
        const from = logoRef.current?.getBoundingClientRect();
        const to = document.getElementById("nav-logo")?.getBoundingClientRect();

        if (from && to) {
          const scale = to.height / from.height;
          const dx = to.left + to.width / 2 - (from.left + from.width / 2);
          const dy = to.top + to.height / 2 - (from.top + from.height / 2);

          setFlightBox({ top: from.top, left: from.left, width: from.width, height: from.height });
          setFlyTransform("translate(0, 0) scale(1)");

          // two rAFs: let the browser paint the "from" state once before
          // animating to the target, otherwise React may batch both and
          // the transition never runs
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setFlyTransform(`translate(${dx}px, ${dy}px) scale(${scale})`);
              setLanded(true);
            });
          });
        } else if (navLogo) {
          navLogo.style.opacity = "1";
        }

        setPhase("split");
      }, SPLIT_AT)
    );

    // 5) crossfade: the flying logo melts into the real nav logo
    timers.push(
      setTimeout(() => {
        const navLogoEl = document.getElementById("nav-logo");
        if (navLogoEl) {
          navLogoEl.style.transition = `opacity ${CROSSFADE_MS}ms ease-out`;
          navLogoEl.style.opacity = "1";
        }
        setHandoff(true);
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
      {/* two vault halves. They slide apart AND dissolve: the opacity fade is
          delayed so the dark panels stay solid as they start moving (the vault
          feel), then melt to transparent as they clear - turning the hard
          dark→light edge into a soft cross-dissolve into the (light) page. */}
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
        <p
          ref={logoRef}
          className="font-mono text-3xl md:text-5xl font-bold tracking-[0.2em] text-sky min-h-[1.2em]"
          style={{ visibility: flightBox ? "hidden" : "visible" }}
        >
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

      {/* the flying logo: a measured clone that lands exactly on the real nav
          logo. "QUANT" starts at the terminal's uniform size and shrinks to the
          navbar's proportion (0.53x of "IWM") over the flight, so the handoff
          into the smaller nav "QUANT" is seamless rather than a size snap. */}
      {flightBox && (
        <p
          aria-hidden
          className={`pointer-events-none fixed font-mono font-bold text-3xl md:text-5xl whitespace-nowrap ${
            landed ? "text-fg tracking-tight" : "text-sky tracking-[0.2em]"
          }`}
          style={{
            top: flightBox.top,
            left: flightBox.left,
            width: flightBox.width,
            height: flightBox.height,
            margin: 0,
            textAlign: "center",
            transform: flyTransform,
            opacity: handoff ? 0 : 1,
            transition: `transform ${FLIGHT_MS}ms cubic-bezier(0.65,0,0.35,1), color ${FLIGHT_MS}ms ease, letter-spacing ${FLIGHT_MS}ms ease, opacity ${CROSSFADE_MS}ms ease`,
          }}
        >
          IWM{" "}
          <span
            style={{
              display: "inline-block",
              fontSize: landed ? "0.53em" : "1em",
              transition: `font-size ${FLIGHT_MS}ms cubic-bezier(0.65,0,0.35,1)`,
            }}
          >
            QUANT
          </span>
        </p>
      )}
    </div>
  );
}
