import type { MetadataRoute } from 'next';
import { allItems } from '@/data/products';
import { collections } from '@/data/collections';
import { ingredients } from '@/data/ingredients';
import { articles } from '@/data/site';

export const dynamic = 'force-static';
const B = 'https://kizoraskincare.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/shop/', '/rituals/', '/rituals/morning/', '/rituals/evening/', '/ingredients/', '/about/', '/how-its-made/', '/journal/', '/faq/', '/contact/', '/shipping/', '/returns/'];
  return [
    ...pages.map(p => ({ url: B + p })),
    ...collections.map(c => ({ url: `${B}/collections/${c.slug}/` })),
    ...allItems.map(p => ({ url: `${B}/products/${p.slug}/` })),
    ...ingredients.map(i => ({ url: `${B}/ingredients/${i.slug}/` })),
    ...articles.map(a => ({ url: `${B}/journal/${a.slug}/` })),
  ];
}
