'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { bySlug, img, inr, FREE_DELIVERY } from '@/data/products';

type Line = { slug: string; qty: number };
type Cart = {
  lines: Line[]; count: number; subtotal: number; open: boolean;
  add: (slug: string, qty?: number) => void; setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void; clear: () => void; setOpen: (v: boolean) => void;
};
const Ctx = createContext<Cart | null>(null);
const KEY = 'kizora-demo-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setLines(JSON.parse(raw)); } catch { /* storage unavailable */ }
  }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* ignore */ } }, [lines]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines(ls => { const f = ls.find(l => l.slug === slug); return f ? ls.map(l => l.slug === slug ? { ...l, qty: l.qty + qty } : l) : [...ls, { slug, qty }]; });
    setOpen(true);
  }, []);
  const setQty = useCallback((slug: string, qty: number) => setLines(ls => qty <= 0 ? ls.filter(l => l.slug !== slug) : ls.map(l => l.slug === slug ? { ...l, qty } : l)), []);
  const remove = useCallback((slug: string) => setLines(ls => ls.filter(l => l.slug !== slug)), []);
  const clear = useCallback(() => setLines([]), []);
  const value = useMemo(() => {
    const subtotal = lines.reduce((a, l) => a + (bySlug(l.slug)?.price ?? 0) * l.qty, 0);
    return { lines, count: lines.reduce((a, l) => a + l.qty, 0), subtotal, open, add, setQty, remove, clear, setOpen };
  }, [lines, open, add, setQty, remove, clear]);
  return <Ctx.Provider value={value}>{children}<CartDrawer /></Ctx.Provider>;
}

export const useCart = () => { const c = useContext(Ctx); if (!c) throw new Error('useCart outside provider'); return c; };

export function AddToCart({ slug, label = 'Add to cart', className = 'btn w-full' }: { slug: string; label?: string; className?: string }) {
  const { add } = useCart();
  return <button type="button" className={className} onClick={() => add(slug)}>{label}</button>;
}

export function DeliveryMeter({ subtotal }: { subtotal: number }) {
  const left = Math.max(0, FREE_DELIVERY - subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_DELIVERY) * 100));
  return (
    <div>
      <p className="text-[13.5px] text-ink2">
        {left > 0 ? <>Add <b className="text-ink">{inr(left)}</b> more for <span className="needs-approval" title="Needs founder approval">free delivery</span>.</>
          : <>Your order qualifies for <span className="needs-approval" title="Needs founder approval">free delivery</span>.</>}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line"><div className="h-full bg-sage-deep transition-all" style={{ width: pct + '%' }} /></div>
    </div>
  );
}

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { lines, setQty, remove } = useCart();
  if (!lines.length) return <p className="py-10 text-center text-ink2">Your cart is empty.</p>;
  return (
    <ul className="divide-y divide-line">
      {lines.map(l => {
        const p = bySlug(l.slug); if (!p) return null;
        return (
          <li key={l.slug} className="flex gap-4 py-4">
            <Link href={`/products/${p.slug}/`} className="block h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(p.slug, 'card')} alt={p.name} className="h-full w-full object-cover" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex justify-between gap-3">
                <Link href={`/products/${p.slug}/`} className="font-serif text-[17px] leading-snug hover:underline">{p.name}</Link>
                <span className="shrink-0 font-medium">{inr(p.price * l.qty)}</span>
              </div>
              {p.size && <span className="text-[13px] text-ink2">{p.size}</span>}
              <div className="mt-auto flex items-center gap-3 pt-2">
                <div className="flex items-center border border-line">
                  <button aria-label={`Decrease ${p.name}`} className="h-8 w-8" onClick={() => setQty(l.slug, l.qty - 1)}>−</button>
                  <span className="w-8 text-center text-sm" aria-live="polite">{l.qty}</span>
                  <button aria-label={`Increase ${p.name}`} className="h-8 w-8" onClick={() => setQty(l.slug, l.qty + 1)}>+</button>
                </div>
                {!compact && <button className="text-[13px] text-ink2 underline" onClick={() => remove(l.slug)}>Remove</button>}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CartDrawer() {
  const { open, setOpen, subtotal, count } = useCart();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);
  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-ink/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
      <aside role="dialog" aria-label="Cart" className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-cream shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-2xl">Your cart <span className="text-base text-ink2">({count})</span></h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="text-2xl leading-none">×</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6"><CartLines compact /></div>
        <div className="space-y-4 border-t border-line px-6 py-5">
          <DeliveryMeter subtotal={subtotal} />
          <div className="flex justify-between font-medium"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          <Link href="/cart/" className="btn w-full" onClick={() => setOpen(false)}>View cart</Link>
          <p className="text-center text-[12px] text-ink2">Prototype cart: stored only in this browser. No order is placed.</p>
        </div>
      </aside>
    </div>
  );
}
