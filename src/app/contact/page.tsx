import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import { Confirm, Crumbs } from '@/components/ui';

export const metadata: Metadata = { title: 'Contact Kizora | WhatsApp, email and address', description: 'Questions about your skin or an order? WhatsApp is the fastest way to reach Kizora. Email and address inside.', alternates: { canonical: '/contact/' } };

export default function Contact() {
  return (
    <section className="wrap pb-10 pt-8">
      <Crumbs items={[{ name: 'Contact' }]} />
      <div className="grid gap-12 pt-10 md:grid-cols-2">
        <div>
          <h1 className="text-[46px] md:text-[60px]">Talk to us</h1>
          <p className="lead mt-5 max-w-md">Product guidance, order help, or a question about your skin. A person from our team will reply.</p>
          <a className="btn mt-8" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
        </div>
        <dl className="divide-y divide-line border-y border-line text-[16px]">
          {[['WhatsApp and phone', SITE.phone], ['Email', SITE.email], ['Office', SITE.address], ['Made at', 'Our partner unit near Kanha National Park, Madhya Pradesh'], ['Company', `Kizora Skincare, a brand of ${SITE.legal}`]].map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-4"><dt className="text-ink2">{k}</dt><dd className="min-w-0 break-words">{k === 'Company' ? <Confirm>{v}</Confirm> : v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
