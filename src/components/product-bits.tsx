'use client';
import { useEffect, useRef, useState } from 'react';
import { useCart } from './cart';
import { inr } from '@/data/products';

export function Gallery({ images }: { images: { src: string; alt: string; label: string }[] }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-white">
        {images.map((im, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={im.src} src={im.src} alt={im.alt} width={1200} height={1500}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${k === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2.5" role="tablist" aria-label="Product images">
          {images.map((im, k) => (
            <button key={im.src} role="tab" aria-selected={k === i} aria-label={im.label} onClick={() => setI(k)}
              className={`h-[90px] w-[72px] overflow-hidden rounded-[2px] border bg-white ${k === i ? 'border-ink' : 'border-line opacity-80 hover:opacity-100'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function BuyBox({ slug, price, name }: { slug: string; price: number; name: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <>
      <div ref={ref} className="flex gap-3">
        <div className="flex items-center border border-ink/60">
          <button aria-label="Decrease quantity" className="h-12 w-11 text-lg" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
          <span className="w-8 text-center" aria-live="polite">{qty}</span>
          <button aria-label="Increase quantity" className="h-12 w-11 text-lg" onClick={() => setQty(q => q + 1)}>+</button>
        </div>
        <button className="btn flex-1" onClick={() => add(slug, qty)}>Add to cart · {inr(price * qty)}</button>
      </div>
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 p-3 backdrop-blur transition-transform pr-20 md:hidden ${sticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1"><p className="truncate font-serif text-[16px]">{name}</p><p className="text-[13px] text-ink2">{inr(price)}</p></div>
          <button className="btn px-5" onClick={() => add(slug, 1)}>Add to cart</button>
        </div>
      </div>
    </>
  );
}

export function AddKit({ slug, price, label }: { slug: string; price: number; label?: string }) {
  const { add } = useCart();
  return <button className="btn-gold w-full" onClick={() => add(slug)}>{label ?? `Add the kit · ${inr(price)}`}</button>;
}

export function AddSmall({ slug }: { slug: string }) {
  const { add } = useCart();
  return <button className="btn-ghost px-4 py-2 text-[12px]" onClick={() => add(slug)} aria-label="Add to cart">Add</button>;
}
