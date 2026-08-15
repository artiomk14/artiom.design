'use client';

import type { ElementType } from 'react';
import { SmoothCorners, type SmoothCornersProps } from '@lisse/react';
import { cn } from '@/lib/utils';
import { cornersFor } from '@/styles/tokens';

type NavItemOwnProps = {
  /** Selected (current) vs idle nav item — drives the whole visual scheme. */
  selected?: boolean;
  disabled?: boolean;
};

type NavItemProps<E extends ElementType> = NavItemOwnProps &
  Omit<SmoothCornersProps<E>, keyof NavItemOwnProps | 'corners'>;

/**
 * `nav-item` (Figma component set: state × selected).
 *
 * Icon-only control with full interaction states in both stages:
 * - **selected**: raised surface (bg + border + `shadow/sm`), foreground icon;
 *   hover lifts to white, pressed settles into the muted pill, shadow drops.
 * - **unselected**: transparent, muted icon; hover/pressed add a foreground
 *   tint and strengthen the icon.
 *
 * Icons inherit `currentColor`. Focus uses the global `:focus-visible` outline
 * (box-shadow rings are clipped by the squircle `clip-path`).
 */
export function NavItem<E extends ElementType = 'button'>({
  as,
  selected = false,
  disabled = false,
  className,
  ...props
}: NavItemProps<E>) {
  const Tag = (as ?? 'button') as ElementType;

  // The focus ring lives on a non-clipped wrapper: the squircle clip-path on
  // SmoothCorners would otherwise clip an outline drawn on the control itself.
  return (
    <span
      className={cn(
        'relative inline-flex rounded-2xl',
        'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent'
      )}
    >
      <SmoothCorners
        as={Tag}
        corners={cornersFor('2xl')}
        data-selected={selected || undefined}
        aria-current={selected ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          // Border on every state (transparent when idle) keeps both items the
          // exact same box size so the row never shifts between states.
          'flex items-center justify-center border p-3.5 outline-none',
          'transition-[background-color,box-shadow,color,border-color] duration-150 ease-out',
          selected
            ? [
                'border-border bg-background-subtle text-foreground shadow-sm',
                'hover:bg-background',
                'active:bg-background-muted active:shadow-none',
              ]
            : [
                'border-transparent text-foreground-muted',
                'hover:bg-foreground/5 hover:text-foreground',
                'active:bg-foreground/10',
              ],
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...(props as SmoothCornersProps<E>)}
      />
    </span>
  );
}
