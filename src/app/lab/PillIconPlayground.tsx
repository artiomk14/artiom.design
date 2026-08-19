'use client';

import { useState } from 'react';
import {
  GemIcon,
  HeavyOnesIcon,
  WhoMeIcon,
  YappingIcon,
} from '@/components/icons';
import { Pill } from '@/components/ui';

const TABS = [
  { id: 'gems', label: 'Gems', icon: <GemIcon /> },
  { id: 'heavy-ones', label: 'Heavy Ones', icon: <HeavyOnesIcon /> },
  { id: 'yapping', label: 'Yapping', icon: <YappingIcon /> },
  { id: 'who-me', label: 'Who Me?', icon: <WhoMeIcon /> },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function PillIconPlayground() {
  const [selected, setSelected] = useState<TabId>('gems');
  const [drawKey, setDrawKey] = useState(0);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-foreground-tertiary">
        Pill · tab switch (outline draw)
      </h2>
      <p className="text-sm text-foreground-muted">
        Click Heavy Ones to sketch the briefcase. Click a selected pill again
        to replay the draw.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {TABS.map((tab) => (
          <Pill
            key={tab.id}
            selected={selected === tab.id}
            label={tab.label}
            leadingIcon={tab.icon}
            drawKey={selected === tab.id ? drawKey : 0}
            onClick={() => {
              if (selected === tab.id) {
                setDrawKey((key) => key + 1);
                return;
              }
              setSelected(tab.id);
            }}
          />
        ))}
      </div>
    </section>
  );
}
