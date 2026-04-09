'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';

type Direction = 'up' | 'down' | 'left' | 'right';

interface SlideInProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
}

const directionValues = {
  up: { initial: '100%', animate: '0%', axis: 'y' },
  down: { initial: '-100%', animate: '0%', axis: 'y' },
  left: { initial: '100%', animate: '0%', axis: 'x' },
  right: { initial: '-100%', animate: '0%', axis: 'x' },
} as const;

export function SlideIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  once = true,
  ...props
}: SlideInProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  const { initial, animate, axis } = directionValues[direction];

  return (
    <motion.div
      initial={{
        [axis]: initial,
        opacity: 0,
      }}
      whileInView={{
        [axis]: animate,
        opacity: 1,
      }}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0, 0, 0.2, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
