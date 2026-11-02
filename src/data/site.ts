// Site-wide copy: rituals, journal, FAQ and the before/after change log.
// Founder facts come from the interview notes (NOTES, D12, T2). Items to confirm are listed in APPROVALS.

export const SITE = {
  name: 'Kizora Skincare',
  legal: 'Naturekit LLP',
  tagline: 'Slow-made care for everyday rituals.',
  url: 'https://kizoraskincare.com',
  whatsapp: '919625905995',
  phone: '+91 96259 05995',
  email: 'Customercare@kizoraskincare.com',
  address: 'WW-24, Malibu Town, Gurugram, Haryana',
};

export interface RitualStep { n: string; role: string; slug?: string; title: string; how: string; why: string; optional?: boolean }
export const rituals = {
  morning: {
    slug: 'morning', title: 'Your morning ritual', eyebrow: 'Morning · about three minutes',
    intro: 'Two essentials, mist and gel, plus an optional lip balm. About three minutes, and light enough to sit under sunscreen or make-up.',
    image: '/images/products/rose-hydrating-mist/1.webp', kit: 'morning-ritual-kit', tone: 'bg-butter/50',
    steps: [
      { n: '1', role: 'Mist', slug: 'rose-hydrating-mist', title: 'Rose Hydrating Mist', how: 'Hold about 20 cm away and spray two or three times over a clean face and neck. Wait a few seconds.', why: 'A little water and freshness after washing your face.' },
      { n: '2', role: 'Hydrate', slug: 'pure-aloe-vera-gel', title: 'Pure Aloe Vera Gel', how: 'Smooth a pea-sized amount over face and neck while the mist is still slightly damp.', why: 'Light hydration that does not feel heavy under sunscreen.' },
      { n: '3', role: 'Lips', slug: 'beetroot-ghee-lip-balm', title: 'Beetroot & Ghee Lip Balm', how: 'A thin layer on lips.', why: 'Keeps lips soft through the day, with a light tint.', optional: true },
    ] as RitualStep[],
    swaps: [
      { label: 'Oily or combination skin', text: 'Use Tea Tree Purifying Mist in step 1.', slug: 'tea-tree-purifying-mist' },
      { label: 'Hot, humid days', text: 'Use Eucalyptus Soothing Mist in step 1.', slug: 'eucalyptus-soothing-mist' },
      { label: 'Drier skin', text: 'Use Aloe Vera Gel with Vitamin E in step 2.', slug: 'aloe-vera-gel-with-vitamin-e' },
    ],
    gaps: 'Use your usual gentle face wash before the ritual, and finish with a broad-spectrum sunscreen. These are not included in the kit.',
  },
  evening: {
    slug: 'evening', title: 'Your evening ritual', eyebrow: 'Evening · about ten minutes',
    intro: 'A slower routine for the end of the day. Cleanse, mist, then let an oil do its work overnight. Steps 4 and 5 matter most in winter.',
    image: '/images/products/cold-pressed-moringa-oil/1.webp', kit: 'evening-ritual-kit', tone: 'bg-dusk text-cream',
    steps: [
      { n: '1', role: 'Cleanse', slug: 'aloe-vera-bathing-bar', title: 'Aloe Vera Bathing Bar', how: 'Lather between wet hands, wash face and body, rinse with lukewarm water.', why: 'A gentle bar for face and body.' },
      { n: '2', role: 'Mist', slug: 'rose-hydrating-mist', title: 'Rose Hydrating Mist', how: 'Spray once or twice over face and neck.', why: 'The same bottle as your morning ritual.' },
      { n: '3', role: 'Nourish', slug: 'cold-pressed-moringa-oil', title: 'Cold-Pressed Moringa Oil', how: 'Warm two or three drops between your palms and press onto face and neck.', why: 'Night is the best time for an oil: it has hours to soften skin.' },
      { n: '4', role: 'Lips', slug: 'licorice-cocoa-ghee-lip-balm', title: 'Licorice, Cocoa & Ghee Lip Balm', how: 'A generous layer before bed.', why: 'A richer balm for overnight.', optional: true },
      { n: '5', role: 'Feet', slug: 'avocado-olive-ghee-foot-butter', title: 'Avocado & Olive Ghee Foot Butter', how: 'Massage into heels, then wear cotton socks.', why: 'Our older customers reorder this one for dry, cracked heels.', optional: true },
    ] as RitualStep[],
    swaps: [
      { label: 'Prefer a gel at night', text: 'Use Aloe Vera Gel with Vitamin E instead of the oil in step 3.', slug: 'aloe-vera-gel-with-vitamin-e' },
      { label: 'Very dry skin in winter', text: 'Use the Cow Milk Bathing Bar for your body in step 1.', slug: 'cow-milk-bathing-bar' },
    ],
    gaps: 'Evening essentials covers the oil and lip balm. The complete ritual adds the bathing bar, mist and foot butter. If your skin is oily, one drop of oil is enough, or skip it and use the aloe gel.',
  },
};

