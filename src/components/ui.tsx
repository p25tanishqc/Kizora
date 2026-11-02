import Link from 'next/link';
import { bySlug, img, inr, partsOf, type Product } from '@/data/products';

export function Confirm({ children, note = 'Needs founder approval' }: { children: React.ReactNode; note?: string }) {
  return <span className="needs-approval" title={note}>{children}</span>;
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[13px] text-ink2">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden className="text-line">/</span>}
              {c.href && i < all.length - 1 ? <Link href={c.href} className="hover:text-ink">{c.name}</Link> : <span aria-current="page" className="text-ink">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.href ? `https://kizoraskincare.com${c.href}` : undefined })) }} />
    </>
  );
}

export function ProductCard({ p, note, priority = false }: { p: Product; note?: string; priority?: boolean }) {
  return (
    <Link href={`/products/${p.slug}/`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {p.kind === 'kit'
          ? <div className="flex h-full items-center bg-white"><Mosaic slugs={p.components!} size="card" className="w-full transition-transform duration-700 group-hover:scale-[1.03]" /></div>
          : /* eslint-disable-next-line @next/next/no-img-element */
            <img src={img(p.slug, 'card')} alt={p.size ? `${p.name}, ${p.size}` : p.name} loading={priority ? 'eager' : 'lazy'} width={600} height={750}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}
        {p.kind === 'kit' && <span className="absolute left-3 top-3 rounded-sm bg-cream/90 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.12em]">Kit</span>}
      </div>
      <div className="mt-3.5 md:flex md:items-start md:justify-between md:gap-3">
        <div>
          <h3 className="font-serif text-[17px] leading-snug group-hover:underline group-hover:decoration-gold/70 group-hover:underline-offset-4 md:text-[18px]">{p.name}</h3>
          <p className="mt-0.5 hidden text-[13.5px] text-ink2 sm:block">{note ?? p.oneLine}</p>
        </div>
        <div className="mt-1 flex items-baseline gap-2 md:mt-0 md:block md:shrink-0 md:text-right">
          <div className="font-medium">{inr(p.price)}</div>
          {p.size && <div className="text-[12px] text-ink2">{p.size}</div>}
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid({ slugs, cols = 'sm:grid-cols-2 lg:grid-cols-4' }: { slugs: string[]; cols?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 ${cols}`}>
      {slugs.map(s => { const p = bySlug(s); return p ? <ProductCard key={s} p={p} /> : null; })}
    </div>
  );
}

export function SectionHead({ eyebrow, title, children, align = 'left' }: { eyebrow?: string; title: string; children?: React.ReactNode; align?: 'left' | 'center' }) {
  return (
    <div className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-[32px] md:text-[42px]">{title}</h2>
      {children && <div className="lead mt-4">{children}</div>}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string; confirm?: boolean }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <details key={i} className="group py-5">
          <summary className="flex items-start justify-between gap-6 font-serif text-[19px]">
            <span>{f.q}</span><span className="chev mt-1 text-xl leading-none text-ink2 transition-transform" aria-hidden>+</span>
          </summary>
          <p className="mt-3 max-w-3xl text-ink2">{f.confirm ? <Confirm>{f.a}</Confirm> : f.a}</p>
        </details>
      ))}
    </div>
  );
}

const COLS = ['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5'];
/** Original product photos side by side, uncropped (each photo is 4:5). Kits expand to their products. */
export function Mosaic({ slugs, srcs, size = 'main', cols, className = '', priority = false }: { slugs?: string[]; srcs?: { src: string; alt: string }[]; size?: 'main' | 'card'; cols?: number; className?: string; priority?: boolean }) {
  const list = srcs ?? Array.from(new Set((slugs ?? []).flatMap(partsOf))).map(s => ({ src: img(s, size), alt: bySlug(s)?.name ?? '' }));
  return (
    <div className={`grid gap-1.5 bg-white ${COLS[cols ?? Math.min(list.length, 5)]} ${className}`}>
      {list.map(({ src, alt }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt={alt} width={size === 'card' ? 600 : 1200} height={size === 'card' ? 750 : 1500} loading={priority ? 'eager' : 'lazy'} className="aspect-[4/5] w-full object-cover" />
      ))}
    </div>
  );
}
