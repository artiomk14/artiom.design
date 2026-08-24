'use client';

import { createContext, useContext } from 'react';

/** How a `SelectionList` interprets item activation. */
export type SelectionListMode = 'menu' | 'single' | 'multiple';

export interface SelectionListContextValue {
  mode: SelectionListMode;
  listId: string;
  depth: number;
  isSelected: (value: string) => boolean;
  select: (value: string) => void;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  openNestedValue: string | null;
  openNested: (value: string | null, options?: { focus?: boolean }) => void;
  nestedOpenMode: 'pointer' | 'keyboard';
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
