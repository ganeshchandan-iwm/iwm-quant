"use client";

import { useEffect, useRef } from "react";

/**
 * Candlestick well - a calm, IMC-style interactive band along the bottom
 * of the hero. A field of monochrome candlesticks undulates in a slow
 * travelling wave; candles near the cursor swell smoothly, and a click
 * sends a gentle pulse rippling outward through the well. Alive on its
 * own, restrained by design, and rendered behind the hero content so it
 * never affects layout.
 */

// theme-aware blue: brighter in dark mode for contrast on the navy background
const BLUE = (a: number) =>
  document.documentElement.classList.contains("dark")
    ? `rgba(109, 158, 255, ${a})`
    : `rgba(31, 94, 234, ${a})`;

const BAND_H = 210; // canvas height in px
const STEP = 13; // px per candle slot
const BODY_W = 6;

type Pulse = { x: number; born: number };

export default function CandleWell() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const section = wrap?.parentElement; // hero section - pointer events bubble here
    if (!wrap || !canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let seeds: number[] = [];
    const pointer = { x: -9999, active: false };
    const pulses: Pulse[] = [];
    let raf = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(BAND_H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.ceil(w / STEP) + 1;
      while (seeds.length < count) seeds.push(Math.random() * Math.PI * 2);
      seeds.length = count;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const toLocalX = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return e.clientX - rect.left;
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = toLocalX(e);
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
    };
    const onDown = (e: PointerEvent) => {
      pulses.push({ x: toLocalX(e), born: performance.now() });
      if (pulses.length > 6) pulses.shift();
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    section.addEventListener("pointerdown", onDown);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, BAND_H);
      const baseline = BAND_H * 0.62;
      const t = now * 0.0011;

      for (let i = 0; i < seeds.length; i++) {
        const x = i * STEP;

        // ambient travelling wave + per-candle character
        let body =
          20 +
          13 * Math.sin(i * 0.30 + t) +
          6 * Math.sin(i * 0.11 - t * 0.6 + seeds[i]);

        // smooth swell around the cursor
        let glow = 0;
        if (pointer.active) {
          const d = x - pointer.x;
          const g = Math.exp(-(d * d) / (2 * 95 * 95));
          body += 62 * g;
          glow = g;
        }

        // click pulses travelling outward
        for (const p of pulses) {
          const age = now - p.born;
          if (age > 1600) continue;
          const front = age * 0.55; // wavefront distance
          const d = Math.abs(x - p.x) - front;
          const band = Math.exp(-(d * d) / (2 * 42 * 42));
          body += 46 * band * (1 - age / 1600);
        }

        const half = body / 2;
        const wick = half + body * 0.32 + 6;
        const alpha = 0.16 + 0.30 * Math.min(body / 95, 1) + 0.28 * glow;

        // wick
        ctx.strokeStyle = BLUE(alpha * 0.55);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, baseline - wick);
        ctx.lineTo(x, baseline + wick * 0.8);
        ctx.stroke();

        // body
        ctx.fillStyle = BLUE(alpha);
        ctx.fillRect(x - BODY_W / 2, baseline - half, BODY_W, body);
      }

      // baseline hairline
      ctx.strokeStyle = BLUE(0.14);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, baseline);
      ctx.lineTo(w, baseline);
      ctx.stroke();
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
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
      style={{
        height: BAND_H,
        maskImage: "linear-gradient(to top, black 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, black 55%, transparent 100%)",
      }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block w-full" style={{ height: BAND_H }} />
    </div>
  );
}
