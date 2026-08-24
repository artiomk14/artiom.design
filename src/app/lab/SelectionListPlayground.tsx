'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { Button, SelectionItem, SelectionList, SelectionMenu } from '@/components/ui';

const FIGMA_ITEMS = [
  { value: 'copy-email', label: 'Copy E-mail', hasNested: false },
  { value: 'open-with', label: 'Open with', hasNested: true },
  { value: 'edit-with', label: 'Edit with', hasNested: true },
  { value: 'save-as', label: 'Save as', hasNested: true },
  { value: 'export-to', label: 'Export to', hasNested: true },
] as const;

const OPEN_WITH = [
  { value: 'gmail', label: 'Gmail' },
  { value: 'outlook', label: 'Outlook' },
  { value: 'notion-mail', label: 'Notion Mail' },
  { value: 'superhuman', label: 'Superhuman' },
] as const;

const EDIT_WITH = [
  { value: 'cursor', label: 'Cursor' },
  { value: 'vscode', label: 'VS Code' },
] as const;

const SAVE_AS = [
  { value: 'png', label: 'PNG' },
  { value: 'svg', label: 'SVG' },
] as const;

const EXPORT_TO = [
  { value: 'figma', label: 'Figma' },
  { value: 'notion', label: 'Notion' },
] as const;

const NESTED_BY_VALUE: Record<string, readonly { value: string; label: string }[]> = {
  'open-with': OPEN_WITH,
  'edit-with': EDIT_WITH,
  'save-as': SAVE_AS,
  'export-to': EXPORT_TO,
};

const FRUIT = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'fig', label: 'Fig' },
] as const;

function NestedList({
  items,
  label,
}: {
  items: readonly { value: string; label: string }[];
  label: string;
}) {
  return (
    <SelectionList aria-label={label}>
      {items.map((item) => (
        <SelectionItem
          key={item.value}
          value={item.value}
          label={item.label}
          hasCheckbox={false}
          hasTrailingIcon={false}
          hasNested={false}
        />
      ))}
    </SelectionList>
  );
}

function nestedFor(value: string, label: string): ReactNode {
  const items = NESTED_BY_VALUE[value];
  if (!items) return null;
  return <NestedList items={items} label={label} />;
}

function FigmaItems({
  hasCheckbox = false,
}: {
  hasCheckbox?: boolean;
}) {
  return (
    <>
      {FIGMA_ITEMS.map((item) => (
        <SelectionItem
          key={item.value}
          value={item.value}
          label={item.label}
          hasCheckbox={hasCheckbox}
          hasTrailingIcon={false}
          hasNested={item.hasNested}
          nested={item.hasNested ? nestedFor(item.value, item.label) : undefined}
        />
      ))}
    </>
  );
}

export function SelectionListPlayground() {
  const [single, setSingle] = useState<string>('banana');
  const [multiple, setMultiple] = useState<string[]>(['apple', 'fig']);
  const [query, setQuery] = useState('');
  const [combo, setCombo] = useState<string>('apple');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return FRUIT;
    return FRUIT.filter((item) => item.label.toLowerCase().includes(needle));
  }, [query]);

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Selection list · nested
        </h2>
        <p className="text-sm text-foreground-muted">
          Figma nested `selection-list` (246:449). Hover <span className="text-foreground-secondary">Open with</span> —
          the same list component opens 8px above the item and overlaps it by
          2px. A safe triangle keeps the flyout open while the pointer travels
          into it. ArrowRight opens; ArrowLeft / Escape close one level.
        </p>
        <div className="min-h-80 w-fit bg-background-muted p-8 pr-80">
          <SelectionList id="selection-list-nested" aria-label="Actions">
            <SelectionItem
              value="copy-email"
              label="Copy E-mail"
              hasCheckbox={false}
              hasTrailingIcon={false}
              hasNested={false}
            />
            <SelectionItem
              value="open-with"
              label="Open with"
              hasCheckbox={false}
              hasTrailingIcon={false}
              nested={
                <NestedList items={OPEN_WITH} label="Open with" />
              }
            />
          </SelectionList>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Selection list · Figma replica
        </h2>
        <p className="text-sm text-foreground-muted">
          Figma `selection-list` (177:1401). 240px surface, 8px padding, 4px
          gap, 24px radius, `elevation-lg`. Items match the file: leading icon
          + label, nested chevron on every row except the first.
        </p>
        <div className="min-h-80 w-fit bg-background-muted p-8 pr-80">
          <SelectionList id="selection-list-figma" aria-label="Actions">
            <FigmaItems />
          </SelectionList>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Selection list · dropdown menu
        </h2>
        <p className="text-sm text-foreground-muted">
          `SelectionMenu` anchors the list to a trigger. Open/close uses the
          menu-dropdown motion. Escape and outside click close it. Nested
          flyouts stay available from chevron rows.
        </p>
        <div className="min-h-80 bg-background-muted p-8">
          <SelectionMenu
            trigger={
              <Button label="Actions" hasLeadingIcon={false} />
            }
          >
            <FigmaItems />
          </SelectionMenu>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Selection list · single
        </h2>
        <p className="text-sm text-foreground-muted">
          Listbox. One selected row at a time. Current: {single}.
        </p>
        <SelectionList
          mode="single"
          value={single}
          onValueChange={(value) => {
            if (typeof value === 'string') setSingle(value);
          }}
          aria-label="Fruit"
          closeOnSelect={false}
        >
          {FRUIT.map((item) => (
            <SelectionItem
              key={item.value}
              value={item.value}
              label={item.label}
              hasCheckbox={false}
              hasTrailingIcon={false}
              hasNested={false}
            />
          ))}
        </SelectionList>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Selection list · multiple
        </h2>
        <p className="text-sm text-foreground-muted">
          Multi-select listbox with checkboxes. Selected:{' '}
          {multiple.join(', ') || 'none'}.
        </p>
        <SelectionList
          mode="multiple"
          value={multiple}
          onValueChange={(value) => {
            if (Array.isArray(value)) setMultiple(value);
          }}
          aria-label="Fruit"
        >
          {FRUIT.map((item) => (
            <SelectionItem
              key={item.value}
              value={item.value}
              label={item.label}
              hasTrailingIcon={false}
              hasNested={false}
            />
          ))}
        </SelectionList>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground-tertiary">
          Selection list · combobox
        </h2>
        <p className="text-sm text-foreground-muted">
          Filter the list from an input. Same surface; options update with the
          query. Current: {combo}.
        </p>
        <div className="flex w-60 flex-col gap-1">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Filter fruit"
            aria-controls="selection-list-combobox"
            aria-autocomplete="list"
            className="h-10 border border-border-secondary bg-background-surface px-3 text-sm text-foreground-primary"
            placeholder="Filter…"
          />
          <SelectionList
            id="selection-list-combobox"
            mode="single"
            value={combo}
            onValueChange={(value) => {
              if (typeof value === 'string') {
                setCombo(value);
                const match = FRUIT.find((item) => item.value === value);
                if (match) setQuery(match.label);
              }
            }}
            aria-label="Filtered fruit"
            closeOnSelect={false}
          >
            {filtered.map((item) => (
              <SelectionItem
                key={item.value}
                value={item.value}
                label={item.label}
                hasCheckbox={false}
                hasTrailingIcon={false}
                hasNested={false}
              />
            ))}
          </SelectionList>
        </div>
      </section>
    </>
  );
}
