"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Correlation web — asset nodes on a ring, connected by lines whose
 * strength drifts over time (a simple one-factor model, so equities
 * cluster and gold/USDINR sit negative). Hover a node to isolate its
 * links; click anywhere to fire a stress event and watch correlations
 * spike toward one — the moment diversification vanishes.
 */

const ASSETS = ["NIFTY", "BANKS", "IT", "PHARMA", "GOLD", "USDINR", "CRUDE", "CRYPTO"];
// factor loadings: corr(i,j) ≈ B[i]*B[j] + slow drift
const B = [0.92, 0.85, 0.7, 0.55, -0.35, -0.5, 0.25, 0.45];
const H = 380;

export default function CorrelationWeb() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [note, setNote] = useState(
    "correlations drift constantly — hover an asset, click to simulate a stress event"
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const n = ASSETS.length;

    // fixed random phases for the drift term
    const phase: number[][] = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => Math.random() * Math.PI * 2)
    );

    let w = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;
    let hoverIdx = -1;
    let shockAt = -1e9;
    let raf = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = H / 2;
      radius = Math.min(w, H) / 2 - 52;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const pos = (i: number) => {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2;
      return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
    };

    const corr = (i: number, j: number, t: number, shock: number) => {
      const base = B[i] * B[j] + 0.22 * Math.sin(t * 0.00035 + phase[i][j]);
      // stress: everything lurches toward +1
      return base + (0.97 - base) * shock;
    };

    const nearestNode = (x: number, y: number) => {
      let best = -1;
      let bd = 34;
      for (let i = 0; i < n; i++) {
        const p = pos(i);
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      return best;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoverIdx = nearestNode(e.clientX - rect.left, e.clientY - rect.top);
    };
    const onLeave = () => {
      hoverIdx = -1;
    };
    const onDown = () => {
      shockAt = performance.now();
      setNote(
        "stress event: correlations spike toward one — diversification vanishes exactly when you need it most."
      );
      setTimeout(
        () =>
          setNote(
            "correlations drift constantly — hover an asset, click to simulate a stress event"
          ),
        4200
      );
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    const draw = (now: number) => {
      const dark = document.documentElement.classList.contains("dark");
      const POS = dark ? "109,158,255" : "31,94,234";
      const NEG = "217,119,6";
      const STRESS = dark ? "242,106,118" : "220,38,38";
      const MUT = dark ? "147,167,196" : "82,105,138";

      // shock envelope: fast in, slow out over ~3s
      const age = now - shockAt;
      const shock = age < 3000 ? Math.exp(-age / 1100) : 0;

      ctx.clearRect(0, 0, w, H);

      // edges
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const c = corr(i, j, now, shock);
          if (Math.abs(c) < 0.12) continue;
          const focused = hoverIdx === -1 || hoverIdx === i || hoverIdx === j;
          const alpha = Math.abs(c) * (focused ? 0.55 : 0.05);
          const rgb = shock > 0.25 ? STRESS : c >= 0 ? POS : NEG;
          const a = pos(i);
          const b = pos(j);
          ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
          ctx.lineWidth = Math.abs(c) * 2.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes + labels
      ctx.font = "11px monospace";
      for (let i = 0; i < n; i++) {
        const p = pos(i);
        const active = hoverIdx === -1 || hoverIdx === i;
        ctx.fillStyle = `rgba(${shock > 0.25 ? STRESS : POS},${active ? 0.95 : 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, hoverIdx === i ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();

        const lx = cx + (radius + 26) * Math.cos((Math.PI * 2 * i) / n - Math.PI / 2);
        const ly = cy + (radius + 26) * Math.sin((Math.PI * 2 * i) / n - Math.PI / 2);
        ctx.fillStyle = `rgba(${MUT},${active ? 0.95 : 0.35})`;
        ctx.textAlign = lx < cx - 4 ? "right" : lx > cx + 4 ? "left" : "center";
        ctx.fillText(ASSETS[i], lx, ly + 4);
      }
    };

    if (reduced) {
      draw(0);
    } else {
      const loop = (now: number) => {
        draw(now);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div className="corner-frame rounded-lg border border-edge bg-panel overflow-hidden select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge-soft bg-panel-2/70 px-4 py-2.5 font-mono text-[11px]">
        <span className="tracking-widest text-mut uppercase">iwm://correlation-web</span>
        <span className="text-mut/80">hover an asset · click = stress event</span>
      </div>
      <div ref={wrapRef}>
        <canvas ref={canvasRef} className="block w-full cursor-pointer" style={{ height: H }} />
      </div>
      <div className="border-t border-edge-soft bg-panel-2/70 px-4 py-3">
        <p className="font-mono text-xs text-mut/90">{note}</p>
      </div>
    </div>
  );
}
