import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

/** Blank for now — footer will be added during redesign. */
export function Footer({ className }: FooterProps) {
  return <footer className={cn(className)} />;
}
