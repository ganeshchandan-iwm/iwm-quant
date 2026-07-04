import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { STATS } from "@/lib/content";

export default function StatsBand() {
  return (
    <section className="border-y border-edge-soft bg-panel/50">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 120} className="text-center">
            <p className="font-mono text-3xl md:text-4xl font-bold text-primary">
              <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-2 font-mono text-xs text-mut uppercase tracking-wider">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
