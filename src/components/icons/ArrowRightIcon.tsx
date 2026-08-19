import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma walkthrough `next` chevron (rotated -90° / flipped).
 * Leaf from the 8.17×12.17 export, centered in the 16×16 leading-icon slot.
 */
export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-4 shrink-0', className)}
    >
      <g
        transform="translate(8 8) rotate(-90) scale(-1 1) translate(-4.083 -6.083)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.08323 11.4167L4.08323 0.75" />
        <path d="M7.41672 8.08342C7.41672 8.08342 4.96175 11.4167 4.08336 11.4167C3.20496 11.4167 0.750049 8.08339 0.750049 8.08339" />
      </g>
    </svg>
  );
}
