import { Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';

export default function HomePage() {
  return (
    <>
      <Section size="lg" className="flex min-h-[80vh] items-center">
        <FadeIn>
          <Heading as="h1" size="display" className="max-w-4xl">
            Design &amp; Development
          </Heading>
          <Text size="xl" muted className="mt-6 max-w-2xl">
            Creating thoughtful digital experiences through design and code.
          </Text>
        </FadeIn>
      </Section>
    </>
  );
}
