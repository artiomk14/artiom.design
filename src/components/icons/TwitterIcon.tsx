import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma Twitter bird (instance on nav `button` 124:659).
 * Path from the 14×14 export; flipped to match the canvas orientation.
 */
export function TwitterIcon({ className }: IconProps) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-3.5 shrink-0 -scale-y-100', className)}
    >
      <path
        d="M0.75005 1.625C1.77966 1.0294 2.97504 0.75 4.25005 0.75C8.03052 0.75 11.111 3.74687 11.2455 7.49452L12.4167 9.79167L10.4601 9.5C10.0488 9.86305 9.50848 10.0833 8.91672 10.0833C7.41616 10.0833 6.29212 8.61489 6.65393 7.17831C4.58129 7.04459 2.70344 8.32091 1.61743 10.022C0.89674 7.57392 1.56455 4.62561 3.37505 2.80885C3.37505 2.1226 1.62505 1.71319 0.75005 1.625Z"
        transform="translate(0.42 1.58)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
