'use client';

import { forwardRef, type ReactNode } from 'react';
import { SmoothCorners } from '@lisse/react';
import { LinkedIn01Icon } from '@/components/icons/LinkedIn01Icon';
import { cn } from '@/lib/utils';
import { cornersFor } from '@/styles/tokens';

export type ButtonState = 'enabled' | 'hovered' | 'focused' | 'pressed';

/**
 * Figma `button` — breakpoint=1920px, class=primary.
 *
 * Variants (CSS, or `state` to force): enabled, hovered, focused, pressed.
 * Booleans: hasLabel, hasLeadingIcon, hasTrailingIcon.
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma `label`. Falls back to `children` if provided. */
  label?: string;
  children?: ReactNode;
  /** Figma `has label`. Default true. */
  hasLabel?: boolean;
  /** Figma `has leading-icon`. Default true. */
  hasLeadingIcon?: boolean;
  /** Figma `has trailing-icon`. Default false. */
  hasTrailingIcon?: boolean;
  /** Figma `leading-icon` instance swap. Defaults to `linkedin-01`. */
  leadingIcon?: ReactNode;
  /** Figma `trailing-icon` instance swap. Defaults to `linkedin-01`. */
  trailingIcon?: ReactNode;
  /**
   * Force a Figma `state` variant. Omit to follow hover / focus-visible / active.
   */
  state?: ButtonState;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = 'button',
      disabled,
      label,
      children,
      hasLabel = true,
      hasLeadingIcon = true,
      hasTrailingIcon = false,
      leadingIcon,
      trailingIcon,
      state,
      ...props
    },
    ref
  ) => {
    const text = children ?? label ?? 'Button';
    const leading = leadingIcon ?? <LinkedIn01Icon />;
    const trailing = trailingIcon ?? <LinkedIn01Icon />;
    const forced = state !== undefined;
    const { 'aria-label': ariaLabel, ...rest } = props;

    return (
      <SmoothCorners
        ref={ref}
        as="button"
        type={type}
        corners={cornersFor('md')}
        disabled={disabled}
        aria-label={
          !hasLabel
            ? (ariaLabel ?? (typeof text === 'string' ? text : undefined))
            : ariaLabel
        }
        className={cn(
          'ui-button group',
          'relative inline-flex h-10 cursor-pointer items-center justify-center gap-2.5 px-5',
          'text-sm font-semibold leading-5 tracking-normal whitespace-nowrap',
          'transition-[background-color,color] duration-150 ease-out',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          !forced && [
            'bg-background-primary text-foreground-tertiary',
            'hover:bg-background-hover',
            'focus-visible:bg-background-hover',
            'active:bg-background-elevated active:text-foreground-secondary',
          ],
          forced && state === 'enabled' && 'bg-background-primary text-foreground-tertiary',
          forced && state === 'hovered' && 'bg-background-hover text-foreground-tertiary',
          forced && state === 'focused' && 'bg-background-hover text-foreground-tertiary',
          forced && state === 'pressed' && 'bg-background-elevated text-foreground-secondary',
          className
        )}
        {...rest}
      >
        {hasLeadingIcon ? leading : null}
        {hasLabel ? <span>{text}</span> : null}
        {hasTrailingIcon ? trailing : null}

        {/* Figma focused: 2px INSIDE stroke (border/border-strong). Overlay so
            the ring sits above the fill and follows the Lisse clip. */}
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 shadow-[inset_0_0_0_2px_var(--border-strong)]',
            forced
              ? state === 'focused'
                ? 'opacity-100'
                : 'opacity-0'
              : 'opacity-0 group-focus-visible:opacity-100 group-active:opacity-0'
          )}
        />

        {/* Figma pressed: inner-shadow/sm */}
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 shadow-inner-sm',
            forced
              ? state === 'pressed'
                ? 'opacity-100'
                : 'opacity-0'
              : 'opacity-0 group-active:opacity-100'
          )}
        />
      </SmoothCorners>
    );
  }
);

Button.displayName = 'Button';
