import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import EquityCurve from "@/components/market/EquityCurve";

export default function Performance() {
  return (
    <section className="relative border-y border-edge-soft bg-panel/30 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8 py-20 md:py-28">
        <SectionHeading
          kicker="discipline, visualised"
          title="Compounding measured edges"
          sub="Dozens of small, uncorrelated edges — sized by risk, compounded by patience."
        />
        <Reveal>
          <EquityCurve />
        </Reveal>
      </div>
    </section>
  );
}
