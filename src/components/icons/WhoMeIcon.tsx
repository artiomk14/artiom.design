import { PillGlyph } from '@/components/icons/pillGlyph';

interface IconProps {
  className?: string;
}

/** User — Who Me? pill. */
export function WhoMeIcon({ className }: IconProps) {
  return (
    <PillGlyph className={className}>
      <circle cx="7" cy="4.75" r="2.15" />
      <path d="M2.5 12.4c0-2.55 2-4.15 4.5-4.15s4.5 1.6 4.5 4.15" />
    </PillGlyph>
  );
}
