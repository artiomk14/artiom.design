import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  children: React.ReactNode;
}

const headingSizeClasses: Record<HeadingSize, string> = {
  display: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
  h1: 'text-4xl md:text-5xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl font-semibold tracking-tight',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-medium',
  h5: 'text-lg md:text-xl font-medium',
  h6: 'text-base md:text-lg font-medium',
};

export function Heading({
  as: Component = 'h2',
  size,
  className,
  children,
  ...props
}: HeadingProps) {
  const sizeClass = size ? headingSizeClasses[size] : headingSizeClasses[Component];

  return (
    <Component
      className={cn('text-balance text-foreground', sizeClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  muted?: boolean;
  children: React.ReactNode;
}

const textSizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export function Text({
  as: Component = 'p',
  size = 'base',
  muted = false,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        textSizeClasses[size],
        muted ? 'text-foreground-muted' : 'text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
