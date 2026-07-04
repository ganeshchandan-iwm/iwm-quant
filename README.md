# IWM Quant — Website

> **I Wealth Management Quant**
> *Markets aren't random. They're just encrypted. We hold the key.*

The official website for **IWM Quant** — a systematic trading and research firm.
Built with Next.js (server-rendered, SEO-friendly), a **light, bluish, modern
trading-firm aesthetic** (inspired by the polish of IMC and SIG), and a
lightweight backend that stores contact enquiries in SQLite.

---

## Highlights

- **Landing "boot" animation** — a one-per-session dark-navy terminal boot
  sequence that authenticates the visitor, scramble-resolves the logo, and
  splits open like a vault to reveal the light site (click / Esc to skip).
- **Interactive market playground** — a landing element you can *play with*:
  your cursor is the order flow, moving fast raises volatility, clicking drops
  a market shock, and a regime meter flips between CALM / ACTIVE / TURBULENT.
- **Decrypt-reveal headlines** — cipher glyphs resolve into copy on every page.
- **Live-typing research shell** — a dark ink terminal panel in the hero types
  a realistic research/risk status loop.
- **Gaming culture section** — poker nights, chess & Go, strategy games and
  hackathons framed as decision-making training (SIG-style).
- **Careers** — role cards (Quant Researcher, Quant Developer, Quant Trader,
  Data Engineer, Internship, Graduate Programme), life-at-the-firm perks, and
  a four-step hiring process. Role cards pre-fill the contact form.
- **Lab monitor cards** — experiments with live status LEDs (`RUNNING`,
  `CALIBRATING`, `BACKTESTING`, `PAUSED`), sparklines and focus tags.
- **Informative quant content** — qualitative, credible copy throughout; no
  fabricated performance numbers or vanity stats.
- **Contact backend** — validated form → API route → SQLite, plus a
  token-protected admin endpoint to read submissions.
- Fully responsive, respects `prefers-reduced-motion`, honest risk disclaimers.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Hero (decrypt reveal + research shell), interactive market playground, who-we-are, pillars, gaming culture, careers teaser, CTA |
| `/approach` | Pipeline (Data → Signal → Risk → Execution) + operating principles |
| `/lab` | Active experiments as live monitor cards |
| `/research` | Featured + gallery of research abstracts |
| `/careers` | Open roles, life at IWM Quant, hiring process |
| `/contact` | Contact form (stored in SQLite) + head office details & desk hours |

**Head office:** 1502, One Lodha Place, Lower Parel, Mumbai, Maharashtra 400013, India.

## Tech stack

- **Next.js 15** (App Router, TypeScript, static prerendering for all pages)
- **Tailwind CSS v4** with custom design tokens (blue / cyan / amber on ice-white,
  with dark-navy "ink" panels for terminal moments)
- **Fonts:** JetBrains Mono (headings, data) + Inter (body)
- **Backend:** Next.js route handler + **`node:sqlite`** (Node 24 built-in — zero native deps)

## Project structure

```
app/                      # routes only — pages stay thin
  page.tsx                # home (composes section components)
  approach/ lab/ research/ careers/ contact/
  api/contact/route.ts    # POST: store enquiry · GET: admin list
  layout.tsx  globals.css  not-found.tsx
components/
  layout/                 # Nav, Footer, LandingIntro (boot animation)
  ui/                     # primitives: Reveal, DecryptText, SectionHeading, GlowOrbs
  market/                 # Terminal, Sparkline, MarketPlayground (interactive)
  sections/               # page blocks: home/, lab/, research/, careers/, contact/
lib/
  content.ts              # all site copy & data (address, culture, roles, experiments, papers)
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

All copy lives in [lib/content.ts](lib/content.ts) — the about text, culture
cards, careers roles & perks, hiring steps, lab experiments, research
abstracts, process steps, principles and the office address. Edit that one
file to update the site.

---

*IWM Quant — Detect. Decide. Dominate.*
