import { cn } from '@/lib/utils';

interface NavIconProps {
  className?: string;
}

/** Figma path data from artiom.design → user icon (node 111:610). */
export function NavAboutIcon({ className }: NavIconProps) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-5 shrink-0', className)}
    >
      <path
        d="M6.66663 5.83333C6.66663 6.71739 7.01782 7.56523 7.64294 8.19036C8.26806 8.81548 9.1159 9.16667 9.99996 9.16667C10.884 9.16667 11.7319 8.81548 12.357 8.19036C12.9821 7.56523 13.3333 6.71739 13.3333 5.83333C13.3333 4.94928 12.9821 4.10143 12.357 3.47631C11.7319 2.85119 10.884 2.5 9.99996 2.5C9.1159 2.5 8.26806 2.85119 7.64294 3.47631C7.01782 4.10143 6.66663 4.94928 6.66663 5.83333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17.5V15.8333C5 14.9493 5.35119 14.1014 5.97631 13.4763C6.60143 12.8512 7.44928 12.5 8.33333 12.5H11.6667C12.5507 12.5 13.3986 12.8512 14.0237 13.4763C14.6488 14.1014 15 14.9493 15 15.8333V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma path data from artiom.design → airpod-02 / work icon (node 111:583). */
export function NavWorkIcon({ className }: NavIconProps) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-5 shrink-0', className)}
    >
      <path
        d="M2.08325 9.99999C2.08325 6.26804 2.08325 4.40207 3.24262 3.2427C4.40199 2.08333 6.26797 2.08333 9.99992 2.08333C13.7319 2.08333 15.5978 2.08333 16.7572 3.2427C17.9166 4.40207 17.9166 6.26804 17.9166 9.99999C17.9166 13.7319 17.9166 15.5979 16.7572 16.7573C15.5978 17.9167 13.7319 17.9167 9.99992 17.9167C6.26797 17.9167 4.40199 17.9167 3.24262 16.7573C2.08325 15.5979 2.08325 13.7319 2.08325 9.99999Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2.08325 5.83333H6.04158M17.9166 5.83333H13.9583"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.83325 5.83333H14.1666V5.83333C14.1666 7.16665 14.1666 7.83331 13.7725 8.26338C13.743 8.29556 13.7121 8.32643 13.68 8.35591C13.2499 8.74999 12.5832 8.74999 11.2499 8.74999H8.74992C7.4166 8.74999 6.74993 8.74999 6.31987 8.35591C6.28769 8.32643 6.25682 8.29556 6.22734 8.26338C5.83325 7.83331 5.83325 7.16665 5.83325 5.83333V5.83333Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 11.6667H10.0075"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
