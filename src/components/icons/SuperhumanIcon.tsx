import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Superhuman mark from Figma nested `selection-list` (246:366).
 * Fills the 20×20 leading-icon slot.
 */
export function SuperhumanIcon({ className }: IconProps) {
  return (
    <span
      className={cn(
        'flex size-5 shrink-0 items-center justify-center overflow-clip',
        className
      )}
      aria-hidden="true"
    >
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M6.11394 1.82208C8.69586 1.61649 11.2885 1.61559 13.8705 1.81512C16.1668 1.9935 17.9946 3.81642 18.1775 6.11425C18.3831 8.69619 18.3848 11.2887 18.1852 13.8707C18.0069 16.1669 16.1838 17.9946 13.886 18.1775C11.3041 18.3831 8.71146 18.3848 6.12951 18.1853C3.83323 18.0069 2.00544 16.1839 1.8225 13.8861C1.61691 11.3042 1.61519 8.71165 1.81471 6.12973C1.99309 3.83195 3.8162 2.00357 6.11394 1.82208ZM10.4762 8.84029C10.2721 8.4941 9.76834 8.4941 9.56425 8.84029L6.13263 14.6545C5.86258 15.114 6.37528 15.6349 6.84528 15.378L9.76595 13.7786C9.92458 13.6911 10.1183 13.691 10.2769 13.7786L13.1975 15.378H13.196C13.6675 15.6348 14.178 15.114 13.9079 14.6545L10.4762 8.84029ZM10.0214 4.32295C9.09171 4.32295 8.33833 5.07459 8.33833 6.00128C8.3385 6.92783 9.09181 7.67884 10.0214 7.67884C10.9509 7.67868 11.7036 6.92773 11.7037 6.00128C11.7037 5.07468 10.951 4.32311 10.0214 4.32295Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </span>
  );
}
