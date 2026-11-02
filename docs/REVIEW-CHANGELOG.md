# Critical review changes: KZ-01 to KZ-18

Review document: "Kizora Website Critical Review, Claude Implementation" (2 November 2026).
Preview: https://kizora-six.vercel.app/ (noindex, prototype only, no orders processed).

Commits on `main`:

- `065c6a7` Apply critical review fixes KZ-01 to KZ-18
- `ab8c8f2` Review follow-ups found during AFTER checks
- the commit that adds this file (contrast, menu and drawer accessibility, notes table, final screenshots)

BEFORE screenshots were taken on the deployed site before any change. AFTER screenshots were taken on the same deployed site after Vercel rebuilt from GitHub. All are in `docs/review-screenshots/`. Desktop shots are 1280 x 800 (saved at 800 x 500). Mobile shots are 375 x 812 (saved at 750 x 1624).

## Change log

| ID | Files changed | URL | Exact change | Before | After | QA result |
|---|---|---|---|---|---|---|
| KZ-01 | `src/app/page.tsx` | `/` | Ritual subheading now reads exactly: "A little care to begin your day, a little calm to end it. Simple rituals, thoughtfully made by us." | S01-home-rituals-before.jpg | S01-home-rituals-after.jpg | Pass. Text checked on the live preview. |
| KZ-02 | `src/data/collections.ts` | `/collections/face-gels/` | Intro now reads exactly: "Three refreshing aloe gels, each made with 99% aloe leaf gel. Lightweight, cooling and quick to absorb, they're perfect for both face and body." Products and table unchanged. | S02-face-gels-top-before.jpg | S02-face-gels-top-after.jpg | Pass. |
| KZ-03 | `src/data/site.ts` | `/rituals/morning/` | Step 4 sunscreen card removed. One note only: "Use your usual gentle face wash before the ritual, and finish with a broad-spectrum sunscreen. These are not included in the kit." | S03-morning-sunscreen-kit-before.jpg | S03-morning-sunscreen-kit-after.jpg | Pass. Only one sunscreen mention on the page. |
| KZ-04 | `src/components/ritual-view.tsx`, `src/app/page.tsx`, `src/data/products.ts` | `/rituals/morning/`, `/` | Kit shown as "Morning Ritual Kit · 2 essentials: Rose Hydrating Mist + Pure Aloe Vera Gel. Add a lip balm separately if you like." "Includes mist + gel" sits by the CTA on the ritual page and the homepage card. Lip balm step marked "optional, not in the kit". Kit box lists the two items and total. | S04a-morning-hero-before.jpg, S04m-mobile-morning-kit-before.jpg | S04a-morning-hero-after.jpg, S04b-home-ritual-cards-after.jpg, S04m-mobile-morning-kit-after.jpg | Pass. Add-the-kit puts ₹950 in the demo cart (scripted test). |
| KZ-05 | `src/components/ritual-view.tsx`, `src/data/products.ts`, `src/data/site.ts`, `src/app/page.tsx` | `/rituals/evening/` | Two choices: "Evening essentials · 2 products · ₹1,060" and "Complete evening ritual · 5 products · ₹2,505", in the hero, on the homepage card and side by side in the kit box. Steps are tagged "In evening essentials" or "in the complete ritual". The note under the steps now explains the two options. | S05-evening-kit-before.jpg | S05a-evening-hero-after.jpg, S05-evening-kit-after.jpg | Pass. Totals come from product data. |
| KZ-06 | `src/app/products/[slug]/page.tsx`, `src/app/prototype-notes/page.tsx`, `src/components/chrome.tsx` | `/products/pure-aloe-vera-gel/` | "To confirm" lists removed from every product page, even in review mode. Open items are listed per product on `/prototype-notes/`. Review mode is switched on from that page only. | S06-pdp-aloe-internal-notes-before.jpg (review mode on) | S06-pdp-aloe-internal-notes-after.jpg (review mode on) | Pass. Scripted check: no "To confirm" text on product pages. |
| KZ-07 | `src/app/page.tsx`, `src/app/layout.tsx`, `src/data/products.ts`, `src/app/products/[slug]/page.tsx` | `/`, `/products/kuppaimeni-soap/` | "Full ingredient lists" replaced with "Ingredients explained clearly". The four products without a full list now show the heading "Key ingredients". | S07a-home-ingredient-claim-before.jpg, S07b-kuppaimeni-ingredients-before.jpg | S07a-home-ingredient-claim-after.jpg, S07b-kuppaimeni-ingredients-after.jpg | Pass. No "full ingredient" text in the built site. |
| KZ-08 | `src/app/collections/[slug]/page.tsx` | all `/collections/*/` | Redirect lines removed. The redirect map stays in `docs/SEO-AEO.md`. | S08-face-gels-redirect-before.jpg | S08-face-gels-redirect-after.jpg | Pass. |
| KZ-09 | `src/data/ingredients.ts`, `src/app/ingredients/[slug]/page.tsx`, `src/app/ingredients/page.tsx`, `src/components/ingredient-browser.tsx`, `src/components/chrome.tsx` | `/ingredients/aloe-vera/`, `/ingredients/desi-cow-ghee/` | Unverified INCI names replaced by the names on our labels. "Confirm" notes and "No single review cited" removed. Cautions written for customers (for example "It is a light hydrator, not a treatment for burns or acne"). Repeated disclaimers replaced by one footer line: "Information on this site is general guidance, not medical advice." | S09a-ingredient-aloe-before.jpg, S09b-ingredient-ghee-before.jpg | S09a-ingredient-aloe-after.jpg, S09b-ingredient-ghee-after.jpg, S09c-footer-disclaimer-after.jpg | Pass. |
| KZ-10 | `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/journal/*`, `src/data/products.ts`, `src/app/page.tsx` | `/about/`, `/contact/` | Photo placeholders, "Real photo" labels, the curing-rack caption, Draft labels, "Tin (size to confirm)" and the Hours row removed. About now uses a real product photo with a plain caption. | S10-about-placeholders-before.jpg | S10-about-placeholders-after.jpg | Pass. |
| KZ-11 | `src/data/products.ts`, `src/data/site.ts`, `src/app/how-its-made/page.tsx` | `/products/aloe-vera-bathing-bar/` | "The product page says" language removed. Aloe bar: "A gentle bathing bar for face and body, made by hand with aloe vera extract, coconut and olive oils. It is step one of our evening ritual." | S11-aloe-bar-pdp-before.jpg | S11-aloe-bar-pdp-after.jpg | Pass. |
| KZ-12 | `src/components/chrome.tsx`, `src/components/cart-view.tsx`, `src/data/site.ts`, `src/app/shipping/page.tsx` | `/cart/`, every page | Banner: "Prototype preview · Orders are not being processed." COD, payment methods and dispatch times removed. Empty cart shows Delivery "—". Small orders show "Calculated at checkout". | S12a-banner-before.jpg, S12b-cart-empty-before.jpg | S12a-banner-after.jpg, S12b-cart-empty-after.jpg | Pass. Scripted cart test: empty "—", ₹325 order "Calculated at checkout", ₹950 kit "Free". |
| KZ-13 | `src/app/page.tsx`, `src/app/products/[slug]/page.tsx` | `/`, product pages | Newsletter section and its "[Sign-up offer to be decided]" text removed. "Write a review" button removed. Reviews block reads "No reviews yet. Questions before choosing? Speak with our team on WhatsApp." | S13a-newsletter-before.jpg, S13b-pdp-reviews-before.jpg | S13a-newsletter-after.jpg, S13b-pdp-reviews-after.jpg | Pass. |
| KZ-14 | `src/data/products.ts`, `src/components/ui.tsx`, `src/app/page.tsx`, `src/app/collections/[slug]/page.tsx`, `src/app/ingredients/[slug]/page.tsx`, `public/images/`, `tools/images/enhance.py` | all product pages, kits, rituals, collections, home | Follow-up on 2 Nov: every product image replaced with the photo supplied by the founder team, matched to its label, upscaled 4x with Real-ESRGAN and saved at 1600 x 2000 (cards 600 x 750). New homepage image; aloe face image on Face gels and the aloe vera ingredient page. Kits and rituals show the product photos side by side. | n/a | n/a | Pass: every product page loads its new image; label match checked by eye. |
| KZ-15 | `src/app/page.tsx` | `/` | Unlinked Google rating removed. Replaced with "Questions before choosing? Speak with our team on WhatsApp." The founder-attributed foot butter line stays. | S14-home-social-proof-before.jpg | S14-home-social-proof-after.jpg | Pass. |
| KZ-16 | `src/data/products.ts`, `src/app/collections/[slug]/page.tsx`, `src/components/ritual-view.tsx` | `/collections/face-gels/`, rituals | The gel table, kit totals, ritual prices and structured data all read from `src/data/products.ts`. No generated technical names are shown to customers. | n/a | S08-face-gels-redirect-after.jpg | Pass. The table matches product page prices. |
| KZ-17 | `src/data/site.ts`, `src/app/journal/page.tsx`, `src/app/journal/[slug]/page.tsx` | `/journal/why-our-soaps-take-a-month/` | Draft labels removed. The saponification sentence was replaced with: "As the bars cure, excess water gradually evaporates, helping them become firmer and last longer in use." | S15a-journal-header-before.jpg, S15b-journal-curing-before.jpg | S15a-journal-header-after.jpg, S15b-journal-curing-after.jpg | Pass. |
| KZ-18 | `tailwind.config.ts`, `src/components/cart.tsx`, `src/components/chrome.tsx`, `src/app/contact/page.tsx`, `src/app/prototype-notes/page.tsx` | all | QA below. Fixes from QA: Contact page sideways scroll on phones; colour contrast (sage and gold); the closed cart drawer and mobile menu are no longer reachable by keyboard; a review-change table was added to `/prototype-notes/`. | S16a-mobile-home-top-before.jpg, S01m-mobile-home-rituals-before.jpg | S16a-mobile-home-top-after.jpg, S01m-mobile-home-rituals-after.jpg, S18-prototype-notes-after.jpg | See QA below. |

