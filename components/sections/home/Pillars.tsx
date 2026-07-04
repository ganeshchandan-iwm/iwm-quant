import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { PILLARS } from "@/lib/content";

export default function Pillars() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
      <SectionHeading
        kicker="what we do"
        title="Three disciplines. One system."
        sub="Every anomaly is an opportunity — we just know where to look."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 150}>
            <div className="group corner-frame h-full rounded-lg border border-edge bg-panel/70 p-7 transition-all duration-500 hover:border-primary/40 hover:bg-panel-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <span className="font-mono text-3xl text-primary/70 group-hover:text-primary transition-colors">
                {p.icon}
              </span>
              <h3 className="mt-4 font-mono text-xl font-semibold text-fg group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="mt-3 text-mut text-sm leading-relaxed">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
