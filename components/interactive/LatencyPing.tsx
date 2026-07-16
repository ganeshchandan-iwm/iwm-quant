"use client";

import { useCallback, useEffect, useState } from "react";
import { Refresh } from "@/components/ui/icons";

/**
 * Latency ping - measures the visitor's real round-trip to this site's
 * server and reports it terminal-style. Small, real data, on-brand for a
 * firm that counts basis points and milliseconds.
 */

export default function LatencyPing() {
  const [lines, setLines] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const run = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setLines(["> ping iwm-desk …"]);
    const samples: number[] = [];
    for (let i = 0; i < 4; i++) {
      const t0 = performance.now();
      try {
        await fetch("/api/ping", { cache: "no-store" });
        const dt = performance.now() - t0;
        samples.push(dt);
        setLines((l) => [...l, `  reply ${i + 1}: ${dt.toFixed(0)} ms`]);
      } catch {
        setLines((l) => [...l, `  reply ${i + 1}: timeout`]);
      }
    }
    if (samples.length) {
      const med = samples.sort((a, b) => a - b)[Math.floor(samples.length / 2)];
      const verdict =
        med < 60
          ? "practically co-located. we approve."
          : med < 180
            ? "same neighbourhood as the desk - respectable."
            : "a long way from the desk - our execution systems feel every one of those milliseconds too.";
      setLines((l) => [...l, `> median ${med.toFixed(0)} ms - ${verdict}`]);
    } else {
      setLines((l) => [...l, "> network unreachable - even our risk systems can't help that."]);
    }
    setRunning(false);
  }, [running]);

  useEffect(() => {
    run();
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-lg border border-edge bg-panel p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
        ▸ your latency to the desk
      </p>
      <div className="min-h-[7.5em] rounded border border-edge-soft bg-panel-2/60 px-3 py-2 font-mono text-[12px] leading-relaxed text-mut">
        {lines.map((l, i) => (
          <p key={i} className={l.startsWith(">") ? "text-fg" : ""}>
            {l}
          </p>
        ))}
        {running && <span className="animate-blink text-primary">▌</span>}
      </div>
      <button
        onClick={run}
        disabled={running}
        className="mt-3 rounded border border-primary/50 bg-primary/5 px-4 py-2 font-mono text-xs text-primary transition-all duration-300 hover:bg-primary hover:text-white disabled:opacity-50"
      >
        <span className="inline-flex items-center gap-1.5">ping again <Refresh /></span>
      </button>
    </div>
  );
}
