"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Anomaly spotter — a price series streams calmly until, at a random
 * moment, the regime breaks (volatility jumps, drift flips). Click the
 * chart the instant you think it happened; your reaction is scored
 * against the model's detection time. Click too early and it's a
 * false alarm.
 */

const H = 250;
const N = 240; // points kept in the window
const STEP_MS = 33;
const MODEL_LAG_STEPS = 12; // ~0.4s

type Result =
  | { kind: "false-alarm" }
  | { kind: "timed"; yourLagS: number; modelLagS: number }
  | { kind: "missed" };

export default function AnomalySpotter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [score, setScore] = useState({ wins: 0, played: 0 });
  const [roundId, setRoundId] = useState(0);
  const [started, setStarted] = useState(false);

  const nextRound = useCallback(() => {
    setResult(null);
    setRoundId((r) => r + 1);
  }, []);

  useEffect(() => {
    // idle until the visitor explicitly starts a round
    if (!started) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2;

    let w = 0;
    let raf = 0;
    let lastStep = 0;
    let stepCount = 0;
    let prices: number[] = [];
    let over = false;

    const breakAt = 160 + Math.floor(Math.random() * 220); // steps until the regime breaks
    const drift = (Math.random() > 0.5 ? 1 : -1) * 0.55;
    let clickedAt = -1;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prices.length === 0) prices = Array.from({ length: N }, () => H / 2);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const step = () => {
      stepCount++;
      const broken = stepCount >= breakAt;
      const sigma = broken ? 3.1 : 1.0;
      const mu = broken ? drift : 0;
      let next = prices[prices.length - 1] + gauss() * sigma + mu;
      next = Math.max(H * 0.06, Math.min(H * 0.94, next));
      prices.push(next);
      if (prices.length > N) prices.shift();
    };

    const finish = (r: Result) => {
      if (over) return;
      over = true;
      setResult(r);
      setScore((s) => ({
        wins: s.wins + (r.kind === "timed" && r.yourLagS <= 2.5 ? 1 : 0),
        played: s.played + 1,
      }));
    };

    const draw = () => {
      const dark = document.documentElement.classList.contains("dark");
      const BLUE = dark ? "109,158,255" : "31,94,234";
      const AMBER = "217,119,6";
      const CYAN = "14,155,192";

      ctx.clearRect(0, 0, w, H);
      const stepX = w / (N - 1);

      // marker lines once the round is decided (positions within the window)
      const markAt = (stepsAgo: number, rgb: string, label: string) => {
        const idx = N - 1 - (stepCount - stepsAgo);
        if (idx < 0 || stepsAgo > stepCount) return;
        const x = idx * stepX;
        ctx.strokeStyle = `rgba(${rgb},0.8)`;
        ctx.setLineDash([4, 5]);
        ctx.beginPath();
        ctx.moveTo(x, 8);
        ctx.lineTo(x, H - 8);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = "10px monospace";
        ctx.fillStyle = `rgba(${rgb},0.95)`;
        ctx.fillText(label, Math.min(x + 4, w - 52), 16);
      };

      // price path
      ctx.beginPath();
      prices.forEach((p, i) => (i === 0 ? ctx.moveTo(0, p) : ctx.lineTo(i * stepX, p)));
      ctx.strokeStyle = `rgba(${BLUE},0.9)`;
      ctx.lineWidth = 1.8;
      ctx.lineJoin = "round";
      ctx.stroke();

      if (over) {
        markAt(breakAt, AMBER, "break");
        markAt(breakAt + MODEL_LAG_STEPS, CYAN, "model");
        if (clickedAt > 0) markAt(clickedAt, BLUE, "you");
      }
    };

    const onDown = () => {
      if (over) return;
      clickedAt = stepCount;
      if (stepCount < breakAt) {
        finish({ kind: "false-alarm" });
      } else {
        finish({
          kind: "timed",
          yourLagS: ((stepCount - breakAt) * STEP_MS) / 1000,
          modelLagS: (MODEL_LAG_STEPS * STEP_MS) / 1000,
        });
      }
    };
    canvas.addEventListener("pointerdown", onDown);

    if (reduced) {
      for (let i = 0; i < N; i++) step();
      draw();
      return () => {
        ro.disconnect();
        canvas.removeEventListener("pointerdown", onDown);
      };
    }

    const loop = (now: number) => {
      if (!over && now - lastStep >= STEP_MS) {
        lastStep = now;
        step();
        // ran 10s past the break without a click → missed
        if (stepCount > breakAt + 300) finish({ kind: "missed" });
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
    };
    // roundId in deps restarts the simulation for each round
  }, [roundId, started]);

  return (
    <div className="corner-frame rounded-lg border border-edge bg-panel overflow-hidden select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge-soft bg-panel-2/70 px-4 py-2.5 font-mono text-[11px]">
        <span className="tracking-widest text-mut uppercase">iwm://anomaly-spotter</span>
        <span className="text-mut/80">
          score {score.wins}/{score.played}
        </span>
      </div>

      <div ref={wrapRef} className="relative">
        <canvas
          ref={canvasRef}
          className={`block w-full ${result || !started ? "cursor-default" : "cursor-crosshair"}`}
          style={{ height: H }}
        />
        {started && !result && (
          <p className="pointer-events-none absolute left-4 top-3 font-mono text-[11px] text-mut/80">
            watching a calm market… click the instant the regime breaks
          </p>
        )}
        {/* idle: armed only when the visitor asks for it */}
        {!started && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-panel/60 backdrop-blur-[2px]">
            <p className="max-w-sm px-6 text-center font-mono text-xs leading-relaxed text-mut">
              A price feed will stream calmly — until, at a random moment, the regime
              breaks. Click the chart the instant you spot it. Too early counts as a
              false alarm.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="rounded border border-primary/60 bg-primary/10 px-6 py-2.5 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20"
            >
              ▶ start the feed
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-edge-soft bg-panel-2/70 px-4 py-3 font-mono text-xs space-y-2">
        {!started && <p className="text-mut/90">the monitor is idle — start the feed when you&apos;re ready.</p>}
        {started && !result && <p className="text-mut/90">the break is coming. patience — false alarms count against you.</p>}
        {result?.kind === "false-alarm" && (
          <p className="text-amber">
            {"> false alarm — nothing had changed yet. noise fooled you (it fools everyone)."}
          </p>
        )}
        {result?.kind === "timed" && (
          <p className={result.yourLagS <= 2.5 ? "text-primary" : "text-amber"}>
            {`> you: +${result.yourLagS.toFixed(1)}s after the break · model: +${result.modelLagS.toFixed(1)}s. `}
            {result.yourLagS <= 2.5
              ? "sharp — but the model never blinks."
              : "the model was already repositioned before you were sure."}
          </p>
        )}
        {result?.kind === "missed" && (
          <p className="text-down">{"> missed — the regime broke 10 seconds ago. drawdowns compound while we deliberate."}</p>
        )}
        {result && (
          <button
            onClick={nextRound}
            className="rounded border border-primary/50 bg-primary/5 px-4 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-white"
          >
            next round →
          </button>
        )}
      </div>
    </div>
  );
}
