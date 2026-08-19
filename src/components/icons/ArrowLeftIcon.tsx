import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma walkthrough `previous` chevron (rotated -90° / flipped).
 * Leaf from the 8.17×12.17 export, centered in the 16×16 leading-icon slot.
 */
export function ArrowLeftIcon({ className }: IconProps) {
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
        <path d="M4.08322 0.750108L4.08322 11.4168" />
        <path d="M7.41672 4.08331C7.41672 4.08331 4.96175 0.750007 4.08336 0.75C3.20496 0.749992 0.750049 4.08333 0.750049 4.08333" />
      </g>
    </svg>
  );
}
