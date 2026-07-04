"use client";

import { useEffect, useState } from "react";

/**
 * Light/dark theme switch. The actual theme is a `dark` class on <html>,
 * set before paint by the inline boot script in layout.tsx (system
 * preference by default); this button flips it and persists the choice.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("iwm-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`rounded border border-edge px-2.5 py-1.5 font-mono text-sm text-mut transition-colors duration-300 hover:border-primary/50 hover:text-primary ${className}`}
    >
      {/* render both glyphs on the server, reveal after mount to avoid hydration mismatch */}
      <span style={{ opacity: dark === null ? 0 : 1 }}>{dark ? "☀" : "☾"}</span>
    </button>
  );
}
