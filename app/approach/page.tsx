import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import DecryptText from "@/components/ui/DecryptText";
import IdeaFunnel from "@/components/interactive/IdeaFunnel";
import { PRINCIPLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Approach",
  description: "How IWM Quant trades: data, signal, risk, execution — in that order.",
};

export default function ApproachPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
        {/* intro */}
        <div className="max-w-3xl mb-20">
          <p className="font-mono text-xs tracking-[0.35em] text-primary/80 uppercase mb-4">
            {"// approach"}
          </p>
          <h1 className="font-mono text-4xl md:text-6xl font-bold tracking-tight">
            <DecryptText text="Process beats prediction." className="text-fg" />
          </h1>
          <Reveal delay={300}>
            <p className="mt-6 text-mut text-lg leading-relaxed">
              We don&apos;t forecast headlines. We build a repeatable pipeline that converts
              raw market data into measured, risk-budgeted positions — and we improve that
              pipeline every single day.
            </p>
          </Reveal>
        </div>

        {/* the pipeline — animated funnel + stage details, one piece */}
        <div className="mb-24 max-w-6xl mx-auto">
          <SectionHeading
            kicker="the pipeline"
            title="Data → Signal → Risk → Execution"
            sub="Every dot is a hypothesis entering the pipeline. Watch where they fall — most ideas die, and that's the system working. Hover a stage to trace its gate."
          />
          <Reveal>
            <IdeaFunnel />
          </Reveal>
        </div>

        {/* principles */}
        <SectionHeading
          kicker="operating principles"
          title="The rules we never trade against"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="h-full rounded-lg border border-edge-soft bg-panel/50 p-6 transition-colors duration-300 hover:border-cyan/40">
                <p className="font-mono text-sm text-cyan mb-2">
                  <span className="text-primary/60">$</span> {p.title}
                </p>
                <p className="text-sm text-mut leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
