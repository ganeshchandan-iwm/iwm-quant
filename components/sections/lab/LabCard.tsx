import Sparkline from "@/components/market/Sparkline";
import type { LAB_EXPERIMENTS } from "@/lib/content";

const STATUS_STYLES: Record<string, { dot: string; text: string }> = {
  RUNNING: { dot: "bg-primary", text: "text-primary" },
  CALIBRATING: { dot: "bg-cyan", text: "text-cyan" },
  BACKTESTING: { dot: "bg-amber", text: "text-amber" },
  PAUSED: { dot: "bg-mut", text: "text-mut" },
};

type Experiment = (typeof LAB_EXPERIMENTS)[number];

/** "Live monitor" card for a lab experiment: status LED, sparkline, metrics. */
export default function LabCard({ exp }: { exp: Experiment }) {
  const style = STATUS_STYLES[exp.status];
  const live = exp.status === "RUNNING";

  return (
    <div className="group corner-frame h-full rounded-lg border border-edge bg-panel/80 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      {/* header */}
      <div className="flex items-center justify-between border-b border-edge-soft bg-panel-2/70 px-5 py-3">
        <span className="font-mono text-[11px] text-mut">{exp.id}</span>
        <span className={`flex items-center gap-2 font-mono text-[11px] ${style.text}`}>
          <span className="relative flex h-2 w-2">
            {live && (
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${style.dot} opacity-60 [animation:ping-dot_1.6s_cubic-bezier(0,0,0.2,1)_infinite]`}
              />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${style.dot}`} />
          </span>
          {exp.status}
        </span>
      </div>

      {/* body */}
      <div className="p-5 space-y-4">
        <h3 className="font-mono text-lg font-semibold text-fg group-hover:text-primary transition-colors">
          {exp.name}
        </h3>
        <Sparkline
          data={exp.spark}
          stroke={live ? "var(--color-primary)" : "var(--color-cyan)"}
        />
        <p className="text-sm text-mut leading-relaxed">{exp.body}</p>
        <div className="grid grid-cols-3 gap-2 border-t border-edge-soft pt-4">
          {exp.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-mono text-sm text-primary">{m.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-mut">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
