'use client';

import {
  forwardRef,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { SmoothCorners } from '@lisse/react';
import { GemIcon } from '@/components/icons/GemIcon';
import { LinkedIn01Icon } from '@/components/icons/LinkedIn01Icon';
import { useStrokeDraw } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { colors, cornersFor } from '@/styles/tokens';

export type PillState = 'enabled' | 'hovered' | 'focused' | 'pressed';

/**
 * Figma `pill` (145:1021) — selected × state variants.
 *
 * Selected pills show the leading icon and a 10px gap; unselected pills
 * collapse the icon to 0 width. Switching onto a pill stroke-draws the
 * outline icon. Variants: enabled, hovered, focused, pressed.
 * Booleans: hasLabel, hasLeadingIcon, hasTrailingIcon.
 */
export interface PillProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma `label`. Falls back to `children` if provided. */
  label?: string;
  children?: ReactNode;
  /** Figma `has label`. Default true. */
  hasLabel?: boolean;
  /** Figma `has leading-icon`. Default true. Hidden when not selected. */
  hasLeadingIcon?: boolean;
  /** Figma `has trailing-icon`. Default false. Hidden when not selected. */
  hasTrailingIcon?: boolean;
  /**
   * Figma `leading-icon` instance swap. Defaults to the gem glyph.
   * Pass a different node per pill (Gems / Heavy Ones / Yapping / Who Me?).
   */
  leadingIcon?: ReactNode;
  /** Figma `trailing-icon` instance swap. Defaults to `linkedin-01`. */
  trailingIcon?: ReactNode;
  /** Figma `selected`. Icon is visible only when true. */
  selected?: boolean;
  /**
   * Force a Figma `state` variant. Omit to follow hover / focus-visible / active.
   */
  state?: PillState;
  /**
   * Bump while selected to replay the outline draw (used on /lab).
   */
  drawKey?: number;
  /**
   * Selected fill comes from a sliding `.t-tabs-pill` behind this control.
   * Layout (icon slot + gap) snaps so the fill can measure the target box.
   */
  slidingFill?: boolean;
}

interface IconSlotProps {
  open: boolean;
  drawKey?: number;
  /** Skip width tween so a sliding fill can measure the settled box. */
  instantLayout?: boolean;
  children: ReactNode;
}

function IconSlot({
  open,
  drawKey = 0,
  instantLayout = false,
  children,
}: IconSlotProps) {
  const slotRef = useRef<HTMLSpanElement>(null);
  useStrokeDraw(slotRef, open, drawKey);

  return (
    <span
      ref={slotRef}
      className={cn(
        'ui-pill-icon flex items-center overflow-hidden',
        open ? 'w-3.5 opacity-100' : 'w-0 opacity-0',
        !instantLayout &&
          (open
            ? 'transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out)]'
            : 'transition-[width,opacity] duration-[var(--duration-fast)] ease-[var(--ease-out)]')
      )}
      aria-hidden={!open}
    >
      {children}
    </span>
  );
}

function surfaceTone(selected: boolean, visualState: PillState): string {
  if (visualState === 'pressed') {
    return 'bg-background-hover text-foreground-primary';
  }

  if (selected) {
    return 'bg-background-primary text-foreground-secondary';
  }

  if (visualState === 'hovered') {
    return 'bg-background-primary text-foreground-tertiary';
  }

  if (visualState === 'focused') {
    return 'bg-background-hover text-foreground-tertiary';
  }

  return 'bg-transparent text-foreground-quiet';
}

function borderFor(selected: boolean, visualState: PillState) {
  if (visualState === 'focused') {
    return { width: 2, color: colors.border.strong, opacity: 1 };
  }

  if (visualState === 'pressed') {
    return {
      width: 1,
      color: selected ? colors.border.strong : colors.border.secondary,
      opacity: 1,
    };
  }

  if (visualState === 'hovered' && selected) {
    return { width: 1, color: colors.border.secondary, opacity: 1 };
  }

  return { width: 1, color: colors.border.secondary, opacity: 0 };
}

export const Pill = forwardRef<HTMLButtonElement, PillProps>(
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
      selected = false,
      state,
      drawKey = 0,
      slidingFill = false,
      onFocus,
      onBlur,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref
  ) => {
    const text = children ?? label ?? 'Pill';
    const leading = leadingIcon ?? <GemIcon />;
    const trailing = trailingIcon ?? <LinkedIn01Icon />;
    const forced = state !== undefined;
    const { 'aria-label': ariaLabel, ...rest } = props;

    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const visualState: PillState = forced
      ? state
      : isPressed
        ? 'pressed'
        : isFocusVisible
          ? 'focused'
          : isHovered
            ? 'hovered'
            : 'enabled';

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

    const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerEnter?.(event);
      if (!forced) setIsHovered(true);
    };

    const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerLeave?.(event);
      if (!forced) setIsHovered(false);
    };

    const content = (
      <>
        {hasLeadingIcon ? (
          <IconSlot
            open={selected}
            drawKey={drawKey}
            instantLayout={slidingFill}
          >
            {leading}
          </IconSlot>
        ) : null}
        {hasLabel ? <span>{text}</span> : null}
        {hasTrailingIcon ? (
          <IconSlot
            open={selected}
            drawKey={drawKey}
            instantLayout={slidingFill}
          >
            {trailing}
          </IconSlot>
        ) : null}
      </>
    );

    const surfaceClassName = cn(
      'ui-pill',
      slidingFill && 't-tab',
      'inline-flex h-10 cursor-pointer items-center justify-center px-6 py-0',
      'text-sm font-semibold leading-5 tracking-normal whitespace-nowrap',
      slidingFill
        ? 'transition-[background-color,color] duration-[var(--tabs-dur)] ease-[var(--tabs-ease)]'
        : 'transition-[background-color,color,gap] duration-[var(--duration-fast)] ease-[var(--ease-out)]',
      selected ? 'gap-2.5' : 'gap-0',
      surfaceTone(selected, visualState),
      disabled && 'pointer-events-none cursor-not-allowed opacity-50',
      className
    );

    return (
      <span className="inline-flex">
        <SmoothCorners
          ref={ref}
          as="button"
          type={type}
          disabled={disabled}
          aria-label={
            !hasLabel
              ? (ariaLabel ?? (typeof text === 'string' ? text : undefined))
              : ariaLabel
          }
          data-selected={selected}
          data-state={visualState}
          autoEffects={false}
          corners={cornersFor('full')}
          innerBorder={borderFor(selected, visualState)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className={surfaceClassName}
          {...rest}
        >
          {content}
        </SmoothCorners>
      </span>
    );
  }
);

Pill.displayName = 'Pill';
