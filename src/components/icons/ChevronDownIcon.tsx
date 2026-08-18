import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma chevron-down (trailing icon on nav E-mail button 124:658).
 * Path from the export, centered in the 14×14 icon slot.
 */
export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-3.5 shrink-0', className)}
    >
      <path
        d="M0.75 0.75L3.54289 3.54289C3.87623 3.87623 4.04289 4.04289 4.25 4.04289C4.45711 4.04289 4.62377 3.87623 4.95711 3.54289L7.75 0.75"
        transform="translate(2.75 4.6)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
