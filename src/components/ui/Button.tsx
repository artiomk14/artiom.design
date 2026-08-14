'use client';

import { forwardRef } from 'react';
import { SmoothCorners } from '@lisse/react';
import { cn } from '@/lib/utils';
import { cornersFor } from '@/styles/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-background hover:bg-accent-hover',
  secondary: 'bg-background-muted text-foreground hover:bg-border',
  ghost: 'bg-transparent hover:bg-background-muted',
  link: 'bg-transparent underline-offset-4 hover:underline',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, type = 'button', ...props }, ref) => {
    // Link variant stays rectangular — no squircle chrome.
    if (variant === 'link') {
      return (
        <button
          ref={ref}
          type={type}
          className={cn(
            'inline-flex items-center justify-center gap-2',
            'font-medium',
            'transition-colors duration-150',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            'disabled:pointer-events-none disabled:opacity-50',
            variantClasses.link,
            sizeClasses[size],
            className
          )}
          disabled={disabled}
          {...props}
        />
      );
    }

    return (
      <SmoothCorners
        ref={ref}
        as="button"
        type={type}
        corners={cornersFor('md')}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-medium',
          'transition-colors duration-150',
          // outline-offset keeps focus visible outside clip-path (Lisse gotcha)
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
