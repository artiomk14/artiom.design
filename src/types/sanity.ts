import type { PortableTextBlock } from 'next-sanity';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityWork {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  coverImage?: SanityImage;
  category?: 'web-design' | 'ui-ux' | 'branding' | 'development' | 'other';
  client?: string;
  year?: string;
  url?: string;
  content?: PortableTextBlock[];
  featured?: boolean;
  order?: number;
  publishedAt?: string;
}

export interface SanityAuthor {
  _id: string;
  name: string;
  slug?: SanitySlug;
  image?: SanityImage;
  bio?: string;
  role?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface SanityBlog {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  coverImage?: SanityImage;
  author?: SanityAuthor;
  tags?: string[];
  content?: PortableTextBlock[];
  publishedAt: string;
  readingTime?: number;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  title: string;
  description?: string;
  logo?: SanityImage;
  ogImage?: SanityImage;
  navigation?: NavigationItem[];
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
    instagram?: string;
    email?: string;
  };
  footer?: string;
}
