import { site } from './site';

export const EMAIL_ADDRESS = site.links.email;

export const mailComposers = [
  {
    id: 'gmail',
    label: 'Gmail',
    href: (email: string) =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
  },
  {
    id: 'outlook',
    label: 'Outlook',
    href: (email: string) =>
      `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}`,
  },
  {
    id: 'notion-mail',
    label: 'Notion Mail',
    href: (email: string) =>
      `https://mail.notion.so/?to=${encodeURIComponent(email)}`,
  },
  {
    id: 'superhuman',
    label: 'Superhuman',
    href: (email: string) =>
      `https://mail.superhuman.com/?to=${encodeURIComponent(email)}`,
  },
] as const;

export type MailComposerId = (typeof mailComposers)[number]['id'];

export function mailComposerHref(id: string, email: string): string | undefined {
  return mailComposers.find((item) => item.id === id)?.href(email);
}
