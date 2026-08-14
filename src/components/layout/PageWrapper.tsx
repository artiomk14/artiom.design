import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  // Layout already provides the document <main>; keep this a plain wrapper.
  return (
    <div
      className={cn(
        'min-h-screen pt-16 md:pt-20',
        className
      )}
    >
      {children}
    </div>
  );
}
