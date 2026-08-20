import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma `tick-02` (178:1749) — 24px complete-step check.
 * Leaf is the 16×13 export, centered in the 24×24 icon frame.
 */
export function TickIcon({ className }: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-6 shrink-0 text-green-700', className)}
    >
      <path
        d="M1 8.5L4.5 12L15 1"
        transform="translate(4 5.5)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
