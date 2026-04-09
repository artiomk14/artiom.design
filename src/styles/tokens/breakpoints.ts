/**
 * Breakpoint Design Tokens
 * 
 * Responsive breakpoints following mobile-first approach.
 * Use Tailwind responsive prefixes (e.g., sm:, md:, lg:, xl:, 2xl:).
 */

export const breakpoints = {
  sm: '640px',   // Small tablets, large phones landscape
  md: '768px',   // Tablets
  lg: '1024px',  // Small laptops, tablets landscape
  xl: '1280px',  // Desktops
  '2xl': '1536px', // Large desktops
} as const;

export const container = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
} as const;

export type BreakpointToken = typeof breakpoints;
