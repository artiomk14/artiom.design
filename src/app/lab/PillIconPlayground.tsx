'use client';

import { useRef, useState } from 'react';
import { SmoothCorners } from '@lisse/react';
import {
  GemIcon,
  HeavyOnesIcon,
  WhoMeIcon,
  YappingIcon,
} from '@/components/icons';
import { Pill } from '@/components/ui';
import { useSlidingTabPill } from '@/lib/hooks';
import { cornersFor } from '@/styles/tokens';

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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabPillRef = useRef<HTMLSpanElement>(null);

  useSlidingTabPill({
    barRef: tabListRef,
    pillRef: tabPillRef,
    getActiveTab: () => {
      const index = TABS.findIndex((tab) => tab.id === selected);
      return tabRefs.current[index] ?? null;
    },
    selected,
  });

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-foreground-tertiary">
        Pill · tab switch (outline draw)
      </h2>
      <p className="text-sm text-foreground-muted">
        Click a tab to slide the selected fill and sketch its outline. Click a
        selected pill again to replay the draw.
      </p>
      <div
        ref={tabListRef}
        className="t-tabs flex flex-wrap items-center gap-3"
      >
        <SmoothCorners
          ref={tabPillRef}
          as="span"
          aria-hidden="true"
          autoEffects={false}
          corners={cornersFor('full')}
          className="t-tabs-pill"
        />
        {TABS.map((tab, index) => (
          <Pill
            key={tab.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            selected={selected === tab.id}
            slidingFill
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
