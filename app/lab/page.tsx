import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import DecryptText from "@/components/ui/DecryptText";
import Terminal from "@/components/market/Terminal";
import LabCard from "@/components/sections/lab/LabCard";
import ResearchCard from "@/components/sections/research/ResearchCard";
import WalkOrMarket from "@/components/interactive/WalkOrMarket";
import AnomalySpotter from "@/components/interactive/AnomalySpotter";
import { LAB_EXPERIMENTS, RESEARCH } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research Lab",
  description:
    "Active experiments inside the IWM Quant research lab, and selected research from the desk.",
};

export default function LabPage() {
  const running = LAB_EXPERIMENTS.filter((e) => e.status === "RUNNING").length;
  const featured = RESEARCH.filter((r) => r.featured);
  const rest = RESEARCH.filter((r) => !r.featured);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.35em] text-primary/80 uppercase mb-4">
              {"// research lab"}
            </p>
            <h1 className="font-mono text-4xl md:text-6xl font-bold tracking-tight">
              <DecryptText text="Active experiments." className="text-fg" />
            </h1>
            <Reveal delay={300}>
              <p className="mt-6 text-mut text-lg leading-relaxed">
                Where hypotheses fight for survival. Most ideas die on this board - and
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

        {/* hands-on: play with the lab's ideas */}
        <div className="mt-28">
          <SectionHeading
            kicker="try the ideas"
            title="Your eyes vs. the models"
            sub="Two of the lab's core problems, turned into games. They're harder than they look - which is precisely the research finding."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Reveal>
              <WalkOrMarket />
            </Reveal>
            <Reveal delay={150}>
              <AnomalySpotter />
            </Reveal>
          </div>
        </div>

        {/* research - what the lab publishes */}
        <div id="research" className="mt-28 scroll-mt-24">
          <SectionHeading
            kicker="research"
            title="Signal, published."
            sub="Selected abstracts from the desk. The interesting parts stay in-house - but the ideas below show how we think."
          />

          {featured.map((paper) => (
            <Reveal key={paper.id} className="mb-10">
              <div className="max-w-4xl mx-auto">
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">
                  ★ featured
                </p>
                <ResearchCard paper={paper} />
              </div>
            </Reveal>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((paper, i) => (
              <Reveal key={paper.id} delay={(i % 3) * 130}>
                <ResearchCard paper={paper} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
