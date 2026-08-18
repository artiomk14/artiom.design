import type { Metadata } from 'next';
import { site } from '@/content/site';

export const noIndexRobots = {
  index: false,
  follow: false,
} as const;

export function siteMetadata(): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: site.titleTemplate,
    },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: site.locale,
      url: '/',
      siteName: site.name,
      title: site.title,
      description: site.description,
    },
    twitter: {
      card: 'summary',
      creator: site.twitterHandle,
      title: site.title,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function legacyPageMetadata(title: string): Metadata {
  return {
    title,
    robots: noIndexRobots,
  };
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { '@id': `${site.url}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      url: site.url,
      jobTitle: site.role,
      email: `mailto:${site.links.email}`,
      image: `${site.url}/brand/portrait.png`,
      sameAs: [site.links.twitter, site.links.linkedin],
    },
  ],
} as const;
