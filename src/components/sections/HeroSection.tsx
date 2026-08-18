import { CompanyLockup } from '@/components/sections/CompanyLockup';
import { SiteLogo } from '@/components/sections/SiteLogo';
import { site } from '@/content/site';

interface HeroSectionProps {
  className?: string;
}

/**
 * Figma `hero-section` (110:563) — portrait, Hello greeting, intro, company lockup.
 */
export function HeroSection({ className }: HeroSectionProps) {
  const { greeting, intro, rolePrefix, roleSuffix } = site.hero;

  return (
    <section aria-labelledby="hero-heading" className={className}>
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col items-start justify-center gap-11 border-b border-border-subtle px-[var(--container-padding)] pt-20 pb-16">
        <h1 id="hero-heading" className="sr-only">
          {site.name}, product designer
        </h1>

        <SiteLogo />

        <div className="flex w-full flex-col items-start gap-3">
          <p className="font-display text-3xl font-bold leading-8 tracking-[var(--tracking-display)] text-foreground-light">
            {greeting}
          </p>

          <div className="flex flex-col items-start gap-1 pl-0.5">
            <p className="text-base font-normal leading-6 tracking-normal text-foreground-primary">
              {intro}
            </p>
            <p className="flex flex-wrap items-start gap-2.5 text-base font-normal leading-6 tracking-normal text-foreground-primary">
              <span>{rolePrefix}</span>
              <CompanyLockup />
              <span>{roleSuffix}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
