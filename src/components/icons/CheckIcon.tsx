import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma walkthrough last-step check. Leaf from the 10.83×8.17 export,
 * centered in the 16×16 leading-icon slot.
 */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-4 shrink-0 text-foreground-success', className)}
    >
      <path
        d="M0.750001 4.92276L2.47389 6.72116C2.91833 7.18483 3.14055 7.41669 3.41669 7.41669C3.69283 7.41669 3.91506 7.18483 4.35953 6.72116L10.0833 0.750001"
        transform="translate(2.583 3.917)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
