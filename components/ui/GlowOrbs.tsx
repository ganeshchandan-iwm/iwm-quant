/** Ambient blurred glow orbs + drifting ring, used behind sections. */
export default function GlowOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full bg-primary/8 blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-cyan/8 blur-3xl animate-float-slow [animation-delay:-6s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full border border-primary/10 animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] rounded-full border border-cyan/10 animate-spin-slow [animation-direction:reverse]" />
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/60 animate-glow-pulse" />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan/60 animate-glow-pulse [animation-delay:-1.2s]" />
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-amber/50 animate-glow-pulse [animation-delay:-2.1s]" />
    </div>
  );
}
