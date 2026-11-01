import type { Metadata } from 'next';
import { Confirm, Crumbs } from '@/components/ui';

export const metadata: Metadata = { title: 'Shipping and delivery | Kizora', description: 'Free delivery on Kizora orders above ₹799, and how delivery works for smaller orders.', alternates: { canonical: '/shipping/' } };

export default function Shipping() {
  return (
    <section className="wrap max-w-[820px] pb-10 pt-8">
      <Crumbs items={[{ name: 'Shipping' }]} />
      <h1 className="mt-10 text-[46px]">Shipping and delivery</h1>
      <p className="lead mt-4">One rule, the same everywhere on this site.</p>
      <dl className="mt-10 divide-y divide-line border-y border-line">
        {[['Free delivery', <Confirm key="f">On orders above ₹799. Every ritual kit qualifies.</Confirm>], ['Smaller orders', 'Delivery charges are shown at checkout.'], ['Questions', 'Message us on WhatsApp on +91 96259 05995.']].map(([k, v], i) => (
          <div key={i} className="grid gap-2 py-5 md:grid-cols-[180px_1fr]"><dt className="font-medium">{k}</dt><dd className="text-ink2">{v}</dd></div>
        ))}
      </dl>
    </section>
  );
}
