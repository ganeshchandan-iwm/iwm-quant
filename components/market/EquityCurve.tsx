import { EQUITY_CURVE } from "@/lib/content";

/** Large self-drawing equity curve with gradient area fill. */
export default function EquityCurve() {
  const data = EQUITY_CURVE;
  const w = 720;
  const h = 260;
  const pad = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`;

  const gridY = [0.25, 0.5, 0.75];

  return (
    <div className="corner-frame rounded-lg border border-edge bg-panel/80 backdrop-blur-md p-4 md:p-6">
      <div className="flex items-center justify-between mb-3 font-mono text-xs">
        <span className="text-mut uppercase tracking-widest">
          Composite strategy · simulated NAV
        </span>
        <span className="text-primary">
          +{(data[data.length - 1] - data[0]).toFixed(1)}%{" "}
          <span className="text-mut">since inception</span>
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Equity curve trending upward">
        <defs>
          <linearGradient id="eqFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridY.map((g) => (
          <line
            key={g}
            x1={pad}
            x2={w - pad}
            y1={pad + g * (h - pad * 2)}
            y2={pad + g * (h - pad * 2)}
            stroke="var(--color-edge-soft)"
            strokeDasharray="4 6"
          />
        ))}
        <polygon points={area} fill="url(#eqFill)" className="fade-area" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
          className="draw-line"
        />
        <circle
          cx={pts[pts.length - 1][0]}
          cy={pts[pts.length - 1][1]}
          r="4"
          fill="var(--color-primary)"
          className="animate-glow-pulse"
        />
      </svg>
      <p className="mt-3 font-mono text-[10px] text-mut/70 leading-relaxed">
        Illustrative simulation for design purposes only. Not an offer, solicitation or
        indication of actual performance.
      </p>
    </div>
  );
}
