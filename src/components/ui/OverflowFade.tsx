'use client';

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

interface OverflowFadeProps {
  children: ReactNode;
  className?: string;
}

const FOLD_SLACK_PX = 16;

/**
 * Wraps a block of content and paints a bottom fade when that content
 * continues past the viewport fold. The fade uses the page background
 * (`--overflow-fade-from`) so overflowing items dissolve into the canvas
 * rather than sitting under a dark shadow.
 *
 * Hide the fade once there is nothing left below the fold. Later tab
 * panels can reuse this as-is.
 */
export function OverflowFade({ children, className }: OverflowFadeProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    const measure = () => {
      const { bottom } = content.getBoundingClientRect();
      const remaining =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;
      setVisible(bottom > window.innerHeight + FOLD_SLACK_PX && remaining > FOLD_SLACK_PX);
    };

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();

    const observer = new ResizeObserver(update);
    observer.observe(content);

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={contentRef} className={className}>
        {children}
      </div>
      <div
        aria-hidden
        data-visible={visible ? 'true' : 'false'}
        className={cn(
          'overflow-fade pointer-events-none fixed inset-x-0 bottom-0 z-10',
          visible && 'is-visible'
        )}
      />
    </div>
  );
}
