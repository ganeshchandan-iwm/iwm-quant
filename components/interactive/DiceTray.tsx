"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dice tray with physics + true 3D dice. Each die is a CSS cube (six real
 * faces, opposite sides summing to 7). On a throw the dice slide across
 * the felt, bounce off the walls and each other, and tumble in 3D — you
 * see the actual faces wheel past. Friction wins, each cube rotates to
 * rest on the rolled value, and a rounded clip is applied at rest so the
 * silhouette stays perfectly clean. `onSettled` fires once both stop.
 */

const PIPS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

// cube rotation that brings each face to the front
const FACE_ROT: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: -90, y: 0 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: 90, y: 0 },
  6: { x: 0, y: 180 },
};

const FACES: { value: number; transform: string }[] = [
  { value: 1, transform: "translateZ(28px)" },
  { value: 6, transform: "rotateY(180deg) translateZ(28px)" },
  { value: 3, transform: "rotateY(90deg) translateZ(28px)" },
  { value: 4, transform: "rotateY(-90deg) translateZ(28px)" },
  { value: 2, transform: "rotateX(90deg) translateZ(28px)" },
  { value: 5, transform: "rotateX(-90deg) translateZ(28px)" },
];

const S = 56; // die size (px)
const MARGIN = 6;
const CLIP = "inset(0px round 14px)"; // resting silhouette

type Body = {
  x: number; y: number; vx: number; vy: number;
  rx: number; ry: number; vrx: number; vry: number;
};

