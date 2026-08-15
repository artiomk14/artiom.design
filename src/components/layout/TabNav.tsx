'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { SmoothSurface, NavItem } from '@/components/ui';
import { NavAboutIcon, NavWorkIcon } from '@/components/icons/NavIcons';
import { cn } from '@/lib/utils';

interface TabNavItem {
  href: string;
  label: string;
  icon: ReactNode;
  /** Extra paths (besides href) that should mark this item selected. */
  alsoActiveOn?: string[];
}

interface TabNavProps {
  className?: string;
  items?: TabNavItem[];
}

const defaultItems: TabNavItem[] = [
  { href: '/', label: 'About', icon: <NavAboutIcon />, alsoActiveOn: ['/about'] },
  { href: '/work', label: 'Work', icon: <NavWorkIcon /> },
];

function isItemActive(pathname: string, item: TabNavItem): boolean {
  if (pathname === item.href) return true;
  if (item.href !== '/' && pathname.startsWith(`${item.href}/`)) return true;
  return item.alsoActiveOn?.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  ) ?? false;
}

/**
 * Pill tab navigation from Figma `nav-container` (109:562).
 * A muted pill (`radius/3xl`) holding `nav-item` controls.
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
        {items.map((item) => (
          <NavItem
            key={item.href}
            as={Link}
            href={item.href}
            selected={isItemActive(pathname, item)}
            aria-label={item.label}
          >
            {item.icon}
          </NavItem>
        ))}
      </SmoothSurface>
    </nav>
  );
}
