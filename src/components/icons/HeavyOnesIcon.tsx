import { PillGlyph } from '@/components/icons/pillGlyph';

interface IconProps {
  className?: string;
}

/**
 * Heavy Ones pill — simple briefcase: rounded body, handle, short latch.
 * Three paths so the outline-draw stays light, same as Gems.
 */
export function HeavyOnesIcon({ className }: IconProps) {
  return (
    <PillGlyph className={className} viewBox="0 0 24 24" strokeWidth={2.5}>
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 12h5" strokeLinecap="round" strokeLinejoin="round" />
    </PillGlyph>
  );
}