function Cube({
  cubeRef,
  initial,
}: {
  cubeRef: React.RefObject<HTMLDivElement | null>;
  initial: number;
}) {
  const rot = FACE_ROT[initial];
  return (
    <div
      ref={cubeRef}
      className="relative h-14 w-14"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        clipPath: CLIP,
      }}
    >
      {FACES.map((f) => (
        <div
          key={f.value}
          className="absolute inset-0 grid grid-cols-3 grid-rows-3 rounded-xl bg-gradient-to-br from-white via-slate-50 to-slate-200 p-2 shadow-[inset_0_-2px_5px_rgba(0,0,0,0.14)]"
          style={{ transform: f.transform, backfaceVisibility: "hidden" }}
        >
          {Array.from({ length: 9 }, (_, cell) => (
            <span key={cell} className="flex items-center justify-center">
              {PIPS[f.value].includes(cell) && (
                <span className="h-2 w-2 rounded-full bg-slate-900" />
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DiceTray({
  values,
  rollId,
  onSettled,
}: {
  values: [number, number];
  rollId: number;
  onSettled: () => void;
}) {
  const trayRef = useRef<HTMLDivElement>(null);
  const outerA = useRef<HTMLDivElement>(null);
  const outerB = useRef<HTMLDivElement>(null);
  const cubeA = useRef<HTMLDivElement>(null);
  const cubeB = useRef<HTMLDivElement>(null);
  const valuesRef = useRef(values);
  const settledCb = useRef(onSettled);
  valuesRef.current = values;
  settledCb.current = onSettled;

  const [settled, setSettled] = useState(false);
  const [sum, setSum] = useState(3 + 4);

  // initial resting placement
  useEffect(() => {
    const tray = trayRef.current;
    if (!tray || rollId !== 0) return;
    const { width, height } = tray.getBoundingClientRect();
    const y = height / 2 - S / 2;
    if (outerA.current)
      outerA.current.style.transform = `translate(${width / 2 - S - 14}px, ${y}px)`;
    if (outerB.current)
      outerB.current.style.transform = `translate(${width / 2 + 14}px, ${y}px)`;
  }, [rollId]);

  // the throw
  useEffect(() => {
    if (rollId === 0) return;
    const tray = trayRef.current;
    const outers = [outerA.current, outerB.current];
    const cubes = [cubeA.current, cubeB.current];
    if (!tray || outers.some((e) => !e) || cubes.some((e) => !e)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [v1, v2] = valuesRef.current;

    const land = (i: number, value: number, instant: boolean) => {
      const cube = cubes[i]!;
      const target = FACE_ROT[value];
      // read current rotation from our physics state via dataset (set below)
      const rx = Number(cube.dataset.rx ?? 0);
      const ry = Number(cube.dataset.ry ?? 0);
      // land on the nearest equivalent orientation for a natural final turn
      const fx = target.x + 360 * Math.round((rx - target.x) / 360);
      const fy = target.y + 360 * Math.round((ry - target.y) / 360);
      cube.style.transition = instant ? "" : "transform 340ms ease-out";
      cube.style.transform = `rotateX(${fx}deg) rotateY(${fy}deg)`;
    };

    if (reduced) {
      land(0, v1, true);
      land(1, v2, true);
      cubes.forEach((c) => (c!.style.clipPath = CLIP));
      setSum(v1 + v2);
      setSettled(true);
      const t = setTimeout(() => settledCb.current(), 60);
      return () => clearTimeout(t);
    }

    setSettled(false);
    // unclip for the tumble
    cubes.forEach((c) => (c!.style.clipPath = "none"));

    const { width: W, height: TH } = tray.getBoundingClientRect();

    // thrown in from the left edge, spinning in 3D
    const dice: Body[] = [0, 1].map((i) => ({
      x: MARGIN + 4,
      y: TH / 2 - S / 2 + (i ? 26 : -26),
      vx: 8 + Math.random() * 5,
      vy: (Math.random() - 0.5) * 7,
      rx: Math.random() * 360,
      ry: Math.random() * 360,
      vrx: (Math.random() > 0.5 ? 1 : -1) * (11 + Math.random() * 9),
      vry: (Math.random() > 0.5 ? 1 : -1) * (11 + Math.random() * 9),
    }));

    let raf = 0;
    let done = false;
    const start = performance.now();

    const step = (now: number) => {
      let moving = false;

      for (const d of dice) {
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.984;
        d.vy *= 0.984;
        d.rx += d.vrx;
        d.ry += d.vry;
        d.vrx *= 0.974;
        d.vry *= 0.974;
        // wall bounces, losing energy and kicking spin
        if (d.x < MARGIN) { d.x = MARGIN; d.vx = -d.vx * 0.72; d.vry += d.vx; }
        if (d.x > W - S - MARGIN) { d.x = W - S - MARGIN; d.vx = -d.vx * 0.72; d.vry += d.vx; }
        if (d.y < MARGIN) { d.y = MARGIN; d.vy = -d.vy * 0.72; d.vrx += d.vy; }
        if (d.y > TH - S - MARGIN) { d.y = TH - S - MARGIN; d.vy = -d.vy * 0.72; d.vrx += d.vy; }
        if (Math.hypot(d.vx, d.vy) > 0.28 || Math.abs(d.vrx) + Math.abs(d.vry) > 1.4) moving = true;
      }

      // dice bump into each other
      const dx = dice[1].x - dice[0].x;
      const dy = dice[1].y - dice[0].y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < S + 2) {
        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = (S + 2 - dist) / 2;
        dice[0].x -= nx * overlap;
        dice[0].y -= ny * overlap;
        dice[1].x += nx * overlap;
        dice[1].y += ny * overlap;
        const p = (dice[0].vx - dice[1].vx) * nx + (dice[0].vy - dice[1].vy) * ny;
        dice[0].vx -= p * nx * 0.9;
        dice[0].vy -= p * ny * 0.9;
        dice[1].vx += p * nx * 0.9;
        dice[1].vy += p * ny * 0.9;
        dice[0].vrx += p * 1.6;
        dice[1].vry -= p * 1.6;
      }

      dice.forEach((d, i) => {
        outers[i]!.style.transform = `translate(${d.x}px, ${d.y}px)`;
        const cube = cubes[i]!;
        cube.style.transform = `rotateX(${d.rx}deg) rotateY(${d.ry}deg)`;
        cube.dataset.rx = String(d.rx);
        cube.dataset.ry = String(d.ry);
      });

      const elapsed = now - start;
      if ((!moving && elapsed > 700) || elapsed > 5000) {
        if (!done) {
          done = true;
          land(0, v1, false);
          land(1, v2, false);
          setTimeout(() => {
            cubes.forEach((c) => {
              if (c) {
                c.style.transition = "";
                c.style.clipPath = CLIP; // clean silhouette at rest
              }
            });
            setSum(v1 + v2);
            setSettled(true);
            settledCb.current();
          }, 370);
        }
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [rollId]);

  return (
    <div
      ref={trayRef}
      className="relative h-40 overflow-hidden rounded-xl border border-ink-2 bg-gradient-to-b from-ink-2/80 via-ink-2/40 to-ink-2/70 shadow-[inset_0_2px_14px_rgba(0,0,0,0.5)]"
    >
      {/* felt sheen */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(141,182,255,0.07), transparent 70%)",
        }}
        aria-hidden
      />

      <div
        ref={outerA}
        className="absolute left-0 top-0 will-change-transform drop-shadow-[0_6px_6px_rgba(0,0,0,0.45)]"
        style={{ perspective: "700px" }}
        role="img"
        aria-label={`first die showing ${values[0]}`}
      >
        <Cube cubeRef={cubeA} initial={3} />
      </div>
      <div
        ref={outerB}
        className="absolute left-0 top-0 will-change-transform drop-shadow-[0_6px_6px_rgba(0,0,0,0.45)]"
        style={{ perspective: "700px" }}
        role="img"
        aria-label={`second die showing ${values[1]}`}
      >
        <Cube cubeRef={cubeB} initial={4} />
      </div>

      {/* sum chip appears once the dice come to rest */}
      <div
        className="absolute bottom-2 right-3 rounded border border-sky/30 bg-ink/70 px-2.5 py-1 font-mono text-sm text-sky backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: settled && rollId > 0 ? 1 : 0 }}
      >
        Σ = {sum}
      </div>

      {rollId === 0 && (
        <p className="pointer-events-none absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-widest text-sky/40">
          dice sleeping — send a quote to throw them
        </p>
      )}
    </div>
  );
}
