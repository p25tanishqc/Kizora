import type { Metadata } from 'next';
import { Confirm, Crumbs } from '@/components/ui';

export const metadata: Metadata = { title: 'Shipping and delivery | Kizora', description: 'Dispatch times, free delivery threshold and payment options for Kizora orders across India.', alternates: { canonical: '/shipping/' } };

export default function Shipping() {
  return (
    <section className="wrap max-w-[820px] pb-10 pt-8">
      <Crumbs items={[{ name: 'Shipping' }]} />
      <h1 className="mt-10 text-[46px]">Shipping and delivery</h1>
      <p className="lead mt-4">One promise, the same everywhere on this site.</p>
      <dl className="mt-10 divide-y divide-line border-y border-line">
        {[['Dispatch', <Confirm key="d">1 to 3 working days, from Madhya Pradesh</Confirm>], ['Free delivery', <Confirm key="f">On orders above ₹799. Every ritual kit qualifies.</Confirm>], ['Below ₹799', <Confirm key="b">A flat delivery fee, shown in the cart before you pay</Confirm>], ['Payment', 'UPI, cards, net banking, cash on delivery'], ['Where', 'Across India']].map(([k, v], i) => (
          <div key={i} className="grid gap-2 py-5 md:grid-cols-[180px_1fr]"><dt className="font-medium">{k}</dt><dd className="text-ink2">{v}</dd></div>
        ))}
      </dl>
      <p className="approval-list mt-8 rounded-[3px] border border-dashed border-[#B6462F] bg-[#FCEFC7]/60 p-4 text-[14px]">The live site says &quot;Ships in 2-3 days&quot; on product pages and &quot;1-5 business days&quot; in the policy, and a ₹325 cart showed free delivery. The founder needs to choose one rule; the full legal policy text will replace this summary.</p>
    </section>
  );
}
