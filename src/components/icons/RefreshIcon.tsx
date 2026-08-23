import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma `refresh` — leading icon on the Gems Reset button (178:1818).
 * Leaf from the 13.17×13.17 export, centered in the 14×14 leading-icon slot
 * (`inset 8.33%`, stroke overflow `6.43%`).
 */
export function RefreshIcon({ className }: IconProps) {
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
        d="M11.2554 0.75V2.57711C11.2554 2.74853 11.0411 2.82613 10.9313 2.69444C9.8632 1.50104 8.31097 0.75 6.58333 0.75C3.36167 0.75 0.75 3.36167 0.75 6.58333C0.75 9.805 3.36167 12.4167 6.58333 12.4167C9.805 12.4167 12.4167 9.805 12.4167 6.58333"
        transform="translate(0.417 0.417)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
