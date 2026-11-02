import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { collections, collectionBySlug } from '@/data/collections';
import { allItems, bySlug, img, inr } from '@/data/products';
import { Crumbs, JsonLd, Mosaic, ProductGrid } from '@/components/ui';

export const dynamicParams = false;
export function generateStaticParams() { return collections.map(c => ({ slug: c.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = collectionBySlug(params.slug); if (!c) return {};
  return { title: c.title, description: c.description, alternates: { canonical: `/collections/${c.slug}/` }, openGraph: { images: [img(allItems.find(p => p.collections.includes(c.slug))?.slug ?? 'pure-aloe-vera-gel')] } };
}

const GELS = ['pure-aloe-vera-gel', 'aloe-vera-gel-with-vitamin-e', 'aloe-vera-gel-with-rose-oil'];
// Built from the shared product data, so sizes and prices always match the product pages.
const gelTable = () => {
  const g = GELS.map(s => bySlug(s)!);
  return [
    ['Best for', 'Everyday hydration, all skin types', 'Skin that feels a little drier', 'If you like a soft rose scent'],
    ["What's in it", '99% aloe leaf gel + preservative', '+ vitamin E', '+ rose essential oil'],
    ['Size · price', ...g.map(p => `${p.size} · ${inr(p.price)}`)],
    ['Use', ...g.map(p => p.when)],
  ];
};

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const c = collectionBySlug(params.slug); if (!c) notFound();
  const items = allItems.filter(p => p.collections.includes(c.slug));
  return (
    <>
      <section className={`${c.tone} border-b border-line`}>
        <div className="wrap grid items-center gap-8 pb-0 pt-8 md:grid-cols-[1fr_1.25fr] md:pb-0">
          <div className="pb-6 md:pb-14">
            <Crumbs items={[{ name: 'Shop', href: '/shop/' }, { name: c.name }]} />
            <p className="eyebrow mt-8">{items.length} {items.length === 1 ? 'product' : 'products'}</p>
            <h1 className="mt-3 text-[46px] md:text-[60px]">{c.name}</h1>
            <p className="lead mt-5 max-w-md">{c.intro}</p>
          </div>
          {c.hero
            ? /* eslint-disable-next-line @next/next/no-img-element */
              <img src={c.hero} alt={`${c.name}: aloe vera leaves`} width={1800} height={1500} fetchPriority="high" className="mb-8 h-auto w-full rounded-[3px] md:my-10" />
            : <Mosaic slugs={items.filter(p => p.kind === 'product').slice(0, 3).map(p => p.slug).concat(items.some(p => p.kind === 'product') ? [] : items.slice(0, 1).map(p => p.slug)).slice(0, 3)} priority className="mb-8 overflow-hidden rounded-[3px] md:my-10" />}
        </div>
      </section>
      <section className="wrap py-14">
        <ProductGrid slugs={items.map(p => p.slug)} cols="md:grid-cols-3" />
        {c.slug === 'face-gels' && (
          <div className="mt-20">
            <h2 className="text-[30px]">Which aloe gel is for you?</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse bg-paper text-left text-[14.5px]">
                <thead><tr className="bg-[#F1EADD] text-[12px] uppercase tracking-[0.12em] text-sage-deep">
                  <th className="p-3.5" /><th className="p-3.5"><Link href="/products/pure-aloe-vera-gel/" className="link">Pure Aloe Vera Gel</Link></th>
                  <th className="p-3.5"><Link href="/products/aloe-vera-gel-with-vitamin-e/" className="link">With Vitamin E</Link></th><th className="p-3.5"><Link href="/products/aloe-vera-gel-with-rose-oil/" className="link">With Rose Oil</Link></th></tr></thead>
                <tbody>{gelTable().map(r => <tr key={r[0]} className="border-t border-line">{r.map((cell, i) => <td key={i} className={`p-3.5 align-top ${i === 0 ? 'font-medium' : ''}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-6 rounded-[3px] bg-butter/50 p-5 text-[15px]">Pair any gel with Rose Hydrating Mist for the <Link href="/products/morning-ritual-kit/" className="link">Morning Ritual Kit ({inr(bySlug('morning-ritual-kit')!.price)})</Link>. Looking for lips or heels? See <Link href="/collections/lip-care/" className="link">Lip care</Link> and <Link href="/collections/hands-feet/" className="link">Hands &amp; feet</Link>.</p>
          </div>
        )}
      </section>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.name, description: c.description, mainEntity: { '@type': 'ItemList', itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://kizoraskincare.com/products/${p.slug}/`, name: p.name })) } }} />
    </>
  );
}
