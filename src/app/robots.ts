import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// Prototype: block every crawler. For the live site, see docs/SEO-AEO.md for the recommended rules.
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true') {
    return { rules: [{ userAgent: '*', allow: '/', disallow: ['/cart/'] }], sitemap: 'https://kizoraskincare.com/sitemap.xml' };
  }
  return { rules: [{ userAgent: '*', disallow: '/' }] };
}
