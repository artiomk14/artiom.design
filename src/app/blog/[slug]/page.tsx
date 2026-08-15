import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: slug,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  return null;
}
