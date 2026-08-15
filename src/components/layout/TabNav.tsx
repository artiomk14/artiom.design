'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { SmoothSurface } from '@/components/ui';
import { NavAboutIcon, NavWorkIcon } from '@/components/icons/NavIcons';
import { cn } from '@/lib/utils';

interface TabNavItem {
  href: string;
  label: string;
  icon: ReactNode;
  /** Match home (`/`) only exactly; nested routes use prefix match. */
  match?: 'exact' | 'prefix';
}

interface TabNavProps {
  className?: string;
  items?: TabNavItem[];
}

const defaultItems: TabNavItem[] = [
  {
    href: '/',
    label: 'About',
    icon: <NavAboutIcon />,
    match: 'exact',
  },
  {
    href: '/work',
    label: 'Work',
    icon: <NavWorkIcon />,
    match: 'prefix',
  },
];

function isItemActive(pathname: string, item: TabNavItem): boolean {
  if (item.href === '/') {
    return pathname === '/' || pathname === '/about';
  }
  if (item.match === 'exact') {
    return pathname === item.href;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/**
 * Pill tab navigation from Figma `nav-container` (109:562).
 * Selected item: surface + border + shadow. Unselected: icon only.
 */
export function TabNav({ className, items = defaultItems }: TabNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn('flex w-full flex-col items-center justify-center pt-9', className)}
      aria-label="Primary"
    >
      <SmoothSurface
        radius="3xl"
        className="flex items-center gap-1 bg-background-muted p-2"
      >
        {items.map((item) => {
          const selected = isItemActive(pathname, item);

          return (
            <SmoothSurface
              key={item.href}
              as={Link}
              href={item.href}
              radius="2xl"
              aria-label={item.label}
              aria-current={selected ? 'page' : undefined}
              className={cn(
                'flex items-center justify-center p-3.5 transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                selected
                  ? 'border border-border bg-background-subtle text-foreground shadow-sm'
                  : 'text-foreground-muted hover:text-foreground'
              )}
            >
              {item.icon}
            </SmoothSurface>
          );
        })}
      </SmoothSurface>
    </nav>
  );
}
