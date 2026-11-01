'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ingredients, otherIngredients } from '@/data/ingredients';
import { bySlug, img } from '@/data/products';

const GROUPS = ['All', 'Hydrating', 'Plant waters', 'Oils & butters', 'Traditional Indian'];

export function IngredientBrowser() {
  const [g, setG] = useState('All');
  const [q, setQ] = useState('');
  const list = useMemo(() => ingredients.filter(i => (g === 'All' || i.group === g) &&
    (!q || (i.name + ' ' + i.localName + ' ' + i.inci + ' ' + i.what).toLowerCase().includes(q.toLowerCase()))), [g, q]);
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-6">
        {GROUPS.map(x => <button key={x} className="chip" aria-pressed={g === x} onClick={() => setG(x)}>{x}</button>)}
        <label htmlFor="ing-q" className="sr-only">Search ingredients</label>
        <input id="ing-q" value={q} onChange={e => setQ(e.target.value)} placeholder="Search, e.g. haldi, mulethi" className="ml-auto w-full border-b border-ink/40 bg-transparent py-2 outline-none focus:border-ink sm:w-64" />
      </div>
      <ul className="mt-2 divide-y divide-line">
        {list.map(i => (
          <li key={i.slug}>
            <Link href={`/ingredients/${i.slug}/`} className="group grid gap-4 py-7 md:grid-cols-[1.2fr_2fr_auto] md:items-center md:gap-10">
              <div>
                <p className="text-[12px] uppercase tracking-[0.14em] text-sage-deep">{i.group}</p>
                <h2 className="mt-1 text-[28px] group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4 md:text-[32px]">{i.name}</h2>
                <p className="text-[13.5px] italic text-ink2">{[i.localName, i.inci.split(' (')[0].split(';')[0]].filter(Boolean).join(' · ')}</p>
              </div>
              <p className="text-[15.5px] text-ink2">{i.what}</p>
              <div className="flex items-center gap-2">
                {i.products.slice(0, 4).map(s => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={s} src={img(s, 'card')} alt={bySlug(s)?.name ?? ''} title={bySlug(s)?.name} loading="lazy" className="h-16 w-[52px] rounded-sm object-cover" />
                ))}
                {i.products.length > 4 && <span className="text-[13px] text-ink2">+{i.products.length - 4}</span>}
              </div>
            </Link>
          </li>
        ))}
        {!list.length && <li className="py-12 text-center text-ink2">No ingredient matches “{q}”.</li>}
      </ul>
      <div id="all" className="mt-20 scroll-mt-28">
        <h2 className="text-[28px]">Every other ingredient, and where to find it</h2>
        <p className="mt-2 text-ink2">From the published ingredient lists. Products without a full list yet are marked on their pages.</p>
        <dl className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {otherIngredients.map(o => (
            <div key={o.name} className="border-b border-line py-3">
              <dt className="font-medium">{o.name}</dt>
              <dd className="text-[14px] text-ink2">{o.products.map((s, k) => <span key={s}>{k > 0 && ', '}<Link href={`/products/${s}/`} className="hover:text-ink hover:underline">{bySlug(s)?.name}</Link></span>)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