export interface Article { slug: string; title: string; dek: string; date: string; read: string; image: string; photos: string[]; products: string[]; body: { h?: string; p: string }[]; draft?: boolean }
export const articles: Article[] = [
  { slug: 'why-our-soaps-take-a-month', title: 'Why our soaps take a month', dek: 'How cold-process soap is made, and why we wait 21 to 28 days before packing it.',
    date: 'November 2026', read: '4 min', image: '/images/products/kuppaimeni-soap/1.webp', photos: ['kuppaimeni-soap', 'hibiscus-rose-soap', 'tomato-extract-soap'], products: ['kuppaimeni-soap', 'hibiscus-rose-soap', 'tomato-extract-soap'], draft: true,
    body: [
      { p: 'Our natural soaps are made the slow way, in small batches at our partner\'s unit near Kanha National Park in Madhya Pradesh.' },
      { h: 'What "cold process" means', p: 'In cold-process soap making, oils such as coconut and castor are mixed with lye at low temperatures, poured into moulds and cut into bars. Freshly cut bars still hold a lot of water.' },
      { h: 'Why we wait', p: 'So we leave the bars to cure for 21 to 28 days before they are checked and packed. As the bars cure, excess water gradually evaporates, helping them become firmer and last longer in use.' },
      { h: 'How to make a bar last', p: 'Keep it on a soap dish that drains, out of the stream of water. A dry bar lasts much longer than one sitting in a puddle.' },
      { p: 'Our current soaps include Kuppaimeni (Indian nettle), Hibiscus & Rose and Tomato Extract. Each product page explains its key ingredients and how to use it.' },
    ] },
  { slug: 'how-to-use-moringa-oil-on-your-face', title: 'Moringa oil for your face: how much, when, and for whom', dek: 'Two or three drops at night is usually enough. Here is why, and who should skip it.',
    date: 'November 2026', read: '3 min', image: '/images/products/cold-pressed-moringa-oil/1.webp', photos: ['cold-pressed-moringa-oil', 'licorice-cocoa-ghee-lip-balm', 'rose-hydrating-mist'], products: ['cold-pressed-moringa-oil', 'evening-ritual-kit'], draft: true,
    body: [
      { p: 'Moringa is the drumstick tree, sahjan, that grows across much of India. Its seeds give a light oil. For our oil, the seeds are dried in the sun before they are pressed, and nothing else is added.' },
      { h: 'What it does', p: 'Like most plant oils, moringa seed oil is an emollient: it softens the surface of the skin and helps it feel less dry. There is no good evidence that it changes wrinkles or elasticity, so we do not suggest it does.' },
      { h: 'How much and when', p: 'Two or three drops is enough for face and neck. Warm them between your palms and press them on after your mist or gel at night. Night is when an oil has the most time to work.' },
      { h: 'Who should go easy', p: 'If your skin is oily or breaks out easily, try a single drop on a few nights first, or stay with the aloe gel. As with anything new, patch test on your inner arm.' },
    ] },
  { slug: 'a-winter-evening-ritual', title: 'A winter evening ritual for dry skin and heels', dek: 'When the air turns dry, add two small steps to your evening.',
    date: 'November 2026', read: '3 min', image: '/images/products/avocado-olive-ghee-foot-butter/1.webp', photos: ['avocado-olive-ghee-foot-butter', 'cow-milk-bathing-bar', 'licorice-cocoa-ghee-lip-balm'], products: ['complete-evening-ritual', 'winter-night-care-set', 'avocado-olive-ghee-foot-butter'], draft: true,
    body: [
      { p: 'In north Indian winters, skin that was fine in October can feel tight by December. Heels crack, lips peel. A good evening ritual helps, and it does not need many products.' },
      { h: 'Keep the base simple', p: 'Cleanse with a mild bar, mist with rose water, then press two or three drops of moringa oil onto your face. If you prefer a gel, use the aloe gel with vitamin E.' },
      { h: 'Add lips and feet', p: 'Finish with a rich lip balm, and massage the ghee foot butter into your heels before putting on cotton socks. Our founder tells us older customers often reorder it for dry, cracked heels.' },
      { h: 'When to see a doctor', p: 'Cracks that are deep, bleed or hurt need medical care, not just a foot butter.' },
    ] },
];

