# AGENTS.md

This file provides guidance for AI agents working on this portfolio project.

---

## Project Purpose

Portfolio website for Artiom (product designer) — work, blog, lab/experiments, about, and contact. Priorities: performance, accessibility, clean modern design.

**Owner context:** Not a full-time developer. Prefer clear, low-ceremony solutions. Keep explanations and change scope practical.

---

## Current Reality (read before coding)

1. Read **`CONTEXT.md`** first — living source of truth for phase, decisions, and env notes.
2. Site is **already live** on Vercel at **https://artiom.design** (also `artiomdesign.vercel.app`). Pushing to `main` deploys.
3. **No Sanity / no headless CMS.** Owner rejected CMS as overkill. Content belongs **in the repo**. Do not add Sanity credentials, Studio, or new CMS integrations.
4. Sanity-related folders and packages may still exist as **legacy debt** — remove when working on content/Work/Blog; do not extend them.
5. Pages are mostly **placeholders**; next meaningful work is **design + content**.

Also see `PROJECT_STATUS.md` for a structured checklist.

---

## Tech Stack

| Technology    | Purpose                      | Notes        |
| ------------- | ---------------------------- | ------------ |
| Next.js       | App Router site              | see `package.json` |
| TypeScript    | Type safety                  | 5.x          |
| Tailwind CSS  | Styling                      | 4.x          |
| Framer Motion | Animations                   | 12.x         |
| Lisse         | Squircle corners (radii)     | `@lisse/react` — Figma/iOS continuous corners |
| Vercel        | Hosting & production deploys | Live         |

**Not in use:** Sanity (or any headless CMS).

---

## Project Structure

```
/src
  /app                 # Next.js App Router pages
  /components
    /layout            # Header, Footer, Navigation
    /sections          # Reusable page sections
    /ui                # Button, Card, Typography
    /motion            # Animation wrappers
  /lib
    /utils             # cn()
    /hooks             # Custom hooks
    /motion            # Framer Motion variants
    /sanity            # LEGACY — do not extend; remove when touching content
  /styles
    /tokens            # Design system tokens
  /types

/sanity                # LEGACY schemas — remove with CMS cleanup
/public
```

---

## Content Guidelines (no CMS)

- Keep portfolio/blog/lab content **in the codebase** (page components, typed local data modules under e.g. `src/content/` or similar, assets in `/public`).
- Prefer simple structures a designer can edit with help from an agent.
- Do **not** introduce a CMS without explicit owner permission.
- When implementing Work/Blog: replace leftover Sanity fetches with local data; then delete Sanity deps and configs.

---

## Coding Standards

### TypeScript
- Use strict mode (enabled in tsconfig.json)
- Define interfaces for all component props
- Use type imports where possible (`import type { ... }`)
- Avoid `any` - use `unknown` with type guards if needed

### Components
- Prefer named exports over default exports
- One component per file (exceptions: tightly coupled sub-components)
- Use the `cn()` utility for conditional class merging
- Props interface naming: `ComponentNameProps`

### Styling
- **No hardcoded values** - use design tokens and Tailwind classes
- Colors: `bg-background`, `text-foreground`, `text-foreground-muted`, etc.
- Spacing: Use Tailwind spacing scale (e.g., `p-4`, `mt-6`, `gap-8`)
- Responsive: Mobile-first approach (`md:`, `lg:` prefixes)

### Corners / radii (Lisse squircles)
- **Default:** use Lisse via `SmoothSurface`, `Button`, `Card`, or `cornersFor()` — not Tailwind `rounded-*` — for buttons, cards, panels, chips, media frames, and other surfaces.
- Tokens: `/src/styles/tokens/radius.ts` (`radius.md` / `lg` / … + `cornerSmoothing` = `0.6`).
- Wrapper: `SmoothSurface` in `/src/components/ui/SmoothSurface.tsx` (client component).
- Prefer existing UI primitives when they already wrap Lisse (`Button`, `Card`).
- **Exceptions (plain CSS OK):** true circles (`rounded-full`), 1–2px hairline radii, and non-UI chrome where clip-path cost isn’t worth it.
- **Focus:** `clip-path` clips rings — use `outline` + `outline-offset` (already in `globals.css`), not box-shadow rings on clipped elements.
- **Overflow:** tooltips/dropdowns must portal or sit outside the clipped surface.
- Do not add other squircle libraries; stick to `@lisse/react`.

### File Naming
| Type       | Convention    | Example             |
| ---------- | ------------- | ------------------- |
| Components | PascalCase    | `Button.tsx`        |
| Utilities  | camelCase     | `cn.ts`             |
| Hooks      | camelCase     | `useMediaQuery.ts`  |
| Types      | camelCase     | `content.ts`        |
| Pages      | lowercase     | `page.tsx`          |

---

## Animation Rules

### General Principles
- Animations must be **subtle and purposeful**
- Never block content visibility with animations
- Respect user preferences with `prefers-reduced-motion`
- Prefer **transitions** over keyframe animations for UI state changes
- Prefer animating **`opacity` and `transform` only** (avoid width/height/margin/top layout thrash)

### Timing Guidelines
| Use Case          | Duration    |
| ----------------- | ----------- |
| Micro-interactions| 150-200ms   |
| UI transitions    | 200-300ms   |
| Page reveals      | 400-600ms   |
| Stagger delay     | 50-100ms    |

### Easing
- Use the easeOut curve `[0, 0, 0.2, 1]` for most animations
- Use easeInOut `[0.4, 0, 0.2, 1]` for slow, deliberate animations

### Motion Components
Use the provided motion components in `/components/motion/`:
- `FadeIn` - Fade with optional direction
- `SlideIn` - Full slide animations
- `StaggerContainer` + `StaggerItem` - List animations
- `PageTransition` - Route transitions

