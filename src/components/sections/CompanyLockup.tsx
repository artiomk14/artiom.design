import { LsportsLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { site } from '@/content/site';

interface CompanyLockupProps {
  className?: string;
}

/**
 * Figma `logo-container` (123:588) — mark + name with a shared bottom border.
 */
export function CompanyLockup({ className }: CompanyLockupProps) {
  const { name } = site.hero.company;

  return (
    <span
      className={cn(
        'inline-flex h-6.5 items-end justify-center gap-1.5 border-b border-border-secondary pb-1',
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <span className="flex size-4.5 shrink-0 items-center justify-center bg-brand-bitter-lemon text-foreground-primary rounded-[var(--radius-xs)]">
          <span className="relative h-[var(--size-company-glyph-height)] w-[var(--size-company-glyph-width)] overflow-hidden">
            <span className="absolute left-1/2 top-[var(--size-company-glyph-inset)] bottom-[var(--size-company-glyph-inset)] aspect-[var(--aspect-company-glyph)] -translate-x-1/2">
              <LsportsLogo className="absolute inset-0" />
            </span>
          </span>
        </span>
        <span className="text-base font-medium leading-6 tracking-normal text-foreground-subtle">
          {name}
        </span>
      </span>
    </span>
  );
}
