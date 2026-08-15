/**
 * Breakpoint & Container Design Tokens
 *
 * Aligned with artiom.design Library (Figma):
 * - `breakpoint/*` — viewport breakpoints (mobile-first)
 * - `container/*` — max-width scale (matches Tailwind `max-w-*`)
 *
 * Use Tailwind responsive prefixes (e.g. `xs:`, `sm:`, `md:`) where available,
 * or `var(--container-3xl)` / `max-w-3xl` for content width.
 */

/** Figma `breakpoint/*` */
export const breakpoints = {
  xs: '390px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const;

/**
 * Figma `container/*` — content max-widths.
 * Same scale as Tailwind `max-w-{3xs…7xl}`.
 */
export const container = {
  '0': '0px',
  '3xs': '256px',
  '2xs': '288px',
  xs: '320px',
  sm: '384px',
  md: '448px',
  lg: '512px',
  xl: '576px',
  '2xl': '672px',
  '3xl': '768px',
  '4xl': '896px',
  '5xl': '1024px',
  '6xl': '1152px',
  '7xl': '1280px',
} as const;

/** Default page content max-width (home content column uses `container/3xl`). */
export const containerMax = container['3xl'];

export type BreakpointToken = keyof typeof breakpoints;
export type ContainerToken = keyof typeof container;
