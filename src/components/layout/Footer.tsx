import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const socialLinks = [
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Dribbble', href: '#' },
];

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn('border-t border-border bg-background-subtle', className)}
    >
      <div className="container">
        <div className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="space-y-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-70"
            >
              artiom.design
            </Link>
            <p className="text-sm text-foreground-muted">
              Design &amp; Development
            </p>
          </div>

          <nav aria-label="Social links">
            <ul className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border py-6">
          <p className="text-center text-sm text-foreground-subtle">
            &copy; {currentYear} Artiom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
