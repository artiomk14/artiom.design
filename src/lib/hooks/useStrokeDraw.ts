'use client';

import { useEffect, useRef, type RefObject } from 'react';

const DRAW_DUR_FALLBACK_MS = 450;
const STAGGER_FALLBACK_MS = 80;
const DRAW_EASE_FALLBACK = 'cubic-bezier(0.22, 1, 0.36, 1)';
const MIN_PATH_DUR_MS = 180;
const SHAPE_SELECTOR = 'path, circle, ellipse, line, polyline, polygon, rect';

function readTimeMs(raw: string, fallback: number): number {
  const value = raw.trim();
  if (!value) return fallback;
  if (value.endsWith('ms')) return Number.parseFloat(value);
  if (value.endsWith('s')) return Number.parseFloat(value) * 1000;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function motionTokens(root: HTMLElement) {
  const styles = getComputedStyle(root);
  return {
    durationMs: readTimeMs(
      styles.getPropertyValue('--pill-icon-draw-dur'),
      DRAW_DUR_FALLBACK_MS
    ),
    staggerMs: readTimeMs(
      styles.getPropertyValue('--pill-icon-draw-stagger'),
      STAGGER_FALLBACK_MS
    ),
    ease:
      styles.getPropertyValue('--pill-icon-draw-ease').trim() ||
      DRAW_EASE_FALLBACK,
  };
}

function geometryIn(root: HTMLElement): SVGGeometryElement[] {
  return Array.from(root.querySelectorAll<SVGGeometryElement>(SHAPE_SELECTOR));
}

function clearStrokeDraw(shapes: SVGGeometryElement[]) {
  shapes.forEach((shape) => {
    shape.style.removeProperty('stroke-dasharray');
    shape.style.removeProperty('stroke-dashoffset');
    shape.style.removeProperty('transition');
  });
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function durationForPath(length: number, maxMs: number): number {
  return Math.min(maxMs, Math.max(MIN_PATH_DUR_MS, length * 10));
}

function delayForShape(
  shape: SVGGeometryElement,
  index: number,
  staggerMs: number
): number {
  const raw = shape.dataset.drawDelay;
  if (raw === undefined || raw === '') return index * staggerMs;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : index * staggerMs;
}

/**
 * Stroke-draws outline SVG paths when `open` flips from false → true,
 * or when `replayKey` changes while open.
 * Skips the first mount so the default selected pill is fully drawn.
 * Unselect resets instantly (no reverse-draw while the slot collapses).
 * Paths may set `data-draw-delay` (ms) to override index × stagger.
 */
export function useStrokeDraw(
  containerRef: RefObject<HTMLElement | null>,
  open: boolean,
  replayKey = 0
) {
  const didMount = useRef(false);
  const wasOpen = useRef(open);
  const lastReplayKey = useRef(replayKey);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const shapes = geometryIn(root);
    const isFirstPaint = !didMount.current;
    didMount.current = true;

    const replayed = replayKey !== lastReplayKey.current;
    lastReplayKey.current = replayKey;

    if (!open) {
      wasOpen.current = false;
      clearStrokeDraw(shapes);
      return;
    }

    const shouldDraw =
      !prefersReducedMotion() &&
      !isFirstPaint &&
      (replayed || !wasOpen.current);

    wasOpen.current = true;

    if (!shouldDraw) {
      clearStrokeDraw(shapes);
      return;
    }

    const { durationMs, staggerMs, ease } = motionTokens(root);
    let settleAt = 0;

    shapes.forEach((shape, index) => {
      const length = Math.ceil(shape.getTotalLength()) + 1;
      const duration = durationForPath(length, durationMs);
      const delay = delayForShape(shape, index, staggerMs);
      settleAt = Math.max(settleAt, duration + delay);

      shape.style.transition = 'none';
      shape.style.strokeDasharray = String(length);
      shape.style.strokeDashoffset = String(length);
      void shape.getBoundingClientRect();
      shape.style.transition = `stroke-dashoffset ${duration}ms ${ease} ${delay}ms`;
      shape.style.strokeDashoffset = '0';
    });

    const settle = window.setTimeout(() => clearStrokeDraw(shapes), settleAt + 50);
    return () => window.clearTimeout(settle);
  }, [containerRef, open, replayKey]);
}
