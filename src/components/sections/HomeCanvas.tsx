'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { SmoothCorners } from '@lisse/react';
import { TabLeadingIcon } from '@/components/icons';
import { ContentItem } from '@/components/sections/ContentItem';
import { GemWalkthrough } from '@/components/sections/GemWalkthrough';
import { OverflowFade, Pill } from '@/components/ui';
import { gems } from '@/content/gems';
import {
  DEFAULT_TAB_ID,
  parseTabId,
  site,
  tabById,
  type TabId,
} from '@/content/site';
import { useSlidingTabPill } from '@/lib/hooks';
import { cornersFor } from '@/styles/tokens';

interface HomeCanvasProps {
  initialTab: TabId;
}

function tabUrl(tab: TabId): string {
  const url = new URL(window.location.href);
  if (tab === DEFAULT_TAB_ID) {
    url.searchParams.delete('tab');
  } else {
    url.searchParams.set('tab', tab);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

function setClientTitle(tab: TabId) {
  document.title = `${tabById(tab).label} · ${site.name}`;
}

/**
 * Homepage canvas — Figma `content_container` (124:583): pills + tab content.
 */
export function HomeCanvas({ initialTab }: HomeCanvasProps) {
  const [selected, setSelected] = useState<TabId>(initialTab);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabPillRef = useRef<HTMLSpanElement>(null);
  const idPrefix = useId();

  useSlidingTabPill({
    barRef: tabListRef,
    pillRef: tabPillRef,
    getActiveTab: () => {
      const index = site.tabs.findIndex((tab) => tab.id === selected);
      return tabRefs.current[index] ?? null;
    },
    selected,
  });

  const selectTab = useCallback((tab: TabId, persistUrl: boolean) => {
    setSelected(tab);
    setClientTitle(tab);
    if (persistUrl) {
      window.history.replaceState(window.history.state, '', tabUrl(tab));
    }
  }, []);

  useEffect(() => {
    setClientTitle(selected);
  }, [selected]);

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const next = parseTabId(params.get('tab') ?? undefined);
      setSelected(next);
      setClientTitle(next);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = site.tabs.length - 1;
    let next = index;

    if (event.key === 'ArrowRight') {
      next = index === last ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft') {
      next = index === 0 ? last : index - 1;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = last;
    } else {
      return;
    }

    event.preventDefault();
    const tab = site.tabs[next];
    if (!tab) {
      return;
    }
    selectTab(tab.id, true);
    tabRefs.current[next]?.focus();
  };

  const active = tabById(selected);

  return (
    <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col px-[var(--container-padding)] pt-12 pb-14">
      <div className="flex w-full flex-col gap-11">
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Site sections"
          className="t-tabs flex w-full flex-wrap items-start gap-3 px-0.5"
        >
          <SmoothCorners
            ref={tabPillRef}
            as="span"
            aria-hidden="true"
            autoEffects={false}
            corners={cornersFor('full')}
            className="t-tabs-pill"
          />
          {site.tabs.map((tab, index) => {
            const isSelected = tab.id === selected;
            return (
              <Pill
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                role="tab"
                id={`${idPrefix}-tab-${tab.id}`}
                aria-controls={`${idPrefix}-panel-${tab.id}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                selected={isSelected}
                slidingFill
                label={tab.label}
                hasLeadingIcon
                hasTrailingIcon={false}
                leadingIcon={<TabLeadingIcon tabId={tab.id} />}
                onClick={() => selectTab(tab.id, true)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              />
            );
          })}
        </div>

        {site.tabs.map((tab) => {
          const isSelected = tab.id === selected;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`${idPrefix}-panel-${tab.id}`}
              aria-labelledby={`${idPrefix}-tab-${tab.id}`}
              hidden={!isSelected}
            >
              {isSelected ? (
                <OverflowFade className="flex w-full flex-col gap-6">
                  {tab.id === DEFAULT_TAB_ID ? (
                    <>
                      <ContentItem>
                        <GemWalkthrough />
                      </ContentItem>
                      {gems.placeholders.map((item) => (
                        <ContentItem key={item.id} />
                      ))}
                    </>
                  ) : null}
                  <p className="sr-only">{active.description}</p>
                </OverflowFade>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
