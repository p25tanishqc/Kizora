# Kizora Skincare: website redesign prototype

A working, navigable prototype of the proposed new **kizoraskincare.com**, built from the
*Kizora Website Transformation Report* (1 November 2026) and the founder interviews.

It is **separate from the live store**, takes **no orders**, stores the demo cart only in the
visitor's browser, and tells search engines **not to index it**.

> Stakeholder tip: click **"Show items to confirm"** in the dark bar at the top of any page.
> Every price, claim or fact that still needs Mr. Bikash's approval lights up. The
> **"What changed"** link opens a before/after log mapped to the report's issue IDs (K-01 to K-24).

---

## What is inside

| Area | Pages |
|---|---|
| Home | `/`: new positioning ("Slow-made care for everyday rituals."), rituals, shop by step, process, ingredients, winter set, journal |
| Shop | `/shop/` with search (product **and** ingredient names, incl. haldi, mulethi, besan), filters (type, need, skin type, price) and sort |
| Collections | 9 corrected collections, e.g. `/collections/face-gels/` (the three aloe gels + comparison table) |
| Products | 19 product pages + 5 ritual kits at `/products/<slug>/`, each with full ingredients, "Contains" notes, how to use, FAQ, "use with", Product schema |
| Rituals | `/rituals/`, `/rituals/morning/`, `/rituals/evening/`: real products in order, honest gaps (no face wash, no sunscreen), add-the-kit |
| Ingredients | `/ingredients/` (filter + search) and 12 profiles that separate tradition from evidence, with sources and product links |
| Story & help | `/about/`, `/how-its-made/`, `/journal/` (3 draft articles), `/faq/`, `/contact/`, `/shipping/`, `/returns/` |
| Cart | Slide-out cart + `/cart/` with a free-delivery meter and a demo checkout |
| Notes | `/prototype-notes/`: change log, items to confirm, prototype limits |

Tech: **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, exported as a fully static site
(`output: 'export'`). Fonts (Playfair Display, Jost) are self-hosted. No backend, no database.

---

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in /out
npm start            # serves /out on http://localhost:3000
```

Node 18.17 or newer.

## Deploy a private preview

### Vercel (recommended)
1. Go to <https://vercel.com/new> and import the GitHub repo `p25tanishqc/Kizora`.
2. Framework preset: **Next.js** (auto-detected). Build command `npm run build`, output is handled automatically.
3. Click **Deploy**. You get a URL like `kizora-xxxx.vercel.app` to share.
4. Keep it private: *Project → Settings → Deployment Protection*. "Vercel Authentication" protects
   preview deployments on every plan; password protection for the production URL needs a paid plan.
   Either way, the site already sends `noindex, nofollow` (page meta, `robots.txt`, and an
   `X-Robots-Tag` header from `vercel.json`).

### Netlify
1. *Add new site → Import an existing project* → pick the repo.
2. Build command `npm run build`, publish directory `out` (already set in `netlify.toml`).
3. Optional: *Site configuration → Access control → Password protection* (paid plans) or keep the URL unlisted.

### Any static host
Upload the contents of `/out` after `npm run build`.

### Hosting inside a sub-folder
`npm run build && node scripts/make-portable.mjs preview` writes a copy where every URL is relative
(pages are opened as `.../index.html`), so it works from any folder or preview host. Add `--rename-next`
if the host rejects folder names that start with an underscore.

> **Never** set `NEXT_PUBLIC_ALLOW_INDEXING=true` on the prototype. That flag exists only for a
> future production build on the real domain.

---

## Project structure

```
src/
  app/                    one folder per route (App Router); metadata + JSON-LD per page
  components/             header/footer, cart, product gallery, shop & ingredient browsers, ritual view
  data/
    products.ts           19 products + 5 kits: prices, sizes, ingredient lists AS PUBLISHED, approvals
    collections.ts        corrected collections (with the old URLs they replace)
    ingredients.ts        12 ingredient profiles + "every other ingredient" map
    site.ts               rituals, journal articles, FAQ, change log, approval list
  fonts/                  self-hosted woff2
public/images/            all images used by the site (WebP)
assets-source/
  photos-original/        Kizora's own product photos (captured from the live site)
  cutouts/                transparent PNG cut-outs made from them
tools/images/             Python pipeline that builds every product scene from the cut-outs
docs/                     change log, approvals, SEO/AEO notes, image prompts, report checklist
```

### Editing content
* **A product's text, price or ingredients**: `src/data/products.ts`. Kit prices are computed as
  the sum of their components, so they update automatically.
* **Ritual steps**: `rituals` in `src/data/site.ts`.
* **FAQ / articles / change log**: `src/data/site.ts`.
* Anything wrapped in `<Confirm>` or listed in a product's `approvals` shows up under
  "Show items to confirm".

### Rebuilding the product images
Every product scene uses Kizora's real photo, cut out and placed **unaltered** (label, colour and
proportions untouched) on a generated warm background with soft shadows.

```bash
pip install pillow numpy scipy rembg onnxruntime
python tools/images/cut.py            # photos-original -> cutouts (milk bar mask is hand-made, see note in cut.py)
python tools/images/build_images.py   # cutouts -> public/images/{products,kits,collections,rituals,home}
```
Each product page also shows the untouched studio photo as its second image.
Prompts for the real photography and for AI-assisted backgrounds are in `docs/IMAGE_PROMPTS.md`.

---

## Prototype limits (by design)
* No payments, no orders, no accounts. The cart lives in `localStorage` of the visitor's browser.
* No reviews are displayed because none exist on the website yet; none were written.
* Shipping and returns pages are plain-language summaries pending legal review.
* Analytics, Meta Pixel and WooCommerce/Shopify are not connected (see `docs/SEO-AEO.md` for the event plan).
* Photos of the unit, the makers and the winter hampers are placeholders until real ones are shot.

See `docs/CHANGELOG.md` for the full before/after list and `docs/APPROVALS.md` for open decisions.
