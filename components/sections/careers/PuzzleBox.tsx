"use client";

import { useState } from "react";
import { PUZZLES } from "@/lib/content";

/**
 * Interactive "try one now" puzzle widget: pick an answer, get instant
 * feedback and the reasoning, then move to the next puzzle. Solved count
 * sticks around as a mini scoreboard.
 */
export default function PuzzleBox() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [solved, setSolved] = useState(0);
  const [attempted, setAttempted] = useState(0);

  const puzzle = PUZZLES[idx];
  const answered = picked !== null;
  const correct = picked === puzzle.answer;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    setAttempted((a) => a + 1);
    if (i === puzzle.answer) setSolved((s) => s + 1);
  };

  const next = () => {
    setIdx((i) => (i + 1) % PUZZLES.length);
    setPicked(null);
  };

  return (
    <div className="corner-frame rounded-lg border border-ink-2 bg-ink shadow-2xl shadow-primary/15 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between border-b border-ink-2 bg-ink-2/80 px-4 py-2.5 font-mono text-[11px]">
        <span className="tracking-widest text-sky/70 uppercase">
          iwm://puzzle-ladder - try one
        </span>
        <span className="text-sky/60">
          {solved}/{attempted} solved · #{idx + 1} of {PUZZLES.length}
        </span>
      </div>

      <div className="p-5 md:p-6 space-y-4">
        <p className="font-mono text-sm md:text-[15px] leading-relaxed text-sky">
          <span className="text-sky/50">Q{idx + 1}.</span> {puzzle.q}
        </p>

        <div className="grid grid-cols-1 gap-2">
          {puzzle.options.map((opt, i) => {
            const isAnswer = i === puzzle.answer;
            const isPicked = i === picked;
            let cls =
              "border-ink-2 bg-ink-2/40 text-sky/85 hover:border-sky/50 hover:bg-ink-2";
            if (answered && isAnswer)
              cls = "border-primary bg-primary/20 text-white";
            else if (answered && isPicked && !isAnswer)
              cls = "border-down/70 bg-down/15 text-down";
            else if (answered)
              cls = "border-ink-2 bg-ink-2/30 text-sky/40";

            return (
              <button
                key={opt}
                onClick={() => pick(i)}
                disabled={answered}
                className={`rounded border px-4 py-2.5 text-left font-mono text-sm transition-all duration-200 disabled:cursor-default ${cls}`}
              >
                <span className="mr-2 text-sky/50">{String.fromCharCode(97 + i)})</span>
                {opt}
                {answered && isAnswer && <span className="float-right">✓</span>}
                {answered && isPicked && !isAnswer && <span className="float-right">✗</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="rounded border border-ink-2 bg-ink-2/50 p-4 space-y-3">
            <p className={`font-mono text-sm font-semibold ${correct ? "text-primary" : "text-amber"}`}>
              {correct ? "> correct - nicely done." : "> not quite - here's the thinking:"}
            </p>
            <p className="text-sm leading-relaxed text-sky/80">{puzzle.why}</p>
            <button
              onClick={next}
              className="rounded border border-sky/40 bg-sky/10 px-4 py-2 font-mono text-xs text-sky transition-all duration-300 hover:bg-sky hover:text-ink"
            >
              next puzzle →
            </button>
          </div>
        )}

        {!answered && (
          <p className="font-mono text-[11px] text-sky/40">
            pick an answer - no timer, but the desk is watching
            <span className="animate-blink">▌</span>
          </p>
        )}
      </div>
    </div>
  );
}
