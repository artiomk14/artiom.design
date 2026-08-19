import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SmoothSurface } from '@/components/ui';

interface ContentItemProps {
  className?: string;
  /** A gem sits centered in this holder. Empty = the gray slot. */
  children?: ReactNode;
}

/**
 * Figma `content-item` (124:655) — 602px gray holder. Gems (walkthrough
 * cards, later pieces) sit in the center.
 */
export function ContentItem({ className, children }: ContentItemProps) {
  return (
    <SmoothSurface
      radius="3xl"
      className={cn(
        'flex h-[var(--size-content-item)] w-full items-center justify-center overflow-hidden bg-background-primary px-2.5',
        className
      )}
    >
      {children}
    </SmoothSurface>
  );
}
