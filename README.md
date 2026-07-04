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
- **Candlestick well** — an IMC-style interactive band along the bottom of the
  hero: a field of candlesticks undulates in a slow wave, swells under your
  cursor, and ripples outward when you click. Calm, monochrome, always alive.
- **Interactive market playground** — a landing element you can *play with*:
  your cursor is the order flow, moving fast raises volatility, clicking drops
  a market shock, and a regime meter flips between CALM / ACTIVE / TURBULENT.
- **Decrypt-reveal headlines** — cipher glyphs resolve into copy on every page,
  layout-stable (an invisible placeholder pins the final size so nothing shifts).
- **Live-typing research shell** — a dark ink terminal panel on the Lab page
  types a realistic research/risk status loop.
- **Games & Puzzles highlight** — a featured careers section with the desk's
  game culture (poker night, chess ladder, market-making game, Fermi Fridays)
  plus an **interactive puzzle box**: answer real quant-interview brainteasers
  and get the reasoning.
- **Gaming culture section** on home — poker, chess & Go, strategy games and
  hackathons framed as decision-making training (SIG-style).
- **Careers** — role cards (Quant Researcher, Quant Developer, Quant Trader,
  Data Engineer, AI/ML Engineer, Internship), life-at-the-firm perks, and
  a four-step hiring process. Role cards pre-fill the contact form.
- **Lab monitor cards** — experiments with live status LEDs (`RUNNING`,
  `CALIBRATING`, `BACKTESTING`, `PAUSED`), sparklines and focus tags.
- **Informative quant content** — qualitative, credible copy throughout; no
  fabricated performance numbers or vanity stats.
- **Contact backend** — validated form → API route → SQLite, plus a
  token-protected admin endpoint to read submissions.
- **Dark mode** — a nav toggle (☾ / ☀) switches the entire site to a navy dark
  theme; defaults to the visitor's system preference, persists the choice, and
  applies before first paint (no flash). The interactive canvases adapt live.
- Fully responsive, respects `prefers-reduced-motion`, honest risk disclaimers.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Centered decrypt-reveal hero over an interactive candlestick well, market playground, who-we-are, pillars, gaming culture, careers teaser, CTA |
| `/approach` | Pipeline (Data → Signal → Risk → Execution) + operating principles |
| `/lab` | **Research Lab** — terminal, live experiment cards, and the research gallery (`/research` redirects here) |
| `/careers` | Open roles, Games & Puzzles highlight (interactive puzzle box), perks, hiring process |
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
  approach/ lab/ careers/ contact/   # research merged into lab/
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

Locally, submissions land in `data/iwm.db` with zero setup. In production
(Vercel or any serverless host) set `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`
(free DB at [turso.tech](https://turso.tech)) and the same code persists to
Turso instead — see `.env.example`.

## Deploying (Vercel + GoDaddy domain)

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → sign in with GitHub → **Add New → Project**
   → import the repo → Deploy (Next.js needs no config).
3. Create the production DB: `turso db create iwm-quant`, then add
   `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` and `ADMIN_TOKEN` in
   Vercel → Project → **Settings → Environment Variables** → redeploy.
4. Vercel → Project → **Settings → Domains** → add `iwmquant.com` and
   `www.iwmquant.com`.
5. GoDaddy → your domain → **DNS → Manage DNS**:
   - `A` record, name `@`, value `76.76.21.21`
   - `CNAME` record, name `www`, value `cname.vercel-dns.com`
   - remove any conflicting old `A`/`CNAME` records (e.g. Lovable's)
6. Wait for DNS to propagate; Vercel issues SSL automatically.

## Editing content

All copy lives in [lib/content.ts](lib/content.ts) — the about text, culture
cards, careers roles & perks, hiring steps, lab experiments, research
abstracts, process steps, principles and the office address. Edit that one
file to update the site.

---

*IWM Quant — Detect. Decide. Dominate.*
