import type { ReactNode } from 'react';
import { GemIcon } from '@/components/icons/GemIcon';
import { HeavyOnesIcon } from '@/components/icons/HeavyOnesIcon';
import { WhoMeIcon } from '@/components/icons/WhoMeIcon';
import { YappingIcon } from '@/components/icons/YappingIcon';
import type { TabId } from '@/content/site';

interface TabLeadingIconProps {
  tabId: TabId;
  className?: string;
}

const tabIcons: Record<TabId, (className?: string) => ReactNode> = {
  gems: (className) => <GemIcon className={className} />,
  'heavy-ones': (className) => <HeavyOnesIcon className={className} />,
  yapping: (className) => <YappingIcon className={className} />,
  'who-me': (className) => <WhoMeIcon className={className} />,
};

/**
 * Instance-swap map for homepage pills — diamond, briefcase, pencil, user.
 */
export function TabLeadingIcon({ tabId, className }: TabLeadingIconProps) {
  return tabIcons[tabId](className);
}
