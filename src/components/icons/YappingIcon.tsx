import { PillGlyph } from '@/components/icons/pillGlyph';

interface IconProps {
  className?: string;
}

/**
 * Figma pill leading-icon for Yapping — three circles, 13.17×13.17 leaf.
 */
export function YappingIcon({ className }: IconProps) {
  return (
    <PillGlyph className={className} width={13.1667} height={13.1667}>
      <circle cx="2.5" cy="3.66667" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.25" cy="10.0833" r="2.33333" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9.5" cy="3.66667" r="2.91667" stroke="currentColor" strokeWidth="1.5" />
    </PillGlyph>
  );
}
