export interface Point {
  x: number;
  y: number;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function pointInRect(point: Point, rect: DOMRectReadOnly): boolean {
  return (
    point.x >= rect.left &&
    point.x <= rect.right &&
    point.y >= rect.top &&
    point.y <= rect.bottom
  );
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

export function distanceToRect(point: Point, rect: DOMRectReadOnly): number {
  const x = clamp(point.x, rect.left, rect.right);
  const y = clamp(point.y, rect.top, rect.bottom);
  return Math.hypot(point.x - x, point.y - y);
}

/** True when the pointer is closing in on `rect` (submenu intent). */
export function isMovingToward(
  previous: Point,
  current: Point,
  rect: DOMRectReadOnly
): boolean {
  return distanceToRect(current, rect) < distanceToRect(previous, rect) - 0.1;
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
