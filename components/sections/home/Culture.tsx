import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { CULTURE } from "@/lib/content";

/** Gaming-culture section: decision-making under uncertainty, trained by play. */
export default function Culture() {
  return (
    <section className="relative border-y border-edge-soft bg-panel-2/60 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <SectionHeading
          kicker="culture"
          title={CULTURE.heading}
          sub={CULTURE.intro}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CULTURE.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 130}>
              <div className="group h-full rounded-lg border border-edge bg-panel p-6 transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/5 text-xl text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {c.icon}
                </span>
                <h3 className="mt-4 font-mono text-lg font-semibold text-fg group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-mut leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href="/careers#games"
            className="group inline-block rounded border border-primary/50 bg-primary/5 px-6 py-3 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20"
          >
            ♟ explore games &amp; puzzles - try one yourself{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
