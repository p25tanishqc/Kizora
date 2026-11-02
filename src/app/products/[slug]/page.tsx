import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allItems, bySlug, img, inr, photos } from '@/data/products';
import { collectionBySlug } from '@/data/collections';
import { ingredientBySlug } from '@/data/ingredients';
import { Confirm, Crumbs, Faq, JsonLd, ProductGrid } from '@/components/ui';
import { BuyBox, Gallery } from '@/components/product-bits';

export const dynamicParams = false;
export function generateStaticParams() { return allItems.map(p => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = bySlug(params.slug); if (!p) return {};
  const title = `${p.name}${p.kind === 'product' && p.size ? `, ${p.size}` : ''} | Kizora`;
  const description = `${p.oneLine} ${p.forWhom}. ${inr(p.price)}.`.slice(0, 158);
  return { title, description, alternates: { canonical: `/products/${p.slug}/` }, openGraph: { title, description, images: [img(p.slug)] } };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = bySlug(params.slug); if (!p) notFound();
  const col = collectionBySlug(p.collections[0]);
  const isKit = p.kind === 'kit';
  const images = isKit
    ? p.components!.map(s => ({ src: img(s), alt: bySlug(s)!.name, label: bySlug(s)!.name }))
    : photos(p.slug).map((src, i) => ({ src, alt: i === 0 ? p.name : `${p.name}, photo ${i + 1}`, label: `Photo ${i + 1}` }));
  const ings = p.ingredientSlugs.map(ingredientBySlug).filter(Boolean);
  return (
    <>
      <div className="wrap pt-6"><Crumbs items={[{ name: col?.name ?? 'Shop', href: col ? `/collections/${col.slug}/` : '/shop/' }, { name: p.name }]} /></div>
      <section className="wrap grid gap-10 pb-16 pt-6 md:grid-cols-[1.05fr_1fr] md:gap-14 lg:gap-20">
        <div className="md:sticky md:top-28 md:self-start"><Gallery images={images} /></div>
        <div>
          <p className="eyebrow">{isKit ? 'Ritual kit' : col?.name}{p.ritual && ` · ${p.ritual.map(r => r[0].toUpperCase() + r.slice(1)).join(' & ')} ritual`}</p>
          <h1 className="mt-3 text-[38px] leading-tight md:text-[48px]">{p.name}</h1>
          <p className="mt-2 text-[15px] text-ink2">{p.size ? `${p.size} · ` : ''}<a href="#reviews" className="underline decoration-line underline-offset-4">No reviews yet</a></p>
          <p className="mt-5 font-serif text-[30px]">{inr(p.price)} <span className="font-sans text-[13px] text-ink2">incl. of all taxes{isKit && <> · {p.components!.length} products at their listed prices</>}</span></p>
          <p className="mt-5 text-[17px] leading-relaxed">{p.oneLine}</p>

          <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-line bg-line text-[14.5px]">
            {[['For', p.forWhom], ['When', p.when], ['Key ingredients', p.keyIngredients.join(', ')], ['Made', 'Small batch, near Kanha, MP']].map(([k, v]) => (
              <div key={k} className="bg-paper p-4"><dt className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-sage-deep">{k}</dt><dd className="mt-1">{v}</dd></div>
            ))}
          </dl>
          {p.contains && <p className="mt-4 rounded-[3px] bg-blush/50 px-4 py-3 text-[14px]"><b className="font-medium">Contains:</b> {p.contains.replace('Contains ', '')}</p>}

          <div className="mt-7"><BuyBox slug={p.slug} price={p.price} name={p.name} /></div>
          <p className="mt-5 text-[13.5px] text-ink2">✓ <Confirm>Free delivery on orders above ₹799</Confirm>{p.price < 799 && <> · <Link href="/collections/sets-hampers/" className="underline">kits qualify</Link></>}</p>

          <div className="mt-9 border-t border-line">
            <details open className="border-b border-line py-5">
              <summary className="flex justify-between font-serif text-[20px]">About this {isKit ? 'kit' : 'product'}<span className="chev transition-transform">+</span></summary>
              <div className="mt-3 space-y-3 text-ink/90">{p.description.map((d, i) => <p key={i}>{d}</p>)}</div>
            </details>
            <details open className="border-b border-line py-5">
              <summary className="flex justify-between font-serif text-[20px]">How to use<span className="chev transition-transform">+</span></summary>
              <p className="mt-3 text-ink/90">{p.howToUse}</p>
            </details>
            {isKit ? (
              <details open className="border-b border-line py-5">
                <summary className="flex justify-between font-serif text-[20px]">What&apos;s in the kit<span className="chev transition-transform">+</span></summary>
                <ul className="mt-3 divide-y divide-line">{p.components!.map(s => { const c = bySlug(s)!; return (
                  <li key={s} className="flex items-center gap-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(s, 'card')} alt="" className="h-16 w-14 rounded-sm object-cover" loading="lazy" />
                    <Link href={`/products/${s}/`} className="flex-1 hover:underline">{c.name} <span className="text-[13px] text-ink2">· {c.size}</span></Link><span>{inr(c.price)}</span>
                  </li>); })}</ul>
              </details>
            ) : (
              <details className="border-b border-line py-5">
                <summary className="flex justify-between font-serif text-[20px]">{p.ingredientsComplete === false ? 'Key ingredients' : 'Ingredients'}<span className="chev transition-transform">+</span></summary>
                <p className="mt-3 text-[15px] text-ink/90">{p.fullIngredients}</p>
                {ings.length > 0 && <p className="mt-3 text-[14px] text-ink2">Learn more: {ings.map((g, i) => <span key={g!.slug}>{i > 0 && ', '}<Link href={`/ingredients/${g!.slug}/`} className="link">{g!.name}</Link></span>)}</p>}
              </details>
            )}
            <details className="border-b border-line py-5">
              <summary className="flex justify-between font-serif text-[20px]">How it&apos;s made<span className="chev transition-transform">+</span></summary>
              <p className="mt-3 text-ink/90">Made in small batches at our partner&apos;s unit near Kanha National Park, Madhya Pradesh, with few machines. <Link href="/how-its-made/" className="link">Read more</Link>.</p>
            </details>
          </div>
        </div>
      </section>

      {p.faqs.length > 0 && (
        <section className="wrap max-w-[900px] py-10"><h2 className="mb-6 text-[30px]">Questions</h2><Faq items={p.faqs} /></section>
      )}

      {p.useWith.length > 0 && (
        <section className="wrap py-14"><h2 className="mb-8 text-[30px]">Use with</h2><ProductGrid slugs={p.useWith.slice(0, 4)} /></section>
      )}

      <section id="reviews" className="wrap py-10">
        <div className="rounded-[3px] border border-line bg-paper p-8 md:p-10">
          <h2 className="text-[28px]">Reviews</h2>
          <p className="mt-2 max-w-2xl text-ink2">No reviews yet. Questions before choosing? <a href="https://wa.me/919625905995" target="_blank" rel="noopener noreferrer" className="link">Speak with our team on WhatsApp</a>.</p>
        </div>
      </section>

      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.sku ?? p.slug, image: images.map(i => `https://kizoraskincare.com${i.src}`),
        description: [p.oneLine, ...p.description].join(' '), brand: { '@type': 'Brand', name: 'Kizora Skincare' },
        offers: { '@type': 'Offer', price: p.price, priceCurrency: 'INR', url: `https://kizoraskincare.com/products/${p.slug}/` },
      }} />
    </>
  );
}
