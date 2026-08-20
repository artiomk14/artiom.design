import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Hugeicons `new-twitter` in the 14×14 nav slot.
 * Stroke stays 1.5px (same as LinkedIn / chevron) instead of scaling
 * down with the 24×24 viewBox.
 */
export function TwitterIcon({ className }: IconProps) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-3.5 shrink-0', className)}
    >
      <path
        d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="nonScalingStroke"
      />
    </svg>
  );
}
