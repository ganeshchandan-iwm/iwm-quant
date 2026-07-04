import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import DecryptText from "@/components/ui/DecryptText";
import ResearchCard from "@/components/sections/research/ResearchCard";
import { RESEARCH } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description: "Selected research from the IWM Quant desk.",
};

export default function ResearchPage() {
  const featured = RESEARCH.filter((r) => r.featured);
  const rest = RESEARCH.filter((r) => !r.featured);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs tracking-[0.35em] text-primary/80 uppercase mb-4">
            {"// research"}
          </p>
          <h1 className="font-mono text-4xl md:text-6xl font-bold tracking-tight">
            <DecryptText text="Signal, published." className="text-fg" />
          </h1>
          <Reveal delay={300}>
            <p className="mt-6 text-mut text-lg leading-relaxed">
              Selected abstracts from the desk. The interesting parts stay in-house — but
              the ideas below show how we think.
            </p>
          </Reveal>
        </div>

        {/* featured */}
        {featured.map((paper) => (
          <Reveal key={paper.id} className="mb-10">
            <div className="max-w-4xl">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">
                ★ featured
              </p>
              <ResearchCard paper={paper} />
            </div>
          </Reveal>
        ))}

        {/* gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((paper, i) => (
            <Reveal key={paper.id} delay={(i % 3) * 130}>
              <ResearchCard paper={paper} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
