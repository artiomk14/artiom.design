/**
 * Color Design Tokens
 * 
 * Semantic color palette for the portfolio.
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
  dark: {
    background: {
      DEFAULT: '#0a0a0a',
      muted: '#171717',
      subtle: '#262626',
    },
    foreground: {
      DEFAULT: '#ededed',
      muted: '#a3a3a3',
      subtle: '#737373',
    },
    accent: {
      DEFAULT: '#ffffff',
      hover: '#e5e5e5',
      muted: '#d4d4d4',
    },
    border: {
      DEFAULT: '#262626',
      muted: '#171717',
    },
  },
} as const;

export type ColorToken = typeof colors;
