import type { Metadata } from 'next';
import { Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Artiom and their work in design and development.',
};

export default function AboutPage() {
  return (
    <Section size="lg">
      <FadeIn>
        <Heading as="h1" size="h1">
          About
        </Heading>
        <Text size="lg" muted className="mt-6 max-w-2xl">
          This page will contain information about the designer/developer.
        </Text>
      </FadeIn>
    </Section>
  );
}
