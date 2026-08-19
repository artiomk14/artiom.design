# Project Status

> Last updated: August 19, 2026

---

## Overview

Portfolio website for **artiom.design** — high-performance, accessible, clean modern design.

**Current reality:** Live on Vercel. Public site is the homepage: header (name + socials) → Figma hero → Figma pills + Gems placeholder slots. Light mode only. Owner decided **not to use Sanity**; content will live in the codebase.

---

## Tech Stack

| Layer | Technology | Version | Status |
|-------|------------|---------|--------|
| Framework | Next.js (App Router) | see `package.json` | ✓ Live |
| Language | TypeScript | 5.x | ✓ Configured |
| Styling | Tailwind CSS | 4.x | ✓ Configured |
| Animations | Framer Motion | 12.x | ✓ Installed |
| Corners | Lisse (`@lisse/react`) | 0.6.x | ✓ Squircles on UI surfaces |
| Accent beam | Border Beam (`border-beam`) | 1.3.x | ✓ Opt-in via `Beam` |
| Content | In-repo (no CMS) | — | ○ Tab content pending |
| Hosting | Vercel | — | ✓ Deployed |
| Package Manager | pnpm | 10.x | ✓ Active |

**Legend:** ✓ Ready | ⚠ Needs attention | ○ Pending

---

## Connections & Integrations

### Content (no CMS)

| Approach | Status | Notes |
|----------|--------|-------|
| Headless CMS (Sanity) | ✗ Rejected | Owner: overkill for this portfolio. Do not reconnect. |
| In-repo content | ○ In progress | `src/content/site.ts` holds identity, tabs, SEO; tab panels still empty |
| Legacy Sanity code in repo | ⚠ Debt | Schemas, client, queries still present — remove when adding real tab content |

### Vercel Deployment

| Component | Status | Notes |
|-----------|--------|-------|
| Git repository | ✓ | `github.com/artiomk14/artiom.design` |
| Vercel project | ✓ | Connected; production deploys via Vercel |
| Custom domain | ✓ | `artiom.design` / `www.artiom.design` |
| Vercel URL | ✓ | `artiomdesign.vercel.app` |
| Env vars | ✓ / light | Prefer `NEXT_PUBLIC_SITE_URL`; no Sanity vars |

---

## Project Structure

```
artiom.design/
├── src/
│   ├── app/                    # `/` is the public site
│   │   ├── page.tsx            # Home (Figma hero + tabs)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── about/page.tsx      # LEGACY noindex
│   │   ├── work/page.tsx       # LEGACY noindex
│   │   ├── work/[slug]/page.tsx
│   │   ├── blog/page.tsx       # LEGACY noindex
│   │   ├── blog/[slug]/page.tsx
│   │   ├── lab/page.tsx        # Playground, noindex
│   │   ├── contact/page.tsx    # LEGACY noindex
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/             # Header (name + socials), Footer stubs, etc.
│   │   ├── sections/           # HeroSection + HomeCanvas (tabs)
│   │   ├── motion/             # FadeIn, SlideIn, PageTransition, etc.
│   │   └── ui/                 # Button, Card, Typography, SmoothSurface
│   ├── content/
│   │   └── site.ts             # Identity, tabs, SEO copy
│   ├── lib/
│   │   ├── seo.ts              # Metadata + JSON-LD
│   │   ├── sanity/             # LEGACY — remove (do not extend)
│   │   ├── hooks/
│   │   ├── motion/
│   │   └── utils/
│   ├── styles/tokens/
│   └── types/
├── sanity/schemas/             # LEGACY — remove
├── public/
│   └── brand/                  # Portrait source for favicon / OG
├── AGENTS.md
├── CONTEXT.md                  # Living project context (read first)
└── PROJECT_STATUS.md           # This file
```

---

## Routes

| Route | Type | Notes |
|-------|------|--------|
| `/` | Static | Public site. Figma hero + tabs (default Gems). `?tab=` restores a tab without being a sitemap URL. |
| `/about` | Static | Legacy; `noindex` |
| `/work` | Static | Legacy; `noindex` |
| `/work/[slug]` | Dynamic | 404 until in-repo entries exist |
| `/blog` | Static | Legacy; `noindex` |
| `/blog/[slug]` | Dynamic | 404 until in-repo entries exist |
| `/lab` | Static | Component playground; `noindex` |
| `/contact` | Static | Legacy; `noindex` |