export const faqs = [
  { q: 'Where are Kizora products made?', a: 'In a small unit near Kanha National Park, Madhya Pradesh, run by our botanist partner with people from nearby villages. Our founder works from Gurugram.' },
  { q: 'Are your products Ayurvedic or certified organic?', a: 'Not today. We make clean, small-batch skincare. Our Ayurvedic certification is in process and we will update this answer when it is granted.', confirm: true },
  { q: 'Are your products vegan?', a: 'Some are and some are not. Both lip balms and the foot butter contain desi cow ghee, the foot butter also contains beeswax, and the Cow Milk Bathing Bar contains milk. Every product page lists what is in it.' },
  { q: 'Which product should I start with?', a: 'Start with the Morning Ritual Kit: Rose Hydrating Mist and Pure Aloe Vera Gel. It is light, simple, and suits most skin.' },
  { q: 'Is delivery free?', a: 'Delivery is free on orders above ₹799. For smaller orders, delivery charges are shown at checkout.', confirm: true },
  { q: 'Can I return a product?', a: 'Yes, if it arrives damaged or you receive the wrong item. Please see our returns page and message us within the time it states.', confirm: true },
  { q: 'Can I use your products during pregnancy?', a: 'Please check the ingredients with your doctor.' },
  { q: 'How do I reach you?', a: 'WhatsApp is fastest: +91 96259 05995. You can also email Customercare@kizoraskincare.com.' },
];

