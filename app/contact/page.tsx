import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import DecryptText from "@/components/ui/DecryptText";
import ContactForm from "@/components/sections/contact/ContactForm";
import LatencyPing from "@/components/interactive/LatencyPing";
import { OFFICE_ADDRESS, HR_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with IWM Quant — 1502, One Lodha Place, Lower Parel, Mumbai.",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs tracking-[0.35em] text-primary/80 uppercase mb-4">
            {"// contact"}
          </p>
          <h1 className="font-mono text-4xl md:text-6xl font-bold tracking-tight">
            <DecryptText text="Join us." className="text-fg" />
          </h1>
          <Reveal delay={300}>
            <p className="mt-6 text-mut text-lg leading-relaxed">
              Interested in decoding signals hidden in noise? Let&apos;s talk markets, math,
              and beyond.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl">
          {/* form */}
          <Reveal className="lg:col-span-3">
            <div className="corner-frame rounded-lg border border-edge bg-panel/80 p-6 md:p-8">
              <p className="font-mono text-xs text-mut mb-6">
                <span className="text-primary">$</span> ./secure-transmission --to=iwm-desk
              </p>
              <ContactForm />
            </div>
          </Reveal>

          {/* office info */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal delay={150}>
              <div className="rounded-lg border border-edge bg-panel/70 p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
                  ▸ head office
                </p>
                <address className="not-italic font-mono text-sm text-fg leading-loose">
                  IWM Quant
                  <br />
                  <span className="text-mut">
                    {OFFICE_ADDRESS.line1}
                    <br />
                    {OFFICE_ADDRESS.line2}
                    <br />
                    {OFFICE_ADDRESS.city}
                    <br />
                    {OFFICE_ADDRESS.country}
                  </span>
                </address>
                <div className="mt-4 border-t border-edge-soft pt-4 font-mono text-sm">
                  <p className="text-xs uppercase tracking-widest text-mut mb-1">
                    careers &amp; applications
                  </p>
                  <a
                    href={`mailto:${HR_EMAIL}`}
                    className="text-primary transition-colors hover:text-primary-dim"
                  >
                    {HR_EMAIL}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="rounded-lg border border-edge bg-panel/70 p-6 font-mono text-sm space-y-3">
                <p className="text-xs uppercase tracking-widest text-primary mb-4">
                  ▸ desk hours
                </p>
                <div className="flex justify-between text-mut">
                  <span>Mon – Fri</span>
                  <span className="text-fg">08:30 – 19:00 IST</span>
                </div>
                <div className="flex justify-between text-mut">
                  <span>Market hours</span>
                  <span className="text-primary">systems always on</span>
                </div>
              </div>
            </Reveal>

            {/* <Reveal delay={450}>
              <LatencyPing />
            </Reveal> */}

            <Reveal delay={600}>
              <div className="rounded-lg border border-edge-soft bg-panel/50 p-6 font-mono text-xs text-mut leading-relaxed">
                <span className="text-primary">i</span> Your details are stored securely and
                used only to respond to your enquiry. We never share contact data.
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
