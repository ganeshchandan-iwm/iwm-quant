import type { RESEARCH } from "@/lib/content";

type Paper = (typeof RESEARCH)[number];

export default function ResearchCard({ paper }: { paper: Paper }) {
  return (
    <article
      className={`group h-full rounded-lg border bg-panel/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
        paper.featured
          ? "border-primary/40 corner-frame hover:shadow-primary/15"
          : "border-edge hover:border-cyan/40 hover:shadow-cyan/10"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-[11px] mb-4">
        <span
          className={`rounded border px-2 py-0.5 tracking-wider ${
            paper.featured
              ? "border-primary/40 text-primary"
              : "border-edge text-cyan"
          }`}
        >
          {paper.tag}
        </span>
        <span className="text-mut">
          {paper.id} · {paper.date}
        </span>
      </div>

      <h3
        className={`font-mono text-lg font-semibold leading-snug transition-colors ${
          paper.featured ? "text-primary" : "text-fg group-hover:text-cyan"
        }`}
      >
        {paper.title}
      </h3>

      <p className="mt-3 text-sm text-mut leading-relaxed">{paper.abstract}</p>

      <p className="mt-5 font-mono text-xs text-mut/70 group-hover:text-primary transition-colors">
        abstract only · full paper on request{" "}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </p>
    </article>
  );
}
