'use client';

import {
  SmoothCorners,
  type SmoothCornersProps,
} from '@lisse/react';
import type { ElementType } from 'react';
import { cn } from '@/lib/utils';
import {
  cornerSmoothing,
  cornersFor,
  type RadiusToken,
} from '@/styles/tokens';

type SmoothSurfaceProps<E extends ElementType = 'div'> = Omit<
  SmoothCornersProps<E>,
  'corners'
> & {
  /** Token or pixel radius. Ignored when `corners` is provided. */
  radius?: RadiusToken | number;
  /** Corner smoothing (0 = CSS arc, 0.6 = Figma iOS). */
  smoothing?: number;
  /** Full Lisse corners override (per-corner configs, etc.). */
  corners?: SmoothCornersProps<E>['corners'];
};

/**
 * Project wrapper around Lisse SmoothCorners.
 * Use this (or Button/Card) instead of Tailwind rounded-* for surfaces.
 */
export function SmoothSurface<E extends ElementType = 'div'>({
  radius = 'lg',
  smoothing = cornerSmoothing,
  corners,
  className,
  ...props
}: SmoothSurfaceProps<E>) {
  return (
    <SmoothCorners
      {...(props as SmoothCornersProps<E>)}
      corners={corners ?? cornersFor(radius, smoothing)}
      className={cn(className)}
    />
  );
}
