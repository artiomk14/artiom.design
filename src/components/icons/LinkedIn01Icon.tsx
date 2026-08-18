import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma `linkedin-01` (component 45:790) — default leading/trailing
 * instance-swap on the `button` component. Path data from the 14×14 export.
 */
export function LinkedIn01Icon({ className }: IconProps) {
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
        d="M4.08333 5.83334L4.08333 9.91668"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.41667 7.58334L6.41667 9.91668M6.41667 7.58334C6.41667 6.61685 7.20017 5.83334 8.16667 5.83334C9.13317 5.83334 9.91667 6.61685 9.91667 7.58334V9.91668M6.41667 7.58334V5.83334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.088 4.08334L4.08276 4.08334"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.45833 7.00001C1.45833 4.38764 1.45833 3.08146 2.26989 2.2699C3.08145 1.45834 4.38763 1.45834 7 1.45834C9.61237 1.45834 10.9185 1.45834 11.7301 2.2699C12.5417 3.08146 12.5417 4.38764 12.5417 7.00001C12.5417 9.61238 12.5417 10.9186 11.7301 11.7301C10.9185 12.5417 9.61237 12.5417 7 12.5417C4.38763 12.5417 3.08145 12.5417 2.26989 11.7301C1.45833 10.9186 1.45833 9.61238 1.45833 7.00001Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
