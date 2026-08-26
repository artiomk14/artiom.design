'use client';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { SmoothCorners } from '@lisse/react';
import { ArrowRight01SharpIcon } from '@/components/icons/ArrowRight01SharpIcon';
import { Touchpad04Icon } from '@/components/icons/Touchpad04Icon';
import { Checkbox } from '@/components/ui/Checkbox';
import { cn } from '@/lib/utils';
import { colors, cornersFor, shadow } from '@/styles/tokens';
import { SelectionSubmenu } from './SelectionSubmenu';
import {
  SelectionFlyoutContext,
  useSelectionFlyoutContext,
  useSelectionListContext,
  type SelectionFlyoutContextValue,
} from './selectionListContext';

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
 *
 * Pass `nested` (a `SelectionList`) to open a flyout on hover. Figma
 * nested lists (246:449) sit 8px above the item and overlap it by 2px.
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
  /**
   * Nested `SelectionList` shown on hover / ArrowRight. Implies the
   * chevron even when `hasNested` is false.
   */
  nested?: ReactNode;
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

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
}

function withNestedListId(node: ReactNode, id: string): ReactNode {
  if (!isValidElement(node)) return node;
  const props = node.props as { id?: string };
  if (props.id) return node;
  return cloneElement(node as ReactElement<{ id?: string }>, { id });
}

function subscribeNever(): () => void {
  return () => {};
}

