import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ROLES } from "@/lib/content";

export default function CareersTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
      <SectionHeading
        kicker="careers"
        title="Puzzle people wanted"
        sub="Researchers, developers, traders and students who'd rather solve hard problems with sharp teammates than sit three approvals away from anything real."
      />

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {ROLES.map((r, i) => (
          <Reveal key={r.id} delay={i * 90}>
            <Link
              href="/careers"
              className="group flex items-center gap-3 rounded-lg border border-edge bg-panel px-5 py-3 font-mono text-sm transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
            >
              <span className="text-fg group-hover:text-primary transition-colors">
                {r.title}
              </span>
              <span className="rounded-full border border-edge-soft bg-panel-2 px-2 py-0.5 text-[10px] uppercase tracking-wider text-mut">
                {r.type}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="text-center">
        <Link
          href="/careers"
          className="group inline-block rounded border border-primary/60 bg-primary/10 px-8 py-3.5 font-mono text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/25"
        >
          see open roles{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
