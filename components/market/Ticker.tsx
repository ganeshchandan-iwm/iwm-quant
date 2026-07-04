import { TICKER } from "@/lib/content";

/** Scrolling market ticker strip (marquee, pauses on hover). */
export default function Ticker() {
  const items = [...TICKER, ...TICKER]; // duplicated for a seamless loop
  return (
    <div className="border-y border-edge-soft bg-panel/60 backdrop-blur-sm overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {items.map((t, i) => (
          <div
            key={`${t.sym}-${i}`}
            className="flex items-center gap-2 px-6 py-2 font-mono text-xs whitespace-nowrap"
          >
            <span className="text-mut">{t.sym}</span>
            <span className="text-fg">{t.px}</span>
            <span className={t.chg >= 0 ? "text-primary" : "text-down"}>
              {t.chg >= 0 ? "▲" : "▼"} {Math.abs(t.chg).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
