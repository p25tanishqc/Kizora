import type { Metadata } from 'next';
import Link from 'next/link';
import { APPROVALS, changelog, reviewLog } from '@/data/site';
import { allItems } from '@/data/products';
import { ReviewToggle } from '@/components/chrome';
import { Crumbs } from '@/components/ui';

export const metadata: Metadata = { title: 'Prototype notes: what changed | Kizora', description: 'Before-and-after change log for the Kizora website prototype, mapped to the Website Transformation Report.', robots: { index: false } };

export default function Notes() {
  return (
    <section className="wrap pb-10 pt-8">
      <Crumbs items={[{ name: 'Prototype notes' }]} />
      <div className="max-w-3xl pt-10">
        <p className="eyebrow">For Mr. Bikash and the Kizora team</p>
        <h1 className="mt-3 text-[44px] md:text-[56px]">What changed, and why</h1>
        <p className="lead mt-5">This is a working prototype of the proposed Kizora website. It is separate from the live store at kizoraskincare.com, is hidden from search engines, and takes no orders. Each change below is mapped to an issue ID in the Website Transformation Report (1 November 2026).</p>
        <p className="mt-4 text-[15px]">Turn on review mode to highlight, on every page, the prices, claims and facts that still need your approval. Customers never see these notes.</p>
        <div className="mt-5"><ReviewToggle /></div>
      </div>

      <h2 className="mt-14 text-[30px]">Second review, 2 November 2026</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left text-[14.5px]">
          <thead><tr className="bg-ink text-[12px] uppercase tracking-[0.12em] text-cream"><th className="p-3">ID</th><th className="p-3">Priority</th><th className="p-3">What changed</th><th className="p-3">See it</th></tr></thead>
          <tbody>{reviewLog.map((c, i) => (
            <tr key={c.id} className={`border-b border-line align-top ${i % 2 ? 'bg-paper' : ''}`}>
              <td className="p-3 font-medium">{c.id}</td><td className="p-3">{c.pri}</td><td className="p-3">{c.change}</td>
              <td className="p-3"><Link href={c.url} className="link whitespace-nowrap">Open →</Link></td>
            </tr>))}
          </tbody>
        </table>
      </div>
      <h2 className="mt-14 text-[30px]">First review: live site vs prototype</h2>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-[14.5px]">
          <thead><tr className="bg-ink text-[12px] uppercase tracking-[0.12em] text-cream"><th className="p-3">ID</th><th className="p-3">Area</th><th className="p-3">Live site today</th><th className="p-3">In this prototype</th><th className="p-3">See it</th></tr></thead>
          <tbody>{changelog.map((c, i) => (
            <tr key={c.id} className={`border-b border-line align-top ${i % 2 ? 'bg-paper' : ''}`}>
              <td className="p-3 font-medium">{c.id}</td><td className="p-3">{c.area}</td><td className="p-3 text-ink2">{c.before}</td><td className="p-3">{c.after}</td>
              <td className="p-3"><Link href={c.link} className="link whitespace-nowrap">Open →</Link></td>
            </tr>))}
          </tbody>
        </table>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-[30px]">Still to confirm</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-ink2">{APPROVALS.map(a => <li key={a}>{a}</li>)}</ul>
          <h3 className="mt-10 text-[24px]">By product</h3>
          <dl className="mt-4 space-y-4 text-[14.5px]">
            {allItems.filter(p => p.approvals?.length).map(p => (
              <div key={p.slug}><dt className="font-medium"><Link href={`/products/${p.slug}/`} className="link">{p.name}</Link></dt>
                <dd><ul className="mt-1 list-disc pl-5 text-ink2">{p.approvals!.map(a => <li key={a}>{a}</li>)}</ul></dd></div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="text-[30px]">How the product images were made</h2>
          <p className="mt-4 text-ink2">Every product photo is Kizora&apos;s own photo from the live site. We cut each product out of its white background and placed it, unaltered, on a warm surface with soft shadows and a light leaf shadow. Labels, colours and proportions are untouched. Each product page also keeps the original studio photo. Real photos of the unit, the makers and the winter hampers are still needed.</p>
          <h2 className="mt-10 text-[30px]">Prototype limits</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink2">
            <li>Cart is stored only in your browser; checkout and sign-up are demonstrations.</li>
            <li>No reviews are shown because none exist on the website yet. None were written for this preview.</li>
            <li>Policies are plain-language summaries pending legal review.</li>
            <li>Analytics, Meta Pixel and payments are not connected.</li>
            <li>{allItems.length} product and kit pages, 12 ingredient profiles and 3 journal articles (awaiting founder review) are included.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
