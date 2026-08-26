'use client';

import { useLayoutEffect, useRef, type RefObject } from 'react';

interface UseSlidingTabPillOptions {
  /** Segmented control / tablist (`.t-tabs`). */
  barRef: RefObject<HTMLElement | null>;
  /** Moving fill (`.t-tabs-pill`). */
  pillRef: RefObject<HTMLElement | null>;
  /** Currently selected tab button. */
  getActiveTab: () => HTMLElement | null;
  /** Re-run when the selection (or equivalent) changes. */
  selected: unknown;
}

function moveTo(
  pill: HTMLElement,
  tab: HTMLElement,
  bar: HTMLElement,
  animate: boolean
) {
  const barRect = bar.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const x = tabRect.left - barRect.left + bar.scrollLeft;
  const y = tabRect.top - barRect.top + bar.scrollTop;

  const apply = () => {
    pill.style.transform = `translateX(${x}px) translateY(${y}px)`;
    pill.style.width = `${tabRect.width}px`;
    pill.style.height = `${tabRect.height}px`;
  };

  if (!animate) {
    const prev = pill.style.transition;
    pill.style.transition = 'none';
    apply();
    void pill.offsetWidth;
    pill.style.transition = prev;
    return;
  }

  apply();
}

/**
 * transitions.dev tabs-sliding — JS writes the active tab's box onto the
 * fill; CSS tweens `transform` + `width`. First paint and resize snap
 * (`transition: none`); selection changes animate.
 */
export function useSlidingTabPill({
  barRef,
  pillRef,
  getActiveTab,
  selected,
}: UseSlidingTabPillOptions) {
  const hasPositioned = useRef(false);
  const getActiveTabRef = useRef(getActiveTab);

  useLayoutEffect(() => {
    getActiveTabRef.current = getActiveTab;
  });

  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    const tab = getActiveTabRef.current();
    if (!bar || !pill || !tab) return;

    const animate = hasPositioned.current;
    moveTo(pill, tab, bar, animate);
    hasPositioned.current = true;
    bar.classList.add('is-ready');
  }, [barRef, pillRef, selected]);

  useLayoutEffect(() => {
    const onResize = () => {
      const bar = barRef.current;
      const pill = pillRef.current;
      const tab = getActiveTabRef.current();
      if (!bar || !pill || !tab) return;
      moveTo(pill, tab, bar, false);
    };

    window.addEventListener('resize', onResize);
    const fonts = document.fonts;
    void fonts?.ready.then(onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [barRef, pillRef]);
}
