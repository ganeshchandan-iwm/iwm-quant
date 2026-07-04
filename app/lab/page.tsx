import type { Metadata } from "next";
import GlowOrbs from "@/components/ui/GlowOrbs";
import Reveal from "@/components/ui/Reveal";
import DecryptText from "@/components/ui/DecryptText";
import Terminal from "@/components/market/Terminal";
import LabCard from "@/components/sections/lab/LabCard";
import { LAB_EXPERIMENTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lab",
  description: "Active experiments inside the IWM Quant research lab.",
};

export default function LabPage() {
  const running = LAB_EXPERIMENTS.filter((e) => e.status === "RUNNING").length;

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <GlowOrbs />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.35em] text-primary/80 uppercase mb-4">
              {"// the lab"}
            </p>
            <h1 className="font-mono text-4xl md:text-6xl font-bold tracking-tight">
              <DecryptText text="Active experiments." className="text-fg" />
            </h1>
            <Reveal delay={300}>
              <p className="mt-6 text-mut text-lg leading-relaxed">
                Where hypotheses fight for survival. Most ideas die on this board — and
                that&apos;s exactly how it should be. What survives, trades.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <p className="mt-4 font-mono text-sm text-primary/80">
                <span className="animate-blink">▌</span> {running} of {LAB_EXPERIMENTS.length}{" "}
                experiments currently live
              </p>
            </Reveal>
          </div>
          <Reveal delay={400}>
            <Terminal />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_EXPERIMENTS.map((exp, i) => (
            <Reveal key={exp.id} delay={(i % 3) * 130}>
              <LabCard exp={exp} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
