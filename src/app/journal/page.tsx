import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/site';
import { Crumbs } from '@/components/ui';

export const metadata: Metadata = { title: 'Journal | Notes from Kizora', description: 'How our soaps are made, how to use moringa oil, and simple seasonal rituals.', alternates: { canonical: '/journal/' } };

export default function Journal() {
  const [first, ...rest] = articles;
  return (
    <div className="wrap pb-10 pt-8">
      <Crumbs items={[{ name: 'Journal' }]} />
      <h1 className="mt-10 text-[46px] md:text-[60px]">Journal</h1>
      <p className="lead mt-3 max-w-xl">Notes on how things are made and how to use them. <span className="needs-approval" title="Draft articles for founder review">Draft articles for review.</span></p>
      <Link href={`/journal/${first.slug}/`} className="group mt-12 grid gap-8 border-y border-line py-10 md:grid-cols-2 md:items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={first.image} alt="" className="aspect-[3/2] w-full rounded-[3px] object-cover" />
        <div><p className="eyebrow">{first.read} read</p><h2 className="mt-3 text-[34px] group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4 md:text-[42px]">{first.title}</h2><p className="lead mt-4">{first.dek}</p></div>
      </Link>
      <div className="grid gap-10 py-12 md:grid-cols-2">
        {rest.map(a => (
          <Link key={a.slug} href={`/journal/${a.slug}/`} className="group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.image} alt="" loading="lazy" className="aspect-[3/2] w-full rounded-[3px] object-cover" />
            <p className="eyebrow mt-5">{a.read} read</p>
            <h2 className="mt-2 text-[26px] group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{a.title}</h2>
            <p className="mt-2 text-ink2">{a.dek}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
