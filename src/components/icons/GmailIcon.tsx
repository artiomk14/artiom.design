import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Gmail mark from Figma nested `selection-list` (246:363).
 * Leaf is the 16.67×12.50 export, centered in the 20×20 icon slot.
 */
export function GmailIcon({ className }: IconProps) {
  return (
    <span
      className={cn(
        'flex size-5 shrink-0 items-center justify-center overflow-clip',
        className
      )}
      aria-hidden="true"
    >
      <svg
        width={16.6667}
        height={12.5032}
        viewBox="0 0 16.6667 12.5032"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M3.78788 12.5032V6.06383L1.7908 4.23679L3.97364e-08 3.22293V11.3669C3.97364e-08 11.9957 0.50947 12.5032 1.13636 12.5032H3.78788Z"
          fill="#4285F4"
        />
        <path
          d="M12.8788 12.5032H15.5303C16.1591 12.5032 16.6666 11.9938 16.6666 11.3669V3.22293L14.6383 4.38427L12.8788 6.06383V12.5032Z"
          fill="#34A853"
        />
        <path
          d="M3.78788 6.06384L3.51613 3.54774L3.78788 1.13959L8.33334 4.54868L12.8788 1.13959L13.1828 3.41771L12.8788 6.06384L8.33334 9.47293L3.78788 6.06384Z"
          fill="#EA4335"
        />
        <path
          d="M12.8788 1.13959V6.06383L16.6666 3.22293V1.70777C16.6666 0.302471 15.0625 -0.498666 13.9394 0.344137L12.8788 1.13959Z"
          fill="#FBBC04"
        />
        <path
          d="M0 3.22292L1.74211 4.5295L3.78788 6.06383V1.13959L2.72727 0.344133C1.60227 -0.49867 0 0.302466 0 1.70777V3.22292Z"
          fill="#C5221F"
        />
      </svg>
    </span>
  );
}
