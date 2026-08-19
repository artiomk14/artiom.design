import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma pill `leading-icon` (145:958) — gem outline in the 14×14 slot.
 * Path data from the exported 13.17×12 glyph, centered in 14×14.
 */
export function GemIcon({ className }: IconProps) {
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
      <g transform="translate(0.41665 0.99995)">
        <path
          d="M2.9563 1.43951C3.33421 1.14859 3.52317 1.00312 3.74127 0.909441C3.84015 0.866965 3.94298 0.832642 4.04851 0.806879C4.28127 0.750057 4.52808 0.750057 5.02169 0.750057H8.14498C8.63859 0.750057 8.8854 0.750057 9.11816 0.806879C9.22369 0.832642 9.32651 0.866965 9.4254 0.909441C9.6435 1.00312 9.83246 1.14859 10.2104 1.43951C11.4626 2.40351 12.0887 2.8855 12.3033 3.50968C12.3988 3.78732 12.4345 4.0793 12.4084 4.36941C12.3497 5.02162 11.8555 5.61853 10.8669 6.81235L8.5374 9.62564C7.64067 10.7086 7.19231 11.2501 6.58333 11.2501C5.97436 11.2501 5.526 10.7086 4.62927 9.62564L2.29975 6.81235C1.31121 5.61853 0.816945 5.02162 0.758285 4.36941C0.732193 4.0793 0.767873 3.78732 0.863343 3.50968C1.07797 2.8855 1.70408 2.40351 2.9563 1.43951Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5.41667 3.95839H7.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
