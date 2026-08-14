import type { Metadata } from 'next';
import { Section } from '@/components/layout';
import { Card, Heading, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects and case studies.',
};

export default function WorkPage() {
  return (
    <Section size="lg">
      <FadeIn>
        <Heading as="h1" size="h1">
          Work
        </Heading>
        <Text size="lg" muted className="mt-6 max-w-2xl">
          Selected projects and case studies will be displayed here.
        </Text>

        <Card className="mt-8 border-dashed p-8 text-center">
          <Text muted>
            Case studies coming soon — content will live in the repo.
          </Text>
        </Card>
      </FadeIn>
    </Section>
  );
}
