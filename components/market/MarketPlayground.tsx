"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive landing element: a live price path the visitor can play with.
 * Your cursor is the order flow - price gravitates toward it, moving fast
 * injects volatility, and clicking fires a market shock. A regime meter
 * (CALM / ACTIVE / TURBULENT) reacts in real time.
 */
export default function MarketPlayground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // theme-aware colors, re-read whenever the html class (theme) changes
    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      const dark = document.documentElement.classList.contains("dark");
      return {
        calm: css.getPropertyValue("--color-primary").trim() || "#1f5eea",
        active: css.getPropertyValue("--color-amber").trim() || "#d97706",
        wild: css.getPropertyValue("--color-down").trim() || "#dc2626",
        grid: dark ? "rgba(109, 158, 255, 0.10)" : "rgba(31, 94, 234, 0.08)",
        mut: css.getPropertyValue("--color-mut").trim() || "#52698a",
      };
    };
    let COLORS = readColors();
    const themeObserver = new MutationObserver(() => {
      COLORS = readColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const N = 180; // points in the window
    let prices: number[] = [];
    const pointer = { x: -1, y: -1, active: false, speed: 0 };
    let volEma = 0;
    let shock = 0;
    let raf = 0;
    let lastStep = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = Math.min(380, Math.max(260, rect.width * 0.4));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prices.length === 0) prices = Array.from({ length: N }, () => h / 2);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // gaussian-ish noise
    const noise = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2;

    const step = () => {
      const last = prices[prices.length - 1];
      const base = 0.9;
      const sigma = base + pointer.speed * 0.35 + shock;
      shock *= 0.9;

      let next = last + noise() * sigma;
      if (pointer.active) {
        next += (pointer.y - last) * 0.045; // cursor pulls the price
      } else {
        next += (h / 2 - last) * 0.01; // slow mean-reversion when idle
      }
      // soft bounds
      next = Math.max(h * 0.08, Math.min(h * 0.92, next));
      prices.push(next);
      if (prices.length > N) prices.shift();

      volEma = volEma * 0.94 + Math.abs(next - last) * 0.06;
      pointer.speed *= 0.88;
    };

    const regime = () => {
      if (volEma < 2.2) return { name: "CALM", color: COLORS.calm, t: volEma / 2.2 };
      if (volEma < 5.5)
        return { name: "ACTIVE", color: COLORS.active, t: (volEma - 2.2) / 3.3 };
      return { name: "TURBULENT", color: COLORS.wild, t: 1 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // grid
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      for (let gy = 1; gy < 4; gy++) {
        ctx.beginPath();
        ctx.moveTo(0, (h / 4) * gy);
        ctx.lineTo(w, (h / 4) * gy);
        ctx.stroke();
      }

      const r = regime();
      const stepX = w / (N - 1);

      // area fill
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, r.color + "33");
      grad.addColorStop(1, r.color + "00");
      ctx.beginPath();
      ctx.moveTo(0, h);
      prices.forEach((p, i) => ctx.lineTo(i * stepX, p));
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // price line
      ctx.beginPath();
      prices.forEach((p, i) => (i === 0 ? ctx.moveTo(0, p) : ctx.lineTo(i * stepX, p)));
      ctx.strokeStyle = r.color;
      ctx.lineWidth = 2.2;
      ctx.lineJoin = "round";
      ctx.stroke();

      // glowing last dot
      const ly = prices[prices.length - 1];
      ctx.beginPath();
      ctx.arc(w - 1, ly, 4, 0, Math.PI * 2);
      ctx.fillStyle = r.color;
      ctx.shadowColor = r.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // cursor crosshair
      if (pointer.active) {
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = COLORS.mut + "88";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, pointer.y);
        ctx.lineTo(w, pointer.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = "10px monospace";
        ctx.fillStyle = COLORS.mut;
        ctx.fillText("you", Math.min(pointer.x + 10, w - 30), pointer.y - 8);
      }

      // HUD (DOM, outside canvas)
      if (meterRef.current) {
        const pct = Math.min(volEma / 7, 1) * 100;
        meterRef.current.style.width = `${pct}%`;
        meterRef.current.style.background = r.color;
      }
      if (labelRef.current && labelRef.current.textContent !== r.name) {
        labelRef.current.textContent = r.name;
        labelRef.current.style.color = r.color;
      }
    };

    if (reduced) {
      // static rendering for reduced motion
      for (let i = 0; i < N; i++) step();
      draw();
      return () => ro.disconnect();
    }

    const loop = (now: number) => {
      if (now - lastStep >= 33) {
        lastStep = now;
        step();
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // pointer interaction
    let px = -1;
    let py = -1;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (px >= 0) {
        pointer.speed = Math.min(
          pointer.speed + Math.hypot(x - px, y - py) * 0.12,
          14
        );
      }
      px = x;
      py = y;
      pointer.x = x;
      pointer.y = Math.max(h * 0.08, Math.min(h * 0.92, y));
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      px = -1;
    };
    const onDown = () => {
      shock += 9; // market shock
      const dir = Math.random() > 0.5 ? 1 : -1;
      prices[prices.length - 1] += dir * h * 0.12;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="corner-frame rounded-lg border border-edge bg-panel shadow-xl shadow-primary/5 overflow-hidden"
    >
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge-soft bg-panel-2/70 px-4 py-2.5 font-mono text-[11px]">
        <span className="tracking-widest text-mut uppercase">
          iwm://market-playground
        </span>
        <span className="text-mut/80">
          move = order flow · speed = volatility · click = shock
        </span>
      </div>

      <canvas ref={canvasRef} className="block w-full cursor-crosshair touch-none" />

      {/* regime HUD */}
      <div className="flex items-center gap-4 border-t border-edge-soft bg-panel-2/70 px-4 py-3 font-mono text-xs">
        <span className="text-mut uppercase tracking-widest shrink-0">regime</span>
        <span ref={labelRef} className="font-semibold text-primary shrink-0 w-24">
          CALM
        </span>
        <div className="h-1.5 flex-1 rounded-full bg-edge-soft overflow-hidden">
          <div
            ref={meterRef}
            className="h-full rounded-full bg-primary transition-[width] duration-150"
            style={{ width: "10%" }}
          />
        </div>
      </div>
    </div>
  );
}
