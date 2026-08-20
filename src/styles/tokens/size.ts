/**
 * Size tokens for Figma frames that are not on the spacing scale.
 *
 * Prefer Tailwind spacing (`size-4.5`, `h-6.5`, …) when it already matches.
 */

/** Figma `site-logo` — 52px outer frame. */
export const size = {
  siteLogo: '3.25rem',
  /** Empty `content-item` min-height (602px). Filled slots size to the gem. */
  contentItem: '37.625rem',
  /** Figma `wc26-walktrough` step card — 420px. */
  gemWalkthrough: '26.25rem',
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
 * CSS string matches Tailwind `shadow-xl`. Layers are for Lisse so the
 * shadow follows the squircle instead of a square box.
 */
export const shadow = {
  /**
   * Figma `shadow/2xs` — button class=neutral (enabled / hovered / focused).
   * 1px y-offset, no blur. Lisse layer so it follows the squircle.
   */
  twoXs: '0 1px 0 0 rgb(0 0 0 / 0.05)',
  twoXsLayers: [
    {
      offsetX: 0,
      offsetY: 1,
      blur: 0,
      spread: 0,
      color: '#000000',
      opacity: 0.05,
    },
  ],
  /**
   * Figma `elevation-xl` — gem walkthrough card.
   * Skip the 0-opacity 209px layer; it does not paint.
   */
  elevationXl:
    '0 8px 18px 0 rgb(148 148 148 / 0.1), 0 33px 33px 0 rgb(148 148 148 / 0.09), 0 75px 45px 0 rgb(148 148 148 / 0.05), 0 134px 53px 0 rgb(148 148 148 / 0.01)',
  elevationXlLayers: [
    {
      offsetX: 0,
      offsetY: 8,
      blur: 18,
      spread: 0,
      color: '#949494',
      opacity: 0.1,
    },
    {
      offsetX: 0,
      offsetY: 33,
      blur: 33,
      spread: 0,
      color: '#949494',
      opacity: 0.09,
    },
    {
      offsetX: 0,
      offsetY: 75,
      blur: 45,
      spread: 0,
      color: '#949494',
      opacity: 0.05,
    },
    {
      offsetX: 0,
      offsetY: 134,
      blur: 53,
      spread: 0,
      color: '#949494',
      opacity: 0.01,
    },
  ],
  /** Figma `elevation/md-elevation`. */
  mdElevation:
    '0 1px 2px 0 rgb(120 120 120 / 0.1), 0 4px 4px 0 rgb(120 120 120 / 0.09), 0 9px 6px 0 rgb(120 120 120 / 0.05), 0 17px 7px 0 rgb(120 120 120 / 0.01)',
  mdLayers: [
    {
      offsetX: 0,
      offsetY: 1,
      blur: 2,
      spread: 0,
      color: '#787878',
      opacity: 0.1,
    },
    {
      offsetX: 0,
      offsetY: 4,
      blur: 4,
      spread: 0,
      color: '#787878',
      opacity: 0.09,
    },
    {
      offsetX: 0,
      offsetY: 9,
      blur: 6,
      spread: 0,
      color: '#787878',
      opacity: 0.05,
    },
    {
      offsetX: 0,
      offsetY: 17,
      blur: 7,
      spread: 0,
      color: '#787878',
      opacity: 0.01,
    },
  ],
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
  xlLayers: [
    {
      offsetX: 0,
      offsetY: 20,
      blur: 25,
      spread: -5,
      color: '#000000',
      opacity: 0.1,
    },
    {
      offsetX: 0,
      offsetY: 10,
      blur: 10,
      spread: -5,
      color: '#000000',
      opacity: 0.04,
    },
  ],
} as const;

export type SizeToken = typeof size;
