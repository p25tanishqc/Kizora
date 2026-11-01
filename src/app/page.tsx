import Link from 'next/link';
import type { Metadata } from 'next';
import { bySlug, inr } from '@/data/products';
import { ingredients } from '@/data/ingredients';
import { articles, rituals } from '@/data/site';
import { Confirm, ProductGrid, SectionHead } from '@/components/ui';
import { Newsletter } from '@/components/newsletter';

export const metadata: Metadata = {
  title: 'Kizora Skincare | Slow-made skincare from near Kanha, MP',
  description: 'Small-batch aloe gels, face mists, oils and natural soaps made near Kanha, Madhya Pradesh. Simple morning and evening rituals with full ingredient lists.',
  alternates: { canonical: '/' },
};

const STEPS = [
  { name: 'Face gels', href: '/collections/face-gels/', img: '/images/products/pure-aloe-vera-gel/card.webp', line: '3 aloe gels' },
  { name: 'Face mists', href: '/collections/face-mists/', img: '/images/products/rose-hydrating-mist/card.webp', line: 'Rose, tea tree, eucalyptus' },
  { name: 'Oils', href: '/collections/oils/', img: '/images/products/cold-pressed-moringa-oil/card.webp', line: 'Moringa for face, two for hair' },
  { name: 'Soaps & bath', href: '/collections/bath-body/', img: '/images/products/kuppaimeni-soap/card.webp', line: 'Cured 21 to 28 days' },
  { name: 'Lip care', href: '/collections/lip-care/', img: '/images/products/licorice-cocoa-ghee-lip-balm/card.webp', line: 'Two ghee balms' },
  { name: 'Hands & feet', href: '/collections/hands-feet/', img: '/images/products/avocado-olive-ghee-foot-butter/card.webp', line: 'Ghee foot butter' },
];

