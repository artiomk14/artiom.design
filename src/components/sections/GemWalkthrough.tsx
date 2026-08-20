'use client';

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from 'react';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  TickIcon,
} from '@/components/icons';
import { Beam, Button } from '@/components/ui';
import { wc26Walkthrough } from '@/content/gems';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { shadow } from '@/styles/tokens';

interface GemWalkthroughProps {
  className?: string;
}

/** One lap around the card, then the success beam fades out. */
const GEM_SUCCESS_BEAM_S = 1.8;
const GEM_SUCCESS_BEAM_MS = GEM_SUCCESS_BEAM_S * 1000;

interface SwapTextProps {
  value: string;
  className?: string;
}

function SwapText({ value, className }: SwapTextProps) {
  return (
    <p key={value} className={cn('t-text-swap', className)}>
      {value}
    </p>
  );
}

/**
 * Invisible tour-height sizer so the gray `content-item` keeps the max
 * gem height while the visible card shrinks on complete.
 */
function TourSizer() {
  return (
    <div
      aria-hidden
      className="invisible pointer-events-none flex w-full flex-col p-2"
    >
      <div className="aspect-[424/236] w-full" />
      <div className="flex w-full flex-col gap-7 py-5 pr-6 pl-5">
        <div className="flex w-full flex-col gap-1.5 pr-5">
          <div className="h-6 w-full" />
          <div className="h-10 w-full" />
        </div>
        <div className="h-8 w-full" />
      </div>
    </div>
  );
}

/**
 * Figma `wc26-walktrough` (156:1659) — image, copy, step counter,
 * transparent 32px previous / next. Complete state is `step-04` (178:1724).
 *
 * CSS radius / border / shadow (not Lisse) so the stroke and elevation-xl
 * paint on first paint, and height can tween without clip-path recasts.
 */
