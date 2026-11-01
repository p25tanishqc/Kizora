# SEO, AEO and launch notes

## Before the live site switches over
1. **301 redirects** from today's WordPress URLs to the new ones:

| Old URL (live site) | New URL |
|---|---|
| /product-category/moisturisers-gels/ | /collections/face-gels/ |
| /product-category/skincare/aloe-vera-gel/hydrating-face-body-gel/ and /product-category/hydrating-face-body-gel/ | /collections/face-gels/ |
| /product-category/fragrance-mists/ | /collections/face-mists/ |
| /product-category/botanical-hair-oils/ | /collections/hair/ |
| /product-category/bath-body/ | /collections/bath-body/ |
| /product-category/aloe-vera-essentials/ | /collections/aloe-vera-essentials/ |
| /product-category/{dry,oily,normal,combination,sensitive}-skin/ | /shop/ (filter by skin type) |
| /library/, /blog/, /blog-cosmetic-v1/ | /journal/ |
| /faq/ | /faq/ (now real content) |
| /product/kizora-pure-organic-aloe-vera-gel-everyday-hydration-skin-relief-gel/ | /products/pure-aloe-vera-gel/ |
| /product/pure-organic-aloe-vera-gel-with-vitamin-e-deep-hydration-antioxidant-care-gel/ | /products/aloe-vera-gel-with-vitamin-e/ |
| /product/kizora-pure-organic-aloe-vera-gel-with-rose-oil-deep-hydration-natural-glow-cream/ | /products/aloe-vera-gel-with-rose-oil/ |
| /product/rose-hydrating-face-mist-daily-dewy-hydration-skin-comfort/ | /products/rose-hydrating-mist/ |
| /product/tea-tree-purifying-mist-oil-control-clarifying-face-mist/ | /products/tea-tree-purifying-mist/ |
| /product/eucalyptus-soothing-mist-instant-cooling-purifying-face-mist/ | /products/eucalyptus-soothing-mist/ |
| /product/pure-cold-pressed-moringa-oil-antioxidant-face-oil-for-deep-nourishment/ | /products/cold-pressed-moringa-oil/ |
| /product/handcrafted-aloe-vera-bathing-bar-gentle-cleansing-daily-hydration/ | /products/aloe-vera-bathing-bar/ |
| /product/handcrafted-cow-milk-bathing-bar-deep-nourishment-silky-soft-skin/ | /products/cow-milk-bathing-bar/ |
| /product/handcrafted-ubtan-bathing-bar-traditional-brightening-gentle-exfoliation/ | /products/ubtan-bathing-bar/ |
| /product/kizora-kuppaimeni-natural-soap/ | /products/kuppaimeni-soap/ |
| /product/kizora-hibiscus-rose-natural-soap/ | /products/hibiscus-rose-soap/ |
| /product/kizora-skincare-tomato-extract-soap-cleansing-bar-for-fresh-radiant-looking-skin-125-g/ | /products/tomato-extract-soap/ |
| /product/silkening-shower-wash-fig-vanilla-softening-botanical-body-cleanser-100ml/ | /products/fig-vanilla-shower-wash/ |
| /product/avocado-olive-ghee-foot-butter-deeply-nourishing-foot-cream-50ml/ | /products/avocado-olive-ghee-foot-butter/ |
| /product/kizora-beetroot-ghee-lip-balm-natural-repair-tint-for-dry-lips/ | /products/beetroot-ghee-lip-balm/ |
| /product/kzora-licorice-cocoa-ghee-lip-balm-natural-dark-spot-repair-for-lips/ | /products/licorice-cocoa-ghee-lip-balm/ |
| /product/ayurvedic-red-onion-hair-oil-strengthening-hair-roots-healthy-hair-growth/ | /products/red-onion-hair-oil/ |
| /product/bringa-brahmi-elixir-ayurvedic-hair-scalp-nourishing-oil/ | /products/bringa-brahmi-hair-oil/ |

   On Shopify, product URLs become `/products/<handle>` and collections `/collections/<handle>`, so the
   handles above can be reused directly.
2. **robots.txt for production** (decide on AI crawlers; this keeps search and AI *search* crawlers in):
   ```
   User-agent: *
   Allow: /
   Disallow: /cart/
   Disallow: /checkout/
   Disallow: /my-account/
   # Training crawler: the founder decides. Remove the next two lines to allow it.
   User-agent: GPTBot
   Disallow: /
   Sitemap: https://kizoraskincare.com/sitemap.xml
   ```
   Then build with `NEXT_PUBLIC_ALLOW_INDEXING=true` (production only) and remove the `X-Robots-Tag` header from `vercel.json`.
3. Claim and correct the Google Business Profile (category, hours, website, photos).

## Structured data in this build
Organization (every page), Product + Offer (all product and kit pages; no rating until real reviews exist),
BreadcrumbList, CollectionPage + ItemList, HowTo (ritual pages), FAQPage (FAQ and ingredient pages), Article (journal).

## AEO: questions these pages answer directly
What is Kizora Skincare? (About) · Is Kizora Ayurvedic or organic? (FAQ) · Where is it made? (About, How it's made) ·
What is cold-process soap and how long does it take? (Journal) · What is kuppaimeni? (ingredient page) ·
Can I use aloe vera gel on my face every day? (product + ingredient FAQ) · Which aloe gel should I choose? (Face gels table) ·
How do I use moringa oil on my face? (Journal + product) · Is ghee good for cracked heels? (ingredient page) ·
Simple morning routine for dry skin? (Morning ritual) · Winter night routine? (Evening ritual + journal) ·
Are Kizora products vegan? (FAQ + "Contains" lines) · Delivery time? (Shipping, FAQ).

## Analytics events to wire up on the live store
GA4: `view_item_list` (collection, ritual pages with `item_list_name` = `morning_ritual` / `evening_ritual`),
`view_item`, `add_to_cart`, `begin_checkout`, `purchase`; custom `whatsapp_click` with `page_path`.
Meta: Pixel + Conversions API via the official WooCommerce/Shopify integration.
