import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { VALUES } from "@/lib/content";

/** Team character & attitude - the human traits behind the models. */
export default function Values() {
  return (
    <section className="border-b border-edge-soft bg-panel-2/40">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        <SectionHeading kicker="how we work" title={VALUES.heading} sub={VALUES.intro} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.items.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 130}>
              <div className="group h-full rounded-lg border border-edge bg-panel/70 p-6 transition-all duration-500 hover:border-primary/40 hover:bg-panel hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/5 text-xl text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {v.icon}
                </span>
                <h3 className="mt-4 font-mono text-lg font-semibold text-fg group-hover:text-primary transition-colors">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-mut leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
