import type { Metadata } from 'next';
import { Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for collaborations and inquiries.',
};

export default function ContactPage() {
  return (
    <Section size="lg">
      <FadeIn>
        <Heading as="h1" size="h1">
          Contact
        </Heading>
        <Text size="lg" muted className="mt-6 max-w-2xl">
          Contact form and information will be displayed here.
        </Text>
      </FadeIn>
    </Section>
  );
}
