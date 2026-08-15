'use client';

import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

/** Blank for now — logo and nav will be added during redesign. */
export function Header({ className }: HeaderProps) {
  return <header className={cn(className)} />;
}