// Before / after change log mapped to the Website Transformation Report (issue IDs K-01 to K-24)
export const changelog = [
  { id: 'K-01', area: 'Trust', before: 'FAQ full of theme placeholder text; checkout says "Debating me breeding be answered."; /blog/ shows a theme demo.', after: 'Real FAQ (/faq/), clean demo cart, Journal with three draft articles.', link: '/faq/' },
  { id: 'K-02', area: 'Policy', before: 'Returns policy contains a drafting note.', after: 'Returns summary written plainly; full policy to be legally reviewed.', link: '/returns/' },
  { id: 'K-03', area: 'Claims', before: '"Cruelty-Free & Vegan" badge on the ghee foot butter and cow milk bar.', after: 'Clear "Contains" line on every product with milk, ghee or beeswax.', link: '/products/cow-milk-bathing-bar/' },
  { id: 'K-04', area: 'Product facts', before: '30 g gel FAQ mentions rose oil; Vitamin E gallery shows the rose-oil carton; foot butter "50ml"; typos.', after: 'Facts corrected; one product template so details cannot drift.', link: '/products/pure-aloe-vera-gel/' },
  { id: 'K-05', area: 'Claims', before: '"Organic", "Ayurvedic", "treat", "repair", "100% natural", pregnancy safety.', after: 'Removed from names and copy; items needing proof are marked for approval.', link: '/prototype-notes/' },
  { id: 'K-06', area: 'Delivery', before: '"Free above ₹799" but free on a ₹325 cart; 2-3 days vs 1-5 days.', after: 'One rule shown in the bar, cart progress meter and FAQ (to confirm).', link: '/cart/' },
  { id: 'K-07', area: 'Navigation', before: '"Hydrating Face Gels" opens foot butter and lip balms.', after: 'Face gels collection shows the three aloe gels with a comparison table.', link: '/collections/face-gels/' },
  { id: 'K-08', area: 'Navigation', before: '"Know your ingredients" and "Ingredient Stories" open the shop.', after: 'Ingredient library with 12 profiles, each linked to products.', link: '/ingredients/' },
  { id: 'K-09', area: 'Rituals', before: 'Morning and evening steps identical; both buttons go to one collection.', after: 'Separate morning and evening pages with real steps and kits.', link: '/rituals/' },
  { id: 'K-10', area: 'Rituals', before: 'Recommends "Khus Mist" and "Aleo Scalp", which do not exist.', after: 'Every recommendation is a real, linked product.', link: '/rituals/morning/' },
  { id: 'K-11', area: 'Navigation', before: '"Explore oils" opens hair oils without moringa; "Discover scents" opens face mists.', after: 'Oils and Face mists collections; no fragrance section.', link: '/collections/oils/' },
  { id: 'K-12', area: 'Product pages', before: 'Benefits shown as "key ingredients"; five products with no full list.', after: 'Key ingredients are real ingredients; full list block on every page (gaps flagged).', link: '/products/kuppaimeni-soap/' },
  { id: 'K-13', area: 'Social proof', before: 'No reviews on site; 17 Google reviews unused.', after: 'Review block ready for verified buyers; no invented reviews.', link: '/products/avocado-olive-ghee-foot-butter/' },
  { id: 'K-14', area: 'Homepage', before: 'Lists vetiver and ashwagandha, which no product contains.', after: 'Only ingredients in current products are shown.', link: '/' },
  { id: 'K-15', area: 'About', before: 'No founder, place or process; one aloe card repeated four times.', after: 'Story of the founder, partner, Kanha unit and slow process.', link: '/about/' },
  { id: 'K-16', area: 'Navigation', before: '"Library" and "Journal" lead to Coming Soon.', after: '"Ingredients" in the menu; Journal with real articles.', link: '/journal/' },
  { id: 'K-17', area: 'Photography', before: 'Carton-first photos on plain white; generated lifestyle images.', after: 'One HD photo per product (supplied 2 Nov 2026, upscaled with Real-ESRGAN); kits and banners show them side by side', link: '/shop/' },
  { id: 'K-18', area: 'Speed', before: 'Mobile LCP 11.3 s; 7.4 MB homepage of PNGs.', after: 'Static pages, WebP images sized for display, lazy-loaded below the fold.', link: '/' },
  { id: 'K-19', area: 'Brand', before: 'Kizora Skincare, Kizora Botanicals and Naturekit LLP all in use.', after: 'One name with a single legal line in the footer; Organization schema.', link: '/' },
  { id: 'K-20', area: 'AEO', before: 'GPTBot blocked with no documented decision.', after: 'Decision listed for the founder; prototype itself is noindex.', link: '/prototype-notes/' },
  { id: 'K-21', area: 'SEO', before: 'Missing H1s and descriptions; no Product schema; messy sitemap.', after: 'Every page has a title, description and one H1; Product, Breadcrumb, FAQ and Organization schema.', link: '/products/cold-pressed-moringa-oil/' },
  { id: 'K-22', area: 'Filters', before: '21 skin-concern filters including medical terms; two taxonomies.', after: 'Seven plain needs plus skin type, collection and price filters.', link: '/shop/' },
  { id: 'K-23', area: 'Mobile', before: 'Buttons below the fold; cramped ritual columns; WhatsApp bubble over text.', after: 'Text-first mobile hero, stacked steps, sticky add-to-cart.', link: '/rituals/evening/' },
  { id: 'K-24', area: 'Tracking', before: 'No Meta Pixel; ecommerce events unverified.', after: 'Out of scope for a prototype; event names documented in the README.', link: '/prototype-notes/' },
];

export const APPROVALS = [
  'Free-delivery threshold (₹799) and dispatch time (1 to 3 working days)',
  'Kit prices: shown as the sum of listed prices; any discount needs approval',
  'Names of the "natural preservatives" in gels and mists',
  'Full ingredient lists for Kuppaimeni, Hibiscus & Rose and both lip balms; net weight of the balms',
  'Organic and Ayurvedic status (certificate / AYUSH licence) before any such claim returns',
  'Tomato soap name ("Tomato Extract Soap" vs "Tomato Surprise" on the pack)',
  'Shower wash name and size (site: 100 ml Shower Wash; bottle: 200 ml Replenishing Shower Gel)',
  'About page wording, founder quote and names',
  'Customer feedback lines (foot butter, aloe gel) shared as reported by the founder',
  'Legal entity line in the footer (Kizora Skincare, a brand of Naturekit LLP)',
  'AI crawler policy in robots.txt for the live site (GPTBot currently blocked)',
  'Real photos of the unit, the makers and the winter hampers',
  'Cash on delivery, payment methods and dispatch time (removed from customer pages until confirmed)',
  'Customer-facing name "Evening Essentials" for the two-product evening kit',
  'Face use of the Aloe Vera Bathing Bar (the live product page says face and body)',
  'Current Google rating and a link to the real Google review profile before showing it',
  'A working newsletter sign-up with consent and unsubscribe, and a review flow, before either is shown',
  'Cure time (21 to 28 days) applies to each natural soap',
];

