import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SmoothSurface } from '@/components/ui';

interface ContentItemProps {
  className?: string;
  /** A gem sits centered in this holder. Empty = the gray slot. */
  children?: ReactNode;
}

/**
 * Figma `content-item` (124:655) — gray holder. Width fills the parent.
 * Padding is `spacing/5` (20px) on the sides, `spacing/32` (128px) top,
 * `spacing/36` (144px) bottom. Height follows the gem; empty slots keep
 * the 602px min-height so they still read as holders.
 */
export function ContentItem({ className, children }: ContentItemProps) {
  return (
    <SmoothSurface
      radius="3xl"
      className={cn(
        'flex w-full items-center justify-center overflow-hidden bg-background-primary px-5 pt-32 pb-36',
        !children && 'min-h-[var(--size-content-item)]',
        className
      )}
    >
      {children}
    </SmoothSurface>
  );
}
