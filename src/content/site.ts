/**
 * Site identity, homepage tabs, and SEO copy.
 * Edit these values — they power the top bar, homepage, and metadata.
 */

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://artiom.design'
).replace(/\/$/, '');

export const DEFAULT_TAB_ID = 'gems' as const;

export const site = {
  name: 'Artiom Kotlovski',
  role: 'Product designer',
  title: 'Artiom Kotlovski — Product designer',
  titleTemplate: '%s · Artiom Kotlovski',
  description:
    'Product designer. Gems, heavier case studies, writing, and a bit about me.',
  url: siteUrl,
  locale: 'en_US',
  twitterHandle: '@artiomkot14',
  links: {
    twitter: 'https://x.com/artiomkot14',
    linkedin: 'https://www.linkedin.com/in/artiom-kotlovski-437640270',
    email: 'artiomkot14@gmail.com',
  },
  tabs: [
    {
      id: DEFAULT_TAB_ID,
      label: 'Gems',
      description: 'Smaller interactions, components, and concepts.',
    },
    {
      id: 'heavy-ones',
      label: 'Heavy Ones',
      description: 'Larger case studies and more complex work.',
    },
    {
      id: 'yapping',
      label: 'Yapping',
      description: 'Thoughts, perspective, and experience.',
    },
    {
      id: 'who-me',
      label: 'Who me',
      description: 'A bit of background.',
    },
  ],
} as const;

export type TabId = (typeof site.tabs)[number]['id'];

const tabIds = new Set<string>(site.tabs.map((tab) => tab.id));

export function isTabId(value: string): value is TabId {
  return tabIds.has(value);
}

export function parseTabId(value: string | string[] | undefined): TabId {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && isTabId(raw)) {
    return raw;
  }
  return DEFAULT_TAB_ID;
}

export function tabById(id: TabId) {
  const tab = site.tabs.find((item) => item.id === id);
  return tab ?? site.tabs[0];
}