## QA that was actually run

- **Build:** `npm run build` passes, with 69 static pages. `tsc --noEmit` is clean.
- **Crawl** (local build, Playwright): all 62 HTML routes return 200, each has one H1, no broken images and no console errors.
- **Viewports** 375, 390, 768 and 1440: 15 key routes have no sideways scroll, return status 200 and carry the robots noindex tag. Contact overflowed on phones and was fixed.
- **Text search** of the built HTML, excluding `/prototype-notes/`, found none of these: "to confirm", "draft", "photo to come", "Real photo", "Live-site redirect", "product page says", "describes it", "to be decided", "full ingredient", "Cash on delivery", "COD", "UPI", "replace this", "No single review", "(confirm", "Write a review", "Hours", "Google rating", "Do not describe", "Do not claim".
- **Demo cart:**
  - Kit add works.
  - The drawer "View cart" link works.
  - Delivery shows "—" when the cart is empty, "Calculated at checkout" under ₹799 and "Free" at or above ₹799.
- **Review mode:**
  - It turns on from `/prototype-notes/` and carries across pages in the same tab.
  - Product pages show highlights only, with no internal lists.
- **Lighthouse 12.2.1** (local static server without compression, so treat performance as a rough guide):

  | Page | Run | Performance | Accessibility | Best practices | SEO |
  |---|---|---|---|---|---|
  | `/` | mobile | 69 | 100 | 100 | 69 |
  | `/` | desktop | 98 | 100 | 100 | 69 |
  | `/rituals/morning/` | mobile | 80 | 100 | 100 | 69 |
  | `/rituals/morning/` | desktop | 98 | 100 | 100 | 69 |
  | `/products/pure-aloe-vera-gel/` | mobile | 80 | 100 | 100 | 69 |
  | `/products/pure-aloe-vera-gel/` | desktop | 97 | 100 | 100 | 69 |

  SEO scores 69 only because the page is noindex on purpose ("Page is blocked from indexing"). No other SEO audit failed. Mobile performance is held back by the large hero image under simulated slow 4G. That was not changed in this round.

## Not tested or not done

- PageSpeed Insights on the deployed Vercel URL. All Lighthouse numbers above are from the local build.
- Real devices. Mobile checks used browser emulation only.

## Founder confirmations still pending

These were removed from customer pages, or kept and highlighted in review mode, until confirmed:

1. Free delivery threshold of ₹799, and that kits qualify.
2. Delivery charge for orders under ₹799.
3. Cash on delivery, payment methods and dispatch time. All removed until confirmed.
4. Order cancellation before dispatch, as stated on Returns.
5. Customer-facing name "Evening Essentials" for the two-product evening kit.
6. Face use of the Aloe Vera Bathing Bar. The live product page says face and body.
7. Full ingredient lists for Kuppaimeni, Hibiscus & Rose, Beetroot balm and Licorice balm. These are shown as "Key ingredients" for now.
8. Lip balm tin size.
9. The Google rating and a link to the real Google profile, before any rating is shown.
10. A working newsletter opt-in (with consent and unsubscribe) and a review collection flow, before either is shown.
11. The founder-reported foot butter line, until verified reviews exist.
12. The 21 to 28 day cure time for each natural soap.
13. Real photos of the unit and the makers.

The full per-product list is on `/prototype-notes/`.
