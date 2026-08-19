import { PillGlyph } from '@/components/icons/pillGlyph';

interface IconProps {
  className?: string;
}

/** Faceted diamond — Gems pill. */
export function GemIcon({ className }: IconProps) {
  return (
    <PillGlyph className={className}>
      <path d="M4.35 1.85h5.3L12.35 5.2 7 12.4 1.65 5.2Z" />
      <path d="M1.65 5.2h10.7" />
      <path d="M4.35 1.85 7 5.2 9.65 1.85" />
      <path d="M4.15 5.2 7 12.4 9.85 5.2" />
    </PillGlyph>
  );
}
