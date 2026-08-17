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
  },
  foreground: {
    DEFAULT: '#171717',
    muted: '#737373',
    subtle: '#a3a3a3',
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
  },
  /**
   * Figma artiom.design Library — used by `button` class=primary (1920px).
   * Names match the Figma variables: background/*, foreground/*.
   */
  surface: {
    primary: '#f4f4f5',
    hover: '#e4e4e7',
    elevated: '#d4d4d8',
  },
  ink: {
    secondary: '#3f3f46',
    tertiary: '#52525c',
  },
} as const;

export type ColorToken = typeof colors;
