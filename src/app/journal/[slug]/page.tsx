import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles } from '@/data/site';
import { Crumbs, JsonLd, ProductGrid, Mosaic } from '@/components/ui';

export const dynamicParams = false;
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articles.find(x => x.slug === params.slug); if (!a) return {};
  return { title: `${a.title} | Kizora Journal`, description: a.dek, alternates: { canonical: `/journal/${a.slug}/` } };
}

export default function Article({ params }: { params: { slug: string } }) {
  const a = articles.find(x => x.slug === params.slug); if (!a) notFound();
  return (
    <article className="pb-10 pt-8">
      <div className="wrap max-w-[760px]">
        <Crumbs items={[{ name: 'Journal', href: '/journal/' }, { name: a.title }]} />
        <p className="eyebrow mt-10">{a.date} · {a.read} read</p>
        <h1 className="mt-3 text-[40px] leading-tight md:text-[54px]">{a.title}</h1>
        <p className="lead mt-5">{a.dek}</p>
      </div>
      <div className="wrap mt-10 max-w-[1100px]"><Mosaic slugs={a.photos} priority /></div>
      <div className="wrap prose-k mt-12 max-w-[700px]">
        {a.body.map((b, i) => <div key={i}>{b.h && <h2>{b.h}</h2>}<p>{b.p}</p></div>)}
      </div>
      <section className="wrap mt-16 border-t border-line pt-12"><h2 className="mb-8 text-[28px]">Mentioned in this piece</h2><ProductGrid slugs={a.products} cols="md:grid-cols-3" /></section>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.dek, author: { '@type': 'Organization', name: 'Kizora Skincare' }, image: `https://kizoraskincare.com${a.image}` }} />
    </article>
  );
}
