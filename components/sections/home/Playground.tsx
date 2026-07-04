import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MarketPlayground from "@/components/market/MarketPlayground";

export default function Playground() {
  return (
    <section className="mx-auto max-w-5xl px-4 md:px-8 py-20 md:py-24">
      <SectionHeading
        kicker="try it yourself"
        title="You are the order flow"
        sub="Markets move because participants act. Steer the price with your cursor, whip it around to raise volatility, click to drop a shock — and watch the regime shift from calm to turbulent. This is the intuition our models formalise."
      />
      <Reveal>
        <MarketPlayground />
      </Reveal>
    </section>
  );
}
