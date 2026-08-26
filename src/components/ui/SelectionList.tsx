'use client';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { SmoothCorners } from '@lisse/react';
import { cn } from '@/lib/utils';
import { colors, cornersFor, shadow } from '@/styles/tokens';
import {
  SelectionListContext,
  createNestedOpenStore,
  useSelectionFlyoutContext,
  useSelectionListContext,
  type SelectionListMode,
} from './selectionListContext';

export type { SelectionListMode };

export type SelectionListOrigin =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type SelectionListValue = string | string[];

export interface SelectionListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: ReactNode;
  /**
   * `menu` — action list (dropdown). `single` / `multiple` — listbox /
   * combobox options.
   */
  mode?: SelectionListMode;
  value?: SelectionListValue;
  defaultValue?: SelectionListValue;
  onValueChange?: (value: SelectionListValue) => void;
  /** Close a parent menu after a non-multi selection. */
  onRequestClose?: () => void;
  closeOnSelect?: boolean;
  loop?: boolean;
}

const ITEM_SELECTOR = '.ui-selection-item:not(:disabled)';

function toArray(value: SelectionListValue | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function itemButtons(root: HTMLElement | null): HTMLButtonElement[] {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll<HTMLButtonElement>(ITEM_SELECTOR)
  ).filter((button) => button.closest('.ui-selection-list') === root);
}

function itemValue(button: HTMLButtonElement): string | undefined {
  const value = button.getAttribute('data-value') || button.value;
  return value || undefined;
}

/**
 * Figma `selection-list` (177:1401) — 240px surface, 24px radius, 8px
 * padding, 4px item gap, 1px `border-secondary`, `elevation-lg`.
 *
 * Holds `SelectionItem` rows for menus, single-select, multi-select, and
 * combobox lists. Tab switches stay on the page; this list does not navigate.
 */
