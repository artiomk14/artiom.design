'use client';

import Link from 'next/link';
import { Navigation } from './Navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-background/80 backdrop-blur-md',
        'border-b border-border/50',
        className
      )}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-70"
            aria-label="Home"
          >
            artiom.design
          </Link>

          <Navigation className="hidden md:block" />

          <MobileMenuButton className="md:hidden" />
        </div>
      </div>
    </header>
  );
}

function MobileMenuButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-10 w-10 items-center justify-center',
        'rounded-md transition-colors',
        'hover:bg-background-muted focus-visible:bg-background-muted',
        className
      )}
      aria-label="Open menu"
      aria-expanded="false"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
