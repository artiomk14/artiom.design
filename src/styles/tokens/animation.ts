/**
 * Animation Design Tokens
 * 
 * Timing, easing, and duration values for animations.
 * These align with Framer Motion variants in /lib/motion/variants.ts
 */

export const duration = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
} as const;

export const easing = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: { type: 'spring', stiffness: 300, damping: 30 },
} as const;

export const transition = {
  fast: { duration: duration.fast / 1000, ease: easing.easeOut },
  normal: { duration: duration.normal / 1000, ease: easing.easeOut },
  slow: { duration: duration.slow / 1000, ease: easing.easeInOut },
  spring: easing.spring,
} as const;

export type DurationToken = typeof duration;
export type EasingToken = typeof easing;
