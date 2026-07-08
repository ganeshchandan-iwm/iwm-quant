"use client";

import { useCallback, useRef, useState } from "react";
import DiceTray from "@/components/interactive/DiceTray";

/**
 * The market-making game from our interviews, playable: quote a two-sided
 * market (bid/ask) on the sum of two hidden dice. Sending a quote throws
 * real dice across the tray - they bounce, collide and tumble to rest -
 * and only then is the desk's trade and your P&L revealed. Five rounds,
 * honest verdict. Fair value is 7; everything else is spread management.
 */

const ROUNDS = 5;

type LogLine = { text: string; tone: "info" | "good" | "bad" };
type Pending = { delta: number; line: LogLine };

const roll = () => 1 + Math.floor(Math.random() * 6);

export default function MarketMakingGame() {
  const [bid, setBid] = useState(6);
  const [ask, setAsk] = useState(8);
  const [round, setRound] = useState(1);
  const [pnl, setPnl] = useState(0);
  const [log, setLog] = useState<LogLine[]>([]);
  const [dice, setDice] = useState<[number, number]>([3, 4]);
  const [rollId, setRollId] = useState(0);
  const [rolling, setRolling] = useState(false);
  const pending = useRef<Pending | null>(null);
  const done = round > ROUNDS;

  const bump = (which: "bid" | "ask", d: number) => {
    if (done || rolling) return;
    if (which === "bid") setBid((b) => Math.min(Math.max(b + d, 2), ask - 0.5));
    else setAsk((a) => Math.max(Math.min(a + d, 12), bid + 0.5));
  };

  const quote = () => {
    if (done || rolling) return;
    const d1 = roll();
    const d2 = roll();
    const s = d1 + d2;
    // the desk's noisy read on the roll - sharp enough to punish bad quotes
    const est = s + (Math.random() * 4 - 2);

    let delta = 0;
    let line: LogLine;
    if (est > ask) {
      delta = ask - s;
      line = {
        text: `R${round}: quoted ${bid.toFixed(1)}/${ask.toFixed(1)} - desk LIFTS your ask · dice ${d1}+${d2}=${s} · pnl ${delta >= 0 ? "+" : ""}${delta.toFixed(1)}`,
        tone: delta >= 0 ? "good" : "bad",
      };
    } else if (est < bid) {
      delta = s - bid;
      line = {
        text: `R${round}: quoted ${bid.toFixed(1)}/${ask.toFixed(1)} - desk HITS your bid · dice ${d1}+${d2}=${s} · pnl ${delta >= 0 ? "+" : ""}${delta.toFixed(1)}`,
        tone: delta >= 0 ? "good" : "bad",
      };
    } else {
      line = {
        text: `R${round}: quoted ${bid.toFixed(1)}/${ask.toFixed(1)} - no trade (dice were ${d1}+${d2}=${s}). no fill, no edge.`,
        tone: "info",
      };
    }

    // throw the dice; the trade reveals when they come to rest
    pending.current = { delta, line };
    setDice([d1, d2]);
    setRollId((r) => r + 1);
    setRolling(true);
  };

  const onSettled = useCallback(() => {
    const p = pending.current;
    if (!p) return;
    pending.current = null;
    setPnl((v) => v + p.delta);
    setLog((l) => [...l, p.line]);
    setRound((r) => r + 1);
    setRolling(false);
  }, []);

  const reset = () => {
    if (rolling) return;
    setBid(6);
    setAsk(8);
    setRound(1);
    setPnl(0);
    setLog([]);
  };

  const verdict =
    pnl > 1.5
      ? "you kept the edge - the desk wants to interview you."
      : pnl >= -1.5
        ? "roughly flat - respectable. fair value is 7; the rest is spread management."
        : "picked off - you quoted away from fair value and the desk made you pay. it happens to everyone once.";

  const stepper = (label: string, value: number, which: "bid" | "ask") => (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[11px] uppercase tracking-widest text-sky/60 w-8">
        {label}
      </span>
      <button
        onClick={() => bump(which, -0.5)}
        disabled={done || rolling}
        className="h-8 w-8 rounded border border-ink-2 bg-ink-2/50 font-mono text-sky hover:border-sky/60 disabled:opacity-40"
        aria-label={`decrease ${label}`}
      >
        −
      </button>
      <span className="w-12 text-center font-mono text-lg text-sky">{value.toFixed(1)}</span>
      <button
        onClick={() => bump(which, 0.5)}
        disabled={done || rolling}
        className="h-8 w-8 rounded border border-ink-2 bg-ink-2/50 font-mono text-sky hover:border-sky/60 disabled:opacity-40"
        aria-label={`increase ${label}`}
      >
        +
      </button>
    </div>
  );

  return (
    <div className="corner-frame rounded-lg border border-ink-2 bg-ink shadow-2xl shadow-primary/15 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-2 bg-ink-2/80 px-4 py-2.5 font-mono text-[11px]">
        <span className="tracking-widest text-sky/70 uppercase">
          iwm://market-making - dice sum
        </span>
        <span className="text-sky/60">
          round {Math.min(round, ROUNDS)}/{ROUNDS} · pnl{" "}
          <span className={pnl >= 0 ? "text-primary" : "text-down"}>
            {pnl >= 0 ? "+" : ""}
            {pnl.toFixed(1)}
          </span>
        </span>
      </div>

      <div className="p-5 space-y-4">
        <p className="font-mono text-sm leading-relaxed text-sky">
          Two dice are rolled, hidden. Quote a bid and an ask on their{" "}
          <span className="text-sky/70">sum</span> - the desk trades against you.
          This is the game we play in interviews.
        </p>

        <DiceTray values={dice} rollId={rollId} onSettled={onSettled} />

        <div className="flex flex-wrap items-center gap-6">
          {stepper("bid", bid, "bid")}
          {stepper("ask", ask, "ask")}
          <button
            onClick={done ? reset : quote}
            disabled={rolling}
            className="rounded border border-sky/40 bg-sky/10 px-5 py-2 font-mono text-sm text-sky transition-all duration-300 hover:bg-sky hover:text-ink disabled:opacity-50"
          >
            {rolling ? "dice in the air…" : done ? "play again ↺" : "send quote & roll →"}
          </button>
        </div>

        <div className="h-32 overflow-y-auto rounded border border-ink-2 bg-ink-2/40 px-3 py-2 font-mono text-[12px] leading-relaxed">
          {log.length === 0 && !rolling && (
            <p className="text-sky/40">
              {"> awaiting your first quote… (hint: the fair value of two dice is 7)"}
            </p>
          )}
          {log.map((l, i) => (
            <p
              key={i}
              className={
                l.tone === "good" ? "text-primary" : l.tone === "bad" ? "text-down" : "text-sky/70"
              }
            >
              {"> "}
              {l.text}
            </p>
          ))}
          {rolling && <p className="text-sky/50">{"> dice tumbling across the desk…"}</p>}
          {done && (
            <p className="mt-1 text-sky font-semibold">
              {"> "}final: {pnl >= 0 ? "+" : ""}
              {pnl.toFixed(1)} - {verdict}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
