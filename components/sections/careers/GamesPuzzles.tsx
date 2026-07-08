import Reveal from "@/components/ui/Reveal";
import PuzzleBox from "@/components/sections/careers/PuzzleBox";
import MarketMakingGame from "@/components/interactive/MarketMakingGame";
import { GAMES } from "@/lib/content";

/** Highlighted Games & Puzzles section - the loudest part of the culture. */
export default function GamesPuzzles() {
  return (
    <section id="games" className="relative mb-24 scroll-mt-24">
      {/* highlight frame */}
      <div className="corner-frame relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/[0.06] via-panel to-cyan/[0.05] p-6 md:p-10">
        <Reveal className="mb-10 text-center">
          <p className="font-mono text-xs tracking-[0.35em] text-primary uppercase mb-3">
            {"// the highlight"}
          </p>
          <h2 className="font-mono text-3xl md:text-5xl font-bold tracking-tight text-fg">
            <span className="text-primary">{GAMES.heading}</span>
          </h2>
          <p className="mt-4 text-mut max-w-3xl mx-auto leading-relaxed">{GAMES.intro}</p>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* what we play */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GAMES.items.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 110 + Math.floor(i / 2) * 70}>
                <div className="group h-full rounded-lg border border-edge bg-panel p-5 transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/5 text-base text-primary transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      {g.icon}
                    </span>
                    <h3 className="font-mono text-sm font-semibold text-fg group-hover:text-primary transition-colors leading-snug">
                      {g.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[13px] text-mut leading-relaxed">{g.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={500} className="sm:col-span-2">
              <p className="rounded-lg border border-dashed border-primary/30 bg-primary/[0.04] px-4 py-3 text-center font-mono text-xs text-primary">
                ♟ {GAMES.note}
              </p>
            </Reveal>
          </div>

          {/* try one now */}
          <Reveal delay={200} className="lg:sticky lg:top-24">
            <PuzzleBox />
          </Reveal>
        </div>

        {/* play the interview */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Reveal>
            <MarketMakingGame />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
