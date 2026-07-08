import Reveal from "@/components/ui/Reveal";

/**
 * Philosophy as the site's signature motif: a dark research-shell window that
 * "cats" philosophy.md — market-as-game, the puzzle we solve for fun, the
 * technology×people synergy, and patient tortoise-scaling, all in one read.
 */
export default function Manifesto() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-8 py-20 md:py-28">
        <Reveal>
          <div className="corner-frame rounded-lg border border-ink-2 bg-ink shadow-2xl shadow-primary/15 overflow-hidden">
            {/* title bar */}
            <div className="flex items-center justify-between border-b border-ink-2 bg-ink-2/80 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-down/70" />
                <span className="w-3 h-3 rounded-full bg-amber/70" />
                <span className="w-3 h-3 rounded-full bg-primary/70" />
              </div>
              <span className="font-mono text-[11px] tracking-widest text-sky/70 uppercase">
                iwm://philosophy — read-only
              </span>
              <span className="w-12" aria-hidden />
            </div>

            {/* body */}
            <div className="px-5 py-6 md:px-8 md:py-8 font-mono text-[13px] md:text-sm leading-relaxed text-sky space-y-4">
              <p className="text-sky/70">
                <span className="text-primary">$</span> cat philosophy.md
              </p>

              <div className="space-y-1 text-sky/55">
                <p>{"// the market is the ultimate game —"}</p>
                <p>{"//   the sum of all human knowledge and behaviour,"}</p>
                <p>{"//   encrypted as price."}</p>
              </div>

              <p className="text-sky">
                We treat it as a puzzle. Solving it is the challenge — and the
                challenge is exactly what makes it fun.
              </p>

              {/* the edge equation */}
              <div className="rounded border border-sky/15 bg-sky/[0.03] px-4 py-4">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base">
                  <span className="text-sky/50">edge</span>
                  <span className="text-sky/40">=</span>
                  <span className="text-primary">best of technology</span>
                  <span className="text-sky/40">×</span>
                  <span className="text-cyan">best of people</span>
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[12px] text-sky/50">
                  <p>
                    <span className="text-primary/80">technology</span> · HFT ·
                    data · infrastructure
                  </p>
                  <p>
                    <span className="text-cyan/80">people</span> · traders ·
                    researchers · game theorists
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-sky/55">
                <p>{"// and we play it like the tortoise:"}</p>
                <p>{"//   patient, compounding, never mistaking motion for progress."}</p>
              </div>

              <p className="text-sky/70">
                <span className="text-primary">$</span>{" "}
                <span className="animate-blink">▌</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
