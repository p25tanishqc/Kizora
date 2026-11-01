import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ingredients, ingredientBySlug } from '@/data/ingredients';
import { img } from '@/data/products';
import { Crumbs, Faq, JsonLd, ProductGrid } from '@/components/ui';

export const dynamicParams = false;
export function generateStaticParams() { return ingredients.map(i => ({ slug: i.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const i = ingredientBySlug(params.slug); if (!i) return {};
  return { title: `${i.name} for skin: what it is and how we use it | Kizora`, description: `${i.what} What the evidence says, who should be careful, and which Kizora products contain it.`.slice(0, 158), alternates: { canonical: `/ingredients/${i.slug}/` } };
}

export default function IngredientPage({ params }: { params: { slug: string } }) {
  const i = ingredientBySlug(params.slug); if (!i) notFound();
  const idx = ingredients.findIndex(x => x.slug === i.slug); const next = ingredients[(idx + 1) % ingredients.length];
  const blocks: [string, string][] = [['Traditional use', i.tradition], ['What the evidence says', i.evidence], ['How it works on skin', i.how], ['Who should be careful', i.limits]];
  const qa = [
    { q: `Which Kizora products contain ${i.name.toLowerCase()}?`, a: `${i.products.length} product${i.products.length > 1 ? 's' : ''}; they are listed below this page.` },
    { q: `Is ${i.name.toLowerCase()} good for ${i.concerns.split(/[.;]/)[0].toLowerCase()}?`, a: `${i.how} ${i.limits}` },
  ];
  return (
    <>
      <div className="wrap pt-6"><Crumbs items={[{ name: 'Ingredient library', href: '/ingredients/' }, { name: i.name }]} /></div>
      <section className="wrap grid gap-10 pb-10 pt-8 md:grid-cols-2 md:items-center md:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-paper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(i.products[0], 'detail')} alt={`Kizora product made with ${i.name}`} className="h-full w-full object-cover" />
          <span className="needs-approval absolute bottom-3 left-3 rounded-sm bg-cream/85 px-2 py-1 text-[11.5px] text-ink2" title="Replace with a real photo of the raw ingredient at the unit">Product photo; raw-ingredient photo to come</span>
        </div>
        <div>
          <p className="eyebrow">{i.group}</p>
          <h1 className="mt-2 text-[48px] md:text-[60px]">{i.name}</h1>
          <p className="mt-1 italic text-sage-deep">{[i.localName, i.inci].filter(Boolean).join(' · ')}</p>
          <p className="lead mt-5">{i.what}</p>
          <p className="mt-5 text-[15px]"><span className="text-ink2">Suits:</span> {i.concerns}</p>
        </div>
      </section>
      <section className="wrap grid gap-12 py-10 lg:grid-cols-[2fr_1fr]">
        <div className="divide-y divide-line border-y border-line">
          {blocks.map(([h, t]) => (
            <div key={h} className="grid gap-2 py-7 md:grid-cols-[200px_1fr] md:gap-8">
              <h2 className="font-sans text-[12.5px] font-medium uppercase tracking-eyebrow text-sage-deep">{h}</h2>
              <p className="text-[17px] leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
        <aside className="space-y-4 self-start rounded-[3px] bg-paper p-7 text-[15px]">
          <p className="eyebrow">At a glance</p>
          <p><b className="font-medium">INCI:</b> {i.inci}</p>
          <p><b className="font-medium">Found in:</b> {i.products.length} Kizora product{i.products.length > 1 ? 's' : ''}</p>
          {i.source ? <p><b className="font-medium">Source:</b> <a href={i.source.url} target="_blank" rel="noopener noreferrer" className="link">{i.source.title || 'Reference'}</a></p>
            : <p className="text-ink2">No single review cited. INCI and specification to be confirmed with our supplier.</p>}
          <p className="border-t border-line pt-4 text-[13.5px] text-ink2">We keep tradition and evidence apart, and we say what an ingredient cannot do. This is not medical advice.</p>
        </aside>
      </section>
      <section className="wrap max-w-[900px] py-8"><h2 className="mb-5 text-[28px]">Common questions</h2><Faq items={qa} /></section>
      <section className="wrap py-14">
        <h2 className="mb-8 text-[30px]">Kizora products with {i.name.toLowerCase()}</h2>
        <ProductGrid slugs={i.products} />
        <p className="mt-14 text-right"><Link href={`/ingredients/${next.slug}/`} className="link">Next ingredient: {next.name} →</Link></p>
      </section>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa.map(x => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })) }} />
    </>
  );
}
