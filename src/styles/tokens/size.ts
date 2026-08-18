/**
 * Size tokens for Figma frames that are not on the spacing scale.
 *
 * Prefer Tailwind spacing (`size-4.5`, `h-6.5`, …) when it already matches.
 */

/** Figma `site-logo` — 52px outer frame. */
export const size = {
  siteLogo: '3.25rem',
} as const;

/**
 * Figma `logo-imagery` fill transform, relative to the 44px inner frame.
 * Preserves the designed crop (person in frame, sky mostly clipped).
 */
export const siteLogoImage = {
  width: '107.14%',
  height: '190.48%',
  left: '-4.76%',
  top: '-80%',
} as const;

/**
 * Figma `Lsports_logo` leaf inside the 10×11 outer box.
 * `inset` is top/bottom of the 26:28 vector (`8.82%`).
 */
export const companyGlyph = {
  width: '0.625rem',
  height: '0.6875rem',
  inset: '8.82%',
  aspect: '26 / 28',
} as const;

/**
 * Figma `shadow/xl` — site-logo elevation.
 * Matches Tailwind `shadow-xl`.
 */
export const shadow = {
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
} as const;

export type SizeToken = typeof size;
