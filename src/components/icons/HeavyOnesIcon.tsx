import { PillGlyph } from '@/components/icons/pillGlyph';

interface IconProps {
  className?: string;
}

/**
 * Heavy Ones — the sent briefcase: rounded body, handle, full-width
 * seam, square latch. Same 14×14 / 1.5 stroke slot as Gems.
 */
export function HeavyOnesIcon({ className }: IconProps) {
  return (
    <PillGlyph className={className}>
      <path
        d="M5.35 4V2.55A1.1 1.1 0 0 1 6.45 1.45h1.1A1.1 1.1 0 0 1 8.65 2.55V4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 4h8.15A2.15 2.15 0 0 1 13.3 6.15v4.8A2.15 2.15 0 0 1 11.15 13.1H3A2.15 2.15 0 0 1 .85 10.95V6.15A2.15 2.15 0 0 1 3 4Z"
        strokeLinejoin="round"
      />
      <path d="M.85 8.55h12.45" strokeLinecap="round" />
      <path d="M6.15 7.7h1.7v1.7h-1.7Z" />
    </PillGlyph>
  );
}
