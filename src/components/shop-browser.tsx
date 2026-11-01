'use client';
import { useEffect, useMemo, useState } from 'react';
import { allItems, NEEDS, type Need, type Product } from '@/data/products';
import { collections } from '@/data/collections';
import { ingredients } from '@/data/ingredients';
import { ProductCard } from './ui';

const SKIN = ['dry', 'oily', 'normal', 'combination', 'sensitive'] as const;
const PRICE = [{ k: 'u400', l: 'Under ₹400', f: (p: Product) => p.price < 400 }, { k: '400-800', l: '₹400 to ₹800', f: (p: Product) => p.price >= 400 && p.price <= 800 }, { k: 'o800', l: 'Kits above ₹800', f: (p: Product) => p.price > 800 }];

function score(p: Product, q: string) {
  const t = q.toLowerCase().trim(); if (!t) return 1;
  const ingNames = p.ingredientSlugs.map(s => ingredients.find(i => i.slug === s)?.name ?? '').join(' ');
  const syn: Record<string, string> = { haldi: 'turmeric', besan: 'chickpea', mulethi: 'licorice', gulab: 'rose', sahjan: 'moringa', drumstick: 'moringa', nettle: 'kuppaimeni', heel: 'foot', heels: 'foot', lips: 'lip', soap: 'soap bar', toner: 'mist' };
  const terms = t.split(/\s+/).map(w => syn[w] ?? w);
  let s = 0;
  for (const w of terms) {
    if (p.name.toLowerCase().includes(w)) s += 5;
    if (p.keyIngredients.join(' ').toLowerCase().includes(w)) s += 3;
    if (ingNames.toLowerCase().includes(w)) s += 2;
    if ((p.oneLine + ' ' + p.fullIngredients + ' ' + p.forWhom).toLowerCase().includes(w)) s += 1;
  }
  return s;
}

export function ShopBrowser() {
  const [q, setQ] = useState('');
  const [col, setCol] = useState<string>('all');
  const [needs, setNeeds] = useState<Need[]>([]);
  const [skin, setSkin] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [sort, setSort] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setQ(sp.get('q') ?? ''); if (sp.get('need')) setNeeds([sp.get('need') as Need]); if (sp.get('collection')) setCol(sp.get('collection')!);
  }, []);
  useEffect(() => {
    const sp = new URLSearchParams(); if (q) sp.set('q', q); if (col !== 'all') sp.set('collection', col); if (needs.length === 1) sp.set('need', needs[0]);
    const url = window.location.pathname + (sp.toString() ? '?' + sp.toString() : '');
    window.history.replaceState(null, '', url);
  }, [q, col, needs]);

  const list = useMemo(() => {
    let l = allItems.map(p => ({ p, s: score(p, q) })).filter(x => x.s > 0);
    if (col !== 'all') l = l.filter(x => x.p.collections.includes(col as never));
    if (needs.length) l = l.filter(x => needs.some(n => x.p.needs.includes(n)));
    if (skin) l = l.filter(x => x.p.skin.includes(skin as never) || x.p.skin.includes('all'));
    if (price) { const f = PRICE.find(x => x.k === price)!.f; l = l.filter(x => f(x.p)); }
    if (sort === 'low') l.sort((a, b) => a.p.price - b.p.price);
    else if (sort === 'high') l.sort((a, b) => b.p.price - a.p.price);
    else if (q) l.sort((a, b) => b.s - a.s);
    return l.map(x => x.p);
  }, [q, col, needs, skin, price, sort]);

  const toggleNeed = (n: Need) => setNeeds(v => v.includes(n) ? v.filter(x => x !== n) : [...v, n]);
  const reset = () => { setQ(''); setCol('all'); setNeeds([]); setSkin(''); setPrice(''); setSort('recommended'); };
  const active = (col !== 'all' ? 1 : 0) + needs.length + (skin ? 1 : 0) + (price ? 1 : 0);

  const Filters = (
    <div className="space-y-8 text-[14.5px]">
      <fieldset>
        <legend className="eyebrow mb-3">Type</legend>
        <div className="flex flex-wrap gap-2">
          <button className="chip" aria-pressed={col === 'all'} onClick={() => setCol('all')}>All</button>
          {collections.filter(c => c.slug !== 'aloe-vera-essentials').map(c => <button key={c.slug} className="chip" aria-pressed={col === c.slug} onClick={() => setCol(c.slug)}>{c.name}</button>)}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-3">Need</legend>
        <div className="flex flex-wrap gap-2">{(Object.keys(NEEDS) as Need[]).map(n => <button key={n} className="chip" aria-pressed={needs.includes(n)} onClick={() => toggleNeed(n)}>{NEEDS[n]}</button>)}</div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-3">Skin type</legend>
        <div className="flex flex-wrap gap-2">{SKIN.map(s => <button key={s} className="chip capitalize" aria-pressed={skin === s} onClick={() => setSkin(v => v === s ? '' : s)}>{s}</button>)}</div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-3">Price</legend>
        <div className="flex flex-wrap gap-2">{PRICE.map(p => <button key={p.k} className="chip" aria-pressed={price === p.k} onClick={() => setPrice(v => v === p.k ? '' : p.k)}>{p.l}</button>)}</div>
      </fieldset>
      {active > 0 && <button onClick={reset} className="link text-[14px]">Clear all filters</button>}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">{Filters}</aside>
      <div>
        <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-line pb-5">
          <label htmlFor="shop-q" className="sr-only">Search products</label>
          <input id="shop-q" value={q} onChange={e => setQ(e.target.value)} placeholder="Search by product or ingredient" className="min-w-[200px] flex-1 border-b border-ink/40 bg-transparent py-2 outline-none focus:border-ink" />
          <button className="btn-ghost py-2.5 lg:hidden" onClick={() => setShowFilters(v => !v)} aria-expanded={showFilters}>Filters{active ? ` (${active})` : ''}</button>
          <label className="flex items-center gap-2 text-[14px] text-ink2">Sort
            <select value={sort} onChange={e => setSort(e.target.value)} className="border border-line bg-paper px-2 py-2 text-ink">
              <option value="recommended">Recommended</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
        {showFilters && <div className="mb-10 lg:hidden">{Filters}</div>}
        <p className="mb-6 text-[14px] text-ink2" aria-live="polite">{list.length} {list.length === 1 ? 'item' : 'items'}{q && <> for “{q}”</>}</p>
        {list.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">{list.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 3} />)}</div>
        ) : (
          <div className="rounded-[3px] bg-paper p-10 text-center">
            <p className="font-serif text-2xl">Nothing matches that yet.</p>
            <p className="mt-2 text-ink2">Try “aloe”, “rose”, “soap” or “heels”, or <button className="link" onClick={reset}>clear the filters</button>.</p>
          </div>
        )}
      </div>
    </div>
  );
}
