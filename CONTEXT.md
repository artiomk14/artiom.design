# Project Context

This file tracks the current state of the portfolio project. **Update this file as progress is made.**

---

## Current Phase

**Foundation Complete** - The project structure, design system, and core components are in place. Ready for design implementation and content integration.

---

## Completed

- [x] Project initialization (Next.js 15, TypeScript, Tailwind CSS 4)
- [x] Dependencies installed (Framer Motion, Sanity, utilities)
- [x] Folder structure created
- [x] Design tokens defined (colors, spacing, typography, breakpoints, animation)
- [x] Tailwind configured with CSS custom properties
- [x] Sanity schemas created (work, blog, author, siteSettings)
- [x] Utility functions (cn, Sanity client, image helpers)
- [x] Custom hooks (useMediaQuery, useScrollProgress, usePrefersReducedMotion)
- [x] Motion variants defined
- [x] Motion wrapper components (FadeIn, SlideIn, PageTransition, Stagger)
- [x] Layout components (Header, Footer, Navigation, PageWrapper, Section)
- [x] UI components (Button, Typography, Card)
- [x] All route pages created with placeholders
- [x] 404 page
- [x] AGENTS.md documentation

---

## Pending

- [ ] Sanity Studio integration (embedded or separate)
- [ ] Connect Sanity to a project (requires Sanity account setup)
- [ ] Page designs and layouts
- [ ] Mobile menu implementation
- [ ] Contact form functionality
- [ ] SEO optimization (sitemap, robots.txt)
- [ ] Analytics integration
- [ ] Deployment to Vercel

---

## Active Work

*No active tasks. Foundation is complete.*

---

## Design Decisions

| Decision | Rationale | Date |
| -------- | --------- | ---- |
| Tailwind CSS v4 | Ships with Next.js 15, CSS-first configuration | 2026-03-31 |
| CSS custom properties for tokens | Single source of truth, dark mode support | 2026-03-31 |
| Server Components by default | Better performance, reduced JS bundle | 2026-03-31 |
| Motion components with reduced-motion | Accessibility compliance | 2026-03-31 |
| pnpm package manager | Fastest, disk efficient | 2026-03-31 |

---

## File Locations Reference

| What | Where |
| ---- | ----- |
| Design tokens | `/src/styles/tokens/` |
| CSS variables | `/src/app/globals.css` |
| Sanity schemas | `/sanity/schemas/` |
| Sanity client | `/src/lib/sanity/` |
| Motion variants | `/src/lib/motion/variants.ts` |
| Motion components | `/src/components/motion/` |
| Layout components | `/src/components/layout/` |
| UI components | `/src/components/ui/` |
| Custom hooks | `/src/lib/hooks/` |
| Type definitions | `/src/types/` |

---

## Environment Variables Required

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=c25v0trn
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skmIeY3s5tcB8EwRn0IqL1DooQZHTgkphdnrNvPAScODSuJtEnqhElDEo1C31ypEQWqgwkgvLmPVz5lO8Zvu5cyeXR5tWEQ9L3LhG9YbAYECixdgovXoBOhMGFw4mYE0O2YtFaGGgwItSsaf8QFbLfNyk5cQFXiNhcynXpQGAqroOnMkea3S
NEXT_PUBLIC_SITE_URL=https://artiom.design
```

See `.env.local.example` for reference.

---

## Known Issues

*None currently.*

---

## Dependencies

### Production
- next: ^15.x
- react: ^19.x
- framer-motion: ^12.x
- sanity: ^5.x
- next-sanity: ^12.x
- @sanity/image-url: ^2.x
- @sanity/code-input: ^7.x
- clsx: ^2.x
- tailwind-merge: ^3.x

### Development
- typescript: ^5.x
- tailwindcss: ^4.x
- eslint: ^9.x
- eslint-config-next: ^15.x

---

## Commands

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

*Last updated: 2026-03-31*
