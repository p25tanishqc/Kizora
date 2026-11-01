import type { Metadata } from 'next';
import { RitualView } from '@/components/ritual-view';

export const metadata: Metadata = {
  title: 'Evening skincare ritual for dry skin | Kizora',
  description: 'Cleanse, mist, nourish with moringa oil, then lips and heels. A slow evening ritual with real Kizora products.',
  alternates: { canonical: '/rituals/evening/' },
};
export default function Page() { return <RitualView which="evening" />; }
