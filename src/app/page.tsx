import { HeroSection, HomeCanvas } from '@/components/sections';
import { parseTabId } from '@/content/site';

interface HomePageProps {
  searchParams: Promise<{
    tab?: string | string[];
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { tab } = await searchParams;

  return (
    <>
      <HeroSection />
      <HomeCanvas initialTab={parseTabId(tab)} />
    </>
  );
}
