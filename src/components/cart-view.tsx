'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CartLines, DeliveryMeter, useCart } from './cart';
import { bySlug, inr } from '@/data/products';
import { ProductCard } from './ui';

export function CartView() {
  const { lines, subtotal, clear } = useCart();
  const [demo, setDemo] = useState(false);
  const inCart = new Set(lines.map(l => l.slug));
  const suggest = ['morning-ritual-kit', 'evening-ritual-kit', 'winter-night-care-set', 'pure-aloe-vera-gel'].filter(s => !inCart.has(s)).slice(0, 3);
  return (
    <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <CartLines />
        {lines.length > 0 && <button onClick={clear} className="mt-4 text-[14px] text-ink2 underline">Empty cart</button>}
      </div>
      <aside className="self-start rounded-[3px] bg-paper p-7">
        <DeliveryMeter subtotal={subtotal} />
        <dl className="mt-6 space-y-2 text-[15px]">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
          <div className="flex justify-between text-ink2"><dt>Delivery</dt><dd><span className="needs-approval" title="Flat fee to be decided">{subtotal >= 799 || subtotal === 0 ? 'Free' : 'Flat fee (to confirm)'}</span></dd></div>
          <div className="flex justify-between border-t border-line pt-3 font-serif text-[22px]"><dt>Total</dt><dd>{inr(subtotal)}</dd></div>
        </dl>
        <button className="btn mt-6 w-full" disabled={!lines.length} onClick={() => setDemo(true)}>Checkout</button>
        <p className="mt-3 text-center text-[12.5px] text-ink2">UPI · cards · net banking · cash on delivery</p>
        {demo && (
          <div role="status" className="mt-5 rounded-[3px] border border-gold bg-butter/50 p-4 text-[14px]">
            <b className="font-medium">This is a prototype.</b> No payment is taken and no order is created. On the live store this button opens the WooCommerce (or Shopify) checkout.
          </div>
        )}
      </aside>
      {suggest.length > 0 && (
        <div className="lg:col-span-2">
          <h2 className="mb-6 mt-6 text-[28px]">{subtotal < 799 ? 'Kits that clear the free-delivery line' : 'You might also like'}</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">{suggest.map(s => <ProductCard key={s} p={bySlug(s)!} />)}</div>
          <p className="mt-10"><Link href="/shop/" className="link">Continue shopping</Link></p>
        </div>
      )}
    </div>
  );
}
