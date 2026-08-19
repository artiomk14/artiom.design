import { PillGlyph } from '@/components/icons/pillGlyph';

interface IconProps {
  className?: string;
}

/** Pencil — Yapping pill. */
export function YappingIcon({ className }: IconProps) {
  return (
    <PillGlyph className={className}>
      <path d="M9.4 2.35 11.65 4.6 5.1 11.15 2.7 12.3l1.15-2.4Z" />
      <path d="M8.55 3.2 10.8 5.45" />
      <path d="M4.55 10.05 6.35 11.85" />
    </PillGlyph>
  );
}
