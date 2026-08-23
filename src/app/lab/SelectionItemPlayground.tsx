'use client';

import { useState } from 'react';
import { SelectionItem } from '@/components/ui';

const STATES = ['enabled', 'hovered', 'focused', 'pressed'] as const;

const SHAPES = [
  {
    id: 'all',
    label: 'all slots',
    props: {},
  },
  {
    id: 'no-checkbox',
    label: 'no checkbox',
    props: { hasCheckbox: false },
  },
  {
    id: 'no-leading',
    label: 'no leading',
    props: { hasLeadingIcon: false },
  },
  {
    id: 'no-trailing',
    label: 'no trailing',
    props: { hasTrailingIcon: false },
  },
  {
    id: 'no-nested',
    label: 'no nested',
    props: { hasNested: false },
  },
  {
    id: 'checkbox-label',
    label: 'checkbox + label',
    props: {
      hasLeadingIcon: false,
      hasTrailingIcon: false,
      hasNested: false,
    },
  },
  {
    id: 'label-nested',
    label: 'label + nested',
    props: {
      hasCheckbox: false,
      hasLeadingIcon: false,
      hasTrailingIcon: false,
    },
  },
  {
    id: 'label-only',
    label: 'label only',
    props: {
      hasCheckbox: false,
      hasLeadingIcon: false,
      hasTrailingIcon: false,
      hasNested: false,
    },
  },
] as const;

export function SelectionItemPlayground() {
  const [checked, setChecked] = useState(false);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-foreground-tertiary">
        Selection item · interactive
      </h2>
      <p className="text-sm text-foreground-muted">
        Hover, tab to focus, press. Click toggles Figma `selected` (row chrome
        + checkbox) when that slot is on.
      </p>
      <div className="w-[320px] bg-background-muted p-5">
        <div className="w-[280px]">
          <SelectionItem
            selected={checked}
            onClick={() => setChecked((value) => !value)}
          />
        </div>
      </div>
    </section>
  );
}

export function SelectionItemShapeGrid() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-foreground-tertiary">
        Selection item · shapes
      </h2>
      <p className="text-sm text-foreground-muted">
        Figma booleans: `has checkbox`, `has leading-icon`, `has trailing-icon`,
        `has nested`.
      </p>
      <ul className="flex w-fit flex-col gap-5 bg-background-muted p-5">
        {SHAPES.map((shape) => (
          <li key={shape.id} className="flex items-center gap-3">
            <div className="w-[280px]">
              <SelectionItem label={shape.label} {...shape.props} />
            </div>
            <span className="text-xs text-foreground-muted">{shape.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SelectionItemStateGrid() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-foreground-tertiary">
        Selection item · state
      </h2>
      <p className="text-sm text-foreground-muted">
        Figma `selection-item` (177:1271). States × `selected` are forced so
        they can be compared without hovering. Frame width is 280px.
      </p>
      <div className="flex w-fit flex-col gap-5 bg-background-muted p-5">
        <div className="flex gap-5">
          <span className="w-[280px] text-xs text-foreground-muted">
            selected=false
          </span>
          <span className="w-[280px] text-xs text-foreground-muted">
            selected=true
          </span>
        </div>
        {STATES.map((itemState) => (
          <div key={itemState} className="flex items-center gap-5">
            <div className="w-[280px]">
              <SelectionItem state={itemState} selected={false} />
            </div>
            <div className="w-[280px]">
              <SelectionItem state={itemState} selected />
            </div>
            <span className="text-xs text-foreground-muted">{itemState}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
