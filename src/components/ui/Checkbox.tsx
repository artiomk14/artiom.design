'use client';

import {
  forwardRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type Ref,
} from 'react';
import { SmoothCorners } from '@lisse/react';
import { CheckboxTickIcon } from '@/components/icons/CheckboxTickIcon';
import { cn } from '@/lib/utils';
import { colors, cornersFor, shadow, type RadiusToken } from '@/styles/tokens';

export type CheckboxState = 'enabled' | 'hovered' | 'pressed' | 'disabled';

/** Figma `size` on `checkbox`. */
export type CheckboxSize = 'lg' | 'md' | 'sm' | 'x-sm';

/**
 * Figma `checkbox` (177:322) — selected × size × state.
 *
 * Sizes: lg 20 / md 16 / sm 14 / x-sm 12. Radius md on lg, sm otherwise.
 * Tick is `tick-02` (14 / 12 / 10). States: enabled, hovered, pressed, disabled.
 */
export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Figma `selected`. */
  selected?: boolean;
  /** Uncontrolled initial `selected`. */
  defaultSelected?: boolean;
  /** Figma `size`. Default `lg`. */
  size?: CheckboxSize;
  /**
   * Force a Figma `state` variant. Omit to follow hover / active / disabled.
   */
  state?: CheckboxState;
  /** Called when `selected` toggles (interactive use). */
  onSelectedChange?: (selected: boolean) => void;
  /**
   * When false, renders a static surface (no button semantics).
   * Used inside `SelectionItem` so the row stays a single control.
   */
  interactive?: boolean;
}

const SIZE = {
  lg: {
    box: 'size-5',
    radius: 'md' as RadiusToken,
    tick: 'lg' as const,
  },
  md: {
    box: 'size-4',
    radius: 'sm' as RadiusToken,
    tick: 'md' as const,
  },
  sm: {
    box: 'size-3.5',
    radius: 'sm' as RadiusToken,
    tick: 'md' as const,
  },
  'x-sm': {
    box: 'size-3',
    radius: 'sm' as RadiusToken,
    tick: 'x-sm' as const,
  },
} as const;

function surfaceFill(selected: boolean, visualState: CheckboxState): string {
  if (visualState === 'disabled') {
    return 'bg-background-elevated';
  }

  if (selected) {
    return 'bg-background-inverse';
  }

  if (visualState === 'pressed') {
    return 'bg-background-hover';
  }

  if (visualState === 'hovered') {
    return 'bg-background-primary';
  }

  return 'bg-background-surface';
}

function tickTone(visualState: CheckboxState): string {
  if (visualState === 'disabled') {
    return 'text-foreground-subtle';
  }

  if (visualState === 'hovered' || visualState === 'pressed') {
    return 'text-foreground-light';
  }

  return 'text-foreground-inverse';
}

function borderFor(selected: boolean, visualState: CheckboxState) {
  if (visualState === 'disabled') {
    return { width: 1, color: colors.border.subtle, opacity: 0 };
  }

  if (selected) {
    if (visualState === 'pressed') {
      return { width: 1, color: colors.border.secondary, opacity: 1 };
    }

    if (visualState === 'hovered') {
      return { width: 1, color: colors.border.quiet, opacity: 1 };
    }

    return { width: 1, color: colors.border.strong, opacity: 1 };
  }

  if (visualState === 'pressed') {
    return { width: 1, color: colors.border.quiet, opacity: 1 };
  }

  if (visualState === 'hovered') {
    return { width: 1, color: colors.border.secondary, opacity: 1 };
  }

  return { width: 1, color: colors.border.subtle, opacity: 1 };
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      type = 'button',
      disabled,
      selected: selectedProp,
      defaultSelected = false,
      size = 'lg',
      state,
      onSelectedChange,
      interactive = true,
      onClick,
      onFocus,
      onBlur,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref
  ) => {
    const forced = state !== undefined;
    const isControlled = selectedProp !== undefined;
    const spec = SIZE[size];
    const { 'aria-label': ariaLabel, ...rest } = props;

    const [internalSelected, setInternalSelected] = useState(defaultSelected);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const selected = isControlled ? selectedProp : internalSelected;
    const visualState: CheckboxState = disabled
      ? 'disabled'
      : forced
        ? state
        : isPressed
          ? 'pressed'
          : isHovered
            ? 'hovered'
            : 'enabled';
    const looksDisabled = disabled || visualState === 'disabled';
    const showDropShadow = !selected && visualState !== 'disabled';
    const showPressedInset = selected && visualState === 'pressed';

    const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
      onBlur?.(event);
    };

    const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(event);
      if (forced || looksDisabled || event.button !== 0) return;
      setIsPressed(true);
      const release = () => {
        setIsPressed(false);
        window.removeEventListener('pointerup', release);
        window.removeEventListener('pointercancel', release);
      };
      window.addEventListener('pointerup', release);
      window.addEventListener('pointercancel', release);
    };

    const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerEnter?.(event);
      if (!forced && !looksDisabled) setIsHovered(true);
    };

    const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerLeave?.(event);
      if (!forced) setIsHovered(false);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || looksDisabled || forced) return;
      const next = !selected;
      if (!isControlled) setInternalSelected(next);
      onSelectedChange?.(next);
    };

    const tick = selected ? (
      <CheckboxTickIcon
        size={spec.tick}
        className={tickTone(visualState)}
      />
    ) : null;

    const surfaceClassName = cn(
      'ui-checkbox',
      'inline-flex shrink-0 items-center justify-center',
      spec.box,
      surfaceFill(selected, visualState),
      !interactive || looksDisabled
        ? 'pointer-events-none'
        : 'cursor-pointer',
      looksDisabled && interactive && 'cursor-not-allowed',
      'transition-[background-color] duration-[var(--duration-fast)] ease-[var(--ease-out)]',
      className
    );

    const effects = {
      autoEffects: false as const,
      corners: cornersFor(spec.radius),
      innerBorder: borderFor(selected, visualState),
      innerShadow: {
        ...shadow.innerXsLayer,
        opacity: showPressedInset ? 0.05 : 0,
      },
      shadow: showDropShadow ? [...shadow.twoXsLayers] : undefined,
    };

    if (!interactive) {
      return (
        <span className={cn('inline-flex leading-none', spec.box, '[&>div]:size-full')} aria-hidden="true">
          <SmoothCorners
            ref={ref as Ref<HTMLSpanElement>}
            as="span"
            {...effects}
            data-selected={selected}
            data-state={visualState}
            data-size={size}
            className={surfaceClassName}
          >
            {tick}
          </SmoothCorners>
        </span>
      );
    }

    return (
      <span className={cn('inline-flex leading-none', spec.box, '[&>div]:size-full')}>
        <SmoothCorners
          ref={ref}
          as="button"
          type={type}
          disabled={disabled}
          role="checkbox"
          aria-checked={selected}
          aria-disabled={looksDisabled || undefined}
          aria-label={ariaLabel}
          data-selected={selected}
          data-state={visualState}
          data-size={size}
          {...effects}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          className={surfaceClassName}
          {...rest}
        >
          {tick}
        </SmoothCorners>
      </span>
    );
  }
);

Checkbox.displayName = 'Checkbox';