export default function Home() {
  const mk = bySlug('morning-ritual-kit')!, ek = bySlug('evening-ritual-kit')!, ws = bySlug('winter-night-care-set')!;
  const featuredIng = ['aloe-vera', 'rose', 'moringa', 'turmeric', 'desi-cow-ghee', 'kuppaimeni', 'tea-tree', 'shea-butter'].map(s => ingredients.find(i => i.slug === s)!);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#EFE8DC]">
        <div className="relative flex flex-col md:block md:aspect-[2200/1100] md:max-h-[760px] md:w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/hero.webp" alt="Kizora Kuppaimeni soap, Pure Aloe Vera Gel, Rose Hydrating Mist, moringa oil and ghee foot butter on a warm stone surface"
            className="order-2 h-[300px] w-full object-cover object-[86%_70%] md:absolute md:inset-0 md:h-full md:object-[70%_72%]" fetchPriority="high" width={2200} height={1300} />
          <div className="wrap relative z-10 order-1 pb-10 pt-10 md:flex md:h-full md:items-center md:py-0">
            <div className="max-w-[520px]">
              <p className="eyebrow">Small batch · Made near Kanha, Madhya Pradesh</p>
              <h1 className="mt-5 text-[42px] leading-[1.05] md:text-[66px]">Slow-made care for everyday rituals.</h1>
              <p className="lead mt-6 max-w-[440px]">Aloe gels, face mists, oils and natural soaps, made in small batches by our team near Kanha. Each one does one clear job in your morning or evening.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/rituals/morning/" className="btn">Shop the morning ritual</Link>
                <Link href="/rituals/evening/" className="btn-ghost">The evening ritual</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section aria-label="Why Kizora" className="border-y border-line bg-butter/60">
        <ul className="wrap grid grid-cols-2 gap-y-3 py-5 text-[13.5px] md:flex md:justify-between md:text-[14px]">
          <li>✦ Soaps cured 21 to 28 days</li>
          <li>✦ Full ingredient lists</li>
          <li>✦ Made near Kanha, MP</li>
          <li>✦ <Confirm>Free delivery above ₹799</Confirm></li>
        </ul>
      </section>

      {/* RITUALS */}
      <section className="wrap py-20 md:py-28">
        <SectionHead eyebrow="Not routines. Rituals." title="A ritual is a few steps you actually keep doing.">
          Ours are short. Light in the morning, slower at night, and every step is a product we make.
        </SectionHead>
        <div className="grid gap-6 lg:grid-cols-2">
          {[{ r: rituals.morning, k: mk, tone: 'bg-butter/50', btn: 'btn' }, { r: rituals.evening, k: ek, tone: 'bg-dusk text-cream', btn: 'btn-gold' }].map(({ r, k, tone, btn }) => (
            <article key={r.slug} className={`overflow-hidden rounded-[3px] ${tone}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.image} alt={`${r.title}: products`} loading="lazy" className="aspect-[3/2] w-full object-cover" width={1800} height={1200} />
              <div className="p-7 md:p-10">
                <p className={`eyebrow ${r.slug === 'evening' ? 'text-gold' : ''}`}>{r.eyebrow}</p>
                <h3 className={`mt-3 text-[30px] md:text-[36px] ${r.slug === 'evening' ? 'text-cream' : ''}`}>{r.slug === 'morning' ? 'Mist, hydrate, lips.' : 'Cleanse, mist, nourish.'}</h3>
                <ol className="mt-5 space-y-1.5 text-[15px]">
                  {r.steps.filter(s => s.slug).map(s => <li key={s.n} className="flex gap-3"><span className="w-5 font-serif italic text-gold">{s.n}</span>{s.title}</li>)}
                </ol>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link href={`/rituals/${r.slug}/`} className={btn}>See the {r.slug} ritual</Link>
                  <span className="text-[14px] opacity-80">{k.name} · {inr(k.price)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SHOP BY STEP */}
      <section className="border-y border-line bg-paper py-20 md:py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Shop by step" title="Start with one step." />
            <Link href="/shop/" className="link mb-10 text-[15px]">Shop all 19 products</Link>
          </div>
          <div className="no-scrollbar -mx-[var(--gutter)] flex snap-x gap-4 overflow-x-auto px-[var(--gutter)] md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
            {STEPS.map(s => (
              <Link key={s.href} href={s.href} className="group w-[44vw] shrink-0 snap-start md:w-auto">
                <div className="aspect-[4/5] overflow-hidden rounded-[3px] bg-cream">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <h3 className="mt-3 font-serif text-[19px]">{s.name}</h3>
                <p className="text-[13px] text-ink2">{s.line}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE MAKE IT */}
      <section className="wrap grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="order-2 md:order-1">
          <p className="eyebrow">How we make it</p>
          <h2 className="mt-3 text-[34px] md:text-[44px]">Why our soaps take a month.</h2>
          <p className="lead mt-5">Our partner, trained in botany, runs a small unit near Kanha National Park with people from the villages around it. Things are made with few machines, in small batches, and they take the time they take.</p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {[['21–28', 'days a natural soap cures before packing'], ['Sun', 'dried moringa seed, then slow pressing'], ['19', 'products, each with a full ingredient list']].map(([n, t]) => (
              <div key={t}><dt className="font-serif text-[34px] text-gold-deep md:text-[42px]">{n}</dt><dd className="mt-1 text-[13.5px] leading-snug text-ink2">{t}</dd></div>
            ))}
          </dl>
          <Link href="/how-its-made/" className="btn-ghost mt-10">Read how it&apos;s made</Link>
        </div>
        <figure className="order-1 md:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/collections/soaps-bathing-bars.webp" alt="Kizora natural soaps and ubtan bathing bar" loading="lazy" className="aspect-[4/3.2] w-full rounded-[3px] object-cover object-[75%_60%]" />
          <figcaption className="mt-2 text-[12.5px] italic text-ink2"><Confirm note="Replace with a real photo of soaps curing at the unit">Real product photos. A photo of the curing racks at the unit will replace this.</Confirm></figcaption>
        </figure>
      </section>

      {/* INGREDIENTS */}
      <section className="bg-sage-mist py-20 md:py-28">
        <div className="wrap grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow">Know your ingredients</p>
            <h2 className="mt-3 text-[34px] md:text-[44px]">Ingredients you already know.</h2>
            <p className="lead mt-5">What each one is, how Indian homes have used it, what the research does and does not say, and which of our products contain it.</p>
            <Link href="/ingredients/" className="btn mt-8">Explore the ingredient library</Link>
          </div>
          <ul className="grid grid-cols-1 divide-y divide-sage/30 border-y border-sage/30 sm:grid-cols-2 sm:divide-y-0 sm:border-0">
            {featuredIng.map(i => (
              <li key={i.slug} className="sm:border-b sm:border-sage/30">
                <Link href={`/ingredients/${i.slug}/`} className="group flex items-baseline justify-between gap-4 py-4 sm:pr-6">
                  <span><span className="font-serif text-[22px] group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{i.name}</span>{i.localName && <span className="ml-2 text-[13px] italic text-ink2">{i.localName}</span>}</span>
                  <span className="shrink-0 text-[12.5px] text-sage-deep">{i.products.length} product{i.products.length > 1 ? 's' : ''} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* START HERE */}
      <section className="wrap py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Where most people start" title="Four we would recommend first." />
          <Link href="/shop/" className="link mb-10 text-[15px]">Shop all</Link>
        </div>
        <ProductGrid slugs={['pure-aloe-vera-gel', 'rose-hydrating-mist', 'avocado-olive-ghee-foot-butter', 'kuppaimeni-soap']} />
      </section>

      {/* WINTER */}
      <section className="bg-[#EAE0D4]">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-2 md:py-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/kits/winter-night-care-set.webp" alt="Winter Night Care Set: Cow Milk Bathing Bar and Ghee Foot Butter" loading="lazy" className="aspect-[4/5] w-full object-cover md:max-h-[620px]" />
          <div className="md:py-20">
            <p className="eyebrow">For the colder months</p>
            <h2 className="mt-3 text-[34px] md:text-[44px]">The Winter Night Care Set.</h2>
            <p className="lead mt-5">Cow Milk Bathing Bar and the Avocado &amp; Olive Ghee Foot Butter. A small, practical set for dry skin and rough heels, and the one many customers send to their parents.</p>
            <p className="mt-6 font-serif text-[26px]">{inr(ws.price)} <span className="font-sans text-[13px] text-ink2"><Confirm>sum of listed prices</Confirm></span></p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products/winter-night-care-set/" className="btn">See the set</Link>
              <Link href="/collections/sets-hampers/" className="btn-ghost">All sets & kits</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="wrap py-20 text-center md:py-28">
        <p className="eyebrow">What customers say</p>
        <p className="mx-auto mt-5 max-w-3xl font-serif text-[28px] leading-snug md:text-[38px]">
          Our older customers keep reordering the foot butter for dry, cracked heels.
        </p>
        <p className="mt-4 text-[14px] text-ink2"><Confirm note="Founder-reported; replace with verified reviews once collected">As shared by our founder, Bikash</Confirm></p>
        <p className="mx-auto mt-10 max-w-xl text-[14.5px] text-ink2">Verified reviews from website buyers will appear on each product page. Kizora Skincare is rated <Confirm note="Observed on Google Business Profile, 1 Nov 2026">5.0 from 17 Google reviews</Confirm>.</p>
      </section>

      {/* JOURNAL */}
      <section className="border-t border-line bg-paper py-20 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="Journal" title="Notes from the unit." />
          <div className="grid gap-10 md:grid-cols-3">
            {articles.map(a => (
              <Link key={a.slug} href={`/journal/${a.slug}/`} className="group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" loading="lazy" className="aspect-[3/2] w-full rounded-[3px] object-cover" />
                <p className="mt-4 text-[12.5px] uppercase tracking-[0.14em] text-ink2">{a.read} read</p>
                <h3 className="mt-2 text-[22px] group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{a.title}</h3>
                <p className="mt-2 text-[15px] text-ink2">{a.dek}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
