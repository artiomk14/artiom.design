import { cn } from '@/lib/utils';
import { SmoothSurface } from '@/components/ui';

interface ContentItemProps {
  className?: string;
}

/**
 * Figma `content-item` (124:655) — 602×24 radius placeholder slot.
 */
export function ContentItem({ className }: ContentItemProps) {
  return (
    <SmoothSurface
      radius="3xl"
      className={cn(
        'h-[var(--size-content-item)] w-full bg-background-primary px-2.5 py-24',
        className
      )}
    />
  );
}
