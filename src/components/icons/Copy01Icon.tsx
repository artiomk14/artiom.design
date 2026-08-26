import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Copy glyph from the sent `copy-01` asset (24×24). Painted with
 * `currentColor` via mask so the selection-item leading tone still applies.
 */
export function Copy01Icon({ className }: IconProps) {
  return (
    <span
      className={cn(
        'size-5 shrink-0 bg-current',
        '[mask-image:url(/icons/mail/copy-01.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]',
        '[-webkit-mask-image:url(/icons/mail/copy-01.png)] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]',
        className
      )}
      aria-hidden="true"
    />
  );
}
