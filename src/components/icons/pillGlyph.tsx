import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Figma pill `leading-icon` slot. */
export const PILL_ICON_SLOT = 14;

interface PillGlyphProps {
  className?: string;
  /** Exported leaf width in px. */
  width: number;
  /** Exported leaf height in px. */
  height: number;
  children: ReactNode;
}

/**
 * 14×14 clip slot with the Figma leaf centered (outer box vs inner glyph).
 */
export function PillGlyph({
  className,
  width,
  height,
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
      className={cn('size-3.5 shrink-0', className)}
    >
      <g transform={`translate(${x} ${y})`}>{children}</g>
    </svg>
  );
}
