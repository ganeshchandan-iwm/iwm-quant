import type { Metadata } from "next";
import GlowOrbs from "@/components/ui/GlowOrbs";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import DecryptText from "@/components/ui/DecryptText";
import RoleCard from "@/components/sections/careers/RoleCard";
import GamesPuzzles from "@/components/sections/careers/GamesPuzzles";
import { ROLES, PERKS, HIRING_STEPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at IWM Quant — quantitative researchers, developers, traders, internships and our graduate programme in Mumbai.",
};

export default function CareersPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <GlowOrbs />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
        {/* intro */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs tracking-[0.35em] text-primary uppercase mb-4">
            {"// careers"}
          </p>
          <h1 className="font-mono text-4xl md:text-6xl font-bold tracking-tight">
            <DecryptText text="Build your edge with us." className="text-fg" />
          </h1>
          <Reveal delay={300}>
            <p className="mt-6 text-mut text-lg leading-relaxed">
              We hire people who love the game more than the title — mathematicians,
              engineers and competitors who want their ideas tested against reality every
              single day. Small desk, real ownership, no politics.
            </p>
          </Reveal>
        </div>

        {/* open roles */}
        <SectionHeading
          kicker="open roles"
          title="Where do you fit?"
          sub="Every role sits on one open desk in Lower Parel, Mumbai — research, technology and trading side by side."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {ROLES.map((role, i) => (
            <Reveal key={role.id} delay={(i % 3) * 130}>
              <RoleCard role={role} />
            </Reveal>
          ))}
        </div>

        {/* games & puzzles — the highlight */}
        <GamesPuzzles />

        {/* life at IWM */}
        <SectionHeading
          kicker="life at iwm quant"
          title="Serious work. Serious play."
          sub="The desk runs on curiosity, coffee and competition — here's what that looks like day to day."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 110}>
              <div className="group h-full rounded-lg border border-edge bg-panel p-6 transition-all duration-500 hover:border-cyan/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan/10">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/5 text-lg transition-transform duration-500 group-hover:scale-110">
                  {p.icon}
                </span>
                <h3 className="mt-3 font-mono text-base font-semibold text-fg group-hover:text-cyan transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-mut leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* hiring process */}
        <SectionHeading
          kicker="how we hire"
          title="Four steps. No mazes."
          sub="The whole process usually takes two to three weeks — and we tell you where you stand at every step."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {HIRING_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 150}>
              <div className="group relative h-full rounded-lg border border-edge bg-panel p-6 transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <span className="font-mono text-4xl font-bold text-primary/20 group-hover:text-primary/60 transition-colors">
                  {s.n}
                </span>
                <h3 className="mt-3 font-mono text-lg font-semibold text-fg">{s.title}</h3>
                <p className="mt-2 text-sm text-mut leading-relaxed">{s.body}</p>
                {i < HIRING_STEPS.length - 1 && (
                  <span className="hidden md:block absolute top-1/2 -right-4 text-primary/50 font-mono animate-glow-pulse">
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
