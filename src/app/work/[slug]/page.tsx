import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: slug,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  return null;
}
