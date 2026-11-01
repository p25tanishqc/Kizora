import type { Metadata } from 'next';
import Link from 'next/link';
import { Confirm, Crumbs, ProductGrid } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About Kizora | Made slowly, near Kanha',
  description: 'How Kizora began, who makes it, and why our soaps take a month. A small-batch skincare brand made near Kanha National Park, Madhya Pradesh.',
  alternates: { canonical: '/about/' },
};

export default function About() {
  return (
    <>
      <section className="wrap pt-8">
        <Crumbs items={[{ name: 'Our story' }]} />
        <div className="grid gap-12 pb-16 pt-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="eyebrow">Our story</p>
            <h1 className="mt-3 text-[48px] leading-[1.05] md:text-[72px]">Made slowly, near Kanha.</h1>
            <div className="lead mt-8 space-y-5">
              <p><Confirm note="Founder to approve wording">Kizora began with two people. Bikash spent more than twenty years in fashion and beauty, with names like Raghavendra Rathore, Ritu Kumar and Nykaa. A friend of his, trained in botany, had set up a small unit near Kanha National Park in Madhya Pradesh to make products with the villages around it.</Confirm></p>
              <p>Today that unit makes what we sell. Bikash looks after the brand from Gurugram; his partner looks after the making and the quality.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['The founder', 'Our botanist partner', 'The unit near Kanha (with consent of people shown)'].map((t, k) => (
              <div key={t} className={`flex items-center justify-center rounded-[3px] border border-dashed border-line bg-[repeating-linear-gradient(45deg,#F1EADD,#F1EADD_10px,#ECE3D3_10px,#ECE3D3_20px)] p-4 text-center text-[12px] uppercase tracking-[0.1em] text-ink2 ${k === 2 ? 'col-span-2 aspect-[2/1]' : 'aspect-[4/5]'}`}>
                <span className="needs-approval" title="Real photo needed">Real photo: {t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-center text-cream">
        <div className="wrap max-w-3xl">
          <p className="font-serif text-[30px] italic leading-snug text-cream md:text-[40px]">“No compromise on quality. Follow every rule and keep every document. Build around a strong idea, and build it to last.”</p>
          <p className="mt-6 text-[12.5px] uppercase tracking-[0.18em] text-gold"><Confirm note="Paraphrased from the founder interview; approve exact words">Bikash, founder · his three principles, paraphrased</Confirm></p>
        </div>
      </section>

      <section className="wrap grid gap-12 py-20 md:grid-cols-3">
        {[
          ['Slow, on purpose', 'Few machines, wooden and stone tools, oils extracted slowly. Our natural soaps cure for 21 to 28 days, and moringa seeds are dried in the sun before pressing.'],
          ['Clean, not loud', 'We make clean skincare and say plainly what is in it. We do not call our products Ayurvedic or organic while those certifications are still in process.'],
          ['A few products, each with a job', 'Nineteen products today, chosen so that a morning or evening ritual stays short. New ones arrive with the seasons.'],
        ].map(([h, t]) => <div key={h} className="border-t border-gold pt-6"><h2 className="text-[26px]">{h}</h2><p className="mt-3 text-ink2">{t}</p></div>)}
      </section>

      <section className="bg-sage-mist py-20">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow">Ingredient philosophy</p><h2 className="mt-3 text-[34px] md:text-[44px]">Ingredients you already know.</h2>
              <p className="lead mt-4 max-w-xl">Aloe, rose, moringa, turmeric, ghee. Made to be gentle for daily use; if your skin is very reactive, patch test first.</p></div>
            <Link href="/ingredients/" className="btn">The ingredient library</Link>
          </div>
          <ProductGrid slugs={['pure-aloe-vera-gel', 'rose-hydrating-mist', 'cold-pressed-moringa-oil', 'ubtan-bathing-bar']} />
        </div>
      </section>

      <section className="wrap grid gap-10 py-20 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-[34px]">Who we make for</h2>
          <p className="lead mt-4">Mostly women between 25 and 45 who want a short routine they can trust, and many who buy for their parents and children too. Some of our customers have been ordering from us every month on WhatsApp since before this website existed.</p>
        </div>
        <div className="rounded-[3px] bg-paper p-8">
          <p className="eyebrow">Talk to us</p>
          <p className="mt-3 text-[17px]">WhatsApp is still the fastest way to reach us, for a question about your skin or an order.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href="/contact/" className="btn-ghost">Contact</Link><Link href="/how-its-made/" className="btn">How it&apos;s made</Link></div>
        </div>
      </section>
    </>
  );
}
