export interface GemWalkthroughStep {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

/**
 * First Gems entry — Figma `wc26-walktrough` (156:1658).
 * Copy and frames from step-01 / step-02 / step-03.
 */
export const wc26Walkthrough = {
  id: 'wc26-walkthrough',
  label: 'WC26 hub walkthrough',
  steps: [
    {
      id: 'hub-loaded',
      title: 'Game on! Your hub is fully loaded',
      description:
        'We’ve added lineups, stats, livescore, and more to your hub - so you have everything in one place.',
      image: {
        src: '/gems/wc26-walkthrough/step-01.png',
        alt: 'World Cup trophy on a pitch with hub widgets for live, stats, and alerts',
        width: 848,
        height: 472,
      },
    },
    {
      id: 'in-play',
      title: 'in-play view is live',
      description:
        'Manage all of your live WC26 fixtures in real-time, including tips and insights for every match.',
      image: {
        src: '/gems/wc26-walkthrough/step-02.png',
        alt: 'TRADE Game Center in-play view with live match stats',
        width: 848,
        height: 472,
      },
    },
    {
      id: 'full-picture',
      title: 'Every fixture’s full picture',
      description:
        'One-click is what you need to get access to all the data that support your management and control.',
      image: {
        src: '/gems/wc26-walkthrough/step-03.png',
        alt: 'Mexico vs South Africa lineups view with pitch diagram and starting XI',
        width: 848,
        height: 472,
      },
    },
  ] satisfies GemWalkthroughStep[],
  complete: {
    title: 'Ready to go!',
    description: 'All ready for you to explore and complete tasks',
  },
} as const;

/**
 * Gems tab — first slot is the WC26 walkthrough; later slots stay empty
 * until the next pieces are ready.
 */
export const gems = {
  placeholders: [{ id: 'two' }, { id: 'three' }],
} as const;
