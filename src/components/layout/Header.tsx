import Link from 'next/link';
import { ChevronDownIcon, LinkedIn01Icon, TwitterIcon } from '@/components/icons';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { site } from '@/content/site';

interface HeaderProps {
  className?: string;
}

/**
 * Figma `nav-container` (109:562) — name as logo, contact actions on the right.
 */
export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('w-full', className)}>
      <div className="mx-auto grid w-full max-w-[var(--container-max)] grid-cols-2 items-center px-[var(--container-padding)] pt-9">
        <Link
          href="/"
          className="justify-self-start text-base font-medium leading-6 tracking-normal text-foreground-primary"
        >
          {site.name}
        </Link>

        <nav
          aria-label="Contact"
          className="flex items-center justify-end justify-self-end gap-3"
        >
          <Button
            href={site.links.twitter || undefined}
            hasLabel={false}
            hasLeadingIcon
            leadingIcon={<TwitterIcon />}
            aria-label="Twitter"
          />
          <Button
            href={site.links.linkedin}
            hasLabel={false}
            hasLeadingIcon
            leadingIcon={<LinkedIn01Icon />}
            aria-label="LinkedIn"
          />
          <Button
            href={`mailto:${site.links.email}`}
            hasLeadingIcon={false}
            hasLabel
            hasTrailingIcon
            trailingIcon={<ChevronDownIcon />}
            label="E-mail"
          />
        </nav>
      </div>
    </header>
  );
}
