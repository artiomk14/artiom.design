import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

const LEAF_WIDTH = 4.79289;
const LEAF_HEIGHT = 8.5;

/**
 * Figma `arrow-right-01-sharp` — nested chevron on `selection-item`.
 * Leaf is the 4.79×8.5 export, placed in the 14×14 slot at Figma insets
 * (top/bottom 25%, left/right 37.5%, plus stroke overflow).
 */
export function ArrowRight01SharpIcon({ className }: IconProps) {
  return (
    <span
      className={cn('relative size-3.5 shrink-0 overflow-clip', className)}
      aria-hidden="true"
    >
      <svg
        width={LEAF_WIDTH}
        height={LEAF_HEIGHT}
        viewBox={`0 0 ${LEAF_WIDTH} ${LEAF_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        className="absolute left-[4.5px] top-[2.75px] shrink-0"
      >
        <path
          d="M0.75 7.75L3.54289 4.95711C3.87623 4.62377 4.04289 4.45711 4.04289 4.25C4.04289 4.04289 3.87623 3.87623 3.54289 3.54289L0.75 0.75"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
