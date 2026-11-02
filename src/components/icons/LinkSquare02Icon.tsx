import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma `Open with` leading icon on nested `selection-list` (246:360).
 * Leaf is the 17.33×17.33 export, centered in the 20×20 icon slot.
 */
export function LinkSquare02Icon({ className }: IconProps) {
  return (
    <span
      className={cn(
        'flex size-5 shrink-0 items-center justify-center overflow-clip',
        className
      )}
      aria-hidden="true"
    >
      <svg
        width={17.3333}
        height={17.3333}
        viewBox="0 0 17.3333 17.3333"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        className="shrink-0"
      >
        <path
          d="M7.86301 6.41382L11.165 6.16667V9.36705M11.165 6.16667L6.16664 11.1667"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.750001 8.66667C0.750001 4.93471 0.750001 3.06874 1.90937 1.90937C3.06874 0.750001 4.93471 0.750001 8.66667 0.750001C12.3986 0.750001 14.2646 0.750001 15.424 1.90937C16.5833 3.06874 16.5833 4.93471 16.5833 8.66667C16.5833 12.3986 16.5833 14.2646 15.424 15.424C14.2646 16.5833 12.3986 16.5833 8.66667 16.5833C4.93471 16.5833 3.06874 16.5833 1.90937 15.424C0.750001 14.2646 0.750001 12.3986 0.750001 8.66667Z"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </svg>
    </span>
  );
}
