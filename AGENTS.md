# AGENTS.md

This file provides guidance for AI agents working on this portfolio project.

---

## Project Purpose

Portfolio website for Artiom - showcasing work, blog posts, experiments, and contact information. The site prioritizes performance, accessibility, and a clean, modern design.

---

## Tech Stack

| Technology    | Purpose                          | Version  |
| ------------- | -------------------------------- | -------- |
| Next.js       | React framework (App Router)     | 15.x     |
| TypeScript    | Type safety                      | 5.x      |
| Tailwind CSS  | Utility-first styling            | 4.x      |
| Framer Motion | Animations                       | 12.x     |
| Sanity        | Headless CMS                     | 5.x      |
| Vercel        | Hosting & deployment             | -        |

---

## Project Structure

```
/src
  /app                 # Next.js App Router pages
  /components
    /layout            # Layout components (Header, Footer, Navigation)
    /sections          # Reusable page sections
    /ui                # Atomic UI components (Button, Card, Typography)
    /motion            # Animation wrapper components
  /lib
    /sanity            # Sanity client, queries, image helpers
    /utils             # Utility functions (cn)
    /hooks             # Custom React hooks
    /motion            # Framer Motion variants
  /styles
    /tokens            # Design system tokens
  /types               # TypeScript type definitions

/sanity
  /schemas             # Sanity CMS schemas

/public
  /images
  /videos
  /icons
```

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

### File Naming
| Type       | Convention    | Example             |
| ---------- | ------------- | ------------------- |
| Components | PascalCase    | `Button.tsx`        |
| Utilities  | camelCase     | `cn.ts`             |
| Hooks      | camelCase     | `useMediaQuery.ts`  |
| Types      | camelCase     | `sanity.ts`         |
| Pages      | lowercase     | `page.tsx`          |

---

## Animation Rules

### General Principles
- Animations must be **subtle and purposeful**
- Never block content visibility with animations
- Respect user preferences with `prefers-reduced-motion`

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

## Sanity CMS

### Content Types
- `work` - Portfolio projects
- `blog` - Blog posts
- `author` - Author information
- `siteSettings` - Global site settings

### Fetching Data
Use the queries in `/lib/sanity/queries.ts`:
```tsx
import { client, allWorkQuery } from '@/lib/sanity';

const work = await client.fetch(allWorkQuery);
```

### Images
Use the `urlFor` helper for optimized images:
```tsx
import { urlFor } from '@/lib/sanity';

<Image src={urlFor(image).width(800).url()} />
```

---

## Performance Guidelines

### Images
- Always use Next.js `<Image>` component
- Provide `width` and `height` or use `fill`
- Use appropriate image formats (WebP via Sanity)

### Components
- Use Server Components by default
- Add `'use client'` only when necessary (hooks, interactivity)
- Use dynamic imports for heavy components

### Data Fetching
- Leverage Sanity CDN in production
- Use appropriate caching strategies
- Implement ISR where suitable

---

## What NOT To Do Without Permission

1. **Add new dependencies** - Discuss first to evaluate necessity and bundle impact
2. **Change design tokens** - Colors, spacing, typography are intentional
3. **Modify Sanity schemas** - Schema changes affect existing content
4. **Alter routing structure** - URL structure impacts SEO and bookmarks
5. **Add external scripts** - Third-party scripts affect performance
6. **Remove accessibility features** - Skip links, ARIA labels, focus states
7. **Use inline styles** - Use Tailwind classes instead
8. **Hardcode values** - Use design tokens and variables

---

## Before Making Changes

1. Read `CONTEXT.md` for current project state
2. Check if a similar component/pattern already exists
3. Ensure changes align with these guidelines
4. Update `CONTEXT.md` after significant changes
5. Run `pnpm build` to verify no errors
6. Run `pnpm lint` to check code quality
