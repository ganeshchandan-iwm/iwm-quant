import Link from "next/link";
import { OFFICE_ADDRESS } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-edge-soft bg-panel/40">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* brand */}
        <div className="md:col-span-2 space-y-3">
          <p className="font-mono font-bold text-fg">
            IWM<span className="text-primary">·</span>QUANT
          </p>
          <p className="text-mut text-sm leading-relaxed max-w-sm">
            I Wealth Management Quant — a systematic trading and research firm.
            Markets aren&apos;t random. They&apos;re just encrypted.
          </p>
          <p className="font-mono text-xs text-primary/70">
            Detect. Decide. Dominate.
          </p>
        </div>

        {/* nav */}
        <div className="font-mono text-sm space-y-2">
          <p className="text-fg mb-3 text-xs uppercase tracking-widest">Navigate</p>
          {[
            ["/approach", "Approach"],
            ["/lab", "Lab"],
            ["/research", "Research"],
            ["/careers", "Careers"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="block text-mut hover:text-primary transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* office */}
        <div className="font-mono text-sm">
          <p className="text-fg mb-3 text-xs uppercase tracking-widest">Head Office</p>
          <address className="not-italic text-mut leading-relaxed">
            {OFFICE_ADDRESS.line1}
            <br />
            {OFFICE_ADDRESS.line2}
            <br />
            {OFFICE_ADDRESS.city}
            <br />
            {OFFICE_ADDRESS.country}
          </address>
        </div>
      </div>

      <div className="border-t border-edge-soft">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 font-mono text-[11px] text-mut/70">
          <p>© {new Date().getFullYear()} I Wealth Management Quant. All rights reserved.</p>
          <p>
            Trading involves risk. Nothing on this site is investment advice or an offer of
            securities.
          </p>
        </div>
      </div>
    </footer>
  );
}
