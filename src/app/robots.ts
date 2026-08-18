import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/lab', '/work', '/about', '/blog', '/contact'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
