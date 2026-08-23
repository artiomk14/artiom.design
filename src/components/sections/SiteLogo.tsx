import Image from 'next/image';
import { SmoothSurface } from '@/components/ui';
import { cn } from '@/lib/utils';
import { site } from '@/content/site';
import { colors, shadow } from '@/styles/tokens';

interface SiteLogoProps {
  className?: string;
}

/**
 * Figma `site-logo` (111:616) — 52px squircle frame, 44px cropped portrait.
 * Elevation is a Lisse SVG `shadow` on the squircle (not CSS box-shadow on
 * the square sizing wrapper, which painted sharp white corners).
 * Stroke is Lisse `innerBorder` on this same outer surface — CSS `border`
 * is clipped by clip-path and paints a square; `outerBorder` would sit in
 * the drop-shadow. innerBorder hugs the white frame from inside.
 */
export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <div
      className={cn(
        // Lisse wraps SmoothSurface in a position:relative div; size that wrapper too.
        'size-[var(--size-site-logo)] shrink-0 overflow-visible [&>div]:size-full',
        className
      )}
    >
      <SmoothSurface
        radius="xl"
        autoEffects={false}
        shadow={[...shadow.xlLayers]}
        innerBorder={{
          width: 1,
          color: colors.border.subtle,
          opacity: 1,
        }}
        className="flex size-full items-center justify-center overflow-hidden bg-background-surface p-1"
      >
        <SmoothSurface
          radius="lg"
          className="relative size-11 shrink-0 overflow-hidden [&>div]:size-full"
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
