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
  onKeepOpen: () => void;
  onRequestClose: () => void;
}

const VIEWPORT_PAD = 8;

function subscribeNever(): () => void {
  return () => {};
}

function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

function triggerFallbackCursor(
  rect: DOMRectReadOnly,
  side: NestedListSide
): Point {
  return {
    x:
      side === 'right'
        ? rect.right - nestedList.overlapX
        : rect.left + nestedList.overlapX,
    y: rect.top + rect.height / 2,
  };
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

function trianglePoints(
  cursor: Point,
  box: DOMRect,
  side: NestedListSide
): [Point, Point, Point] {
  const x = side === 'right' ? box.left : box.right;
  return [cursor, { x, y: box.top }, { x, y: box.bottom }];
}

function pointsAttr(points: [Point, Point, Point]): string {
  return points.map((point) => `${point.x},${point.y}`).join(' ');
}

/**
 * Portaled nested `SelectionList`. Figma 246:449 places it 8px above the
 * hovered item and overlapping that item by 2px. A cursor-following safe
 * triangle keeps the flyout open while the pointer travels into it.
 */
export function SelectionSubmenu({
  open,
  trigger,
  autoFocus = false,
  zIndex,
  children,
  onKeepOpen,
  onRequestClose,
}: SelectionSubmenuProps) {
  const isClient = useIsClient();
  const panelRef = useRef<HTMLDivElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);
  const positionRef = useRef<SubmenuPosition | null>(null);
  const cursorRef = useRef<Point | null>(null);
  const previousCursorRef = useRef<Point | null>(null);
  const closeTimerRef = useRef<number | null>(null);

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
      onRequestClose();
    }, duration.fast);
  }, [onRequestClose]);

  const paintTriangle = useCallback((point: Point, next: SubmenuPosition) => {
    const box = submenuRect(next);
    polygonRef.current?.setAttribute(
      'points',
      pointsAttr(trianglePoints(point, box, next.side))
    );
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
    const cursor =
      cursorRef.current ?? triggerFallbackCursor(trigger.getBoundingClientRect(), next.side);
    paintTriangle(cursor, next);
  }, [paintTriangle, trigger]);

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
      if (!dropdown.classList.contains('is-open')) onRequestClose();
    };
    const observer = new MutationObserver(sync);
    observer.observe(dropdown, { attributes: true, attributeFilter: ['class'] });
    sync();
    return () => observer.disconnect();
  }, [onRequestClose, open, trigger]);

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

    const inSafeZone = (point: Point, target: EventTarget | null) => {
      if (trigger && target instanceof Node && trigger.contains(target)) {
        return true;
      }
      const panel = panelRef.current;
      if (panel && target instanceof Node && panel.contains(target)) {
        return true;
      }
      if (trigger && pointInRect(point, trigger.getBoundingClientRect())) {
        return true;
      }
      const next = positionRef.current;
      if (!next) return false;
      const box = submenuRect(next);
      if (pointInRect(point, box)) return true;
      const [a, b, c] = trianglePoints(
        cursorRef.current ??
          triggerFallbackCursor(trigger.getBoundingClientRect(), next.side),
        box,
        next.side
      );
      if (pointInTriangle(point, a, b, c)) return true;
      const previous = previousCursorRef.current;
      if (previous && isMovingToward(previous, point, box)) return true;
      return false;
    };

    const onPointerMove = (event: PointerEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      previousCursorRef.current = cursorRef.current;
      cursorRef.current = point;
      const next = positionRef.current;
      if (next) paintTriangle(point, next);

      const toward =
        next && previousCursorRef.current
          ? isMovingToward(previousCursorRef.current, point, submenuRect(next))
          : false;
      const otherItem = document
        .elementsFromPoint(point.x, point.y)
        .map((node) =>
          node instanceof Element ? node.closest('.ui-selection-item') : null
        )
        .find((item) => item && item !== trigger);
      if (otherItem && !toward) {
        polygonRef.current?.style.setProperty('pointer-events', 'none');
        return;
      }

      polygonRef.current?.style.removeProperty('pointer-events');

      if (inSafeZone(point, event.target)) {
        cancelClose();
        onKeepOpen();
        return;
      }

      if (event.pointerType === 'touch') return;
      scheduleClose();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (trigger?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      if (
        target instanceof Element &&
        target.closest('[data-selection-submenu]')
      ) {
        return;
      }
      onRequestClose();
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [
    cancelClose,
    onKeepOpen,
    onRequestClose,
    open,
    paintTriangle,
    scheduleClose,
    trigger,
  ]);

  if (!isClient || !open) return null;

  return createPortal(
    <div
      data-selection-submenu=""
      className="pointer-events-none fixed inset-0"
      style={{ zIndex }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <polygon
          ref={polygonRef}
          className="pointer-events-auto fill-transparent"
        />
      </svg>
      <div
        ref={panelRef}
        className={cn('t-dropdown is-open absolute')}
        data-origin="top-left"
        style={{ visibility: 'hidden' }}
        onPointerEnter={onKeepOpen}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
