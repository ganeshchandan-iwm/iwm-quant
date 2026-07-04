import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="font-mono text-xs tracking-[0.35em] text-primary/80 uppercase mb-3">
        {"// "}
        {kicker}
      </p>
      <h2 className="font-mono text-3xl md:text-5xl font-bold tracking-tight text-fg">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-mut max-w-2xl mx-auto leading-relaxed">{sub}</p>
      )}
      <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
    </Reveal>
  );
}
