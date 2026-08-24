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
  isMovingToward,
  pointInRect,
  pointInTriangle,
  type Point,
} from './nestedListGeometry';

export type NestedListSide = 'left' | 'right';

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
  const side: NestedListSide = rightFits || !leftFits ? 'right' : 'left';
  const left = side === 'right' ? rightLeft : leftLeft;
  let top = trigger.top - nestedList.offsetY;

  if (top + height > window.innerHeight - VIEWPORT_PAD) {
    top = Math.max(VIEWPORT_PAD, window.innerHeight - VIEWPORT_PAD - height);
  }
  if (top < VIEWPORT_PAD) top = VIEWPORT_PAD;

  return {
    left,
    top,
    side,
    origin: side === 'right' ? 'top-left' : 'top-right',
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

function triangleFromApex(
  apex: Point,
  box: DOMRect,
  side: NestedListSide
): [Point, Point, Point] {
  const x = side === 'right' ? box.left : box.right;
  return [apex, { x, y: box.top }, { x, y: box.bottom }];
}

/**
 * Portaled nested `SelectionList`. Figma 246:449 places it 8px above the
 * hovered item and overlapping it by 2px.
 *
 * The safe triangle is math-only: the last point inside the trigger is
 * frozen as the apex, then later pointer samples are tested against that
 * cone. Nothing is hit-tested over the trigger, so the cursor and hover
 * state stay with the row.
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
  const panelRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<SubmenuPosition | null>(null);
  const apexRef = useRef<Point | null>(null);
  const previousPointRef = useRef<Point | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const onRequestCloseRef = useRef(onRequestClose);

  useEffect(() => {
    onRequestCloseRef.current = onRequestClose;
  }, [onRequestClose]);

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

    const inFrozenTriangle = (point: Point) => {
      const apex = apexRef.current;
      const next = positionRef.current;
      if (!apex || !next) return false;
      const [a, b, c] = triangleFromApex(apex, submenuRect(next), next.side);
      return pointInTriangle(point, a, b, c);
    };

    const onPointerMove = (event: PointerEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      const previous = previousPointRef.current;
      previousPointRef.current = point;

      if (inTriggerOrPanel(point, event.target)) {
        apexRef.current = point;
        cancelClose();
        return;
      }

      const next = positionRef.current;
      if (
        previous &&
        next &&
        isMovingToward(previous, point, submenuRect(next))
      ) {
        cancelClose();
        return;
      }

      if (inFrozenTriangle(point)) {
        cancelClose();
        return;
      }

      if (event.pointerType === 'touch') return;
      scheduleClose();
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
