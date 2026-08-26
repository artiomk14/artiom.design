import Image from 'next/image';
import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Outlook mark from Figma nested `selection-list` (246:364), plus the
 * sent 24×24 brand asset. Sized to the 20×20 leading-icon slot.
 */
export function OutlookIcon({ className }: IconProps) {
  return (
    <span
      className={cn(
        'relative flex size-5 shrink-0 items-center justify-center overflow-clip',
        className
      )}
      aria-hidden="true"
    >
      <Image
        src="/icons/mail/outlook.png"
        alt=""
        width={20}
        height={20}
        className="size-5 object-contain"
      />
    </span>
  );
}