// Second review (2 Nov 2026): "Kizora website: what to refine, what to keep"
export const reviewLog = [
  { id: 'KZ-01', pri: 'P2', change: 'Homepage ritual subheading replaced with the approved line.', url: '/' },
  { id: 'KZ-02', pri: 'P2', change: 'Face gels introduction replaced with the approved copy; products and comparison table unchanged (table now built from shared product data).', url: '/collections/face-gels/' },
  { id: 'KZ-03', pri: 'P1', change: 'Morning sunscreen card removed; one note now covers face wash and sunscreen.', url: '/rituals/morning/' },
  { id: 'KZ-04', pri: 'P1', change: 'Morning kit shown as "2 essentials"; "Includes mist + gel" by the CTA; lip balm marked optional on the page and homepage card.', url: '/rituals/morning/' },
  { id: 'KZ-05', pri: 'P1', change: 'Evening page offers two clear choices side by side: Evening essentials (2 products, ₹1,060) and Complete evening ritual (5 products, ₹2,505). Steps show which option includes them.', url: '/rituals/evening/' },
  { id: 'KZ-06', pri: 'P0', change: 'Founder-facing "To confirm" blocks removed from all product pages; open items now listed only on this notes page.', url: '/products/pure-aloe-vera-gel/' },
  { id: 'KZ-07', pri: 'P0', change: '"Full ingredient lists" claims replaced with "Ingredients explained clearly"; incomplete lists labelled "Key ingredients".', url: '/' },
  { id: 'KZ-08', pri: 'P1', change: 'Redirect annotations removed from all collection pages (redirect map stays in docs/SEO-AEO.md).', url: '/collections/face-gels/' },
  { id: 'KZ-09', pri: 'P1', change: 'Ingredient pages: unverified INCI and "confirm" notes removed; names shown as they appear on our labels; repeated disclaimers replaced by one footer note.', url: '/ingredients/aloe-vera/' },
  { id: 'KZ-10', pri: 'P0', change: 'Photo placeholders, draft labels, "replace this" captions, lip-balm size placeholder and unconfirmed hours removed.', url: '/about/' },
  { id: 'KZ-11', pri: 'P1', change: '"The product page says/describes" phrasing rewritten in customer language.', url: '/products/aloe-vera-bathing-bar/' },
  { id: 'KZ-12', pri: 'P0', change: 'COD, payment-method and dispatch promises removed; banner reads "Orders are not being processed"; empty cart shows delivery "—", small orders "Calculated at checkout".', url: '/cart/' },
  { id: 'KZ-13', pri: 'P1', change: 'Newsletter form removed until a working opt-in exists; "Write a review" button removed.', url: '/' },
  { id: 'KZ-14', pri: 'P2', change: 'All product images replaced with the photos supplied on 2 Nov, matched to each label and upscaled to 1600 x 2000. New homepage image; aloe face image on Face gels and the aloe vera page.', url: '/products/pure-aloe-vera-gel/' },
  { id: 'KZ-15', pri: 'P1', change: 'Unlinked Google rating removed; replaced with a WhatsApp prompt. Founder-attributed foot-butter line kept.', url: '/' },
  { id: 'KZ-16', pri: 'P1', change: 'Comparison table, kit totals and structured data all read from the shared product data.', url: '/ingredients/' },
  { id: 'KZ-17', pri: 'P1', change: 'Draft markers removed; saponification sentence replaced with the approved curing line.', url: '/journal/why-our-soaps-take-a-month/' },
  { id: 'KZ-18', pri: 'P2', change: 'Preview stays noindex; route, link, schema and viewport checks re-run (see docs/REVIEW-CHANGELOG.md).', url: '/prototype-notes/' },
];
