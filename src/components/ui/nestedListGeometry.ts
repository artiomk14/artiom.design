export interface Point {
  x: number;
  y: number;
}

export interface RectLike {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export type NestedListSide = 'left' | 'right';

/** Ignore sub-pixel jitter when deciding pointer intent. */
export const POINTER_INTENT_MIN_MOVE = 2;

/**
 * Radix submenu pointer-grace timeout. Intent refreshes this on the way
 * to the nested list; after a pause the sibling under the cursor can take over.
 */
export const POINTER_GRACE_MS = 300;

/** 1px slack so subpixel cursor samples still count as inside. */
export const POINTER_GRACE_BUFFER = 1;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function pointInRect(point: Point, rect: RectLike): boolean {
  return (
    point.x >= rect.left &&
    point.x <= rect.right &&
    point.y >= rect.top &&
    point.y <= rect.bottom
  );
}

export function inflateRect(rect: RectLike, buffer: number): RectLike {
  return {
    left: rect.left - buffer,
    top: rect.top - buffer,
    right: rect.right + buffer,
    bottom: rect.bottom + buffer,
  };
}

export function pointInTriangle(
  point: Point,
  a: Point,
  b: Point,
  c: Point
): boolean {
  const v0x = c.x - a.x;
  const v0y = c.y - a.y;
  const v1x = b.x - a.x;
  const v1y = b.y - a.y;
  const v2x = point.x - a.x;
  const v2y = point.y - a.y;

  const dot00 = v0x * v0x + v0y * v0y;
  const dot01 = v0x * v1x + v0y * v1y;
  const dot02 = v0x * v2x + v0y * v2y;
  const dot11 = v1x * v1x + v1y * v1y;
  const dot12 = v1x * v2x + v1y * v2y;
  const denom = dot00 * dot11 - dot01 * dot01;
  if (denom === 0) return false;

  const u = (dot11 * dot02 - dot01 * dot12) / denom;
  const v = (dot00 * dot12 - dot01 * dot02) / denom;
  return u >= 0 && v >= 0 && u + v <= 1;
}

/**
 * Even-odd point-in-polygon. Same test Radix and Floating UI use for
 * pointer-grace areas (substack/point-in-polygon).
 */
export function isPointInPolygon(point: Point, polygon: readonly Point[]): boolean {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    if (!ii || !jj) continue;
    const intersect =
      ii.y >= y !== jj.y >= y &&
      x <= ((jj.x - ii.x) * (y - ii.y)) / (jj.y - ii.y) + ii.x;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function distanceToRect(point: Point, rect: RectLike): number {
  const x = clamp(point.x, rect.left, rect.right);
  const y = clamp(point.y, rect.top, rect.bottom);
  return Math.hypot(point.x - x, point.y - y);
}

/** True when the pointer is closing in on `rect` (submenu intent). */
export function isMovingToward(
  previous: Point,
  current: Point,
  rect: RectLike
): boolean {
  return distanceToRect(current, rect) < distanceToRect(previous, rect) - 0.1;
}

/**
 * Unbounded ray from `from` through `to`. Hits the axis-aligned rect if the
 * pointer is heading at the nested list — including when the sampled segment
 * is only a few pixels long. Slab method, t ≥ 0.
 */
export function rayHitsRect(
  from: Point,
  to: Point,
  rect: RectLike
): boolean {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (dx === 0 && dy === 0) return pointInRect(from, rect);

  let tMin = 0;
  let tMax = Number.POSITIVE_INFINITY;

  const slabs: Array<readonly [number, number, number]> = [
    [dx, rect.left - from.x, rect.right - from.x],
    [dy, rect.top - from.y, rect.bottom - from.y],
  ];

  for (const [dir, minDelta, maxDelta] of slabs) {
    if (dir === 0) {
      if (minDelta > 0 || maxDelta < 0) return false;
      continue;
    }

    let t1 = minDelta / dir;
    let t2 = maxDelta / dir;
    if (t1 > t2) {
      const swap = t1;
      t1 = t2;
      t2 = swap;
    }
    tMin = Math.max(tMin, t1);
    tMax = Math.min(tMax, t2);
    if (tMin > tMax) return false;
  }

  return tMax >= 0;
}

/**
 * Cursor-following safe triangle: pointer → the nested list’s near-edge
 * corners (full height). This is the Amazon / Floating UI / Linear fan.
 */
export function cursorTriangle(
  cursor: Point,
  box: RectLike,
  side: NestedListSide,
  buffer = POINTER_GRACE_BUFFER
): [Point, Point, Point] {
  const x = side === 'right' ? box.left - buffer : box.right + buffer;
  return [
    cursor,
    { x, y: box.top - buffer },
    { x, y: box.bottom + buffer },
  ];
}

/**
 * Radix pointer-grace polygon: cursor plus all four corners of the nested
 * list. Covers the diagonal into Superhuman and the list itself.
 */
export function gracePolygon(
  cursor: Point,
  box: RectLike,
  side: NestedListSide,
  buffer = POINTER_GRACE_BUFFER
): Point[] {
  const nearX = side === 'right' ? box.left - buffer : box.right + buffer;
  const farX = side === 'right' ? box.right + buffer : box.left - buffer;
  const bleed = side === 'right' ? -1 : 1;
  return [
    { x: cursor.x + bleed, y: cursor.y },
    { x: nearX, y: box.top - buffer },
    { x: farX, y: box.top - buffer },
    { x: farX, y: box.bottom + buffer },
    { x: nearX, y: box.bottom + buffer },
  ];
}

export function readDropdownCloseMs(): number {
  if (typeof window === 'undefined') return 150;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--dropdown-close-dur')
    .trim();
  const ms = raw.endsWith('ms')
    ? parseFloat(raw)
    : raw.endsWith('s')
      ? parseFloat(raw) * 1000
      : parseFloat(raw);
  return Number.isFinite(ms) && ms >= 0 ? ms : 150;
}