---

## Frontend Guidelines ([bendc](https://github.com/bendc/frontend-guidelines))

Follow [bendc/frontend-guidelines](https://github.com/bendc/frontend-guidelines), adapted for this Next.js + Tailwind + React stack. When these conflict with project-specific rules above (Lisse, tokens, a11y), prefer the project-specific rule.

### HTML
- Use real semantics (`main`, `article`, `header`, `nav`, `section`, `time`, …). Wrong semantics are worse than a neutral `div`.
- Keep markup terse — no obsolete XHTML habits (`type="text/javascript"`, etc.).
- Always `lang` on `<html>` and UTF-8 (Next handles charset; keep `lang="en"`).
- Accessibility is not optional: meaningful `alt`, real buttons/links, label form controls, don’t rely on color alone.
- Don’t block first paint with non-critical scripts (no early third-party JS without permission).

### CSS / Tailwind
- Global `box-sizing: border-box` only — don’t override per element.
- Prefer Flexbox/Grid; keep elements in normal flow. Avoid `position: absolute/fixed` unless needed (fixed header, skip link, portals).
- Prefer classes over deep/structural selectors; avoid `id` selectors and `!important` (exception: `prefers-reduced-motion` kill-switch).
- Don’t fight inheritance — set shared text styles on a parent once.
- Prefer hex colors; use `rgba`/`transparent` only when you need alpha (tokens already follow this).
- Prefer unitless where valid (`line-height: 1.5`); prefer `rem` for custom CSS sizes. Tailwind utilities may use their own conventions.
- In custom CSS, prefer seconds (`.15s`) over `ms` when writing durations by hand.
- No CSS hacks (`translateZ(0)` “GPU” tricks, etc.). Use `will-change` sparingly and only when measured.

### JavaScript / TypeScript
- **Readability over micro-optimization** — images, network, and layout cost more than clever loops.
- Prefer pure helpers: no unexpected mutation; return new data when transforming.
- Prefer native APIs (`Array` methods, `Map`/`Set` when they fit) over utility libraries for one-liners.
- Prefer `const` > `let`; never `var`.
- Prefer rest/spread over `arguments` / `apply`.
- Prefer small composable functions over large multi-purpose ones.
- Minimize dependencies — don’t add a package for a few lines we can own (aligns with “ask before new deps”).
- Don’t obfuscate intent (`~~n`, `foo || sideEffect()`); write the clear form.
- React/TS pragmatism: don’t force Maps for props, don’t force recursion in render, don’t IIFE every conditional — keep components clear.

### Source
Full original: https://github.com/bendc/frontend-guidelines

---

## Accessibility Rules

### Semantic HTML
- Use proper heading hierarchy (`h1` > `h2` > `h3`)
- Use `<nav>`, `<main>`, `<article>`, `<section>` appropriately
- Use `<button>` for actions, `<a>` for navigation

### ARIA
- Add `aria-label` for icon-only buttons
- Use `aria-current="page"` for active navigation links
- Add `aria-expanded` for expandable elements

### Focus Management
- All interactive elements must have visible focus states
- Use `focus-visible` for keyboard-only focus indication
- Implement skip links for keyboard navigation

### Color & Contrast
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- Don't rely on color alone to convey information

---

## Component Guidelines

### Creating New Components
1. Create in the appropriate folder (`/ui`, `/sections`, `/motion`)
2. Define a TypeScript interface for props
3. Use `cn()` for class composition
4. Add sensible default props
5. Ensure responsive by default

### Example Component Structure
```tsx
import { cn } from '@/lib/utils';

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'alternate';
}

export function Component({
  children,
  className,
  variant = 'default',
}: ComponentProps) {
  return (
    <div className={cn('base-classes', variantClasses[variant], className)}>
      {children}
    </div>
  );
}
```

---

## Performance Guidelines

### Images
- Always use Next.js `<Image>` component
- Provide `width` and `height` or use `fill`
- Prefer modern formats (WebP/AVIF) via Next.js image optimization

### Components
- Use Server Components by default
- Add `'use client'` only when necessary (hooks, interactivity)
- Use dynamic imports for heavy components

### Data
- Prefer static / build-time content for portfolio pages
- Avoid unnecessary client-side data fetching

---

## Hosting & Environment

| Item | Value |
| ---- | ----- |
| Production URL | `https://artiom.design` |
| Vercel project URL | `https://artiomdesign.vercel.app` |
| GitHub | `artiomk14/artiom.design` |

Typical env (no secrets required for a static portfolio):

```env
NEXT_PUBLIC_SITE_URL=https://artiom.design
```

Never commit API tokens or put secrets in markdown. Do not revive Sanity env vars.

---

## What NOT To Do Without Permission

1. **Add new dependencies** - Discuss first to evaluate necessity and bundle impact
2. **Change design tokens** - Colors, spacing, typography are intentional
3. **Add or reconnect a CMS** (including Sanity) - Owner chose in-repo content
4. **Alter routing structure** - URL structure impacts SEO and bookmarks
5. **Add external scripts** - Third-party scripts affect performance
6. **Remove accessibility features** - Skip links, ARIA labels, focus states
7. **Use inline styles** - Use Tailwind classes instead
8. **Hardcode design values** - Use design tokens and variables (content copy is fine in-repo)

---

## Before Making Changes

1. Read `CONTEXT.md` for current project state and product decisions
2. Check if a similar component/pattern already exists
3. Ensure changes align with these guidelines
4. Update `CONTEXT.md` (and `PROJECT_STATUS.md` when status changes) after significant work
5. Run `pnpm build` to verify no errors
6. Run `pnpm lint` to check code quality
