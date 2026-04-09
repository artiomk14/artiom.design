import type { Metadata } from 'next';
import { Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on design, development, and creative work.',
};

export default function BlogPage() {
  return (
    <Section size="lg">
      <FadeIn>
        <Heading as="h1" size="h1">
          Blog
        </Heading>
        <Text size="lg" muted className="mt-6 max-w-2xl">
          Articles and thoughts will be displayed here.
        </Text>
      </FadeIn>
    </Section>
  );
}
