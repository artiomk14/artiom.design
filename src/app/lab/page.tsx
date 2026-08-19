import {
  GemIcon,
  HeavyOnesIcon,
  WhoMeIcon,
  YappingIcon,
} from '@/components/icons';
import { Button, Pill } from '@/components/ui';
import { legacyPageMetadata } from '@/lib/seo';

export const metadata = legacyPageMetadata('Lab');

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
          Button · 1920px · transparent
        </h2>
        <p className="text-sm text-foreground-muted">
          Same layout as primary; fill and ink tokens follow Figma `class=transparent`.
        </p>
        <ul className="flex flex-wrap items-center gap-4">
          <li className="flex flex-col gap-2">
            <Button variant="transparent" state="enabled" />
            <span className="text-xs text-foreground-muted">enabled</span>
          </li>
          <li className="flex flex-col gap-2">
            <Button variant="transparent" state="hovered" />
            <span className="text-xs text-foreground-muted">hovered</span>
          </li>
          <li className="flex flex-col gap-2">
            <Button variant="transparent" state="focused" />
            <span className="text-xs text-foreground-muted">focused</span>
          </li>
          <li className="flex flex-col gap-2">
            <Button variant="transparent" state="pressed" />
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
          <Button variant="transparent" />
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

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Pill · selected × state
        </h2>
        <p className="text-sm text-foreground-muted">
          Figma `pill` (145:1021). Icon is visible only when selected. States
          are forced so they can be compared without hovering.
        </p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <p className="text-xs text-foreground-muted">selected</p>
          <p className="text-xs text-foreground-muted">unselected</p>
          {(
            [
              'enabled',
              'hovered',
              'focused',
              'pressed',
            ] as const
          ).flatMap((pillState) => [
            <div key={`${pillState}-on`} className="flex flex-col gap-2">
              <Pill selected state={pillState} label="Pill" />
              <span className="text-xs text-foreground-muted">{pillState}</span>
            </div>,
            <div key={`${pillState}-off`} className="flex flex-col gap-2">
              <Pill selected={false} state={pillState} label="Pill" />
              <span className="text-xs text-foreground-muted">{pillState}</span>
            </div>,
          ])}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Pill · interactive
        </h2>
        <p className="text-sm text-foreground-muted">
          Hover, tab to focus, and press. Each pill swaps its own leading icon;
          the icon hides when unselected.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Pill selected label="Gems" leadingIcon={<GemIcon />} />
          <Pill
            selected={false}
            label="Heavy Ones"
            leadingIcon={<HeavyOnesIcon />}
          />
          <Pill
            selected={false}
            label="Yapping"
            leadingIcon={<YappingIcon />}
          />
          <Pill
            selected={false}
            label="Who Me?"
            leadingIcon={<WhoMeIcon />}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Pill · icon instance swap
        </h2>
        <p className="text-sm text-foreground-muted">
          Selected, so the leading icon is visible. Pass `leadingIcon` to swap
          the glyph.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Pill selected label="Gems" leadingIcon={<GemIcon />} />
          <Pill selected label="Heavy Ones" leadingIcon={<HeavyOnesIcon />} />
          <Pill selected label="Yapping" leadingIcon={<YappingIcon />} />
          <Pill selected label="Who Me?" leadingIcon={<WhoMeIcon />} />
        </div>
      </section>
    </div>
  );
}
