import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LandingIntro from "@/components/layout/LandingIntro";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://iwmquant.com"),
  title: {
    default: "IWM Quant — Markets Decoded | I Wealth Management Quant",
    template: "%s | IWM Quant",
  },
  description:
    "I Wealth Management Quant is a systematic trading and research firm. Markets aren't random — they're just encrypted. We hold the key.",
  keywords: ["quant", "quantitative trading", "systematic trading", "algorithmic trading", "IWM Quant", "Mumbai"],
  openGraph: {
    title: "IWM Quant — Markets Decoded",
    description: "Markets aren't random. They're just encrypted. We hold the key.",
    url: "https://iwmquant.com",
    siteName: "IWM Quant",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IWM Quant — Markets Decoded",
    description: "Markets aren't random. They're just encrypted. We hold the key.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <LandingIntro />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
