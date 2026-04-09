import type { Metadata } from 'next';
import { Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { client, allWorkQuery } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects and case studies.',
};

interface WorkItem {
  _id: string;
  title: string;
  slug?: { current: string };
  category?: string;
}

async function getWork(): Promise<WorkItem[]> {
  try {
    const work = await client.fetch<WorkItem[]>(allWorkQuery);
    console.log('[Sanity] Fetched work items:', work?.length ?? 0);
    return work ?? [];
  } catch (error) {
    console.error('[Sanity] Error fetching work:', error);
    return [];
  }
}

export default async function WorkPage() {
  const work = await getWork();

  return (
    <Section size="lg">
      <FadeIn>
        <Heading as="h1" size="h1">
          Work
        </Heading>
        <Text size="lg" muted className="mt-6 max-w-2xl">
          Testing Sanity connection...
        </Text>

        {/* Connection Status */}
        <div className="mt-8 rounded-lg border border-border bg-background-muted p-4">
          <p className="text-sm font-medium">
            Sanity Connection: {work.length > 0 ? '✓ Connected' : '⚠ No documents found'}
          </p>
          <p className="mt-1 text-xs text-foreground-muted">
            Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          </p>
          <p className="text-xs text-foreground-muted">
            Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET}
          </p>
          <p className="text-xs text-foreground-muted">
            Documents fetched: {work.length}
          </p>
        </div>

        {/* Work List */}
        {work.length > 0 ? (
          <ul className="mt-8 space-y-4">
            {work.map((item) => (
              <li
                key={item._id}
                className="rounded-lg border border-border p-4"
              >
                <p className="font-medium">{item.title}</p>
                {item.slug?.current && (
                  <p className="text-sm text-foreground-muted">
                    Slug: {item.slug.current}
                  </p>
                )}
                {item.category && (
                  <p className="text-sm text-foreground-muted">
                    Category: {item.category}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center">
            <Text muted>
              No work documents found. Add some content in Sanity Studio.
            </Text>
          </div>
        )}
      </FadeIn>
    </Section>
  );
}
