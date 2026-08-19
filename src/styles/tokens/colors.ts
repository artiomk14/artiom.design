/**
 * Color Design Tokens
 *
 * Semantic light-mode palette for the portfolio.
 * These values are mirrored in globals.css as CSS custom properties.
 * Use Tailwind classes (e.g., bg-background, text-foreground) in components.
 */

export const colors = {
  background: {
    DEFAULT: '#ffffff',
    muted: '#f5f5f5',
    subtle: '#fafafa',
    /** Figma `background/background-surface` — site-logo frame. */
    surface: '#fafafa',
  },
  foreground: {
    DEFAULT: '#171717',
    primary: '#18181b',
    muted: '#737373',
    /** Figma `foreground/foreground-subtle` — company name in the hero lockup. */
    subtle: '#71717b',
    /** Figma `foreground/foreground-light` — “Hello,” greeting. */
    light: '#d4d4d8',
    /**
     * Figma `foreground/foreground-muted` — unselected pill label.
     * Distinct from `--foreground-muted` (#737373).
     */
    quiet: '#9f9fa9',
  },
  accent: {
    DEFAULT: '#0a0a0a',
    hover: '#262626',
    muted: '#404040',
  },
  border: {
    DEFAULT: '#e5e5e5',
    muted: '#f5f5f5',
    strong: '#71717b',
    /** Figma `border/border-subtle` — hero divider + site-logo stroke. */
    subtle: '#e4e4e7',
    /** Figma `border/border-secondary` — company lockup underline. */
    secondary: '#d4d4d8',
    /** Figma `border/border_primary` — gem walkthrough card stroke. */
    primary: '#eeeeee',
  },
  /**
   * Figma `Bitter Lemon/100` — LSports mark background.
   */
  brand: {
    bitterLemon: '#e4ff38',
  },
  /**
   * Figma artiom.design Library — used by `button` class=primary | transparent
   * (1920px). Names match the Figma variables: background/*, foreground/*.
   */
  surface: {
    primary: '#f4f4f5',
    hover: '#e4e4e7',
    elevated: '#d4d4d8',
  },
  ink: {
    secondary: '#3f3f46',
    tertiary: '#52525c',
    /** Figma check on the last walkthrough step. */
    success: '#00a63e',
  },
} as const;

export type ColorToken = typeof colors;