---

## Design System

### Tokens Defined

| Category | Location | Integration |
|----------|----------|-------------|
| Colors | `/src/styles/tokens/colors.ts` | CSS variables in `globals.css` |
| Spacing | `/src/styles/tokens/spacing.ts` | Tailwind defaults |
| Typography | `/src/styles/tokens/typography.ts` | Tailwind + next/font |
| Breakpoints | `/src/styles/tokens/breakpoints.ts` | Figma `breakpoint/*` (xs–3xl); Tailwind `@theme` adds `xs` + `3xl` |
| Containers | `/src/styles/tokens/breakpoints.ts` | Figma `container/*` (0–7xl); `--container-max` = `3xl` (768px) |
| Animation | `/src/styles/tokens/animation.ts` | Framer Motion variants |
| Radius / corners | `/src/styles/tokens/radius.ts` | Lisse `SmoothCorners` via `cornersFor()` |

### CSS Custom Properties

```css
--background, --background-muted, --background-subtle
--foreground, --foreground-muted, --foreground-subtle
--accent, --accent-hover, --accent-muted
--border, --border-muted
--container-0 … --container-7xl, --container-max (= --container-3xl / 768px)
--breakpoint-xs … --breakpoint-3xl
```

Light mode only (`color-scheme: light`). No system dark-mode override. Breakpoint + container tokens aligned with Figma artiom.design Library.

---

## Components Built

### Layout
- `Header` — Name as logo, Twitter / LinkedIn / E-mail actions (not section nav)
- `Footer` — Site footer stub (not in the live layout)
- `Navigation` — Legacy menu stub
- `PageWrapper` — Main content wrapper
- `Section` — Reusable section container
- `HomeCanvas` — Homepage canvas: Figma pills + first Gems walkthrough
- `ContentItem` — Figma `content-item` (124:655): 602px gray holder; gems sit centered inside
- `GemWalkthrough` — Figma `wc26-walktrough` (156:1658): image, copy, 1/3 pager

### Sections
- `HeroSection` — Figma home hero (portrait, Hello, intro, LSports lockup); divider on the inner column, not full-bleed
- `SiteLogo` — 52px squircle portrait; elevation via Lisse `shadow`, not CSS `shadow-xl`
- `CompanyLockup` — LSports mark + name with underline

### UI
- `Button` — Figma `button` 1920px; `variant` `primary` | `transparent` (Lisse squircle)
- `Pill` — Figma navigation pill (selected × state; outline icons stroke-draw on select)
- `Card` / `CardContent` — Content cards (Lisse squircle)
- `SmoothSurface` — Generic Lisse surface; prefer over `rounded-*`
- `Beam` — Opt-in border-beam accent (mono / auto theme by default)
- `Heading` / `Text` — Typography components

### Motion
- `FadeIn`, `SlideIn`, `PageTransition`, `StaggerContainer` / `StaggerItem`

---

## What Works Now

- ✓ Live at `https://artiom.design` (Vercel)
- ✓ `pnpm dev` / `pnpm build` / `pnpm lint`
- ✓ Homepage: Figma hero + Figma pills + first Gems walkthrough + placeholder slots
- ✓ SEO: person-first metadata, JSON-LD, `/sitemap.xml`, `/robots.txt`
- ✓ Favicon / Apple / Open Graph images
- ✓ Responsive layout, light mode, reduced-motion support

---

## What To Do Next (priority)

1. **Tab content** — Remaining Gems, then Heavy Ones / Yapping / Who me
2. **Remove Sanity** — Delete legacy CMS packages and code paths; stop fetching from Sanity
3. **Per-item URLs** — Only when a Heavy One or Yapping post needs to rank or be shared on its own
4. **Analytics** — Only if the owner asks

---

## Commands

```bash
pnpm dev        # localhost:3000
pnpm build      # production build
pnpm start      # run production build locally
pnpm lint       # ESLint
```

---

## Files to Reference

| Purpose | File |
|---------|------|
| AI agent guidelines | `AGENTS.md` |
| bendc frontend practices (adapted) | `AGENTS.md` → Frontend Guidelines |
| Living project context (read first) | `CONTEXT.md` |
| This status document | `PROJECT_STATUS.md` |
