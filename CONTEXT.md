# Project Context

This file tracks the current state of the portfolio project. **Update this file as progress is made.**

---

## Current Phase

**Homepage: Figma hero + content canvas** — Header, Figma `hero-section`, Figma `content_container` (pills + Gems placeholder slots). Light mode only.

---

## Product Decisions (owner: Artiom)

| Decision | Status | Notes |
| -------- | ------ | ----- |
| **No Sanity / no headless CMS** | Confirmed 2026-08-14 | Overkill for a personal portfolio. Content should live in the codebase (pages, local data modules, or similar). Do not set up or extend Sanity. |
| **Single-page IA** | Confirmed 2026-08-18 | Public site is `/`. Four tabs under the hero (Gems, Heavy Ones, Yapping, Who me). Tabs do not navigate — client state + `history.replaceState`. Default tab: Gems. Canonical is always `/`. |
| **Hosting on Vercel** | Live | Connected; production deploys from GitHub. |
| **Domain** | Live | `https://artiom.design` (also `https://www.artiom.design`, `https://artiomdesign.vercel.app`) |

---

## Completed

- [x] Project initialization (Next.js, TypeScript, Tailwind CSS 4)
- [x] Dependencies installed (Framer Motion, utilities; Sanity packages still present but **deprecated — remove**)
- [x] Folder structure created
- [x] Design tokens defined (colors, spacing, typography, breakpoints, animation)
- [x] Tailwind configured with CSS custom properties
- [x] Utility functions (`cn`)
- [x] Custom hooks (useMediaQuery, useScrollProgress, usePrefersReducedMotion)
- [x] Motion variants and wrapper components
- [x] Layout components (Header, Footer, Navigation, PageWrapper, Section)
- [x] UI components (Button, Typography, Card, SmoothSurface, Beam)
- [x] Lisse squircles for surface radii (`@lisse/react` + radius tokens)
- [x] Border Beam accent wrapper (`border-beam` via `Beam`, opt-in)
- [x] Adopted bendc frontend guidelines (documented in AGENTS.md; light CSS/layout alignment)
- [x] All route pages created (bodies cleared for redesign)
- [x] 404 page
- [x] AGENTS.md / PROJECT_STATUS.md documentation
- [x] Deployed to Vercel with custom domain `artiom.design`
- [x] Light mode locked (no `prefers-color-scheme` dark override)
- [x] Page content wiped to blank canvas (shell preserved)
- [x] Header logo/nav and Footer removed from layout (stubs remain for redesign)
- [x] Figma 1920px primary button + top bar (`nav-container`)
- [x] Figma 1920px transparent button (`class=transparent` on the same `Button`)
- [x] Figma `hero-section` (110:563) on Home — site-logo, Hello, intro, LSports lockup
- [x] Homepage tab shell (Gems / Heavy Ones / Yapping / Who me) without full-page navigation
- [x] Figma `pill` navigation (145:1021) — selected/unselected × enabled/hovered/focused/pressed; per-tab leading icons
- [x] Pill outline icons (diamond / briefcase / pencil / user) with stroke-draw on tab switch
- [x] Figma `content_container` (124:583) outlines — tab gap/padding + Gems `content-item` placeholders
- [x] First Gems entry: Figma `wc26-walktrough` (156:1658) interactive 3-step card + complete state
- [x] Person-first SEO (metadata, JSON-LD, sitemap, robots)
- [x] Favicon / Apple / Open Graph images (OG still from `public/brand/portrait.png`; tab icon is the memoji avatar)

---

## Pending

- [ ] **Remove Sanity** from the codebase (deps, `/sanity`, `/src/lib/sanity`, related types) and use in-repo content instead
- [ ] Real tab content (remaining Gems, Heavy Ones, Yapping, Who Me?)
- [ ] Per-item URLs only when a Heavy One or Yapping post needs to rank or be shared
- [ ] Analytics (only if requested)

---

## Active Work

*Figma `content-item` (124:655) holds each gem (20px sides, 128px top, 144px bottom; height follows the gem’s max). First gem is the WC26 walkthrough with a complete step. Remaining slots stay empty. Next: more Gems. Run Again is later.*

---

## Design Decisions

