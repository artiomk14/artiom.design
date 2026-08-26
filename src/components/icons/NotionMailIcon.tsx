import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Notion Mail paper-plane from Figma nested `selection-list` (246:365).
 * Same glyph as the sent paper-plane asset. Leaf 16.67×15 in the 20×20 slot.
 */
export function NotionMailIcon({ className }: IconProps) {
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
        height={15}
        viewBox="0 0 16.6667 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M0.606292 5.2685C-0.0190908 5.50505 -0.233016 6.12436 0.312082 6.64839L2.94644 9.09144C2.98239 9.12183 3.0049 9.16176 3.01332 9.20769L3.96016 14.37C4.06847 14.9604 4.85443 15.1481 5.23829 14.6747L6.80101 12.7437C6.85382 12.68 6.95085 12.6709 7.01407 12.7258L9.28147 14.5565C9.92566 15.1759 10.669 15.1759 11.0159 14.37L16.566 1.64628C16.9621 0.722713 16.1696 -0.449851 14.5329 0.176294"
          fill="currentColor"
        />
        <path
          d="M4.18657 8.45436C7.2521 6.71457 9.72178 4.72355 12.5159 3.07602C12.7653 2.92897 12.9833 3.21951 12.7669 3.40892C12.1352 3.9622 11.5023 4.5182 11.3506 4.65751C11.0256 4.95594 7.29793 7.94367 7.29793 7.94367L5.36661 9.47187C5.76305 10.0435 9.22743 13.2155 10.0298 13.5106C12.078 9.25398 13.9376 5.31167 15.4296 1.51304C15.5441 1.22145 15.2428 0.940556 14.9422 1.05732L5.80016 4.60819L1.50452 6.21615L4.18657 8.45436Z"
          fill="white"
        />
      </svg>
    </span>
  );
}
