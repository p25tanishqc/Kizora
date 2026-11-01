import type { Metadata } from 'next';
import { Crumbs } from '@/components/ui';
import { ShopBrowser } from '@/components/shop-browser';

export const metadata: Metadata = {
  title: 'Shop all Kizora skincare | Gels, mists, oils and soaps',
  description: 'All 19 Kizora products and five ritual kits: aloe gels, face mists, moringa oil, natural soaps, foot butter, lip balms and hair oils.',
  alternates: { canonical: '/shop/' },
};

export default function Shop() {
  return (
    <div className="wrap pb-10 pt-8">
      <Crumbs items={[{ name: 'Shop all' }]} />
      <div className="grid gap-6 border-b border-line pb-10 pt-8 md:grid-cols-2 md:items-end">
        <div><p className="eyebrow">19 products · 5 kits</p><h1 className="mt-3 text-[44px] md:text-[56px]">Shop all</h1></div>
        <p className="lead">Every product we make, with its size and price. Filter by what your skin needs, or search for an ingredient you know, like haldi, mulethi or moringa.</p>
      </div>
      <div className="pt-10"><ShopBrowser /></div>
    </div>
  );
}
