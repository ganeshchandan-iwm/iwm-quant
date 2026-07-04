import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="relative z-10 space-y-6">
        <p className="font-mono text-7xl md:text-8xl font-bold text-primary tracking-tight">
          404
        </p>
        <p className="font-mono text-mut">
          {"> signal lost. this route decodes to nothing."}
          <span className="animate-blink text-primary">▌</span>
        </p>
        <Link
          href="/"
          className="inline-block rounded border border-primary/60 bg-primary/10 px-6 py-3 font-mono text-primary transition-all duration-300 hover:bg-primary hover:text-bg"
        >
          ← return to base
        </Link>
      </div>
    </div>
  );
}