export function GemWalkthrough({ className }: GemWalkthroughProps) {
  const labelId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const fromHeightRef = useRef(0);
  const beamHideRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [digitDir, setDigitDir] = useState(1);
  const [stepMotion, setStepMotion] = useState(false);
  const [complete, setComplete] = useState(false);
  const [beamActive, setBeamActive] = useState(false);

  const steps = wc26Walkthrough.steps;
  const total = steps.length;
  const step = steps[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  useLayoutEffect(() => {
    const card = cardRef.current;
    const from = fromHeightRef.current;
    if (!complete || !card || from <= 0) return;

    const to = card.offsetHeight;
    if (from === to) return;

    card.style.transition = 'none';
    card.style.height = `${from}px`;
    void card.offsetHeight;

    let innerFrame = 0;
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        if (!card.isConnected) return;
        card.style.removeProperty('transition');
        card.style.height = `${to}px`;
      });
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, [complete]);

  useEffect(() => {
    return () => window.clearTimeout(beamHideRef.current);
  }, []);

  if (!step) return null;

  const goPrevious = () => {
    setStepMotion(true);
    setDigitDir(-1);
    setIndex((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    if (isLast) {
      if (!prefersReducedMotion && cardRef.current) {
        fromHeightRef.current = cardRef.current.offsetHeight;
      }
      setComplete(true);
      if (!prefersReducedMotion) {
        window.clearTimeout(beamHideRef.current);
        setBeamActive(true);
        beamHideRef.current = window.setTimeout(() => {
          setBeamActive(false);
        }, GEM_SUCCESS_BEAM_MS);
      }
      return;
    }

    setStepMotion(true);
    setDigitDir(1);
    setIndex((current) => Math.min(total - 1, current + 1));
  };

  const onCardTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== 'height') return;
    event.currentTarget.style.removeProperty('height');
  };

  return (
    <article
      aria-labelledby={labelId}
      className={cn(
        'relative w-full max-w-[var(--size-gem-walkthrough)]',
        className
      )}
    >
      <h2 id={labelId} className="sr-only">
        {wc26Walkthrough.label}
      </h2>
      <TourSizer />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-full rounded-3xl"
          style={{ boxShadow: shadow.elevationXl }}
        >
          <Beam
            colorVariant="sunset"
            theme="light"
            strength={0.9}
            duration={GEM_SUCCESS_BEAM_S}
            hueRange={10}
            radius="3xl"
            active={beamActive}
            className="t-gem-success-beam w-full rounded-3xl"
          >
            <div
              ref={cardRef}
              onTransitionEnd={onCardTransitionEnd}
              className={cn(
                't-resize relative flex w-full flex-col overflow-hidden rounded-3xl border border-border-secondary bg-background p-2',
                complete && 'justify-center'
              )}
            >
              <div
                className={cn(
                  't-gem-media overflow-hidden rounded-2xl',
                  complete
                    ? 'pointer-events-none absolute inset-x-2 top-2 z-0 aspect-[424/236] is-collapsed'
                    : 'relative aspect-[424/236] w-full'
                )}
                aria-hidden={complete}
              >
                {steps.map((item, itemIndex) => (
                  <Image
                    key={item.id}
                    src={item.image.src}
                    alt={itemIndex === index && !complete ? item.image.alt : ''}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(max-width: 420px) 100vw, 420px"
                    priority={itemIndex === 0}
                    aria-hidden={itemIndex !== index || complete}
                    className={cn(
                      't-gem-image absolute inset-0 size-full object-cover',
                      itemIndex === index ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                ))}
              </div>

              {complete ? (
                <div className="relative z-10 flex w-full flex-col items-center justify-center gap-7 px-5 py-11">
                  <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-full bg-green-50 p-2">
                    <span
                      className="t-success-check t-gem-complete-check"
                      data-state="in"
                      aria-hidden="true"
                    >
                      <TickIcon />
                    </span>
                  </div>
                  <div
                    className="flex w-full flex-col items-center gap-1.5 tracking-normal"
                    aria-live="polite"
                  >
                    <SwapText
                      value={wc26Walkthrough.complete.title}
                      className="w-full text-center text-base font-medium leading-6 text-foreground-primary"
                    />
                    <SwapText
                      value={wc26Walkthrough.complete.description}
                      className="w-full text-center text-sm font-normal leading-5 text-foreground-subtle"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex w-full flex-col items-start gap-7 py-5 pr-6 pl-5">
                  <div
                    className="flex w-full flex-col items-start gap-1.5 pr-5 tracking-normal"
                    aria-live="polite"
                  >
                    <SwapText
                      value={step.title}
                      className="w-full text-base font-medium leading-6 text-foreground-primary"
                    />
                    <SwapText
                      value={step.description}
                      className="w-full text-sm font-normal leading-5 text-foreground-subtle"
                    />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p
                      className="flex shrink-0 items-center gap-1 rounded-full bg-background-primary px-3 py-1.5 text-center text-xs tracking-normal"
                      aria-label={`Step ${index + 1} of ${total}`}
                    >
                      <span
                        key={index}
                        className={cn(
                          't-digit-group inline-block w-3 font-medium text-foreground-tertiary',
                          stepMotion && 'is-animating'
                        )}
                        style={{ '--digit-dir-y': digitDir } as CSSProperties}
                      >
                        <span className="t-digit">{index + 1}</span>
                      </span>
                      <span className="font-normal text-foreground-quiet">
                        /
                      </span>
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
                        className={
                          isFirst
                            ? 'pointer-events-none opacity-0'
                            : undefined
                        }
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
                        leadingIcon={
                          <span
                            className="t-icon-swap"
                            data-state={isLast ? 'b' : 'a'}
                          >
                            <span className="t-icon" data-icon="a">
                              <ArrowRightIcon />
                            </span>
                            <span className="t-icon" data-icon="b">
                              <CheckIcon />
                            </span>
                          </span>
                        }
                        aria-label={
                          isLast ? 'Complete walkthrough' : 'Next step'
                        }
                        onClick={goNext}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Beam>
        </div>
      </div>
    </article>
  );
}
