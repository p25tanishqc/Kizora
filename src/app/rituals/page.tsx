import type { Metadata } from 'next';
import Link from 'next/link';
import { bySlug, inr } from '@/data/products';
import { rituals } from '@/data/site';
import { Crumbs, ProductGrid, Mosaic } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Rituals: a simple morning and evening | Kizora',
  description: 'Not routines. Rituals. A three-minute morning and a slower evening, built only from products we make.',
  alternates: { canonical: '/rituals/' },
};

export default function Rituals() {
  return (
    <>
      <section className="wrap pb-12 pt-8">
        <Crumbs items={[{ name: 'Rituals' }]} />
        <div className="mx-auto max-w-3xl pt-12 text-center">
          <p className="eyebrow">Care, when done consistently, becomes ritual.</p>
          <h1 className="mt-4 text-[48px] md:text-[68px]">Not routines. Rituals.</h1>
          <p className="lead mx-auto mt-6 max-w-2xl">A ritual is a small act of care you repeat: a few products, each with one job, used in the same order. Ours are light in the morning and slower at night, and they change a little with the season.</p>
        </div>
      </section>
      <section className="wrap grid gap-6 md:grid-cols-2">
        {(['morning', 'evening'] as const).map(w => {
          const r = rituals[w]; const k = bySlug(r.kit)!; const dark = w === 'evening';
          return (
            <Link key={w} href={`/rituals/${w}/`} className={`group overflow-hidden rounded-[3px] ${dark ? 'bg-dusk text-cream' : 'bg-butter/50'}`}>
              <Mosaic slugs={r.steps.map(s => s.slug!).filter(Boolean).slice(0, 3)} size="card" />
              <div className="p-8">
                <p className={`eyebrow ${dark ? '!text-gold' : ''}`}>{r.eyebrow}</p>
                <h2 className={`mt-2 text-[34px] ${dark ? '!text-cream' : ''}`}>{r.title}</h2>
                <p className={`mt-3 ${dark ? 'text-cream/75' : 'text-ink2'}`}>{r.steps.map(s => s.role).join(' → ')}</p>
                <p className="mt-6 text-[14px] uppercase tracking-[0.12em] underline underline-offset-4">See the ritual · kit {inr(k.price)}</p>
              </div>
            </Link>
          );
        })}
      </section>
      <section className="wrap py-20">
        <h2 className="mb-8 text-[32px]">All ritual kits and sets</h2>
        <ProductGrid slugs={['morning-ritual-kit', 'morning-ritual-kit-oily-skin', 'evening-ritual-kit', 'winter-night-care-set']} />
      </section>
    </>
  );
}
