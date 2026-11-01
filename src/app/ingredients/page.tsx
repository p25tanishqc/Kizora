import type { Metadata } from 'next';
import { Crumbs } from '@/components/ui';
import { IngredientBrowser } from '@/components/ingredient-browser';

export const metadata: Metadata = {
  title: 'Know your ingredients | Kizora ingredient library',
  description: 'What aloe, rose, moringa, turmeric, ghee, kuppaimeni and more are, what they can do on skin, and which Kizora products contain them.',
  alternates: { canonical: '/ingredients/' },
};

export default function Ingredients() {
  return (
    <>
      <section className="bg-sage-mist">
        <div className="wrap pb-14 pt-8">
          <Crumbs items={[{ name: 'Ingredient library' }]} />
          <div className="grid gap-8 pt-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div><p className="eyebrow">Ingredient library · 12 profiles</p><h1 className="mt-3 text-[46px] md:text-[64px]">Know your ingredients</h1></div>
            <p className="lead">What each ingredient is, how it has been used in Indian homes, what the research does and does not say, and which of our products contain it. Nothing here is medical advice.</p>
          </div>
        </div>
      </section>
      <section className="wrap py-12"><IngredientBrowser /></section>
    </>
  );
}
