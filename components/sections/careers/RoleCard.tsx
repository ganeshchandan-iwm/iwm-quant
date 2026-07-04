import Link from "next/link";
import type { Role } from "@/lib/content";

const TYPE_STYLES: Record<Role["type"], string> = {
  "Full-time": "border-primary/40 text-primary",
  Internship: "border-cyan/40 text-cyan",
};

export default function RoleCard({ role }: { role: Role }) {
  return (
    <article className="group corner-frame flex h-full flex-col rounded-lg border border-edge bg-panel p-6 transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="flex items-center justify-between font-mono text-[11px] mb-4">
        <span className="text-mut">{role.id}</span>
        <span className={`rounded border px-2 py-0.5 tracking-wider ${TYPE_STYLES[role.type]}`}>
          {role.type.toUpperCase()}
        </span>
      </div>

      <h3 className="font-mono text-xl font-semibold text-fg group-hover:text-primary transition-colors">
        {role.title}
      </h3>
      <p className="mt-1 font-mono text-xs text-mut">
        {role.team} · {role.location}
      </p>

      <p className="mt-4 text-sm text-mut leading-relaxed flex-1">{role.blurb}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {role.skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-edge-soft bg-panel-2 px-2.5 py-1 font-mono text-[11px] text-mut"
          >
            {s}
          </span>
        ))}
      </div>

      <Link
        href={`/contact?role=${encodeURIComponent(role.title)}`}
        className="mt-6 inline-block rounded border border-primary/50 bg-primary/5 px-5 py-2.5 text-center font-mono text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25"
      >
        apply for this role{" "}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </article>
  );
}
