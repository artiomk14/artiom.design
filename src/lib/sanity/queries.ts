import { groq } from 'next-sanity';

// Work queries
export const allWorkQuery = groq`
  *[_type == "work"] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    category,
    client,
    year,
    featured,
    publishedAt
  }
`;

export const featuredWorkQuery = groq`
  *[_type == "work" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    category,
    client,
    year
  }
`;

export const workBySlugQuery = groq`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    coverImage,
    category,
    client,
    year,
    url,
    content,
    publishedAt
  }
`;

// Blog queries
export const allBlogQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    author->{
      name,
      image
    },
    tags,
    publishedAt,
    readingTime
  }
`;

export const blogBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    author->{
      name,
      image,
      bio,
      social
    },
    tags,
    content,
    publishedAt,
    readingTime
  }
`;

export const recentBlogQuery = groq`
  *[_type == "blog"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime
  }
`;

// Author queries
export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    bio,
    role,
    social
  }
`;

// Site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    ogImage,
    navigation,
    social,
    footer
  }
`;
