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
import { colors, cornersFor, shadow } from '@/styles/tokens';

export type ButtonState = 'enabled' | 'hovered' | 'focused' | 'pressed';

/** Figma `class` on `button`. */
export type ButtonVariant = 'primary' | 'transparent' | 'neutral';

/** Figma 1920px (40px), 390px (`sm`, 36px), walkthrough pagination (32px icon). */
export type ButtonSize = 'default' | 'sm' | 'icon';

type SurfaceTone = ButtonState | 'interactive';

/**
 * Figma `button` — breakpoint=1920px | 390px, class=primary | transparent | neutral.
 *
 * Same layout, radius, and pressed inner shadow across classes. Color tokens
 * shift with `variant`. Neutral adds a 1px stroke, `shadow/2xs`, and a 2px
 * `border-strong` focus ring. States: enabled, hovered, focused, pressed.
 * Booleans: hasLabel, hasLeadingIcon, hasTrailingIcon.
 * Icon-only (`hasLabel={false}`) is square: 40×40 at `default`, 36×36 at
 * `sm`, 32×32 at `icon`.
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
  /** Figma `class`. Default `primary`. */
  variant?: ButtonVariant;
  /**
   * Figma 1920px (`default`, 40px), 390px (`sm`, 36px), or 32px icon control.
   * Square when icon-only.
   */
  size?: ButtonSize;
  /** When set, renders as a link (`<a>`) instead of a button. */
  href?: string;
}

function surfaceTone(variant: ButtonVariant, tone: SurfaceTone): string {
  if (variant === 'transparent') {
    switch (tone) {
      case 'interactive':
        return cn(
          'bg-transparent text-foreground-tertiary',
          'hover:bg-background-primary hover:text-foreground-secondary',
          'focus-visible:bg-background-primary focus-visible:text-foreground-secondary',
          'active:bg-background-hover active:text-foreground-primary'
        );
      case 'enabled':
        return 'bg-transparent text-foreground-tertiary';
      case 'hovered':
      case 'focused':
        return 'bg-background-primary text-foreground-secondary';
      case 'pressed':
        return 'bg-background-hover text-foreground-primary';
    }
  }

  if (variant === 'neutral') {
    switch (tone) {
      case 'interactive':
        return cn(
          'bg-background-surface text-foreground-subtle',
          'hover:text-foreground-tertiary',
          'focus-visible:text-foreground-tertiary',
          'active:bg-background-primary active:text-foreground-secondary'
        );
      case 'enabled':
        return 'bg-background-surface text-foreground-subtle';
      case 'hovered':
      case 'focused':
        return 'bg-background-surface text-foreground-tertiary';
      case 'pressed':
        return 'bg-background-primary text-foreground-secondary';
    }
  }

  switch (tone) {
    case 'interactive':
      return cn(
        'bg-background-primary text-foreground-tertiary',
        'hover:bg-background-hover',
        'focus-visible:bg-background-hover',
        'active:bg-background-elevated active:text-foreground-secondary'
      );
    case 'enabled':
      return 'bg-background-primary text-foreground-tertiary';
    case 'hovered':
    case 'focused':
      return 'bg-background-hover text-foreground-tertiary';
    case 'pressed':
      return 'bg-background-elevated text-foreground-secondary';
  }
}

function visualState(
  forced: ButtonState | undefined,
  isPressed: boolean,
  isFocusVisible: boolean,
  isHovered: boolean
): ButtonState {
  if (forced) return forced;
  if (isPressed) return 'pressed';
  if (isFocusVisible) return 'focused';
  if (isHovered) return 'hovered';
  return 'enabled';
}

function borderFor(variant: ButtonVariant, tone: ButtonState) {
  if (variant === 'neutral') {
    switch (tone) {
      case 'focused':
        return { width: 2, color: colors.border.strong, opacity: 1 };
      case 'hovered':
      case 'pressed':
        return { width: 1, color: colors.border.secondary, opacity: 1 };
      case 'enabled':
        return { width: 1, color: colors.border.subtle, opacity: 1 };
    }
  }

  return {
    width: 2,
    color: colors.border.strong,
    opacity: tone === 'focused' ? 1 : 0,
  };
}

function sizeClassName(
  size: ButtonSize,
  isIconOnly: boolean,
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean
): string {
  if (size === 'icon') {
    return 'size-8 shrink-0 gap-0 px-0 py-0';
  }

  const height = size === 'sm' ? 'h-9' : 'h-10';
  const square = size === 'sm' ? 'size-9' : 'size-10';

  if (isIconOnly) {
    return cn(square, 'shrink-0 gap-0 px-0 py-0');
  }

  if (hasTrailingIcon && !hasLeadingIcon) {
    return cn(height, 'gap-3.5 pl-5 pr-4');
  }

  return cn(height, 'gap-2.5 px-5');
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
      variant = 'primary',
      size = 'default',
      href,
      onFocus,
      onBlur,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref
  ) => {
    const text = children ?? label ?? 'Button';
    const isSm = size === 'sm';
    const iconClassName = isSm ? 'size-3' : undefined;
    const leading = leadingIcon ?? <LinkedIn01Icon className={iconClassName} />;
    const trailing = trailingIcon ?? <LinkedIn01Icon className={iconClassName} />;
    const forced = state !== undefined;
    const isLink = Boolean(href);
    const isExternal = Boolean(href?.startsWith('http'));
    const { 'aria-label': ariaLabel, ...rest } = props;

    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const tone = visualState(state, isPressed, isFocusVisible, isHovered);
    const showPressedShadow = tone === 'pressed';
    const showDropShadow = variant === 'neutral' && tone !== 'pressed';

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

    const handlePointerEnter = (
      event: PointerEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      onPointerEnter?.(event as PointerEvent<HTMLButtonElement>);
      if (!forced) setIsHovered(true);
    };

    const handlePointerLeave = (
      event: PointerEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      onPointerLeave?.(event as PointerEvent<HTMLButtonElement>);
      if (!forced) setIsHovered(false);
    };

    const isIcon = size === 'icon';
    const isIconOnly = !hasLabel;

    const content = (
      <>
        {hasLeadingIcon ? leading : null}
        {hasLabel ? <span>{text}</span> : null}
        {hasTrailingIcon ? trailing : null}
      </>
    );

    const surfaceClassName = cn(
      'ui-button',
      'inline-flex cursor-pointer items-center justify-center',
      sizeClassName(size, isIconOnly, hasLeadingIcon, hasTrailingIcon),
      isSm
        ? 'text-xs font-semibold leading-4 tracking-normal whitespace-nowrap'
        : 'text-sm font-semibold leading-5 tracking-normal whitespace-nowrap',
      'transition-[background-color,color] duration-150 ease-out',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      surfaceTone(variant, state ?? 'interactive'),
      className
    );

    const effects = {
      corners: cornersFor(isIcon ? 'md' : 'xl'),
      autoEffects: false as const,
      innerBorder: borderFor(variant, tone),
      innerShadow: {
        ...pressedInnerShadow,
        opacity: showPressedShadow ? 0.05 : 0,
      },
      shadow: variant === 'neutral'
        ? [{ ...shadow.twoXsLayers[0], opacity: showDropShadow ? 0.05 : 0 }]
        : undefined,
    };

    const shared = {
      disabled,
      'aria-label': !hasLabel
        ? (ariaLabel ?? (typeof text === 'string' ? text : undefined))
        : ariaLabel,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onPointerDown: handlePointerDown,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
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
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
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
