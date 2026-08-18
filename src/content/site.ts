/**
 * Site identity, contact links, and in-repo page copy.
 * Edit these values — they power the top bar and home hero.
 */
export const site = {
  name: 'Artiom Kotlovski',
  links: {
    /** X / Twitter profile. Leave empty until the URL is set. */
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
} as const;
