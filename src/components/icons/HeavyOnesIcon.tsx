import { PillGlyph } from '@/components/icons/pillGlyph';

interface IconProps {
  className?: string;
}

/** Briefcase — Heavy Ones pill. */
export function HeavyOnesIcon({ className }: IconProps) {
  return (
    <PillGlyph className={className}>
      <path d="M5.15 5.35V3.55A.95.95 0 0 1 6.1 2.6h1.8a.95.95 0 0 1 .95.95v1.8" />
      <path d="M2.95 5.35h8.1A1.2 1.2 0 0 1 12.25 6.55v4.75A1.2 1.2 0 0 1 11.05 12.5H2.95A1.2 1.2 0 0 1 1.75 11.3V6.55A1.2 1.2 0 0 1 2.95 5.35Z" />
      <path d="M1.75 8.9h10.5" />
      <path d="M6.2 8.05h1.6v1.7H6.2Z" />
    </PillGlyph>
  );
}
