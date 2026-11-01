import type { Metadata } from 'next';
import { CartView } from '@/components/cart-view';
import { Crumbs } from '@/components/ui';

export const metadata: Metadata = { title: 'Your cart | Kizora', robots: { index: false } };

export default function Cart() {
  return (
    <section className="wrap pb-10 pt-8">
      <Crumbs items={[{ name: 'Cart' }]} />
      <h1 className="mb-10 mt-10 text-[46px]">Your cart</h1>
      <CartView />
    </section>
  );
}
