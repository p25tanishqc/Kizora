import type { Metadata } from 'next';
import Link from 'next/link';
import { Confirm, Crumbs } from '@/components/ui';

export const metadata: Metadata = { title: 'Returns, refunds and cancellations | Kizora', description: 'What to do if your Kizora order arrives damaged or wrong.', alternates: { canonical: '/returns/' } };

export default function Returns() {
  return (
    <section className="wrap max-w-[820px] pb-10 pt-8">
      <Crumbs items={[{ name: 'Returns' }]} />
      <h1 className="mt-10 text-[46px]">Returns, refunds and cancellations</h1>
      <div className="prose-k mt-8">
        <p>Skincare is personal and, once opened, cannot be resold. So we accept returns when something has gone wrong on our side: the product arrived damaged, leaked, or you received the wrong item.</p>
        <h2>What to do</h2>
        <p><Confirm>Message us on WhatsApp with your order number and a photo of the product and its packaging, within the time stated in our full policy. We will replace it or refund you.</Confirm></p>
        <h2>Cancellations</h2>
        <p><Confirm>You can cancel an order before it is dispatched by messaging us.</Confirm></p>
        <p className="text-[15px] text-ink2">This is a plain-language summary for the prototype. The full policy needs a legal review before launch, and the drafting note currently visible on the live policy page must be removed. <Link href="/contact/" className="link">Contact us</Link>.</p>
      </div>
    </section>
  );
}
