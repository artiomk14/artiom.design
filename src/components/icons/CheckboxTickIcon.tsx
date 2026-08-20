import { cn } from '@/lib/utils';

export type CheckboxTickSize = 'lg' | 'md' | 'x-sm';

interface CheckboxTickIconProps {
  size?: CheckboxTickSize;
  className?: string;
}

/**
 * Figma `tick-02` leaves used by `checkbox` (177:322).
 * Outer box is the icon slot (14 / 12 / 10). Inner leaf is the exported
 * path box, centered — inset 27.08% 20.83% plus stroke overflow.
 */
const LEAVES = {
  lg: {
    slot: 14,
    slotClass: 'size-3.5',
    width: 9.66667,
    height: 7.91667,
    path: 'M0.75 5.125L2.79167 7.16667L8.91667 0.750001',
  },
  md: {
    slot: 12,
    slotClass: 'size-3',
    width: 8.5,
    height: 7,
    path: 'M0.75 4.5L2.5 6.25L7.75 0.750001',
  },
  'x-sm': {
    slot: 10,
    slotClass: 'size-2.5',
    width: 7.33333,
    height: 6.08333,
    path: 'M0.75 3.875L2.20833 5.33333L6.58333 0.750001',
  },
} as const;

export function CheckboxTickIcon({
  size = 'lg',
  className,
}: CheckboxTickIconProps) {
  const leaf = LEAVES[size];

  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center overflow-clip',
        leaf.slotClass,
        className
      )}
      aria-hidden="true"
    >
      <svg
        width={leaf.width}
        height={leaf.height}
        viewBox={`0 0 ${leaf.width} ${leaf.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        className="shrink-0"
      >
        <path
          d={leaf.path}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
