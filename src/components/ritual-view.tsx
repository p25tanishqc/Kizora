import Link from 'next/link';
import { bySlug, img, inr } from '@/data/products';
import { rituals } from '@/data/site';
import { Confirm, Crumbs, JsonLd } from './ui';
import { AddKit, AddSmall } from './product-bits';

export function RitualView({ which }: { which: 'morning' | 'evening' }) {
  const r = rituals[which];
  const kit = bySlug(r.kit)!;
  const dark = which === 'evening';
  const other = which === 'morning' ? 'evening' : 'morning';
  const alt = which === 'morning' ? bySlug('morning-ritual-kit-oily-skin')! : bySlug('complete-evening-ritual')!;
  return (
    <>
      <section className={dark ? 'bg-dusk text-cream' : 'bg-butter/50'}>
        <div className="wrap grid items-center gap-8 pt-6 md:grid-cols-[1fr_1.2fr] md:gap-12">
          <div className="pb-4 md:pb-16">
            <div className={dark ? '[&_*]:!text-cream/80' : ''}><Crumbs items={[{ name: 'Rituals', href: '/rituals/' }, { name: which === 'morning' ? 'Morning' : 'Evening' }]} /></div>
            <p className={`eyebrow mt-8 ${dark ? '!text-gold' : ''}`}>{r.eyebrow}</p>
            <h1 className={`mt-3 text-[46px] md:text-[62px] ${dark ? '!text-cream' : ''}`}>{r.title}</h1>
            <p className={`mt-5 max-w-md text-[17px] leading-relaxed ${dark ? 'text-cream/80' : 'text-ink2'}`}>{r.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#kit" className={dark ? 'btn-gold' : 'btn'}>Add the kit · {inr(kit.price)}</a>
              <Link href={`/rituals/${other}/`} className={dark ? 'inline-flex items-center px-2 text-[13px] uppercase tracking-[0.12em] text-cream underline underline-offset-4' : 'btn-ghost'}>See the {other} ritual</Link>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.image} alt={`${r.title}: the products, together`} fetchPriority="high" width={1800} height={1200} className="-mx-[var(--gutter)] aspect-[3/2] w-[calc(100%+2*var(--gutter))] object-cover md:mx-0 md:w-full" />
        </div>
      </section>

      <section className="wrap grid gap-14 py-16 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
        <div>
          <h2 className="text-[32px]">The steps, in order</h2>
          <ol className="mt-4">
            {r.steps.map(s => {
              const p = s.slug ? bySlug(s.slug) : undefined;
              if (!p) return (
                <li key={s.n} className="my-6 rounded-[3px] bg-blush/50 p-6"><p className="eyebrow">{s.n} · {s.role}</p><p className="mt-2 font-serif text-[22px]">{s.title}</p><p className="mt-1 text-ink2">{s.how} {s.why}</p></li>
              );
              return (
                <li key={s.n} className="grid grid-cols-[34px_96px_1fr] items-start gap-4 border-b border-line py-7 sm:grid-cols-[48px_150px_1fr_auto] sm:gap-6">
                  <span className="font-serif text-[34px] italic leading-none text-gold sm:text-[44px]">{s.n}</span>
                  <Link href={`/products/${p.slug}/`} className="block aspect-[4/5] overflow-hidden rounded-[3px] bg-paper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(p.slug, 'card')} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                  </Link>
                  <div className="col-span-3 sm:col-span-1 sm:col-start-3">
                    <p className="eyebrow">{s.role}{s.optional && ' · optional'}</p>
                    <h3 className="mt-1.5 text-[24px]"><Link href={`/products/${p.slug}/`} className="hover:underline hover:decoration-gold hover:underline-offset-4">{p.name}</Link></h3>
                    <p className="mt-2">{s.how}</p>
                    <p className="mt-1.5 text-[14.5px] text-ink2">{s.why}</p>
                  </div>
                  <div className="col-span-3 flex items-center justify-between gap-4 sm:col-span-1 sm:block sm:text-right">
                    <p className="font-medium sm:mb-3">{inr(p.price)}</p><AddSmall slug={p.slug} />
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-8 rounded-[3px] bg-paper p-5 text-[15px] text-ink2">{r.gaps}</p>
          <h3 className="mt-12 text-[26px]">Make it yours</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {r.swaps.map(sw => (
              <li key={sw.label} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                <span><b className="font-medium">{sw.label}.</b> <span className="text-ink2">{sw.text}</span></span>
                <Link href={`/products/${sw.slug}/`} className="link text-[14px]">{bySlug(sw.slug)!.name} · {inr(bySlug(sw.slug)!.price)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <aside id="kit" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[3px] bg-ink text-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(kit.slug)} alt={kit.name} loading="lazy" className="aspect-[4/3] w-full object-cover object-[50%_70%]" />
            <div className="p-7">
              <p className="eyebrow !text-gold">The kit</p>
              <h2 className="mt-2 text-[28px] !text-cream">{kit.name}</h2>
              <ul className="mt-4 divide-y divide-cream/15 text-[15px]">
                {kit.components!.map(s => <li key={s} className="flex justify-between py-2.5"><span>{bySlug(s)!.name}</span><span>{inr(bySlug(s)!.price)}</span></li>)}
              </ul>
              <div className="my-5 flex justify-between font-serif text-[24px]"><span>Total</span><span>{inr(kit.price)}</span></div>
              <AddKit slug={kit.slug} price={kit.price} />
              <p className="mt-4 text-[12.5px] text-cream/65"><Confirm>Listed prices; any kit discount needs approval. Qualifies for free delivery above ₹799.</Confirm></p>
            </div>
          </div>
          <Link href={`/products/${alt.slug}/`} className="mt-4 flex items-center justify-between rounded-[3px] border border-line bg-paper p-5 text-[15px] hover:border-ink">
            <span><span className="block text-[12px] uppercase tracking-[0.12em] text-ink2">Also</span>{alt.name}</span><span>{inr(alt.price)} →</span>
          </Link>
        </aside>
      </section>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'HowTo', name: r.title, step: r.steps.map(s => ({ '@type': 'HowToStep', name: `${s.role}: ${s.title}`, text: s.how })) }} />
    </>
  );
}
