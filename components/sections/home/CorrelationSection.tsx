import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CorrelationWeb from "@/components/interactive/CorrelationWeb";

export default function CorrelationSection() {
  return (
    <section className="relative border-y border-edge-soft bg-panel-2/60 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8 py-20 md:py-24">
        <SectionHeading
          kicker="why diversification is hard"
          title="Everything is connected"
          sub="Correlations between assets drift constantly — and in a crisis they all lurch toward one. Hover an asset to isolate its web; click to see why risk management is a full-time job."
        />
        <Reveal>
          <CorrelationWeb />
        </Reveal>
      </div>
    </section>
  );
}
