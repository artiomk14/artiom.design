import Link from 'next/link';
import { Section } from '@/components/layout';
import { Heading, Text, Button } from '@/components/ui';

export default function NotFound() {
  return (
    <Section size="lg" className="flex min-h-[60vh] items-center">
      <div className="text-center">
        <Heading as="h1" size="display">
          404
        </Heading>
        <Text size="lg" muted className="mt-4">
          The page you&apos;re looking for doesn&apos;t exist.
        </Text>
        <div className="mt-8">
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
