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
  },
} as const;

export type ColorToken = typeof colors;
