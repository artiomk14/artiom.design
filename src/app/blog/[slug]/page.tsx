import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
    description: `Read about ${slug}.`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  return (
    <article>
      <Section size="lg">
        <FadeIn>
          <Heading as="h1" size="h1">
            {slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')}
          </Heading>
          <Text size="lg" muted className="mt-6 max-w-2xl">
            Blog post content will be fetched from Sanity CMS.
          </Text>
        </FadeIn>
      </Section>
    </article>
  );
}
