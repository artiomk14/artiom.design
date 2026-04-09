'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * Hook to detect if the user prefers reduced motion.
 * Use this to disable or simplify animations for accessibility.
 *
 * @example
 * const prefersReducedMotion = usePrefersReducedMotion();
 * const animationDuration = prefersReducedMotion ? 0 : 0.3;
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
