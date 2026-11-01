# Change log: live site vs prototype

Each row maps to an issue ID in the *Kizora Website Transformation Report* (1 November 2026).

| ID | Area | Live site today | In this prototype | Page |
|---|---|---|---|---|
| K-01 | Trust | FAQ full of theme placeholder text; checkout says "Debating me breeding be answered."; /blog/ shows a theme demo. | Real FAQ (/faq/), clean demo cart, Journal with three draft articles. | `/faq/` |
| K-02 | Policy | Returns policy contains a drafting note. | Returns summary written plainly; full policy to be legally reviewed. | `/returns/` |
| K-03 | Claims | "Cruelty-Free & Vegan" badge on the ghee foot butter and cow milk bar. | Clear "Contains" line on every product with milk, ghee or beeswax. | `/products/cow-milk-bathing-bar/` |
| K-04 | Product facts | 30 g gel FAQ mentions rose oil; Vitamin E gallery shows the rose-oil carton; foot butter "50ml"; typos. | Facts corrected; one product template so details cannot drift. | `/products/pure-aloe-vera-gel/` |
| K-05 | Claims | "Organic", "Ayurvedic", "treat", "repair", "100% natural", pregnancy safety. | Removed from names and copy; items needing proof are marked for approval. | `/prototype-notes/` |
| K-06 | Delivery | "Free above ₹799" but free on a ₹325 cart; 2-3 days vs 1-5 days. | One rule shown in the bar, cart progress meter and FAQ (to confirm). | `/cart/` |
| K-07 | Navigation | "Hydrating Face Gels" opens foot butter and lip balms. | Face gels collection shows the three aloe gels with a comparison table. | `/collections/face-gels/` |
| K-08 | Navigation | "Know your ingredients" and "Ingredient Stories" open the shop. | Ingredient library with 12 profiles, each linked to products. | `/ingredients/` |
| K-09 | Rituals | Morning and evening steps identical; both buttons go to one collection. | Separate morning and evening pages with real steps and kits. | `/rituals/` |
| K-10 | Rituals | Recommends "Khus Mist" and "Aleo Scalp", which do not exist. | Every recommendation is a real, linked product. | `/rituals/morning/` |
| K-11 | Navigation | "Explore oils" opens hair oils without moringa; "Discover scents" opens face mists. | Oils and Face mists collections; no fragrance section. | `/collections/oils/` |
| K-12 | Product pages | Benefits shown as "key ingredients"; five products with no full list. | Key ingredients are real ingredients; full list block on every page (gaps flagged). | `/products/kuppaimeni-soap/` |
| K-13 | Social proof | No reviews on site; 17 Google reviews unused. | Review block ready for verified buyers; no invented reviews. | `/products/avocado-olive-ghee-foot-butter/` |
| K-14 | Homepage | Lists vetiver and ashwagandha, which no product contains. | Only ingredients in current products are shown. | `/` |
| K-15 | About | No founder, place or process; one aloe card repeated four times. | Story of the founder, partner, Kanha unit and slow process. | `/about/` |
| K-16 | Navigation | "Library" and "Journal" lead to Coming Soon. | "Ingredients" in the menu; Journal with real articles. | `/journal/` |
| K-17 | Photography | Carton-first photos on plain white; generated lifestyle images. | Real product photos placed on warm, category-specific scenes; original studio shot kept in every gallery. | `/shop/` |
| K-18 | Speed | Mobile LCP 11.3 s; 7.4 MB homepage of PNGs. | Static pages, WebP images sized for display, lazy-loaded below the fold. | `/` |
| K-19 | Brand | Kizora Skincare, Kizora Botanicals and Naturekit LLP all in use. | One name with a single legal line in the footer; Organization schema. | `/` |
| K-20 | AEO | GPTBot blocked with no documented decision. | Decision listed for the founder; prototype itself is noindex. | `/prototype-notes/` |
| K-21 | SEO | Missing H1s and descriptions; no Product schema; messy sitemap. | Every page has a title, description and one H1; Product, Breadcrumb, FAQ and Organization schema. | `/products/cold-pressed-moringa-oil/` |
| K-22 | Filters | 21 skin-concern filters including medical terms; two taxonomies. | Seven plain needs plus skin type, collection and price filters. | `/shop/` |
| K-23 | Mobile | Buttons below the fold; cramped ritual columns; WhatsApp bubble over text. | Text-first mobile hero, stacked steps, sticky add-to-cart. | `/rituals/evening/` |
| K-24 | Tracking | No Meta Pixel; ecommerce events unverified. | Out of scope for a prototype; event names documented in the README. | `/prototype-notes/` |

## Other changes
* **Positioning and copy**: new tagline *Slow-made care for everyday rituals.*; product names shortened and claim words removed (Organic, Ayurvedic, repair, growth); Indian English throughout; every product has who/when/how-to-use.
* **Information architecture**: Shop · Rituals · Ingredients · Our story · Journal. Collections: Face gels, Face mists, Oils, Soaps & bath, Hands & feet, Lip care, Hair, Sets & kits (+ Aloe vera essentials).
* **Kits** (sum of listed prices, no discount assumed): Morning Ritual Kit ₹950, Morning Ritual Kit Oily Skin ₹1,120, Evening Ritual Kit ₹1,060, Winter Night Care Set ₹820, Complete Evening Ritual ₹2,505.
* **New facts surfaced during the build** (for the founder): the shower wash bottle reads "Replenishing Shower Gel, 200 ml" while the site sells "Silkening Shower Wash, 100 ml"; the moringa carton is an older design; bar packs say "100% vegan"; the hair oils are labelled "Red Onion Elixir" and "Bringa Brahmi Elixir".
* **SEO**: unique title, description and one H1 per page; canonical URLs; Organization, Product, BreadcrumbList, CollectionPage, HowTo (rituals), FAQPage and Article JSON-LD; XML sitemap.
* **Accessibility**: skip link, labelled controls, focus styles, keyboard-closable drawers, alt text on every image, colour contrast on cream.
* **Performance**: static HTML, WebP images sized for display (about 3.7 MB of images across the whole site vs about 5 MB on the live homepage alone), lazy-loading below the fold, self-hosted fonts.
