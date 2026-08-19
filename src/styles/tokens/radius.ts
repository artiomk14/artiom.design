/**
 * Corner / radius design tokens
 *
 * Surfaces use Lisse (@lisse/react) squircles — Figma-style continuous
 * corners — instead of CSS border-radius / Tailwind rounded-*.
 * Prefer SmoothSurface or cornersFor() over rounded-* classes.
 */

/** Figma “iOS” / corner-smoothing preset (FIGMA_SMOOTHING). */
export const cornerSmoothing = 0.6;

/**
 * Radius scale in pixels (aligned with common Tailwind rounded-* sizes).
 * Pass these through Lisse — do not apply as Tailwind rounded-* alone.
 */
export const radius = {
  none: 0,
  xs: 2, // hairline — Figma `radius/xs` (LSports mark); CSS radius OK
  sm: 4, // ~rounded
  md: 6, // ~rounded-md (buttons, icon controls)
  lg: 8, // ~rounded-lg (cards, panels, site-logo imagery)
  xl: 12, // ~rounded-xl (site-logo frame)
  '2xl': 16, // ~rounded-2xl
  '3xl': 24, // ~rounded-3xl
  /** Figma `radius/full` — navigation pills (stadium). */
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;

export interface CornersConfig {
  radius: number;
  smoothing: number;
}

/**
 * Build a Lisse `corners` config from a token or raw pixel radius.
 */
export function cornersFor(
  size: RadiusToken | number = 'lg',
  smoothing: number = cornerSmoothing
): CornersConfig {
  const value = typeof size === 'number' ? size : radius[size];
  return { radius: value, smoothing };
}
