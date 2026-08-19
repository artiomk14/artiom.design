'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from '@/components/icons';
import { Button, SmoothSurface } from '@/components/ui';
import { wc26Walkthrough } from '@/content/gems';
import { cn } from '@/lib/utils';
import { colors, shadow } from '@/styles/tokens';

interface GemWalkthroughProps {
  className?: string;
}

/**
 * Figma `wc26-walktrough` (156:1658) — image, copy, step counter,
 * transparent 32px previous / next.
 */
export function GemWalkthrough({ className }: GemWalkthroughProps) {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const steps = wc26Walkthrough.steps;
  const total = steps.length;
  const step = steps[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  if (!step) return null;

  const goPrevious = () => {
    setIndex((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    setIndex((current) => Math.min(total - 1, current + 1));
  };

  return (
    <article
      aria-labelledby={labelId}
      className={cn(
        'w-full max-w-[var(--size-gem-walkthrough)]',
        className
      )}
    >
      <h2 id={labelId} className="sr-only">
        {wc26Walkthrough.label}
      </h2>
      <SmoothSurface
        radius="3xl"
        shadow={[...shadow.mdLayers]}
        innerBorder={{ width: 1, color: colors.border.primary, opacity: 1 }}
        className="flex w-full flex-col overflow-hidden bg-background p-2"
      >
        <SmoothSurface
          radius="2xl"
          className="relative aspect-[424/236] w-full overflow-hidden"
        >
          <Image
            key={step.id}
            src={step.image.src}
            alt={step.image.alt}
            width={step.image.width}
            height={step.image.height}
            sizes="(max-width: 420px) 100vw, 420px"
            className="size-full object-cover"
            priority={isFirst}
          />
        </SmoothSurface>
        <div className="flex w-full flex-col items-start gap-7 overflow-hidden py-5 pr-6 pl-5">
          <div
            className="flex w-full flex-col items-start gap-1.5 pr-5 tracking-normal"
            aria-live="polite"
          >
            <p className="text-base font-medium leading-6 text-foreground-primary">
              {step.title}
            </p>
            <p className="text-sm font-normal leading-5 text-foreground-subtle">
              {step.description}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p
              className="flex shrink-0 items-center gap-1 rounded-full bg-background-primary px-3 py-1.5 text-center text-xs tracking-normal"
              aria-label={`Step ${index + 1} of ${total}`}
            >
              <span className="inline-block w-3 font-medium text-foreground-tertiary">
                {index + 1}
              </span>
              <span className="font-normal text-foreground-quiet">/</span>
              <span className="inline-block w-3 font-normal text-foreground-quiet">
                {total}
              </span>
            </p>
            <div className="flex shrink-0 items-center justify-end gap-4">
              <Button
                type="button"
                variant="transparent"
                size="icon"
                hasLabel={false}
                hasTrailingIcon={false}
                leadingIcon={<ArrowLeftIcon />}
                aria-label="Previous step"
                tabIndex={isFirst ? -1 : undefined}
                aria-hidden={isFirst}
                className={isFirst ? 'pointer-events-none opacity-0' : undefined}
                onClick={goPrevious}
              />
              <span
                className={cn(
                  'h-5 w-px bg-border-subtle',
                  isFirst && 'opacity-0'
                )}
                aria-hidden
              />
              <Button
                type="button"
                variant="transparent"
                size="icon"
                hasLabel={false}
                hasTrailingIcon={false}
                leadingIcon={isLast ? <CheckIcon /> : <ArrowRightIcon />}
                aria-label={isLast ? 'Last step' : 'Next step'}
                onClick={goNext}
              />
            </div>
          </div>
        </div>
      </SmoothSurface>
    </article>
  );
}
