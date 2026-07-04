# IWM Quant — Website

> **I Wealth Management Quant**
> *Markets aren't random. They're just encrypted. We hold the key.*

The official website for **IWM Quant** — a systematic trading and research firm.
Built with Next.js (server-rendered, SEO-friendly), a terminal-inspired dark
aesthetic, and a lightweight backend that stores contact enquiries in SQLite.

---

## Highlights

- **Landing "boot" animation** — a one-per-session terminal boot sequence that
  authenticates the visitor, decrypts the feed, scramble-resolves the logo, and
  splits open like a vault to reveal the site (click / Esc to skip).
- **Decrypt-reveal headlines** — cipher glyphs resolve into copy on every page.
- **Live-typing signal terminal** — the hero's `iwm://signal-feed` window types
  a realistic signal/risk/execution loop.
- **Market ticker strip** — marquee of index/FX/commodity quotes under the nav.
- **Count-up stats, self-drawing equity curve & sparklines** — all charts draw
  themselves on scroll.
- **Lab monitor cards** — experiments with live status LEDs (`RUNNING`,
  `CALIBRATING`, `BACKTESTING`, `PAUSED`), sparklines and metrics.
- **Research gallery** — featured paper + abstract cards.
- **Contact backend** — validated form → API route → SQLite, plus a
  token-protected admin endpoint to read submissions.
- Fully responsive, respects `prefers-reduced-motion`, honest risk disclaimers.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Hero (decrypt reveal + live terminal), stats band, pillars, equity curve, CTA |
| `/approach` | Pipeline (Data → Signal → Risk → Execution) + operating principles |
| `/lab` | Active experiments as live monitor cards |
| `/research` | Featured + gallery of research abstracts |
| `/contact` | Contact form (stored in SQLite) + head office details & desk hours |

**Head office:** 1502, One Lodha Place, Lower Parel, Mumbai, Maharashtra 400013, India.

## Tech stack

- **Next.js 15** (App Router, TypeScript, static prerendering for all pages)
- **Tailwind CSS v4** with custom design tokens (terminal green / cyan / amber on near-black)
- **Fonts:** JetBrains Mono (headings, data) + Inter (body)
- **Backend:** Next.js route handler + **`node:sqlite`** (Node 24 built-in — zero native deps)

## Project structure

```
app/                      # routes only — pages stay thin
  page.tsx                # home (composes section components)
  approach/ lab/ research/ contact/
  api/contact/route.ts    # POST: store enquiry · GET: admin list
  layout.tsx  globals.css  not-found.tsx
components/
  layout/                 # Nav, Footer, LandingIntro (boot animation)
  ui/                     # primitives: Reveal, DecryptText, CountUp, SectionHeading, GlowOrbs
  market/                 # data-viz: Ticker, Terminal, Sparkline, EquityCurve
  sections/               # page blocks: home/, lab/, research/, contact/
lib/
  content.ts              # all site copy & data (address, stats, experiments, papers)
  db.ts                   # SQLite storage layer
data/                     # iwm.db (created at runtime, gitignored)
```

## Getting started

Requires **Node.js ≥ 22.5** (uses the built-in `node:sqlite`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Contact backend

Submissions are stored in `data/iwm.db` (`contacts` table).

```bash
# submit (what the form does)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","email":"ada@fund.com","message":"Hello"}'

# read submissions (admin) — set ADMIN_TOKEN in .env first
curl http://localhost:3000/api/contact -H "x-admin-token: <your token>"
```

Copy `.env.example` to `.env` and set a strong `ADMIN_TOKEN`.

## Editing content

All copy lives in [lib/content.ts](lib/content.ts) — ticker symbols, stats,
lab experiments, research abstracts, process steps, principles and the office
address. Edit that one file to update the site.

---

*IWM Quant — Detect. Decide. Dominate.*
