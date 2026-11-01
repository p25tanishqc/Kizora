import type { Metadata } from 'next';
import { RitualView } from '@/components/ritual-view';

export const metadata: Metadata = {
  title: 'Morning skincare ritual in 3 steps | Kizora',
  description: 'Mist, hydrate, lips: a three-minute morning ritual with Rose Hydrating Mist and Pure Aloe Vera Gel. The Morning Ritual Kit is ₹950.',
  alternates: { canonical: '/rituals/morning/' },
};
export default function Page() { return <RitualView which="morning" />; }
