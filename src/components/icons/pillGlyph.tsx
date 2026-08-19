import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Figma pill `leading-icon` slot. */
export const PILL_ICON_SLOT = 14;

interface PillGlyphProps {
  className?: string;
  children: ReactNode;
}

/**
 * 14×14 outline slot. Stroke is inherited so pill icons stay a single weight
 * and can be stroke-drawn on select.
 */
export function PillGlyph({ className, children }: PillGlyphProps) {
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
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('pill-outline-icon size-3.5 shrink-0 overflow-visible', className)}
    >
      {children}
    </svg>
  );
}
