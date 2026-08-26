'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { duration, nestedList } from '@/styles/tokens';
import type { SelectionListOrigin } from './SelectionList';
import {
  cursorTriangle,
  gracePolygon,
  pointInRect,
  pointInTriangle,
  type NestedListSide,
  type Point,
} from './nestedListGeometry';
import { useSelectionListContext } from './selectionListContext';

export type { NestedListSide };

interface SubmenuPosition {
  left: number;
  top: number;
  side: NestedListSide;
  origin: SelectionListOrigin;
  width: number;
  height: number;
}

interface SelectionSubmenuProps {
  open: boolean;
  trigger: HTMLElement | null;
  autoFocus?: boolean;
  zIndex: number;
  children: ReactNode;
  onRequestClose: () => void;
}

const VIEWPORT_PAD = 8;

function subscribeNever(): () => void {
  return () => {};
}

function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

function clampLeft(left: number, width: number): number {
  const maxLeft = window.innerWidth - VIEWPORT_PAD - width;
  return Math.min(Math.max(left, VIEWPORT_PAD), Math.max(VIEWPORT_PAD, maxLeft));
}

function clampTop(top: number, height: number): number {
  let next = top;
  if (next + height > window.innerHeight - VIEWPORT_PAD) {
    next = Math.max(VIEWPORT_PAD, window.innerHeight - VIEWPORT_PAD - height);
  }
  if (next < VIEWPORT_PAD) next = VIEWPORT_PAD;
  return next;
}

function measurePosition(
  trigger: DOMRect,
  panel: HTMLElement
): SubmenuPosition {
  const width = panel.offsetWidth;
  const height = panel.offsetHeight;
  const rightLeft = trigger.right - nestedList.overlapX;
  const leftLeft = trigger.left - width + nestedList.overlapX;
  const rightFits = rightLeft + width <= window.innerWidth - VIEWPORT_PAD;
  const leftFits = leftLeft >= VIEWPORT_PAD;

  if (rightFits || leftFits) {
    const side: NestedListSide = rightFits ? 'right' : 'left';
    return {
      left: side === 'right' ? rightLeft : leftLeft,
      top: clampTop(trigger.top - nestedList.offsetY, height),
      side,
      origin: side === 'right' ? 'top-left' : 'top-right',
      width,
      height,
    };
  }

  // Neither side has a full-width lane (header E-mail on a 390px viewport).
  // Stack under the trigger so nested labels stay fully readable.
  return {
    left: clampLeft(trigger.right - width, width),
    top: clampTop(trigger.bottom + nestedList.overlapX, height),
    side: 'right',
    origin: 'top-right',
    width,
    height,
  };
}

function submenuRect(position: SubmenuPosition): DOMRect {
  return new DOMRect(
    position.left,
    position.top,
    position.width,
    position.height
  );
}

/**
 * Portaled nested `SelectionList`. Figma 246:449 places it 8px above the
 * hovered item and overlapping it by 2px.
 *
 * Safe path to the flyout is a cursor-following triangle (Amazon / Floating
 * UI) plus ray intent. The triangle is math-only — it does not steal hits
 * from the trigger row. Sibling rows read the same grace from the list store
 * and refuse to open while the pointer is heading at this panel (Radix).
 */
