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
  const alt = bySlug('morning-ritual-kit-oily-skin')!;
  const full = bySlug('complete-evening-ritual')!;
  const inKit = (slug?: string) => !!slug && kit.components!.includes(slug);
  return (
    <>
      <section className={dark ? 'bg-dusk text-cream' : 'bg-butter/50'}>
        <div className="wrap grid items-center gap-8 pt-6 md:grid-cols-[1fr_1.2fr] md:gap-12">
          <div className="pb-4 md:pb-16">
            <div className={dark ? '[&_*]:!text-cream/80' : ''}><Crumbs items={[{ name: 'Rituals', href: '/rituals/' }, { name: which === 'morning' ? 'Morning' : 'Evening' }]} /></div>
            <p className={`eyebrow mt-8 ${dark ? '!text-gold' : ''}`}>{r.eyebrow}</p>
            <h1 className={`mt-3 text-[46px] md:text-[62px] ${dark ? '!text-cream' : ''}`}>{r.title}</h1>
            <p className={`mt-5 max-w-md text-[17px] leading-relaxed ${dark ? 'text-cream/80' : 'text-ink2'}`}>{r.intro}</p>
            {dark ? (
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#kit" className="btn-gold">Evening essentials · 2 products · {inr(kit.price)}</a>
                <a href="#kit" className="inline-flex items-center justify-center rounded-[2px] border border-cream/60 px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-cream hover:bg-cream hover:text-ink">Complete ritual · 5 products · {inr(full.price)}</a>
              </div>
            ) : (
              <div className="mt-8">
                <div className="flex flex-wrap gap-3">
                  <a href="#kit" className="btn">Add the kit · {inr(kit.price)}</a>
                  <Link href={`/rituals/${other}/`} className="btn-ghost">See the {other} ritual</Link>
                </div>
                <p className="mt-3 text-[14px] text-ink2">Includes mist + gel. The lip balm is optional.</p>
              </div>
            )}
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
                    <p className="eyebrow">{s.role}{inKit(s.slug) ? <span className="ml-2 rounded-sm bg-butter px-1.5 py-0.5 text-[10.5px] text-ink">{which === 'morning' ? 'In the kit' : 'In evening essentials'}</span> : <span className="text-ink2"> · {which === 'morning' ? 'optional, not in the kit' : 'in the complete ritual'}</span>}</p>
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
            <img src={img(kit.slug)} alt={`${kit.name}: ${kit.components!.map(s => bySlug(s)!.name).join(' and ')}`} loading="lazy" className="aspect-[4/3] w-full object-cover object-[50%_70%]" />
            <div className="p-7">
              <p className="eyebrow !text-gold">{which === 'morning' ? 'The kit · 2 essentials' : 'Option 1 · 2 products'}</p>
              <h2 className="mt-2 text-[28px] !text-cream">{kit.name}</h2>
              <ul className="mt-4 divide-y divide-cream/15 text-[15px]">
                {kit.components!.map(s => <li key={s} className="flex justify-between py-2.5"><span>{bySlug(s)!.name}</span><span>{inr(bySlug(s)!.price)}</span></li>)}
              </ul>
              <div className="my-5 flex justify-between font-serif text-[24px]"><span>Total</span><span>{inr(kit.price)}</span></div>
              <AddKit slug={kit.slug} price={kit.price} label={`Add the kit · ${inr(kit.price)}`} />
              <p className="mt-4 text-[13px] text-cream/70">{which === 'morning' ? 'Add a lip balm separately if you like. ' : ''}<Confirm>Qualifies for free delivery on orders above ₹799.</Confirm></p>
              {which === 'evening' && (
                <div className="mt-7 border-t border-cream/20 pt-6">
                  <p className="eyebrow !text-gold">Option 2 · 5 products</p>
                  <h3 className="mt-2 text-[22px] !text-cream">{full.name}</h3>
                  <p className="mt-2 text-[14px] text-cream/75">Every step above: {full.components!.map(s => bySlug(s)!.name).join(', ')}.</p>
                  <div className="my-4 flex justify-between font-serif text-[20px]"><span>Total</span><span>{inr(full.price)}</span></div>
                  <AddKit slug={full.slug} price={full.price} label={`Add all 5 · ${inr(full.price)}`} />
                </div>
              )}
            </div>
          </div>
          {which === 'morning' && (
            <Link href={`/products/${alt.slug}/`} className="mt-4 flex items-center justify-between rounded-[3px] border border-line bg-paper p-5 text-[15px] hover:border-ink">
              <span><span className="block text-[12px] uppercase tracking-[0.12em] text-ink2">Oily skin?</span>{alt.name}</span><span>{inr(alt.price)} →</span>
            </Link>
          )}
        </aside>
      </section>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'HowTo', name: r.title, step: r.steps.map(s => ({ '@type': 'HowToStep', name: `${s.role}: ${s.title}`, text: s.how })) }} />
    </>
  );
}
