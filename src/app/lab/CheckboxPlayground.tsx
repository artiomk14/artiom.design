'use client';

import { useState } from 'react';
import { Checkbox, type CheckboxSize } from '@/components/ui';

const SIZES: CheckboxSize[] = ['lg', 'md', 'sm', 'x-sm'];

export function CheckboxPlayground() {
  const [selected, setSelected] = useState<Record<CheckboxSize, boolean>>({
    lg: false,
    md: true,
    sm: false,
    'x-sm': true,
  });

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-foreground-tertiary">
        Checkbox · interactive
      </h2>
      <p className="text-sm text-foreground-muted">
        Hover, press, and click. Sizes match Figma `lg` / `md` / `sm` / `x-sm`.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        {SIZES.map((size) => (
          <div key={size} className="flex items-center gap-2">
            <Checkbox
              size={size}
              selected={selected[size]}
              onSelectedChange={(next) =>
                setSelected((current) => ({ ...current, [size]: next }))
              }
              aria-label={`Toggle ${size}`}
            />
            <span className="text-xs text-foreground-muted">{size}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
