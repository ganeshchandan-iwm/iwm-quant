import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LandingIntro from "@/components/layout/LandingIntro";
import "./globals.css";

// Single site-wide typeface. Both --font-mono and --font-sans (see
// globals.css) point at this, so every existing `font-mono`/`font-sans`
// Tailwind utility across the codebase renders Roboto - no per-component
// changes needed.
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iwmquant.com"),
  title: {
    default: "IWM Quant - Markets Decoded | I Wealth Management Quant",
    template: "%s | IWM Quant",
  },
  description:
    "I Wealth Management Quant is a systematic trading and research firm. Markets aren't random - they're just encrypted. We hold the key.",
  keywords: ["quant", "quantitative trading", "systematic trading", "algorithmic trading", "IWM Quant", "Mumbai"],
  openGraph: {
    title: "IWM Quant - Markets Decoded",
    description: "Markets aren't random. They're just encrypted. We hold the key.",
    url: "https://iwmquant.com",
    siteName: "IWM Quant",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IWM Quant - Markets Decoded",
    description: "Markets aren't random. They're just encrypted. We hold the key.",
  },
};

// Applies the saved (or system-preferred) theme before first paint - no flash.
// Dark mode is disabled for now - force light regardless of stored/system pref.
// To re-enable: restore the commented body below (system-pref + localStorage) and
// un-hide the ThemeToggle buttons in components/layout/Nav.tsx.
const themeBootScript = `(function(){try{document.documentElement.classList.remove("dark")}catch(e){}})()`;
// const themeBootScript = `(function(){try{var t=localStorage.getItem("iwm-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <LandingIntro />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
