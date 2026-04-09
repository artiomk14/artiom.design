'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: React.ReactNode;
  duration?: number;
}

export function StaggerItem({
  children,
  duration = 0.5,
  ...props
}: StaggerItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        initial: {
          opacity: 0,
          y: 20,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0, 0, 0.2, 1],
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
