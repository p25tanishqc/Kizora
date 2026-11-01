'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useCart } from './cart';
import { collections } from '@/data/collections';
import { SITE } from '@/data/site';

export function PrototypeBar() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try { if (sessionStorage.getItem('kz-approvals') === '1') setOn(true); } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('show-approvals', on);
    try { sessionStorage.setItem('kz-approvals', on ? '1' : '0'); } catch { /* ignore */ }
  }, [on]);
  return (
    <div className="bg-[#2B231F] text-[12px] text-cream/85">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5">
        <span><b className="font-medium text-gold">Prototype preview</b><span className="hidden sm:inline"> · proposed redesign, not the live store</span> · no orders taken</span>
        <span className="flex items-center gap-4">
          <button onClick={() => setOn(v => !v)} aria-pressed={on} className="underline decoration-cream/40 underline-offset-2 hover:text-cream">
            {on ? 'Hide' : 'Show'} <span className="hidden sm:inline">items </span>to confirm
          </button>
          <Link href="/prototype-notes/" className="underline decoration-cream/40 underline-offset-2 hover:text-cream">What changed</Link>
        </span>
      </div>
    </div>
  );
}

const SHOP_GROUPS = ['Face', 'Body', 'Lips', 'Hair', 'Sets'] as const;

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [shop, setShop] = useState(false);
  const [search, setSearch] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const q = useRef<HTMLInputElement>(null);
  useEffect(() => { setMenu(false); setShop(false); setSearch(false); }, [path]);
  useEffect(() => { if (search) q.current?.focus(); }, [search]);
  const active = (p: string) => path?.startsWith(p) ? 'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gold' : '';

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
      <div className="bg-ink text-center text-[12.5px] tracking-[0.04em] text-cream">
        <div className="wrap py-2">
          Free delivery above ₹799 <span className="hidden sm:inline"><span className="text-cream/50">·</span> Dispatched in 1 to 3 working days </span><span className="text-cream/50">·</span> Cash on delivery
          <span className="needs-approval ml-1 text-[11px]" title="Needs founder approval">(to confirm)</span>
        </div>
      </div>
      <div className="wrap flex h-[68px] items-center justify-between md:h-[78px]">
        <button className="-ml-2 p-2 md:hidden" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
        </button>
        <Link href="/" aria-label="Kizora Skincare, home" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.webp" alt="Kizora Skincare" width={671} height={315} className="h-[38px] w-auto md:h-[48px]" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 text-[13px] font-medium uppercase tracking-[0.14em] md:flex">
          <div className="relative" onMouseEnter={() => setShop(true)} onMouseLeave={() => setShop(false)}>
            <Link href="/shop/" className={`relative ${active('/shop') || active('/collections') || active('/products')}`} aria-haspopup="true" aria-expanded={shop} onFocus={() => setShop(true)}>Shop</Link>
            {shop && (
              <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-6">
                <div className="grid w-[640px] grid-cols-5 gap-6 border border-line bg-cream p-7 normal-case tracking-normal shadow-[0_20px_40px_-20px_rgba(58,47,42,.25)]">
                  {SHOP_GROUPS.map(g => (
                    <div key={g}>
                      <p className="eyebrow mb-3 text-[11px]">{g}</p>
                      <ul className="space-y-2 text-[14.5px] font-normal">
                        {collections.filter(c => c.group === g && c.slug !== 'aloe-vera-essentials').map(c => <li key={c.slug}><Link href={`/collections/${c.slug}/`} className="hover:underline">{c.name}</Link></li>)}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-5 flex items-center justify-between border-t border-line pt-4 text-[14px] font-normal">
                    <Link href="/shop/" className="link">Shop all 19 products</Link>
                    <span className="text-ink2">Or start with a <Link href="/rituals/" className="link">ritual</Link></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link href="/rituals/" className={`relative ${active('/rituals')}`}>Rituals</Link>
          <Link href="/ingredients/" className={`relative ${active('/ingredients')}`}>Ingredients</Link>
          <Link href="/about/" className={`relative ${active('/about')}`}>Our story</Link>
          <Link href="/journal/" className={`relative ${active('/journal')}`}>Journal</Link>
        </nav>
        <div className="flex items-center gap-1 md:gap-3">
          <button className="p-2" aria-label="Search" onClick={() => setSearch(s => !s)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
          </button>
          <button className="relative -mr-2 p-2" aria-label={`Cart, ${count} items`} onClick={() => setOpen(true)}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 8h14l-1.2 12H6.2L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
            {count > 0 && <span className="absolute right-0 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-gold px-1 text-[10.5px] font-semibold text-ink">{count}</span>}
          </button>
        </div>
      </div>
      {search && (
        <div className="border-t border-line bg-cream">
          <form className="wrap flex items-center gap-3 py-4" onSubmit={e => { e.preventDefault(); router.push(`/shop/?q=${encodeURIComponent(q.current?.value ?? '')}`); }}>
            <label htmlFor="site-search" className="sr-only">Search products and ingredients</label>
            <input id="site-search" ref={q} placeholder="Search: aloe, rose, moringa, soap, heels…" className="flex-1 border-b border-ink bg-transparent py-2 text-lg outline-none placeholder:text-ink2/60" />
            <button className="btn">Search</button>
          </form>
        </div>
      )}
      {/* mobile menu */}
      <div className={`fixed inset-0 z-[70] md:hidden ${menu ? '' : 'pointer-events-none'}`} aria-hidden={!menu}>
        <div className={`absolute inset-0 bg-ink/30 transition-opacity ${menu ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMenu(false)} />
        <nav aria-label="Mobile" className={`absolute left-0 top-0 h-full w-[86%] max-w-[360px] overflow-y-auto bg-cream px-6 pb-10 pt-5 transition-transform duration-300 ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="mb-6 flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.webp" alt="Kizora Skincare" className="h-9 w-auto" />
            <button onClick={() => setMenu(false)} aria-label="Close menu" className="text-3xl leading-none">×</button>
          </div>
          <ul className="divide-y divide-line border-y border-line font-serif text-[22px]">
            <li><Link href="/rituals/morning/" className="block py-3.5">Morning ritual</Link></li>
            <li><Link href="/rituals/evening/" className="block py-3.5">Evening ritual</Link></li>
            <li><Link href="/shop/" className="block py-3.5">Shop all</Link></li>
            <li><Link href="/ingredients/" className="block py-3.5">Ingredients</Link></li>
            <li><Link href="/about/" className="block py-3.5">Our story</Link></li>
            <li><Link href="/journal/" className="block py-3.5">Journal</Link></li>
          </ul>
          <p className="eyebrow mb-3 mt-8">Shop by type</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[15px]">
            {collections.filter(c => c.slug !== 'aloe-vera-essentials').map(c => <li key={c.slug}><Link href={`/collections/${c.slug}/`}>{c.name}</Link></li>)}
          </ul>
          <a href={`https://wa.me/${SITE.whatsapp}`} className="btn-ghost mt-10 w-full" target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-[14.5px] text-cream/80">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.webp" alt="Kizora Skincare" className="h-12 w-auto" loading="lazy" />
          <p className="mt-5 max-w-[300px] leading-relaxed">Small-batch skincare made near Kanha, Madhya Pradesh. Simple daily rituals with ingredients you can name.</p>
          <p className="mt-6 font-serif text-xl italic text-cream">Care, when done consistently, becomes ritual.</p>
        </div>
        <FooterCol title="Shop" links={[['Face gels', '/collections/face-gels/'], ['Face mists', '/collections/face-mists/'], ['Oils', '/collections/oils/'], ['Soaps & bath', '/collections/bath-body/'], ['Lip care', '/collections/lip-care/'], ['Hands & feet', '/collections/hands-feet/'], ['Hair', '/collections/hair/'], ['Sets & kits', '/collections/sets-hampers/']]} />
        <FooterCol title="Learn" links={[['Morning ritual', '/rituals/morning/'], ['Evening ritual', '/rituals/evening/'], ['Ingredient library', '/ingredients/'], ['How it\'s made', '/how-its-made/'], ['Journal', '/journal/'], ['FAQ', '/faq/']]} />
        <div>
          <FooterCol title="Help" links={[['Contact us', '/contact/'], ['Shipping', '/shipping/'], ['Returns', '/returns/'], ['Your cart', '/cart/']]} />
          <p className="mt-6">WhatsApp <a className="link text-cream" href={`https://wa.me/${SITE.whatsapp}`}>{SITE.phone}</a><br /><a className="link text-cream" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="wrap flex flex-col gap-2 py-6 text-[12.5px] text-cream/55 md:flex-row md:justify-between">
          <span>© 2026 Kizora Skincare, a brand of <span className="needs-approval" title="Confirm legal entity">Naturekit LLP</span>. Prototype preview for discussion.</span>
          <span className="flex gap-5"><a href="https://www.instagram.com/kizora.skincare/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.facebook.com/kizora.life" target="_blank" rel="noopener noreferrer">Facebook</a><Link href="/prototype-notes/">Prototype notes</Link></span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-[12px] font-medium uppercase tracking-eyebrow text-gold">{title}</h2>
      <ul className="space-y-2.5">{links.map(([t, h]) => <li key={h}><Link href={h} className="hover:text-cream">{t}</Link></li>)}</ul>
    </div>
  );
}

export function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi Kizora, I have a question about')}`} target="_blank" rel="noopener noreferrer"
      aria-label="Ask us on WhatsApp" className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-sage-deep text-cream shadow-lg transition hover:bg-ink md:bottom-6 md:right-6">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" /></svg>
    </a>
  );
}
