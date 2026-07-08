"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// dark mode disabled for now — import ThemeToggle from "@/components/ui/ThemeToggle";

const LINKS = [
  { href: "/", label: "home" },
  { href: "/approach", label: "approach" },
  { href: "/lab", label: "research lab" },
  { href: "/careers", label: "careers" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-edge-soft bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 py-3">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 [animation:ping-dot_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span id="nav-logo" className="font-mono font-bold tracking-tight text-fg">
            <span className="text-3xl">IWM</span> QUANT
          </span>
          <span className="hidden md:inline font-mono text-[10px] text-mut/70 border border-edge-soft rounded px-1.5 py-0.5 group-hover:border-primary/40 transition-colors">
            SYS ONLINE
          </span>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-1 font-mono text-sm">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3 py-1.5 rounded transition-colors ${
                  active ? "text-primary" : "text-mut hover:text-fg"
                }`}
              >
                <span className="text-primary/60">/</span>
                {l.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
              </Link>
            );
          })}
          <Link
            href="/careers"
            className="ml-3 rounded border border-primary/50 px-4 py-1.5 text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25"
          >
            join us
          </Link>
          {/* dark mode disabled for now — <ThemeToggle className="ml-2" /> */}
        </div>

        {/* mobile toggle */}
        <div className="md:hidden flex items-center gap-1">
          {/* dark mode disabled for now — <ThemeToggle /> */}
          <button
            className="font-mono text-primary text-xl px-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden border-t border-edge-soft bg-bg/95 backdrop-blur-md px-4 pb-4 pt-2 font-mono text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-2 py-2.5 ${
                pathname === l.href ? "text-primary" : "text-mut"
              }`}
            >
              <span className="text-primary/60">/</span>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
