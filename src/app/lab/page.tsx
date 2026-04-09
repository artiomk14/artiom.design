import type { Metadata } from 'next';
import { Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Experiments, prototypes, and creative explorations.',
};

export default function LabPage() {
  return (
    <Section size="lg">
      <FadeIn>
        <Heading as="h1" size="h1">
          Lab
        </Heading>
        <Text size="lg" muted className="mt-6 max-w-2xl">
          Experiments and creative explorations will be showcased here.
        </Text>
      </FadeIn>
    </Section>
  );
}
