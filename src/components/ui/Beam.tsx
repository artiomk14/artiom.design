'use client';

import {
  BorderBeam as BorderBeamPrimitive,
  type BorderBeamProps as BorderBeamPrimitiveProps,
} from 'border-beam';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { radius, type RadiusToken } from '@/styles/tokens';

export type BeamProps = Omit<BorderBeamPrimitiveProps, 'borderRadius'> & {
  /**
   * Radius token or pixel value passed to BorderBeam.
   * Prefer tokens — Lisse squircles don’t expose CSS border-radius for auto-detect.
   */
  radius?: RadiusToken | number;
};

/**
 * Project wrapper around [border-beam](https://beam.jakubantalik.com/).
 *
 * Opt-in accent only — do not wrap every card/button. Prefer `mono` + modest
 * strength so it fits the neutral portfolio look.
 */
export function Beam({
  children,
  className,
  radius: radiusProp = 'lg',
  size = 'md',
  colorVariant = 'mono',
  theme = 'auto',
  strength = 0.55,
  staticColors = colorVariant === 'mono',
  active,
  ...props
}: BeamProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const borderRadius =
    typeof radiusProp === 'number' ? radiusProp : radius[radiusProp];

  return (
    <BorderBeamPrimitive
      size={size}
      colorVariant={colorVariant}
      theme={theme}
      strength={strength}
      staticColors={staticColors}
      borderRadius={borderRadius}
      active={active ?? !prefersReducedMotion}
      className={cn(className)}
      {...props}
    >
      {children}
    </BorderBeamPrimitive>
  );
}
