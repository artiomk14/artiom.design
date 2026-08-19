'use client';

import { useEffect, useRef, type RefObject } from 'react';

const DRAW_DUR_FALLBACK_MS = 400;
const STAGGER_FALLBACK_MS = 50;
const DRAW_EASE_FALLBACK = 'cubic-bezier(0.22, 1, 0.36, 1)';
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

/**
 * Stroke-draws outline SVG paths when `open` flips from false → true.
 * Skips the first mount so the default selected pill is fully drawn.
 * Unselect resets instantly (no reverse-draw while the slot collapses).
 */
export function useStrokeDraw(
  containerRef: RefObject<HTMLElement | null>,
  open: boolean
) {
  const didMount = useRef(false);
  const wasOpen = useRef(open);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const shapes = geometryIn(root);
    const isFirstPaint = !didMount.current;
    didMount.current = true;

    if (!open) {
      wasOpen.current = false;
      clearStrokeDraw(shapes);
      return;
    }

    const shouldDraw =
      !isFirstPaint && !wasOpen.current && !prefersReducedMotion();
    wasOpen.current = true;

    if (!shouldDraw) {
      clearStrokeDraw(shapes);
      return;
    }

    const { durationMs, staggerMs, ease } = motionTokens(root);

    shapes.forEach((shape, index) => {
      const length = Math.ceil(shape.getTotalLength()) + 1;
      shape.style.transition = 'none';
      shape.style.strokeDasharray = String(length);
      shape.style.strokeDashoffset = String(length);
      void shape.getBoundingClientRect();
      shape.style.transition = `stroke-dashoffset ${durationMs}ms ${ease} ${index * staggerMs}ms`;
      shape.style.strokeDashoffset = '0';
    });

    const settleAt = durationMs + Math.max(0, shapes.length - 1) * staggerMs + 50;
    const settle = window.setTimeout(() => clearStrokeDraw(shapes), settleAt);
    return () => window.clearTimeout(settle);
  }, [containerRef, open]);
}
