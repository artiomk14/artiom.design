'use client';

import { createContext, useContext } from 'react';
import {
  POINTER_GRACE_BUFFER,
  POINTER_GRACE_MS,
  POINTER_INTENT_MIN_MOVE,
  inflateRect,
  isPointInPolygon,
  rayHitsRect,
  type NestedListSide,
  type Point,
  type RectLike,
} from './nestedListGeometry';

/** How a `SelectionList` interprets item activation. */
export type SelectionListMode = 'menu' | 'single' | 'multiple';

export type NestedOpenMode = 'pointer' | 'keyboard';

export interface PointerGrace {
  side: NestedListSide;
  area: readonly Point[];
  target: RectLike;
}

/**
 * External store for which nested flyout is open. Items subscribe with
 * `useSyncExternalStore` so only the previous/next trigger re-renders —
 * not every row in the list.
 *
 * Pointer grace lives here too (no React subscribers). Sibling rows read it
 * on pointerenter/move and refuse to steal the open flyout while the pointer
 * is heading at the nested list — Radix `isPointerMovingToSubmenu`.
 */
export interface NestedOpenStore {
  subscribe: (onStoreChange: () => void) => () => void;
  get: () => string | null;
  getMode: () => NestedOpenMode;
  set: (value: string | null, options?: { focus?: boolean }) => void;
  notePointer: (point: Point) => void;
  setGrace: (
    grace: PointerGrace | null,
    options?: { intent?: boolean }
  ) => void;
  isMovingToSubmenu: (point: Point) => boolean;
}

export function createNestedOpenStore(): NestedOpenStore {
  let value: string | null = null;
  let mode: NestedOpenMode = 'pointer';
  const listeners = new Set<() => void>();

  let lastPoint: Point | null = null;
  let dir: NestedListSide | null = null;
  let lastIntent = false;
  let grace: PointerGrace | null = null;
  let graceTimer: number | null = null;

  function clearGraceTimer() {
    if (graceTimer == null) return;
    window.clearTimeout(graceTimer);
    graceTimer = null;
  }

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
      if (next === null) {
        grace = null;
        lastIntent = false;
        clearGraceTimer();
      }
      listeners.forEach((listener) => listener());
    },
    notePointer(point) {
      if (lastPoint && point.x !== lastPoint.x) {
        dir = point.x > lastPoint.x ? 'right' : 'left';
      }

      if (lastPoint && grace) {
        const dist = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
        if (dist >= POINTER_INTENT_MIN_MOVE) {
          lastIntent = rayHitsRect(
            lastPoint,
            point,
            inflateRect(grace.target, POINTER_GRACE_BUFFER)
          );
        }
      }

      lastPoint = point;
    },
    setGrace(next, options) {
      grace = next;
      clearGraceTimer();
      if (!next) {
        lastIntent = false;
        return;
      }
      if (options?.intent) lastIntent = true;
      graceTimer = window.setTimeout(() => {
        grace = null;
        lastIntent = false;
        graceTimer = null;
      }, POINTER_GRACE_MS);
    },
    isMovingToSubmenu(point) {
      if (!grace) return false;
      if (dir && dir !== grace.side) return false;
      if (!isPointInPolygon(point, grace.area)) return false;
      return lastIntent;
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
