import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-24">
      <Reveal>
        <div className="corner-frame relative overflow-hidden rounded-lg border border-edge bg-gradient-to-br from-panel via-panel-2 to-panel p-10 md:p-14 text-center scanline">
          <p className="font-mono text-xs tracking-[0.35em] text-primary/80 uppercase mb-4">
            {"// transmission"}
          </p>
          <h2 className="font-mono text-2xl md:text-4xl font-bold text-fg">
            Interested in decoding signals{" "}
            <span className="text-shimmer">hidden in noise?</span>
          </h2>
          <p className="mt-4 text-mut max-w-xl mx-auto">
            Let&apos;s talk markets, math, and beyond. Investors, researchers and engineers
            welcome.
          </p>
          <Link
            href="/contact"
            className="group mt-8 inline-block rounded border border-primary/60 bg-primary/10 px-8 py-3.5 font-mono text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/25"
          >
            open a channel{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
