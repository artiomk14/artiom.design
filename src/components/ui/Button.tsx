'use client';

import {
  forwardRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { SmoothCorners } from '@lisse/react';
import { LinkedIn01Icon } from '@/components/icons/LinkedIn01Icon';
import { cn } from '@/lib/utils';
import { colors, cornersFor } from '@/styles/tokens';

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
  /** When set, renders as a link (`<a>`) instead of a button. */
  href?: string;
}

/** Figma `inner-shadow/sm` — inset 0 2px 4px rgb(0 0 0 / 0.05). */
const pressedInnerShadow = {
  offsetX: 0,
  offsetY: 2,
  blur: 4,
  spread: 0,
  color: '#000000',
} as const;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
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
      href,
      onFocus,
      onBlur,
      onPointerDown,
      ...props
    },
    ref
  ) => {
    const text = children ?? label ?? 'Button';
    const leading = leadingIcon ?? <LinkedIn01Icon />;
    const trailing = trailingIcon ?? <LinkedIn01Icon />;
    const forced = state !== undefined;
    const isLink = Boolean(href);
    const isExternal = Boolean(href?.startsWith('http'));
    const { 'aria-label': ariaLabel, ...rest } = props;

    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const showFocusRing = forced
      ? state === 'focused'
      : isFocusVisible && !isPressed;
    const showPressedShadow = forced ? state === 'pressed' : isPressed;

    const handleFocus = (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      onFocus?.(event as FocusEvent<HTMLButtonElement>);
      setIsFocusVisible(event.currentTarget.matches(':focus-visible'));
    };

    const handleBlur = (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      onBlur?.(event as FocusEvent<HTMLButtonElement>);
      setIsFocusVisible(false);
    };

    const handlePointerDown = (
      event: PointerEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      onPointerDown?.(event as PointerEvent<HTMLButtonElement>);
      if (forced || event.button !== 0) return;
      setIsPressed(true);
      const release = () => {
        setIsPressed(false);
        window.removeEventListener('pointerup', release);
        window.removeEventListener('pointercancel', release);
      };
      window.addEventListener('pointerup', release);
      window.addEventListener('pointercancel', release);
    };

    const content = (
      <>
        {hasLeadingIcon ? leading : null}
        {hasLabel ? <span>{text}</span> : null}
        {hasTrailingIcon ? trailing : null}
      </>
    );

    const surfaceClassName = cn(
      'ui-button',
      'inline-flex h-10 cursor-pointer items-center justify-center gap-2.5 px-5',
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
    );

    const effects = {
      corners: cornersFor('xl'),
      autoEffects: false as const,
      innerBorder: {
        width: 2,
        color: colors.border.strong,
        opacity: showFocusRing ? 1 : 0,
      },
      innerShadow: {
        ...pressedInnerShadow,
        opacity: showPressedShadow ? 0.05 : 0,
      },
    };

    const shared = {
      disabled,
      'aria-label': !hasLabel
        ? (ariaLabel ?? (typeof text === 'string' ? text : undefined))
        : ariaLabel,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onPointerDown: handlePointerDown,
      className: surfaceClassName,
    };

    return (
      <span className="inline-flex">
        {isLink ? (
          <SmoothCorners
            ref={ref as Ref<HTMLAnchorElement>}
            as="a"
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            {...effects}
            aria-label={shared['aria-label']}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onPointerDown={handlePointerDown}
            className={surfaceClassName}
          >
            {content}
          </SmoothCorners>
        ) : (
          <SmoothCorners
            ref={ref as Ref<HTMLButtonElement>}
            as="button"
            type={type}
            {...effects}
            {...shared}
            {...rest}
          >
            {content}
          </SmoothCorners>
        )}
      </span>
    );
  }
);

Button.displayName = 'Button';
