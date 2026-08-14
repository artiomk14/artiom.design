# Project Status

> Last updated: August 14, 2026

---

## Overview

Portfolio website for **artiom.design** — high-performance, accessible, clean modern design.

**Current reality:** Foundation is **live on Vercel**. Pages are placeholders. Owner decided **not to use Sanity**; content will live in the codebase.

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
| Content | In-repo (no CMS) | — | ○ Design + content pending |
| Hosting | Vercel | — | ✓ Deployed |
| Package Manager | pnpm | 10.x | ✓ Active |

**Legend:** ✓ Ready | ⚠ Needs attention | ○ Pending

---

## Connections & Integrations

### Content (no CMS)

| Approach | Status | Notes |
|----------|--------|-------|
| Headless CMS (Sanity) | ✗ Rejected | Owner: overkill for this portfolio. Do not reconnect. |
| In-repo content | ○ Planned | Hardcoded pages, local data modules, and/or MDX later if needed |
| Legacy Sanity code in repo | ⚠ Debt | Schemas, client, queries still present — remove when touching Work/Blog |

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
│   ├── app/                    # Pages (App Router)
│   │   ├── page.tsx            # Home
│   │   ├── about/page.tsx
│   │   ├── work/page.tsx
│   │   ├── work/[slug]/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── lab/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/             # Header, Footer, Navigation, etc.
│   │   ├── motion/             # FadeIn, SlideIn, PageTransition, etc.
│   │   └── ui/                 # Button, Card, Typography, SmoothSurface
│   ├── lib/
│   │   ├── sanity/             # LEGACY — remove (do not extend)
│   │   ├── hooks/
│   │   ├── motion/
│   │   └── utils/
│   ├── styles/tokens/
│   └── types/
├── sanity/schemas/             # LEGACY — remove
├── public/
├── AGENTS.md
├── CONTEXT.md                  # Living project context (read first)
└── PROJECT_STATUS.md           # This file
```

---

## Routes

| Route | Type | Content Source |
|-------|------|----------------|
| `/` | Static | Hardcoded (placeholder) |
| `/about` | Static | Hardcoded (placeholder) |
| `/work` | Static | Placeholder; still has leftover Sanity fetch — migrate to in-repo content |
| `/work/[slug]` | Dynamic | Same as Work |
| `/blog` | Static | Placeholder; leftover Sanity fetch — migrate to in-repo content |
| `/blog/[slug]` | Dynamic | Same as Blog |
| `/lab` | Static | Hardcoded (placeholder) |
| `/contact` | Static | Hardcoded (placeholder) |

---

## Design System

### Tokens Defined

| Category | Location | Integration |
|----------|----------|-------------|
| Colors | `/src/styles/tokens/colors.ts` | CSS variables in `globals.css` |
| Spacing | `/src/styles/tokens/spacing.ts` | Tailwind defaults |
| Typography | `/src/styles/tokens/typography.ts` | Tailwind + next/font |
| Breakpoints | `/src/styles/tokens/breakpoints.ts` | Tailwind defaults |
| Animation | `/src/styles/tokens/animation.ts` | Framer Motion variants |
| Radius / corners | `/src/styles/tokens/radius.ts` | Lisse `SmoothCorners` via `cornersFor()` |

### CSS Custom Properties

```css
--background, --background-muted, --background-subtle
--foreground, --foreground-muted, --foreground-subtle
--accent, --accent-hover, --accent-muted
--border, --border-muted
```

Dark mode supported via `prefers-color-scheme`.

---

## Components Built

### Layout
- `Header` — Fixed navigation with logo and links
- `Footer` — Site footer with social links
- `Navigation` — Navigation menu with active states
- `PageWrapper` — Main content wrapper
- `Section` — Reusable section container

### UI
- `Button` — Primary, secondary, ghost, link variants (Lisse squircle except link)
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
- ✓ All routes render (placeholder content)
- ✓ Responsive layout, system dark mode, reduced-motion support

---

## What To Do Next (priority)

1. **Design & content** — Real layouts for Home + Work first; put case studies/copy in the repo
2. **Remove Sanity** — Delete legacy CMS packages and code paths; stop fetching from Sanity
3. **Polish** — Mobile menu, contact form, SEO (sitemap / robots)
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
