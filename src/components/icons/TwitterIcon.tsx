import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/**
 * Figma X glyph on nav `button` 124:659.
 * Leaf is 11.67×10.5 inside the 14×14 icon slot (inset 8.33% / 12.5%).
 */
export function TwitterIcon({ className }: IconProps) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-3.5 shrink-0', className)}
    >
      <path
        d="M3.46484 0.454102L5.87793 3.62988L6.21484 4.07324L6.58203 3.65527L9.39355 0.454102H9.97363L6.72754 4.14746L6.48242 4.42676L6.70703 4.72266L10.751 10.0459H8.29102L5.60742 6.55273L5.27051 6.11426L4.90527 6.5293L1.81445 10.0459H1.23438L4.75195 6.04297L4.99902 5.76172L4.77148 5.46582L0.921875 0.454102H3.46484ZM1.72852 1.28711L8.2002 9.71094L8.33594 9.88867H10.4678L9.91309 9.15918L3.51465 0.735352L3.37793 0.555664H1.16699L1.72852 1.28711Z"
        transform="translate(1.16665 1.75)"
        fill="currentColor"
      />
    </svg>
  );
}
