import type { Metadata } from 'next';
import Link from 'next/link';
import { Confirm, Crumbs, Mosaic } from '@/components/ui';

export const metadata: Metadata = {
  title: "How it's made | Small-batch skincare near Kanha | Kizora",
  description: 'Small batches, few machines, sun-dried moringa seed and natural soaps cured for 21 to 28 days, at a village unit near Kanha National Park.',
  alternates: { canonical: '/how-its-made/' },
};

const STEPS = [
  ['Grown and gathered', 'Plants are grown without chemical fertilisers, according to our partner, and sourced from the area around the unit where possible.', true],
  ['Made by hand, in small batches', 'Wooden and stone tools and very few machines. Batches are small so they can be checked by hand.', false],
  ['Oils pressed slowly', 'Oils are extracted slowly. For our moringa oil, the seeds are dried in the sun first.', false],
  ['Soaps left to cure', 'Our natural soaps rest for 21 to 28 days before they are wrapped, so they harden and last longer.', false],
  ['Checked and packed at source', 'Our partner leads quality control and documentation at the unit before products travel to you.', true],
] as const;

export default function HowItsMade() {
  return (
    <>
      <section className="wrap pt-8"><Crumbs items={[{ name: "How it's made" }]} />
        <div className="max-w-3xl pb-14 pt-10"><p className="eyebrow">Process</p><h1 className="mt-3 text-[48px] md:text-[66px]">Slow is the point.</h1>
          <p className="lead mt-6">Everything we sell is made at one small unit near Kanha National Park in Madhya Pradesh, run by our founder&apos;s partner, who is trained in botany, together with people from nearby villages.</p></div>
      </section>
      <div className="wrap"><Mosaic slugs={['kuppaimeni-soap', 'hibiscus-rose-soap', 'tomato-extract-soap']} /></div>
      <section className="wrap max-w-[900px] py-16">
        <ol className="divide-y divide-line border-y border-line">
          {STEPS.map(([h, t, c], k) => (
            <li key={h} className="grid gap-3 py-8 md:grid-cols-[90px_1fr]">
              <span className="font-serif text-[46px] italic leading-none text-gold">{String(k + 1).padStart(2, '0')}</span>
              <div><h2 className="text-[26px]">{h}</h2><p className="mt-2 text-[17px] text-ink2">{c ? <Confirm>{t}</Confirm> : t}</p></div>
            </li>
          ))}
        </ol>
        <p className="mt-10 rounded-[3px] bg-paper p-6 text-[15px] text-ink2">Our products are not sold as Ayurvedic or certified organic today. Our Ayurvedic certification is in process.</p>
        <div className="mt-10 flex flex-wrap gap-3"><Link href="/journal/why-our-soaps-take-a-month/" className="btn">Why our soaps take a month</Link><Link href="/collections/bath-body/" className="btn-ghost">Shop soaps</Link></div>
      </section>
    </>
  );
}
