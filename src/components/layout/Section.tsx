import { cn } from '@/lib/utils';

type SectionSize = 'sm' | 'md' | 'lg';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  size?: SectionSize;
  as?: 'section' | 'div' | 'article';
}

const sizeClasses: Record<SectionSize, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
};

export function Section({
  children,
  className,
  size = 'md',
  as: Component = 'section',
}: SectionProps) {
  return (
    <Component className={cn(sizeClasses[size], className)}>
      <div className="container">{children}</div>
    </Component>
  );
}