export const SelectionList = forwardRef<HTMLDivElement, SelectionListProps>(
  (
    {
      className,
      children,
      mode = 'menu',
      value,
      defaultValue,
      onValueChange,
      onRequestClose,
      closeOnSelect,
      loop = true,
      id,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const listId = id ?? generatedId;
    const flyout = useSelectionFlyoutContext();
    const parentList = useSelectionListContext();
    const depth = (parentList?.depth ?? -1) + 1;
    const shouldClose = closeOnSelect ?? mode !== 'multiple';
    const isControlled = value !== undefined;

    const [uncontrolled, setUncontrolled] = useState<string[]>(() =>
      toArray(defaultValue)
    );
    const selected = isControlled ? toArray(value) : uncontrolled;
    const [activeValue, setActiveValue] = useState<string | null>(
      () => selected[0] ?? null
    );
    const [nestedOpen] = useState(createNestedOpenStore);
    const nodeRef = useRef<HTMLDivElement>(null);

    const requestClose = useCallback(() => {
      onRequestClose?.();
    }, [onRequestClose]);

    const setNodeRef = useCallback(
      (node: HTMLDivElement | null) => {
        nodeRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const selectedSet = useMemo(() => new Set(selected), [selected]);

    const isSelected = useCallback(
      (item: string) => selectedSet.has(item),
      [selectedSet]
    );

    const select = useCallback(
      (item: string) => {
        let next: SelectionListValue;
        if (mode === 'multiple') {
          const nextSet = new Set(selected);
          if (nextSet.has(item)) nextSet.delete(item);
          else nextSet.add(item);
          next = Array.from(nextSet);
        } else {
          next = item;
        }

        if (!isControlled) {
          setUncontrolled(toArray(next));
        }
        onValueChange?.(next);
        setActiveValue(item);
        if (shouldClose) {
          onRequestClose?.();
          flyout?.closeTree();
        }
      },
      [
        flyout,
        isControlled,
        mode,
        onRequestClose,
        onValueChange,
        selected,
        shouldClose,
      ]
    );

    const contextValue = useMemo(
      () => ({
        mode,
        listId,
        depth,
        isSelected,
        select,
        activeValue,
        setActiveValue,
        nestedOpen,
        requestClose,
      }),
      [
        activeValue,
        depth,
        isSelected,
        listId,
        mode,
        nestedOpen,
        requestClose,
        select,
      ]
    );

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      const buttons = itemButtons(event.currentTarget);
      if (buttons.length === 0) return;

      const currentIndex = buttons.findIndex(
        (button) => button === document.activeElement
      );

      const focusAt = (index: number) => {
        const target = buttons[index];
        if (!target) return;
        target.focus();
        const nextValue = itemValue(target);
        if (nextValue) setActiveValue(nextValue);
      };

      const move = (offset: number) => {
        event.preventDefault();
        if (currentIndex === -1) {
          focusAt(offset > 0 ? 0 : buttons.length - 1);
          return;
        }
        const raw = currentIndex + offset;
        const next = loop
          ? (raw + buttons.length) % buttons.length
          : Math.min(buttons.length - 1, Math.max(0, raw));
        focusAt(next);
      };

      switch (event.key) {
        case 'ArrowDown':
          move(1);
          break;
        case 'ArrowUp':
          move(-1);
          break;
        case 'Home':
          event.preventDefault();
          focusAt(0);
          break;
        case 'End':
          event.preventDefault();
          focusAt(buttons.length - 1);
          break;
        case 'ArrowRight': {
          const focused = currentIndex === -1 ? null : buttons[currentIndex];
          if (focused?.getAttribute('aria-haspopup')) {
            event.preventDefault();
            const nextValue = itemValue(focused);
            if (nextValue) nestedOpen.set(nextValue, { focus: true });
          }
          break;
        }
        case 'ArrowLeft':
          if (flyout) {
            event.preventDefault();
            flyout.close({ restoreFocus: true });
          }
          break;
        case 'Escape':
          if (flyout) {
            event.preventDefault();
            flyout.close({ restoreFocus: true });
          } else if (onRequestClose) {
            event.preventDefault();
            onRequestClose();
          }
          break;
        default:
          break;
      }
    };

    return (
      <SelectionListContext.Provider value={contextValue}>
        <span
          className={cn('inline-flex w-60 [&>div]:w-full', className)}
          data-selection-list=""
        >
          <SmoothCorners
            ref={setNodeRef}
            as="div"
            id={listId}
            role={mode === 'menu' ? 'menu' : 'listbox'}
            aria-multiselectable={mode === 'multiple' ? true : undefined}
            aria-orientation="vertical"
            autoEffects={false}
            corners={cornersFor('3xl')}
            innerBorder={{
              width: 1,
              color: colors.border.secondary,
              opacity: 1,
            }}
            shadow={[...shadow.elevationLgLayers]}
            onKeyDown={handleKeyDown}
            className="ui-selection-list flex w-full flex-col gap-1 bg-background-surface p-2"
            {...rest}
          >
            {children}
          </SmoothCorners>
        </span>
      </SelectionListContext.Provider>
    );
  }
);

SelectionList.displayName = 'SelectionList';

export interface SelectionMenuProps extends SelectionListProps {
  /** Control that opens the list. Typically a `Button`. */
  trigger: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  origin?: SelectionListOrigin;
}

/**
 * Trigger + `SelectionList` popover. Open/close uses the menu-dropdown
 * motion (scale + fade, origin-aware, faster close).
 */
export function SelectionMenu({
  trigger,
  open,
  defaultOpen = false,
  onOpenChange,
  origin = 'top-left',
  onRequestClose,
  ...listProps
}: SelectionMenuProps) {
  const generatedId = useId();
  const listId = listProps.id ?? generatedId;
  const rootRef = useRef<HTMLDivElement>(null);
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const close = useCallback(() => {
    setOpen(false);
    onRequestClose?.();
  }, [onRequestClose, setOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target)) return;
      if (
        target instanceof Element &&
        target.closest('[data-selection-submenu]')
      ) {
        return;
      }
      close();
    };

    const onDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      close();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onDocumentKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onDocumentKeyDown);
    };
  }, [close, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const root = rootRef.current;
    const first = root?.querySelector<HTMLButtonElement>(ITEM_SELECTOR);
    first?.focus();
  }, [isOpen]);

  const popup =
    listProps.mode === 'single' || listProps.mode === 'multiple'
      ? 'listbox'
      : 'menu';

  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
        'aria-expanded': isOpen,
        'aria-haspopup': popup,
        'aria-controls': listId,
        onClick: (event: MouseEvent<HTMLElement>) => {
          const original = (
            trigger as ReactElement<{
              onClick?: (event: MouseEvent<HTMLElement>) => void;
            }>
          ).props.onClick;
          original?.(event);
          setOpen(!isOpen);
        },
      })
    : trigger;

  return (
    <div ref={rootRef} className="relative inline-flex">
      {triggerNode}
      <div
        className={cn(
          'absolute left-0 top-full z-50 mt-1',
          't-dropdown',
          isOpen && 'is-open'
        )}
        data-origin={origin}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <SelectionList
          {...listProps}
          id={listId}
          onRequestClose={close}
        />
      </div>
    </div>
  );
}
