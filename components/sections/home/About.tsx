import Reveal from "@/components/ui/Reveal";
import { ABOUT } from "@/lib/content";

export default function About() {
  return (
    <section className="border-y border-edge-soft bg-panel">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <Reveal className="lg:col-span-2">
          <p className="font-mono text-xs tracking-[0.35em] text-primary uppercase mb-3">
            {"// who we are"}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-fg leading-tight">
            {ABOUT.heading}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {ABOUT.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="lg:col-span-3 space-y-5">
          {ABOUT.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 150}>
              <p className="text-mut leading-relaxed text-[15px] md:text-base border-l-2 border-edge pl-5 hover:border-primary/50 transition-colors duration-300">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
