import Link from "next/link";
import DecryptText from "@/components/ui/DecryptText";
import CandleWell from "@/components/market/CandleWell";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <CandleWell />

      <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-8 pt-24 md:pt-32 pb-44 md:pb-52 text-center">
        <p className="font-mono text-xs tracking-[0.35em] text-primary uppercase mb-7">
          {"// I Wealth Management Quant · Mumbai"}
        </p>

        <h1 className="font-mono font-bold tracking-tight leading-tight text-4xl md:text-6xl">
          <DecryptText text="Markets aren't random." className="text-fg" delay={200} />
          <DecryptText text="They're just encrypted." className="text-mut" delay={900} />
          {/* <DecryptText text="We hold the key." className="text-primary" delay={1700} /> */}
        </h1>

        <Reveal delay={400}>
          <p className="mx-auto mt-8 max-w-2xl text-mut text-lg leading-relaxed">
            We are a quantitative trading and research firm. We apply the scientific
            method, serious engineering and a healthy love of games to one of the
            hardest puzzles there is: financial markets.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-9 flex flex-wrap justify-center gap-4 font-mono">
            <Link
              href="/approach"
              className="group rounded border border-primary/60 bg-primary/10 px-6 py-3 text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/25"
            >
              explore our approach{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/careers"
              className="rounded border border-edge px-6 py-3 text-mut transition-colors duration-300 hover:border-cyan/50 hover:text-cyan"
            >
              join the desk
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
