'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronDownIcon,
  Copy01Icon,
  GmailIcon,
  LinkSquare02Icon,
  NotionMailIcon,
  OutlookIcon,
  SuperhumanIcon,
} from '@/components/icons';
import { Button, SelectionItem, SelectionList, SelectionMenu } from '@/components/ui';
import { EMAIL_ADDRESS, mailComposerHref, mailComposers } from '@/content/mail';

const COPY_VALUE = 'copy-email';
const OPEN_WITH_VALUE = 'open-with';

function composerIcon(id: string) {
  switch (id) {
    case 'gmail':
      return <GmailIcon />;
    case 'outlook':
      return <OutlookIcon />;
    case 'notion-mail':
      return <NotionMailIcon />;
    case 'superhuman':
      return <SuperhumanIcon />;
    default:
      return undefined;
  }
}

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the execCommand path when Clipboard API is blocked.
    }
  }

  const input = document.createElement('textarea');
  input.value = text;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.left = '-9999px';
  document.body.append(input);
  input.select();
  const ok = document.execCommand('copy');
  input.remove();
  return ok;
}

function openComposer(href: string) {
  window.open(href, '_blank', 'noopener,noreferrer');
}

/**
 * Header E-mail control. Opens Figma nested `selection-list` (246:449):
 * Copy E-mail, then Open with → Gmail / Outlook / Notion Mail / Superhuman.
 */
export function EmailMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | null>(null);

  const announceCopied = useCallback(() => {
    setCopied(true);
    if (copiedTimer.current != null) window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => {
      setCopied(false);
      copiedTimer.current = null;
    }, 2000);
  }, []);

  useEffect(
    () => () => {
      if (copiedTimer.current != null) window.clearTimeout(copiedTimer.current);
    },
    []
  );

  const handleCopy = useCallback(async () => {
    setOpen(false);
    const ok = await copyText(EMAIL_ADDRESS);
    if (ok) announceCopied();
  }, [announceCopied]);

  return (
    <div className="relative inline-flex">
      <SelectionMenu
        open={open}
        onOpenChange={setOpen}
        origin="top-right"
        aria-label="E-mail"
        trigger={
          <Button
            hasLeadingIcon={false}
            hasLabel
            hasTrailingIcon
            trailingIcon={<ChevronDownIcon />}
            label="E-mail"
          />
        }
      >
        <SelectionItem
          value={COPY_VALUE}
          label="Copy E-mail"
          hasCheckbox={false}
          hasTrailingIcon={false}
          hasNested={false}
          leadingIcon={<Copy01Icon />}
          onClick={() => {
            void handleCopy();
          }}
        />
        <SelectionItem
          value={OPEN_WITH_VALUE}
          label="Open with"
          hasCheckbox={false}
          hasTrailingIcon={false}
          leadingIcon={<LinkSquare02Icon />}
          nested={
            <SelectionList
              aria-label="Open with"
              onValueChange={(value) => {
                if (typeof value !== 'string') return;
                const href = mailComposerHref(value, EMAIL_ADDRESS);
                if (href) openComposer(href);
              }}
            >
              {mailComposers.map((item) => (
                <SelectionItem
                  key={item.id}
                  value={item.id}
                  label={item.label}
                  hasCheckbox={false}
                  hasTrailingIcon={false}
                  hasNested={false}
                  leadingIcon={composerIcon(item.id)}
                />
              ))}
            </SelectionList>
          }
        />
      </SelectionMenu>
      <p className="sr-only" aria-live="polite">
        {copied ? `${EMAIL_ADDRESS} copied to clipboard` : ''}
      </p>
    </div>
  );
}
