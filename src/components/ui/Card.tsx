'use client';

import { forwardRef } from 'react';
import { SmoothCorners } from '@lisse/react';
import { cn } from '@/lib/utils';
import { cornersFor } from '@/styles/tokens';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    // Shadow sits on an unclipped wrapper so hover lift isn't cropped by clip-path.
    return (
      <div
        className={cn(
          hover && 'rounded-lg transition-shadow duration-200 hover:shadow-lg'
        )}
      >
        <SmoothCorners
          ref={ref}
          corners={cornersFor('lg')}
          className={cn(
            'border border-border bg-background',
            'overflow-hidden',
            className
          )}
          {...props}
        >
          {children}
        </SmoothCorners>
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-4 md:p-6', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';
