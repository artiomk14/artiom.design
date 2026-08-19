import { PillGlyph } from '@/components/icons/pillGlyph';

interface IconProps {
  className?: string;
}

/**
 * Who Me? — the sent user-in-circle. Same Hugeicons geometry; the
 * shoulder arc is two strokes so it opens from the neck to the rim
 * instead of wiping across.
 */
export function WhoMeIcon({ className }: IconProps) {
  return (
    <PillGlyph className={className} viewBox="0 0 24 24" strokeWidth={2.5}>
      <path
        data-draw-delay="0"
        d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        data-draw-delay="80"
        d="M15.5 10.5C15.5 8.567 13.933 7 12 7C10.067 7 8.5 8.567 8.5 10.5C8.5 12.433 10.067 14 12 14C13.933 14 15.5 12.433 15.5 10.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        data-draw-delay="160"
        d="M12 14C15.3137 14 18 16.6863 18 20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        data-draw-delay="160"
        d="M12 14C8.68629 14 6 16.6863 6 20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PillGlyph>
  );
}
