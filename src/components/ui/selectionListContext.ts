'use client';

import { createContext, useContext } from 'react';

/** How a `SelectionList` interprets item activation. */
export type SelectionListMode = 'menu' | 'single' | 'multiple';

export type NestedOpenMode = 'pointer' | 'keyboard';

/**
 * External store for which nested flyout is open. Items subscribe with
 * `useSyncExternalStore` so only the previous/next trigger re-renders —
 * not every row in the list.
 */
export interface NestedOpenStore {
  subscribe: (onStoreChange: () => void) => () => void;
  get: () => string | null;
  getMode: () => NestedOpenMode;
  set: (value: string | null, options?: { focus?: boolean }) => void;
}

export function createNestedOpenStore(): NestedOpenStore {
  let value: string | null = null;
  let mode: NestedOpenMode = 'pointer';
  const listeners = new Set<() => void>();

  return {
    subscribe(onStoreChange) {
      listeners.add(onStoreChange);
      return () => {
        listeners.delete(onStoreChange);
      };
    },
    get: () => value,
    getMode: () => mode,
    set(next, options) {
      const nextMode: NestedOpenMode = options?.focus ? 'keyboard' : 'pointer';
      if (value === next && (next === null || mode === nextMode)) return;
      value = next;
      if (next !== null) mode = nextMode;
      listeners.forEach((listener) => listener());
    },
  };
}

export interface SelectionListContextValue {
  mode: SelectionListMode;
  listId: string;
  depth: number;
  isSelected: (value: string) => boolean;
  select: (value: string) => void;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  nestedOpen: NestedOpenStore;
  requestClose: () => void;
}

export const SelectionListContext =
  createContext<SelectionListContextValue | null>(null);

export function useSelectionListContext(): SelectionListContextValue | null {
  return useContext(SelectionListContext);
}

/** Provided around a nested `SelectionList` flyout. */
export interface SelectionFlyoutContextValue {
  /** Close this flyout only. */
  close: (options?: { restoreFocus?: boolean }) => void;
  /** Close this flyout and every ancestor menu. */
  closeTree: () => void;
}

export const SelectionFlyoutContext =
  createContext<SelectionFlyoutContextValue | null>(null);

export function useSelectionFlyoutContext(): SelectionFlyoutContextValue | null {
  return useContext(SelectionFlyoutContext);
}
