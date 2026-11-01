import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="wrap py-28 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 text-[44px]">This page has moved, or never existed.</h1>
      <p className="lead mx-auto mt-4 max-w-lg">Try the shop, or start with a ritual.</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/shop/" className="btn">Shop all</Link><Link href="/rituals/" className="btn-ghost">Rituals</Link></div>
    </section>
  );
}
