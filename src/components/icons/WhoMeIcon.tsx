import { PillGlyph } from '@/components/icons/pillGlyph';

interface IconProps {
  className?: string;
}

/**
 * Figma pill leading-icon for Who Me? — ID card, 13.17×11.42 leaf.
 */
export function WhoMeIcon({ className }: IconProps) {
  return (
    <PillGlyph className={className} width={13.1667} height={11.4167}>
      <path
        d="M7.75 0.750002C9.94989 0.750002 11.0498 0.750002 11.7333 1.47613C12.4167 2.20226 12.4167 3.37096 12.4167 5.70834C12.4167 8.04572 12.4167 9.21441 11.7333 9.94054C11.0498 10.6667 9.94989 10.6667 7.75 10.6667L5.41667 10.6667C3.21678 10.6667 2.11684 10.6667 1.43342 9.94054C0.750002 9.21441 0.750002 8.04572 0.750002 5.70834C0.750002 3.37095 0.750002 2.20226 1.43342 1.47613C2.11684 0.750002 3.21678 0.750002 5.41667 0.750002L7.75 0.750002Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M2.49998 7.75001C3.43836 6.50322 5.62309 6.43516 6.58331 7.75001M5.56191 4.68758C5.56191 5.25137 5.10487 5.70842 4.54108 5.70842C3.97729 5.70842 3.52024 5.25137 3.52024 4.68758C3.52024 4.12379 3.97729 3.66675 4.54108 3.66675C5.10487 3.66675 5.56191 4.12379 5.56191 4.68758Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.33334 4.25L10.6667 4.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.33334 6.58334L9.5 6.58334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </PillGlyph>
  );
}
