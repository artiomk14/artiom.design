'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items?: NavItem[];
  className?: string;
}

/** Empty by default — nav items will be defined during redesign. */
const defaultNavItems: NavItem[] = [];

export function Navigation({ items = defaultNavItems, className }: NavigationProps) {
  const pathname = usePathname();

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={className} aria-label="Main navigation">
      <ul className="flex items-center gap-6 md:gap-8">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-150',
                  'hover:text-foreground focus-visible:text-foreground',
                  isActive ? 'text-foreground' : 'text-foreground-muted'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
