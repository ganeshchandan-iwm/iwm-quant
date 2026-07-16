"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Random walk vs. market - two unlabeled charts. One is a pure coin-flip
 * walk; the other moves like a real market (volatility clustering, fat
 * tails, occasional jumps). Guess which is the market, get the reveal
 * and the lesson. Regenerates every round; score tallies across rounds.
 */

const N = 190;
const W = 320;
const H = 170;
const PAD = 10;

const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2;

function pureWalk(): number[] {
  const out = [0];
  for (let i = 0; i < N; i++) out.push(out[out.length - 1] + gauss());
  return out;
}

function marketLike(): number[] {
  const out = [0];
  let sigma = 1;
  for (let i = 0; i < N; i++) {
    const shock = gauss();
    // volatility clustering: big moves raise tomorrow's vol
    sigma = 0.9 * sigma + 0.1 * (0.5 + Math.abs(shock) * 1.4);
    let r = shock * sigma;
    if (Math.random() < 0.015) r += (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 4); // jump
    out.push(out[out.length - 1] + r);
  }
  return out;
}

function toPoints(series: number[]): string {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  return series
    .map(
      (v, i) =>
        `${(PAD + (i / N) * (W - PAD * 2)).toFixed(1)},${(
          H - PAD - ((v - min) / range) * (H - PAD * 2)
        ).toFixed(1)}`
    )
    .join(" ");
}

type Round = { charts: [number[], number[]]; marketIdx: 0 | 1 };

export default function WalkOrMarket() {
  const [round, setRound] = useState<Round | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, played: 0 });

  const newRound = useCallback(() => {
    const marketIdx = (Math.random() < 0.5 ? 0 : 1) as 0 | 1;
    const charts: [number[], number[]] =
      marketIdx === 0 ? [marketLike(), pureWalk()] : [pureWalk(), marketLike()];
    setRound({ charts, marketIdx });
    setPicked(null);
  }, []);

  useEffect(() => {
    newRound();
  }, [newRound]);

  if (!round) {
    return <div className="h-[340px] rounded-lg border border-edge bg-panel" aria-hidden />;
  }

  const answered = picked !== null;
  const correct = picked === round.marketIdx;

  const guess = (i: number) => {
    if (answered) return;
    setPicked(i);
    setScore((s) => ({ right: s.right + (i === round.marketIdx ? 1 : 0), played: s.played + 1 }));
  };

  return (
    <div className="corner-frame rounded-lg border border-edge bg-panel overflow-hidden select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge-soft bg-panel-2/70 px-4 py-2.5 font-mono text-[11px]">
        <span className="tracking-widest text-mut uppercase">iwm://walk-or-market</span>
        <span className="text-mut/80">
          score {score.right}/{score.played}
        </span>
      </div>

      <div className="p-4 space-y-4">
        <p className="font-mono text-sm text-fg">
          One of these moves like a real market. The other is a pure coin-flip.{" "}
          <span className="text-primary">Which is the market?</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {round.charts.map((series, i) => {
            const isMarket = i === round.marketIdx;
            let border = "border-edge hover:border-primary/60";
            if (answered && isMarket) border = "border-primary";
            else if (answered && picked === i) border = "border-down";
            return (
              <button
                key={i}
                onClick={() => guess(i)}
                disabled={answered}
                className={`rounded-lg border bg-panel-2/50 p-2 transition-all duration-300 disabled:cursor-default ${border} ${
                  !answered ? "hover:-translate-y-0.5" : ""
                }`}
                aria-label={`Chart ${i === 0 ? "A" : "B"}`}
              >
                <svg viewBox={`0 0 ${W} ${H}`} className="block w-full">
                  <polyline
                    points={toPoints(series)}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="1.4"
                    opacity={answered && !isMarket ? 0.4 : 0.9}
                  />
                </svg>
                <p className="mt-1 font-mono text-[11px] text-mut">
                  {i === 0 ? "A" : "B"}
                  {answered && (
                    <span className={isMarket ? "text-primary" : "text-mut/70"}>
                      {" "}
                      - {isMarket ? "market-like ✓" : "pure coin-flip"}
                    </span>
                  )}
                </p>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="rounded border border-edge-soft bg-panel-2/60 p-4 space-y-3">
            <p className={`font-mono text-sm font-semibold ${correct ? "text-primary" : "text-amber"}`}>
              {correct ? "> correct - good eye." : "> not this time - it's genuinely hard."}
            </p>
            <p className="text-sm leading-relaxed text-mut">
              The market-like series has <span className="text-fg">volatility clustering</span> -
              calm stretches punctuated by violent bursts - and the occasional outsized jump. The
              coin-flip&apos;s wiggles are uniform all the way through. Telling them apart is harder
              than it looks; that&apos;s exactly why we measure instead of eyeball.
            </p>
            <button
              onClick={newRound}
              className="rounded border border-primary/50 bg-primary/5 px-4 py-2 font-mono text-xs text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <span className="inline-flex items-center gap-1.5">next round <ArrowRight /></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
