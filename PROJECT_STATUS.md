# Project Status

> Last updated: March 31, 2026

---

## Overview

Portfolio website foundation for **artiom.design** — a high-performance, accessible site built with modern technologies.

---

## Tech Stack

| Layer | Technology | Version | Status |
|-------|------------|---------|--------|
| Framework | Next.js (App Router) | 15.x | ✓ Installed |
| Language | TypeScript | 5.x | ✓ Configured |
| Styling | Tailwind CSS | 4.x | ✓ Configured |
| Animations | Framer Motion | 12.x | ✓ Installed |
| CMS | Sanity | 5.x | ⚠ Needs credentials |
| Hosting | Vercel | — | ○ Not deployed |
| Package Manager | pnpm | 10.x | ✓ Active |

**Legend:** ✓ Ready | ⚠ Needs setup | ○ Pending

---

## Connections & Integrations

### Sanity CMS

| Component | Status | Notes |
|-----------|--------|-------|
| Schemas defined | ✓ | work, blog, author, siteSettings |
| Client configured | ✓ | `/src/lib/sanity/client.ts` |
| GROQ queries | ✓ | `/src/lib/sanity/queries.ts` |
| Image helper | ✓ | `/src/lib/sanity/image.ts` |
| Project connected | ✗ | Missing `.env.local` credentials |
| Studio embedded | ✗ | Not yet set up |

**Required environment variables:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

### Vercel Deployment

| Component | Status |
|-----------|--------|
| Git repository | ✗ Not pushed |
| Vercel project | ✗ Not created |
| Environment variables | ✗ Not configured |
| Domain | ✗ Not connected |

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
│   │   └── ui/                 # Button, Card, Typography
│   ├── lib/
│   │   ├── sanity/             # CMS client & queries
│   │   ├── hooks/              # useMediaQuery, useScrollProgress, etc.
│   │   ├── motion/             # Animation variants
│   │   └── utils/              # cn() utility
│   ├── styles/tokens/          # Design system tokens
│   └── types/                  # TypeScript definitions
├── sanity/schemas/             # CMS content schemas
├── public/                     # Static assets
├── AGENTS.md                   # AI agent guidelines
├── CONTEXT.md                  # Project context (living doc)
└── .env.local.example          # Environment template
```

---

## Routes

| Route | Type | Content Source |
|-------|------|----------------|
| `/` | Static | Hardcoded (placeholder) |
| `/about` | Static | Hardcoded (placeholder) |
| `/work` | Static | Will fetch from Sanity |
| `/work/[slug]` | Dynamic | Will fetch from Sanity |
| `/blog` | Static | Will fetch from Sanity |
| `/blog/[slug]` | Dynamic | Will fetch from Sanity |
| `/lab` | Static | Hardcoded (placeholder) |
| `/contact` | Static | Hardcoded (placeholder) |

---

## Design System

### Tokens Defined

| Category | Location | Integration |
|----------|----------|-------------|
| Colors | `/styles/tokens/colors.ts` | CSS variables in `globals.css` |
| Spacing | `/styles/tokens/spacing.ts` | Tailwind defaults |
| Typography | `/styles/tokens/typography.ts` | Tailwind + next/font |
| Breakpoints | `/styles/tokens/breakpoints.ts` | Tailwind defaults |
| Animation | `/styles/tokens/animation.ts` | Framer Motion variants |

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
- `Button` — Primary, secondary, ghost, link variants
- `Card` / `CardContent` — Content cards
- `Heading` / `Text` — Typography components

### Motion
- `FadeIn` — Fade with directional movement
- `SlideIn` — Full slide animations
- `PageTransition` — Route transition wrapper
- `StaggerContainer` / `StaggerItem` — List animations

---

## What Works Now

- ✓ `pnpm dev` — Development server runs
- ✓ `pnpm build` — Production build passes
- ✓ `pnpm lint` — No errors or warnings
- ✓ All routes render with placeholder content
- ✓ Responsive layout (mobile-first)
- ✓ Dark mode (system preference)
- ✓ Reduced motion support

---

## What Needs Setup

1. **Sanity Connection**
   - Create project at sanity.io/manage
   - Add credentials to `.env.local`
   - Test content fetching

2. **Vercel Deployment**
   - Push to GitHub/GitLab
   - Connect to Vercel
   - Add environment variables
   - Connect domain

3. **Content & Design**
   - Design page layouts
   - Create actual content in Sanity
   - Implement mobile menu
   - Add contact form functionality

---

## Commands

```bash
pnpm dev        # Start development server (localhost:3000)
pnpm build      # Create production build
pnpm start      # Run production build locally
pnpm lint       # Check for linting errors
```

---

## Files to Reference

| Purpose | File |
|---------|------|
| AI agent guidelines | `AGENTS.md` |
| Project context (update as you go) | `CONTEXT.md` |
| Environment template | `.env.local.example` |
| This status document | `PROJECT_STATUS.md` |
