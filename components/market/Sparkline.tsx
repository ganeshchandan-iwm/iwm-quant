/** Small self-drawing SVG sparkline used in lab monitor cards. */
export default function Sparkline({
  data,
  className = "",
  stroke = "var(--color-primary)",
}: {
  data: number[];
  className?: string;
  stroke?: string;
}) {
  const w = 200;
  const h = 48;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 6 - ((v - min) / range) * (h - 12);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`w-full h-12 ${className}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={1}
        className="draw-line"
        opacity={0.9}
      />
      {/* last-value dot */}
      <circle
        cx={points[points.length - 1].split(",")[0]}
        cy={points[points.length - 1].split(",")[1]}
        r="2.5"
        fill={stroke}
        className="animate-glow-pulse"
      />
    </svg>
  );
}
