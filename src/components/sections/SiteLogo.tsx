import Image from 'next/image';
import { SmoothSurface } from '@/components/ui';
import { cn } from '@/lib/utils';
import { site } from '@/content/site';

interface SiteLogoProps {
  className?: string;
}

/**
 * Figma `site-logo` (111:616) — 52px squircle frame, 44px cropped portrait.
 */
export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <div className={cn('size-[var(--size-site-logo)] shrink-0 shadow-xl', className)}>
      <SmoothSurface
        radius="xl"
        className="flex size-full items-center justify-center overflow-hidden border border-border-subtle bg-background-surface p-1"
      >
        <SmoothSurface
          radius="lg"
          className="relative size-full min-w-px overflow-hidden"
        >
          <Image
            src={site.hero.portrait.src}
            alt={site.hero.portrait.alt}
            width={288}
            height={512}
            priority
            sizes="44px"
            className="absolute max-w-none h-[var(--site-logo-image-height)] w-[var(--site-logo-image-width)] left-[var(--site-logo-image-left)] top-[var(--site-logo-image-top)]"
          />
        </SmoothSurface>
      </SmoothSurface>
    </div>
  );
}
