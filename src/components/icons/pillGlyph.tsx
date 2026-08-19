import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Figma pill `leading-icon` slot. */
export const PILL_ICON_SLOT = 14;

interface PillGlyphProps {
  className?: string;
  /** Exported leaf width in px. Defaults to the 14×14 slot. */
  width?: number;
  /** Exported leaf height in px. Defaults to the 14×14 slot. */
  height?: number;
  children: ReactNode;
}

/**
 * 14×14 slot. Pass width/height to center a smaller exported leaf.
 */
export function PillGlyph({
  className,
  width = PILL_ICON_SLOT,
  height = PILL_ICON_SLOT,
  children,
}: PillGlyphProps) {
  const x = (PILL_ICON_SLOT - width) / 2;
  const y = (PILL_ICON_SLOT - height) / 2;

  return (
    <svg
      width={PILL_ICON_SLOT}
      height={PILL_ICON_SLOT}
      viewBox={`0 0 ${PILL_ICON_SLOT} ${PILL_ICON_SLOT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      overflow="visible"
      stroke="currentColor"
      strokeWidth={1.5}
      className={cn(
        'pill-outline-icon size-3.5 shrink-0 overflow-visible',
        className
      )}
    >
      <g transform={`translate(${x} ${y})`}>{children}</g>
    </svg>
  );
}
