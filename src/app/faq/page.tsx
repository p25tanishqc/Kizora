import type { Metadata } from 'next';
import Link from 'next/link';
import { faqs } from '@/data/site';
import { Crumbs, Faq, JsonLd } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Questions about Kizora | FAQ',
  description: 'Where Kizora is made, whether products are vegan, Ayurvedic or organic, delivery, payment and returns.',
  alternates: { canonical: '/faq/' },
};

export default function FaqPage() {
  return (
    <section className="wrap max-w-[900px] pb-10 pt-8">
      <Crumbs items={[{ name: 'FAQ' }]} />
      <h1 className="mb-4 mt-10 text-[46px] md:text-[60px]">Questions</h1>
      <p className="lead mb-10">Short, honest answers. If yours is not here, <Link href="/contact/" className="link">message us</Link>.</p>
      <Faq items={faqs} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
    </section>
  );
}
