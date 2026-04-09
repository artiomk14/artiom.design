'use client';

import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface PageTransitionProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'exit'> {
  children: React.ReactNode;
  mode?: 'wait' | 'sync' | 'popLayout';
}

export function PageTransition({
  children,
  mode = 'wait',
  ...props
}: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: [0, 0, 0.2, 1],
        }}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
