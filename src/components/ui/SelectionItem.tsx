'use client';

import {
  forwardRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { SmoothCorners } from '@lisse/react';
import { ArrowRight01SharpIcon } from '@/components/icons/ArrowRight01SharpIcon';
import { Touchpad04Icon } from '@/components/icons/Touchpad04Icon';
import { Checkbox } from '@/components/ui/Checkbox';
import { cn } from '@/lib/utils';
import { colors, cornersFor, shadow } from '@/styles/tokens';

export type SelectionItemState = 'enabled' | 'hovered' | 'focused' | 'pressed';

/**
 * Figma `selection-item` (177:1271) — state × selected × icon booleans.
 *
 * Layout: 12px padding, 16px radius, 20px gap to the checkbox, 14px gap
 * inside the content cluster. Nested chevron is 14px and sits outside
 * the content cluster. Width is fluid; the Figma frame is 280px.
 *
 * `selected` only changes fill and label ink. Leading icon still follows
 * interaction state; trailing stays subtle; nested stays quiet.
 */
export interface SelectionItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma `label`. Falls back to `children` if provided. */
  label?: string;
  children?: ReactNode;
  /** Figma `has checkbox`. Default true. */
  hasCheckbox?: boolean;
  /** Figma `has leading-icon`. Default true. */
  hasLeadingIcon?: boolean;
  /** Figma `has trailing-icon`. Default true. */
  hasTrailingIcon?: boolean;
  /** Figma `has nested` — right chevron. Default true. */
  hasNested?: boolean;
  /** Figma `leading-icon` instance swap. Defaults to `touchpad-04`. */
  leadingIcon?: ReactNode;
  /** Figma `trailing-icon` instance swap. Defaults to `touchpad-04`. */
  trailingIcon?: ReactNode;
  /**
   * Force a Figma `state` variant. Omit to follow hover / focus-visible / active.
   */
  state?: SelectionItemState;
  /**
   * Figma `selected`. Row chrome + nested checkbox. `checked` is an alias.
   */
  selected?: boolean;
  /** Alias of `selected`. */
  checked?: boolean;
}

function visualState(
  forced: SelectionItemState | undefined,
  isPressed: boolean,
  isFocusVisible: boolean,
  isHovered: boolean
): SelectionItemState {
  if (forced) return forced;
  if (isPressed) return 'pressed';
  if (isFocusVisible) return 'focused';
  if (isHovered) return 'hovered';
  return 'enabled';
}

function surfaceFill(tone: SelectionItemState, selected: boolean): string {
  if (selected) {
    switch (tone) {
      case 'hovered':
      case 'focused':
        return 'bg-background-hover';
      case 'pressed':
        return 'bg-background-elevated';
      default:
        return 'bg-background-primary';
    }
  }

  switch (tone) {
    case 'hovered':
    case 'focused':
      return 'bg-background-primary';
    case 'pressed':
      return 'bg-background-hover';
    default:
      return 'bg-transparent';
  }
}

function labelTone(tone: SelectionItemState, selected: boolean): string {
  if (selected) return 'text-foreground-primary';

  switch (tone) {
    case 'hovered':
    case 'focused':
      return 'text-foreground-secondary';
    case 'pressed':
      return 'text-foreground-primary';
    default:
      return 'text-foreground-tertiary';
  }
}

function leadingTone(tone: SelectionItemState): string {
  switch (tone) {
    case 'hovered':
    case 'focused':
      return 'text-foreground-secondary';
    case 'pressed':
      return 'text-foreground-primary';
    default:
      return 'text-foreground-tertiary';
  }
}

function borderFor(tone: SelectionItemState) {
  if (tone === 'focused') {
    return { width: 2, color: colors.border.strong, opacity: 1 };
  }

  if (tone === 'pressed') {
    return { width: 1, color: colors.border.secondary, opacity: 1 };
  }

  return { width: 1, color: colors.border.subtle, opacity: 0 };
}

export const SelectionItem = forwardRef<HTMLButtonElement, SelectionItemProps>(
  (
    {
      className,
      type = 'button',
      disabled,
      label,
      children,
      hasCheckbox = true,
      hasLeadingIcon = true,
      hasTrailingIcon = true,
      hasNested = true,
      leadingIcon,
      trailingIcon,
      state,
      selected,
      checked,
      onFocus,
      onBlur,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref
  ) => {
    const text = children ?? label ?? 'Selection Item';
    const leading = leadingIcon ?? <Touchpad04Icon />;
    const trailing = trailingIcon ?? <Touchpad04Icon />;
    const isSelected = selected ?? checked ?? false;
    const forced = state !== undefined;
    const { 'aria-label': ariaLabel, ...rest } = props;

    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const tone = visualState(state, isPressed, isFocusVisible, isHovered);

    const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);
      setIsFocusVisible(event.currentTarget.matches(':focus-visible'));
    };

    const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
      onBlur?.(event);
      setIsFocusVisible(false);
    };

    const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(event);
      if (forced || disabled || event.button !== 0) return;
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
      if (!forced && !disabled) setIsHovered(true);
    };

    const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerLeave?.(event);
      if (!forced) setIsHovered(false);
    };

    return (
      <span className="flex w-full [&>div]:w-full">
        <SmoothCorners
          ref={ref}
          as="button"
          type={type}
          disabled={disabled}
          aria-pressed={hasCheckbox ? isSelected : undefined}
          aria-label={ariaLabel}
          data-item-state={tone}
          data-selected={isSelected}
          autoEffects={false}
          corners={cornersFor('2xl')}
          innerBorder={borderFor(tone)}
          innerShadow={{
            ...shadow.innerTwoXsLayer,
            opacity: tone === 'pressed' ? 0.05 : 0,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className={cn(
            'ui-selection-item',
            'flex w-full cursor-pointer items-center gap-5 p-3 leading-none',
            'text-left',
            surfaceFill(tone, isSelected),
            labelTone(tone, isSelected),
            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
            'transition-[background-color,color] duration-[var(--duration-fast)] ease-[var(--ease-out)]',
            className
          )}
          {...rest}
        >
          {hasCheckbox ? (
            <Checkbox
              size="lg"
              selected={isSelected}
              state="enabled"
              interactive={false}
              className="shrink-0"
            />
          ) : null}
          <span className="flex min-w-px flex-[1_0_0] items-center gap-3.5">
            {hasLeadingIcon ? (
              <span className={cn('shrink-0 leading-none', leadingTone(tone))}>
                {leading}
              </span>
            ) : null}
            <span className="min-w-px flex-[1_0_0] break-words text-sm font-medium leading-5 tracking-normal">
              {text}
            </span>
            {hasTrailingIcon ? (
              <span className="shrink-0 leading-none text-foreground-subtle">
                {trailing}
              </span>
            ) : null}
          </span>
          {hasNested ? (
            <ArrowRight01SharpIcon className="leading-none text-foreground-quiet" />
          ) : null}
        </SmoothCorners>
      </span>
    );
  }
);

SelectionItem.displayName = 'SelectionItem';
