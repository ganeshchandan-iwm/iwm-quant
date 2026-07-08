"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/lib/content";

/**
 * The pipeline, in one piece - dots (hypotheses) flow left to right
 * through the four stages; most visibly die at the Signal gate, and the
 * trickle that survives becomes "live strategies". The stage panels below
 * the canvas carry the full description of each stage plus what kills
 * ideas there, and highlight their zone on hover. The counters are the
 * animation's own honest tally.
 */

const H = 220;
const GATES = [0.24, 0.5, 0.74, 0.94]; // x-fractions of the four gates
const SURVIVAL = [0.7, 0.3, 0.65, 0.9]; // pass probability at each gate

const KILLED_BY = [
  "look-ahead bias, survivorship, vendor errors",
  "fails out-of-sample - most ideas were noise",
  "too correlated, too crowded, tail too fat",
  "costs eat the edge at realistic size",
];

// one source of truth: the four pipeline stages + what kills ideas there
const STAGES = PROCESS_STEPS.map((s, i) => ({ ...s, why: KILLED_BY[i] }));

type P = {
  x: number;
  y: number;
  vy: number;
  gate: number; // next gate index to face
  dead: boolean;
  alpha: number;
};

export default function IdeaFunnel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ tested: 0, live: 0 });
  const hoverRef = useRef(-1);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let parts: P[] = [];
    let raf = 0;
    let lastSpawn = 0;
    let tested = 0;
    let live = 0;
    let lastStats = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const draw = (now: number) => {
      const dark = document.documentElement.classList.contains("dark");
      const BLUE = dark ? "109,158,255" : "31,94,234";
      const DOWN = dark ? "242,106,118" : "220,38,38";
      const EDGE = dark ? "rgba(34,55,86,0.9)" : "rgba(212,224,239,0.9)";

      ctx.clearRect(0, 0, w, H);

      // hovered zone tint
      if (hoverRef.current >= 0) {
        const g = hoverRef.current;
        const x0 = g === 0 ? 0 : GATES[g - 1] * w;
        const x1 = GATES[g] * w;
        ctx.fillStyle = `rgba(${BLUE},0.06)`;
        ctx.fillRect(x0, 0, x1 - x0, H);
      }

      // gates
      for (const g of GATES) {
        ctx.strokeStyle = EDGE;
        ctx.setLineDash([5, 7]);
        ctx.beginPath();
        ctx.moveTo(g * w, 12);
        ctx.lineTo(g * w, H - 12);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // particles
      for (const p of parts) {
        const rgb = p.dead ? DOWN : BLUE;
        const glow = !p.dead && p.gate >= GATES.length;
        ctx.fillStyle = `rgba(${rgb},${p.alpha.toFixed(3)})`;
        if (glow) {
          ctx.shadowColor = `rgba(${BLUE},0.9)`;
          ctx.shadowBlur = 8;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow ? 3.4 : 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // publish counters at ~4Hz to avoid re-render storms
      if (now - lastStats > 250) {
        lastStats = now;
        setStats({ tested, live });
      }
    };

    const step = (now: number) => {
      if (now - lastSpawn > 130 && parts.length < 90) {
        lastSpawn = now;
        tested++;
        parts.push({
          x: -4,
          y: H * 0.25 + Math.random() * H * 0.5,
          vy: 0,
          gate: 0,
          dead: false,
          alpha: 0.85,
        });
      }

      for (const p of parts) {
        if (p.dead) {
          p.vy += 0.12;
          p.y += p.vy;
          p.alpha -= 0.02;
          continue;
        }
        p.x += 1.35;
        p.y += Math.sin(p.x / 26 + p.gate) * 0.35;
        if (p.gate < GATES.length && p.x >= GATES[p.gate] * w) {
          if (Math.random() > SURVIVAL[p.gate]) {
            p.dead = true;
            p.vy = 0.4;
          } else {
            p.gate++;
            if (p.gate === GATES.length) live++;
          }
        }
      }
      parts = parts.filter((p) => p.alpha > 0 && p.x < w + 8 && p.y < H + 8);
    };

    if (reduced) {
      // a representative static frame
      for (let i = 0; i < 260; i++) step(i * 140);
      draw(performance.now());
      return () => ro.disconnect();
    }

    const loop = (now: number) => {
      step(now);
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="corner-frame rounded-lg border border-edge bg-panel overflow-hidden select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge-soft bg-panel-2/70 px-4 py-2.5 font-mono text-[11px]">
        <span className="tracking-widest text-mut uppercase">iwm://idea-funnel</span>
        <span className="text-mut/80">
          ideas tested <span className="text-fg">{stats.tested}</span> · reached production{" "}
          <span className="text-primary">{stats.live}</span>
        </span>
      </div>

      <div ref={wrapRef}>
        <canvas ref={canvasRef} className="block w-full" style={{ height: H }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-edge-soft bg-panel-2/70">
        {STAGES.map((s, i) => (
          <div
            key={s.title}
            onPointerEnter={() => {
              hoverRef.current = i;
              setHover(i);
            }}
            onPointerLeave={() => {
              hoverRef.current = -1;
              setHover(-1);
            }}
            className={`flex flex-col gap-2 border-edge-soft p-5 transition-colors duration-200 max-lg:border-b lg:border-r lg:last:border-r-0 ${
              hover === i ? "bg-primary/5" : ""
            }`}
          >
            <div className="flex items-baseline gap-2 font-mono">
              <span
                className={`text-2xl font-bold transition-colors ${
                  hover === i ? "text-primary/70" : "text-primary/25"
                }`}
              >
                {s.n}
              </span>
              <span className={`text-sm font-semibold ${hover === i ? "text-primary" : "text-fg"}`}>
                {s.title}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-mut flex-1">{s.body}</p>
            <p className="font-mono text-[10px] leading-relaxed text-amber/90">
              ✝ dies here: {s.why}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
