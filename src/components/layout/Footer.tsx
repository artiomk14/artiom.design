import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('border-t border-border', className)}>
      <div className="container flex items-center justify-between py-8">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight transition-opacity hover:opacity-70"
        >
          artiom.design
        </Link>
        <p className="text-sm text-foreground-subtle">&copy; {currentYear}</p>
      </div>
    </footer>
  );
}
