# Project Context

This file tracks the current state of the portfolio project. **Update this file as progress is made.**

---

## Current Phase

**Foundation live; design & content next** — The site shell is deployed. Placeholder pages are live. Next work is page design and in-repo content (no CMS).

---

## Product Decisions (owner: Artiom)

| Decision | Status | Notes |
| -------- | ------ | ----- |
| **No Sanity / no headless CMS** | Confirmed 2026-08-14 | Overkill for a personal portfolio. Content should live in the codebase (pages, local data modules, or similar). Do not set up or extend Sanity. |
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
- [x] UI components (Button, Typography, Card, SmoothSurface)
- [x] Lisse squircles for surface radii (`@lisse/react` + radius tokens)
- [x] All route pages created with placeholders
- [x] 404 page
- [x] AGENTS.md / PROJECT_STATUS.md documentation
- [x] Deployed to Vercel with custom domain `artiom.design`

---

## Pending

- [ ] **Remove Sanity** from the codebase (deps, `/sanity`, `/src/lib/sanity`, related types, Work/Blog fetch wiring) and use in-repo content instead
- [ ] Page designs and layouts (Home + Work first)
- [ ] Real portfolio / blog / lab content in code
- [ ] Mobile menu implementation
- [ ] Contact form functionality
- [ ] SEO (sitemap, robots.txt)
- [ ] Analytics (only if requested)

---

## Active Work

*Lisse (corne.rs) squircles integrated for UI radii — 2026-08-14. Use SmoothSurface / Button / Card going forward.*

---

## Design Decisions

| Decision | Rationale | Date |
| -------- | --------- | ---- |
| Tailwind CSS v4 | Ships with modern Next.js, CSS-first configuration | 2026-03-31 |
| CSS custom properties for tokens | Single source of truth, dark mode support | 2026-03-31 |
| Lisse squircles for radii | Figma/iOS continuous corners instead of CSS border-radius on UI surfaces | 2026-08-14 |
| Server Components by default | Better performance, reduced JS bundle | 2026-03-31 |
| Motion components with reduced-motion | Accessibility compliance | 2026-03-31 |
| pnpm package manager | Fastest, disk efficient | 2026-03-31 |
| No headless CMS | Portfolio updates are infrequent; keep content in-repo | 2026-08-14 |

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
| SmoothSurface (Lisse) | `/src/components/ui/SmoothSurface.tsx` |
| Radius / corner tokens | `/src/styles/tokens/radius.ts` |
| Custom hooks | `/src/lib/hooks/` |
| Type definitions | `/src/types/` |
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
- Live site still shows placeholder copy — design and content have not been implemented yet.
- `PROJECT_STATUS.md` and this file were previously out of date on Vercel (said “not deployed”); corrected 2026-08-14.

---

## Dependencies (high level)

### Keep
- next, react, react-dom
- framer-motion
- @lisse/react
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

*Last updated: 2026-08-14 (Lisse radii)*
