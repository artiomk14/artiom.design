import type { Metadata } from 'next';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Lab',
};

export default function LabPage() {
  return (
    <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-10 px-[var(--container-padding)] py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-sm font-semibold text-foreground-tertiary">
          Button · 1920px · primary
        </h1>
        <p className="text-sm text-foreground-muted">
          Figma states, forced so they can be compared without hovering.
        </p>
        <ul className="flex flex-wrap items-center gap-4">
          <li className="flex flex-col gap-2">
            <Button state="enabled" />
            <span className="text-xs text-foreground-muted">enabled</span>
          </li>
          <li className="flex flex-col gap-2">
            <Button state="hovered" />
            <span className="text-xs text-foreground-muted">hovered</span>
          </li>
          <li className="flex flex-col gap-2">
            <Button state="focused" />
            <span className="text-xs text-foreground-muted">focused</span>
          </li>
          <li className="flex flex-col gap-2">
            <Button state="pressed" />
            <span className="text-xs text-foreground-muted">pressed</span>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Interactive
        </h2>
        <p className="text-sm text-foreground-muted">
          Hover, tab to focus, and press. Defaults match Figma (leading icon +
          label).
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Booleans
        </h2>
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-4">
            <Button hasLeadingIcon hasLabel hasTrailingIcon={false} />
            <span className="text-xs text-foreground-muted">
              leading + label (defaults)
            </span>
          </li>
          <li className="flex items-center gap-4">
            <Button hasLeadingIcon={false} hasLabel hasTrailingIcon={false} />
            <span className="text-xs text-foreground-muted">label only</span>
          </li>
          <li className="flex items-center gap-4">
            <Button hasLeadingIcon={false} hasLabel hasTrailingIcon />
            <span className="text-xs text-foreground-muted">
              label + trailing
            </span>
          </li>
          <li className="flex items-center gap-4">
            <Button hasLeadingIcon hasLabel hasTrailingIcon />
            <span className="text-xs text-foreground-muted">
              leading + label + trailing
            </span>
          </li>
          <li className="flex items-center gap-4">
            <Button
              hasLeadingIcon
              hasLabel={false}
              hasTrailingIcon={false}
              aria-label="LinkedIn"
            />
            <span className="text-xs text-foreground-muted">
              leading icon only
            </span>
          </li>
          <li className="flex items-center gap-4">
            <Button
              hasLeadingIcon={false}
              hasLabel={false}
              hasTrailingIcon
              aria-label="LinkedIn"
            />
            <span className="text-xs text-foreground-muted">
              trailing icon only
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
