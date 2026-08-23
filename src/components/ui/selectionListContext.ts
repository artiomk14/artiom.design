'use client';

import { createContext, useContext } from 'react';

/** How a `SelectionList` interprets item activation. */
export type SelectionListMode = 'menu' | 'single' | 'multiple';

export interface SelectionListContextValue {
  mode: SelectionListMode;
  listId: string;
  isSelected: (value: string) => boolean;
  select: (value: string) => void;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
}

export const SelectionListContext =
  createContext<SelectionListContextValue | null>(null);

export function useSelectionListContext(): SelectionListContextValue | null {
  return useContext(SelectionListContext);
}
