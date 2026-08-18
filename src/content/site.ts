/**
 * Site identity, homepage tabs, hero copy, and SEO.
 * Edit these values — they power the top bar, home hero, tabs, and metadata.
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
  hero: {
    greeting: 'Hello,',
    intro:
      'I’m a designer dedicated of solving complexity, adopting modern UI, and interface interactions.',
    rolePrefix: 'Currently the product designer of',
    roleSuffix: 'B2B trading platform.',
    portrait: {
      src: '/images/hero/portrait.png',
      alt: 'Portrait of Artiom Kotlovski',
    },
    company: {
      name: 'LSports',
    },
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