| Decision | Rationale | Date |
| -------- | --------- | ---- |
| Tailwind CSS v4 | Ships with modern Next.js, CSS-first configuration | 2026-03-31 |
| CSS custom properties for tokens | Single source of truth for theming | 2026-03-31 |
| Light mode only | Fresh canvas; no system dark-mode override | 2026-08-15 |
| Figma-aligned breakpoints & containers | Match artiom.design Library `breakpoint/*` + `container/*`; site max-width = `container/3xl` (768px) | 2026-08-15 |
| Grand Hotel for the Hello greeting | Figma `hero-section` (110:564) uses Grand Hotel Regular 48/36; loaded via next/font as `--font-display` | 2026-08-20 |
| Lisse squircles for radii | Figma/iOS continuous corners instead of CSS border-radius on UI surfaces | 2026-08-14 |
| Border Beam (opt-in) | Animated border accent via `border-beam` / `Beam`; mono + modest strength by default | 2026-08-14 |
| bendc frontend guidelines | Adopt HTML/CSS/JS practices from bendc/frontend-guidelines (adapted in AGENTS.md) | 2026-08-14 |
| Server Components by default | Better performance, reduced JS bundle | 2026-03-31 |
| Motion components with reduced-motion | Accessibility compliance | 2026-03-31 |
| pnpm package manager | Fastest, disk efficient | 2026-03-31 |
| No headless CMS | Portfolio updates are infrequent; keep content in-repo | 2026-08-14 |
| Single homepage + four tabs | Content sits under the hero; tab switches must not reload the page | 2026-08-18 |
| Lisse shadows on squircles | CSS `shadow-*` on the square Lisse wrapper paints sharp corners; site-logo uses Lisse `shadow.xlLayers` | 2026-08-19 |
| Figma pill nav | Homepage tabs use `pill` (145:1021): icon only when selected; `leadingIcon` instance-swap per tab; hover/focus stay on `background-primary` | 2026-08-19 |
| Figma button classes | `Button` `variant` maps Figma `class`: `primary` (header) and `transparent` (ghost fill; darker ink on hover/press) | 2026-08-19 |
| Icon-only buttons are square | Header X/LinkedIn controls are 40×40 (`size-10`); walkthrough prev/next stay 32×32 (`size="icon"`) | 2026-08-20 |
| Pill outline draw | Selected tab sketches its outline icon (Gems gem, Heavy Ones briefcase, Yapping pencil, Who Me? user-circle). Skip first paint and reduced motion. | 2026-08-19 |
| Gems walkthrough template | First Gems card is Figma `wc26-walktrough`: image, copy, 1/3 counter, 32px transparent prev/next. More Gems reuse this. | 2026-08-19 |
| Gems sit in content-item | Gray `content-item` (124:655) is the holder; the gem is centered inside. | 2026-08-19 |
| Walkthrough card chrome | CSS `rounded-3xl` + `border-secondary` + `elevation-xl` box-shadow so stroke and shadow paint immediately. Lisse clip-path was hiding both and hitching the complete resize. | 2026-08-20 |
| Walkthrough complete | Last-step check enters Figma `step-04` (178:1724). Gray holder keeps max gem height. | 2026-08-20 |

---

## File Locations Reference

| What | Where |
| ---- | ----- |
| Design tokens | `/src/styles/tokens/` |
| CSS variables | `/src/app/globals.css` |
| Motion variants | `/src/lib/motion/variants.ts` |
| Motion components | `/src/components/motion/` |
| Layout components | `/src/components/layout/` |
| UI components | `/src/components/ui/` |
| Page sections | `/src/components/sections/` |
| SmoothSurface (Lisse) | `/src/components/ui/SmoothSurface.tsx` |
| Beam (border-beam) | `/src/components/ui/Beam.tsx` |
| Radius / corner tokens | `/src/styles/tokens/radius.ts` |
| Size / crop / shadow tokens | `/src/styles/tokens/size.ts` |
| Custom hooks | `/src/lib/hooks/` |
| Type definitions | `/src/types/` |
| Site identity / tabs / SEO copy | `/src/content/site.ts` |
| Metadata + JSON-LD helpers | `/src/lib/seo.ts` |
| Homepage hero | `/src/components/sections/HeroSection.tsx` |
| Site logo (squircle portrait) | `/src/components/sections/SiteLogo.tsx` |
| Homepage canvas | `/src/components/sections/HomeCanvas.tsx` |
| Content item (placeholder) | `/src/components/sections/ContentItem.tsx` |
| Navigation pill | `/src/components/ui/Pill.tsx` |
| Gem walkthrough | `/src/components/sections/GemWalkthrough.tsx` |
| Gems content | `/src/content/gems.ts` |
| Button (primary / transparent) | `/src/components/ui/Button.tsx` |
| Tab leading icons | `/src/components/icons/TabLeadingIcon.tsx` |
| Gems placeholders | `/src/content/gems.ts` |
| Brand portrait (OG source) | `/public/brand/portrait.png` |
| Favicon / Apple icon | `/src/app/icon.png`, `apple-icon.png`, `favicon.ico` |
| Legacy Sanity (to remove) | `/sanity/`, `/src/lib/sanity/`, `sanity.config.ts`, `sanity.cli.ts` |

---

## Environment Variables

Site URL for metadata:

```env
NEXT_PUBLIC_SITE_URL=https://artiom.design
```

**Do not add or document Sanity credentials.** Any former `NEXT_PUBLIC_SANITY_*` / `SANITY_API_TOKEN` values are obsolete and must not be committed.

Local secrets belong only in `.env.local` (gitignored). Prefer configuring env vars in the Vercel project dashboard for production.

---

## Known Issues / Legacy Debt

- Sanity scaffolding remains in the repo from the initial foundation. Owner decided against using it. Treat as tech debt to remove; do not build new features on it.
- Homepage tab panels are empty by design — ready for content. Leftover section routes are empty + noindex.
- `PROJECT_STATUS.md` and this file were previously out of date on Vercel (said “not deployed”); corrected 2026-08-14.
- Production deploy of merge `e5a4b63` (`artiomdesign-krsc3fz1u-artiom-design.vercel.app`) failed because leftover Git conflict markers were committed in `src/app/layout.tsx`. Fixed by committing the resolved layout (Header). Skip link restored with SEO layout work.

---

## Dependencies (high level)

### Keep
- next, react, react-dom
- framer-motion
- @lisse/react
- border-beam
- clsx, tailwind-merge
- typescript, tailwindcss, eslint (dev)

### Planned removal
- `sanity`, `next-sanity`, `@sanity/image-url`, `@sanity/code-input`, `@sanity/vision`

Check `package.json` for exact versions (Next may be 15.x or 16.x depending on lockfile).

---

## Commands

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

## Repo & deploy

| Item | Value |
| ---- | ----- |
| GitHub | `artiomk14/artiom.design` |
| Production | `https://artiom.design` |
| Vercel alias | `https://artiomdesign.vercel.app` |
| Deploy trigger | Push to `main` (Vercel) |

---

*Last updated: 2026-08-20 (header/hero Figma polish, Grand Hotel, X icon; walkthrough complete step)*
