'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  DEFAULT_TAB_ID,
  parseTabId,
  site,
  tabById,
  type TabId,
} from '@/content/site';
import { cn } from '@/lib/utils';

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

export function HomeCanvas({ initialTab }: HomeCanvasProps) {
  const [selected, setSelected] = useState<TabId>(initialTab);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const idPrefix = useId();

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
    <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col px-[var(--container-padding)]">
      <section aria-label="Introduction" className="min-h-32 pt-16">
        <h1 className="sr-only">{site.title}</h1>
      </section>

      <div>
        <div
          role="tablist"
          aria-label="Site sections"
          className="flex flex-wrap gap-6 border-b border-border"
        >
          {site.tabs.map((tab, index) => {
            const isSelected = tab.id === selected;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${tab.id}`}
                aria-controls={`${idPrefix}-panel-${tab.id}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={cn(
                  '-mb-px border-b-2 pb-3 text-sm transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]',
                  isSelected
                    ? 'border-foreground-primary font-medium text-foreground-primary'
                    : 'border-transparent text-foreground-muted hover:text-foreground-secondary'
                )}
                onClick={() => selectTab(tab.id, true)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
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
              className="py-10 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out)]"
            >
              {isSelected ? (
                <p className="sr-only">{active.description}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