function snapshotFalse(): boolean {
  return false;
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
      nested,
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
      onPointerMove,
      onClick,
      onKeyDown,
      value,
      role,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const list = useSelectionListContext();
    const parentFlyout = useSelectionFlyoutContext();
    const generatedId = useId();
    const nestedListId = useId();
    const text = children ?? label ?? 'Selection Item';
    const leading = leadingIcon ?? <Touchpad04Icon />;
    const trailing = trailingIcon ?? <Touchpad04Icon />;
    const itemValue =
      value !== undefined && String(value) !== '' ? String(value) : undefined;
    const flyoutKey = itemValue ?? generatedId;
    const selectedFromList =
      list && itemValue ? list.isSelected(itemValue) : undefined;
    const isSelected = selected ?? checked ?? selectedFromList ?? false;
    const forced = state !== undefined;
    const hasFlyout = nested != null;
    const showChevron = hasFlyout || hasNested;
    const { 'aria-label': ariaLabel, ...rest } = props;

    const itemRole =
      role ??
      (list
        ? list.mode === 'menu'
          ? hasCheckbox
            ? 'menuitemcheckbox'
            : 'menuitem'
          : 'option'
        : undefined);

    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [localOpen, setLocalOpen] = useState(false);
    const [localOpenMode, setLocalOpenMode] = useState<'pointer' | 'keyboard'>(
      'pointer'
    );
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [triggerNode, setTriggerNode] = useState<HTMLButtonElement | null>(
      null
    );

    const listedOpen = useSyncExternalStore(
      list && hasFlyout ? list.nestedOpen.subscribe : subscribeNever,
      () =>
        Boolean(list && hasFlyout && list.nestedOpen.get() === flyoutKey),
      snapshotFalse
    );
    const isOpen = Boolean(hasFlyout && (list ? listedOpen : localOpen));
    const openMode = list ? list.nestedOpen.getMode() : localOpenMode;
    const tone = visualState(
      state,
      isPressed,
      isFocusVisible,
      isHovered || isOpen
    );

    const setTriggerRef = useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
        setTriggerNode((current) => (current === node ? current : node));
        assignRef(ref, node);
      },
      [ref]
    );

    const openFlyout = useCallback(
      (options?: { focus?: boolean }) => {
        if (!hasFlyout || disabled) return;
        if (list) {
          list.nestedOpen.set(flyoutKey, options);
          return;
        }
        setLocalOpenMode(options?.focus ? 'keyboard' : 'pointer');
        setLocalOpen(true);
      },
      [disabled, flyoutKey, hasFlyout, list]
    );

    const closeFlyout = useCallback(() => {
      if (list) {
        if (list.nestedOpen.get() === flyoutKey) list.nestedOpen.set(null);
        return;
      }
      setLocalOpen(false);
    }, [flyoutKey, list]);

    const flyoutContext = useMemo<SelectionFlyoutContextValue>(
      () => ({
        close: (options) => {
          closeFlyout();
          if (options?.restoreFocus) triggerRef.current?.focus();
        },
        closeTree: () => {
          closeFlyout();
          if (parentFlyout) parentFlyout.closeTree();
          else list?.requestClose();
        },
      }),
      [closeFlyout, list, parentFlyout]
    );

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      if (hasFlyout) {
        openFlyout();
        return;
      }
      if (list && itemValue) list.select(itemValue);
    };

    const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);
      setIsFocusVisible(event.currentTarget.matches(':focus-visible'));
      if (list && itemValue) list.setActiveValue(itemValue);
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

    const hoverFlyout = (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === 'touch') return;
      const point = { x: event.clientX, y: event.clientY };
      list?.nestedOpen.notePointer(point);
      if (
        list &&
        list.nestedOpen.isMovingToSubmenu(point) &&
        list.nestedOpen.get() !== flyoutKey
      ) {
        return;
      }
      if (!forced && !disabled) setIsHovered(true);
      if (hasFlyout) openFlyout();
      else list?.nestedOpen.set(null);
    };

    const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerEnter?.(event);
      hoverFlyout(event);
    };

    const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerMove?.(event);
      hoverFlyout(event);
    };

    const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerLeave?.(event);
      if (!forced) setIsHovered(false);
    };

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled || !hasFlyout) return;

      if (
        event.key === 'ArrowRight' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        event.stopPropagation();
        openFlyout({ focus: true });
      }
    };

    const popup =
      list?.mode === 'single' || list?.mode === 'multiple'
        ? 'listbox'
        : 'menu';

    return (
      <span className="flex w-full [&>div]:w-full">
        <SmoothCorners
          ref={setTriggerRef}
          as="button"
          type={type}
          disabled={disabled}
          role={itemRole}
          tabIndex={
            tabIndex ??
            (list
              ? itemValue &&
                (list.activeValue === itemValue || list.activeValue === null)
                ? 0
                : -1
              : undefined)
          }
          value={itemValue}
          aria-pressed={!list && hasCheckbox ? isSelected : undefined}
          aria-checked={itemRole === 'menuitemcheckbox' ? isSelected : undefined}
          aria-selected={itemRole === 'option' ? isSelected : undefined}
          aria-haspopup={hasFlyout ? popup : undefined}
          aria-expanded={hasFlyout ? isOpen : undefined}
          aria-controls={hasFlyout ? nestedListId : undefined}
          aria-label={ariaLabel}
          data-item-state={tone}
          data-selected={isSelected}
          data-value={itemValue}
          data-has-nested={showChevron}
          autoEffects={false}
          corners={cornersFor('2xl')}
          innerBorder={borderFor(tone)}
          innerShadow={{
            ...shadow.innerTwoXsLayer,
            opacity: tone === 'pressed' ? 0.05 : 0,
          }}
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
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onKeyDown={handleKeyDown}
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
          {showChevron ? (
            <ArrowRight01SharpIcon className="leading-none text-foreground-quiet" />
          ) : null}
        </SmoothCorners>
        {hasFlyout ? (
          <SelectionFlyoutContext.Provider value={flyoutContext}>
            <SelectionSubmenu
              open={isOpen}
              trigger={triggerNode}
              autoFocus={isOpen && openMode === 'keyboard'}
              zIndex={50 + (list?.depth ?? 0) * 2}
              onRequestClose={closeFlyout}
            >
              {withNestedListId(nested, nestedListId)}
            </SelectionSubmenu>
          </SelectionFlyoutContext.Provider>
        ) : null}
      </span>
    );
  }
);

SelectionItem.displayName = 'SelectionItem';