export function SelectionSubmenu({
  open,
  trigger,
  autoFocus = false,
  zIndex,
  children,
  onRequestClose,
}: SelectionSubmenuProps) {
  const isClient = useIsClient();
  const list = useSelectionListContext();
  const panelRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<SubmenuPosition | null>(null);
  const apexRef = useRef<Point | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const onRequestCloseRef = useRef(onRequestClose);
  const listRef = useRef(list);

  useEffect(() => {
    onRequestCloseRef.current = onRequestClose;
  }, [onRequestClose]);

  useEffect(() => {
    listRef.current = list;
  }, [list]);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current != null) return;
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onRequestCloseRef.current();
    }, duration.fast);
  }, []);

  const writePosition = useCallback(() => {
    const panel = panelRef.current;
    if (!trigger || !panel) return;
    const next = measurePosition(trigger.getBoundingClientRect(), panel);
    positionRef.current = next;
    panel.style.left = `${next.left}px`;
    panel.style.top = `${next.top}px`;
    panel.style.visibility = 'visible';
    panel.dataset.origin = next.origin;
  }, [trigger]);

  useLayoutEffect(() => {
    if (!open || !trigger) return;
    writePosition();
    const panel = panelRef.current;
    const observer =
      panel && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => writePosition())
        : null;
    if (panel) observer?.observe(panel);
    window.addEventListener('resize', writePosition);
    window.addEventListener('scroll', writePosition, true);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', writePosition);
      window.removeEventListener('scroll', writePosition, true);
    };
  }, [open, trigger, writePosition]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  useEffect(() => {
    if (!open) {
      list?.nestedOpen.setGrace(null);
    }
  }, [list, open]);

  useEffect(() => {
    if (!open || !trigger) return;
    const dropdown = trigger.closest('.t-dropdown');
    if (!dropdown) return;

    const sync = () => {
      if (!dropdown.classList.contains('is-open')) onRequestCloseRef.current();
    };
    const observer = new MutationObserver(sync);
    observer.observe(dropdown, { attributes: true, attributeFilter: ['class'] });
    sync();
    return () => observer.disconnect();
  }, [open, trigger]);

  useEffect(() => {
    if (!open || !autoFocus) return;
    const frame = window.requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLButtonElement>('.ui-selection-item:not(:disabled)')
        ?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [autoFocus, open]);

  useEffect(() => {
    if (!open || !trigger) return;

    const parentList = trigger.closest('.ui-selection-list');

    const inTriggerOrPanel = (point: Point, target: EventTarget | null) => {
      if (target instanceof Node) {
        if (trigger.contains(target)) return true;
        if (panelRef.current?.contains(target)) return true;
      }
      if (pointInRect(point, trigger.getBoundingClientRect())) return true;
      const next = positionRef.current;
      if (next && pointInRect(point, submenuRect(next))) return true;
      return false;
    };

    const publishGrace = (point: Point, intent?: boolean) => {
      const next = positionRef.current;
      const store = listRef.current?.nestedOpen;
      if (!next || !store) return;
      const box = submenuRect(next);
      store.setGrace(
        {
          side: next.side,
          area: gracePolygon(point, box, next.side),
          target: box,
        },
        intent ? { intent: true } : undefined
      );
    };

    const adoptItemUnderPointer = (point: Point) => {
      const store = listRef.current?.nestedOpen;
      if (!store) {
        scheduleClose();
        return;
      }

      const under = document.elementFromPoint(point.x, point.y);
      const item =
        under instanceof Element
          ? under.closest<HTMLElement>('.ui-selection-item')
          : null;
      if (
        !item ||
        trigger.contains(item) ||
        (parentList && item.closest('.ui-selection-list') !== parentList)
      ) {
        scheduleClose();
        return;
      }

      if (panelRef.current?.contains(item)) {
        cancelClose();
        return;
      }

      const value = item.getAttribute('data-value') || item.getAttribute('value');
      if (item.getAttribute('aria-haspopup') && value) {
        store.set(value);
        return;
      }
      store.set(null);
    };

    const onPointerMove = (event: PointerEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      const store = listRef.current?.nestedOpen;
      store?.notePointer(point);

      if (inTriggerOrPanel(point, event.target)) {
        apexRef.current = point;
        publishGrace(point, true);
        cancelClose();
        return;
      }

      if (store?.isMovingToSubmenu(point)) {
        apexRef.current = point;
        publishGrace(point);
        cancelClose();
        return;
      }

      const next = positionRef.current;
      const frozen =
        apexRef.current &&
        next &&
        pointInTriangle(
          point,
          ...cursorTriangle(apexRef.current, submenuRect(next), next.side)
        );
      if (frozen) {
        cancelClose();
        return;
      }

      store?.setGrace(null);
      if (event.pointerType === 'touch') return;
      adoptItemUnderPointer(point);
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (trigger.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      onRequestCloseRef.current();
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
      listRef.current?.nestedOpen.setGrace(null);
      cancelClose();
    };
  }, [cancelClose, open, scheduleClose, trigger]);

  if (!isClient || !open) return null;

  return createPortal(
    <div
      ref={panelRef}
      data-selection-submenu=""
      className={cn('t-dropdown is-open fixed')}
      data-origin="top-left"
      style={{ visibility: 'hidden', zIndex }}
      onPointerEnter={cancelClose}
    >
      {children}
    </div>,
    document.body
  );
}
