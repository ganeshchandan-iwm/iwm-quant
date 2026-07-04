# IWM Quant — Website

> **I Wealth Management Quant**
> *Markets aren't random. They're just encrypted. We hold the key.*

The marketing site for IWM Quant — a quantitative trading firm. This repo is the
next iteration of [iwmquant.com](https://iwmquant.com): keep the terminal-hacker
soul, make it feel like a **live trading desk** instead of a static page.

---

## Table of contents
- [Current state](#current-state)
- [Vision](#vision)
- [Design language](#design-language)
- [Pages](#pages)
- [Feature ideas](#feature-ideas)
- [Tech stack](#tech-stack)
- [Roadmap](#roadmap)
- [Getting started](#getting-started)

---

## Current state

The live site (built with Lovable) is a React + Vite + Tailwind + Supabase SPA.
It nails the **voice and the dark aesthetic**, but the experience is mostly
static copy over animated gradients — there is no *live market* feel, and as a
client-only SPA it's invisible to crawlers and link previews.

**What's live today**

| Route | Purpose | Sample copy |
|-------|---------|-------------|
| `/`         | Home / hero | "Markets aren't random. / They're just encrypted. / We hold the key." · "Detect. Decide. Dominate" |
| `/lab`      | Active experiments | Neural Architecture Search — *accuracy 94.7% · latency 0.3ms* |
| `/research` | Research gallery | "Quantum Pattern Recognition in Market Anomalies" |
| `/contact`  | Contact form (Supabase) | "Interested in decoding signals hidden in noise?" |

---

## Vision

The brand metaphor is **"the market is encrypted; we decode it."** Every design
choice should reinforce that: motion, live data, and *decrypt/reveal* moments.
The site should read like the front-end of a real trading system — a terminal
you're allowed to look at, not a brochure.

**Three principles**
1. **Alive, not static** — something is always ticking, streaming, or updating.
2. **Credible, not just cool** — real (or realistic) numbers, research, and disclosures build trust.
3. **Fast and calm** — heavy vibe, light footprint; motion respects the user.

---

## Design language

- **Type:** JetBrains Mono everywhere (monospace = terminal).
- **Palette:** near-black background; terminal-green primary; cyan / blue / yellow accents; green/red for up/down ticks.
- **Texture:** blurred gradient orbs, glow-pulse, "neural drift" rings, scanlines, subtle grid.
- **Signature move:** the **decrypt reveal** — text resolves from scrambled hex/glyphs into legible copy.
- **Motion budget:** tasteful; always honor `prefers-reduced-motion`.

---

## Pages

- **Home** — live-typing terminal streaming signal output, decrypt-reveal hero, tape/order-book background, count-up stats.
- **Lab** — each experiment as a *live monitor* card: sparkline, status LED (`RUNNING`/`PAUSED`), moving metric gauges.
- **Research** — cards → full detail view with abstract, LaTeX-style math, charts, downloadable PDF.
- **Approach** *(new)* — how the firm trades (systematic, market-neutral, etc.), the edge, the process.
- **Team** *(new)* — founders and quants; credibility.
- **Contact** — keep the Supabase form; add "Request access" / investor CTA.

---

## Feature ideas

**Hero / motion**
- [ ] Live-typing terminal feed (`[09:31:04] IWM regime: MEAN-REVERT · conf 0.82`)
- [ ] Decrypt-reveal headline (scrambled → resolved)
- [ ] Candlestick / order-book depth animation behind the fold

**Live data**
- [ ] Top ticker strip: IWM + Russell 2000, price/Δ%, flash on tick
- [ ] Self-drawing equity curve + Sharpe sparkline on scroll
- [ ] Count-up stat tiles (signals/day, backtests run, uptime)

**Interaction**
- [ ] ⌘K command palette that navigates the site like a trading terminal
- [ ] Cursor spotlight / grid reveal on dark sections
- [ ] Optional "market heartbeat" ping on terminal hover

**Trust & conversion**
- [ ] Approach + Team pages
- [ ] Performance / methodology disclosures
- [ ] Clear CTA (Request access / Investor login)

**Craft**
- [ ] SSR/prerender for SEO + real OG link previews
- [ ] Fix OG/Twitter meta (still says "Lovable Generated Project")
- [ ] `prefers-reduced-motion` + performance pass

---

## Tech stack

Current: **React · Vite · TypeScript · Tailwind · shadcn/Radix · Supabase**.

Recommended for the rebuild: migrate to **Astro** or **Next.js** for SSR/prerender
(SEO + link previews), keep Tailwind + shadcn, keep Supabase for the contact form
and research/lab content. Use a lightweight charting lib (e.g. `lightweight-charts`
or `visx`) for the market visuals.

---

## Roadmap

1. **Foundation** — scaffold, design tokens, SSR, fix meta/OG.
2. **Hero** — decrypt reveal + live terminal + ticker.
3. **Lab & Research** — live monitor cards, research detail pages.
4. **Trust** — Approach + Team + disclosures.
5. **Polish** — ⌘K, reduced-motion, Lighthouse pass.

---

## Getting started

```bash
# once scaffolded
npm install
npm run dev      # local dev server
npm run build    # production build
```

---

*IWM Quant — Detect. Decide. Dominate.*
