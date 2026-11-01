# Image notes and prompts

## What was done in this prototype
* Source: Kizora's own product photos from kizoraskincare.com (`assets-source/photos-original/`).
* Each product was cut out (`tools/images/cut.py`, rembg isnet model; the white Cow Milk bar was masked by hand)
  and placed **unaltered** on a generated background (`tools/images/compose.py`): warm wall and surface,
  paper grain, a soft botanical window-shadow, contact and wall shadows. Nothing on the pack was changed.
* Category treatments: face (warm stone, aloe-leaf shadow), rose (blush), tea tree (clay), eucalyptus and moringa (sage),
  bath & body (linen sand), lips (blush flat-lay), feet (butter), hair (deeper clay), morning (warm butter light),
  evening (dusk with lamp glow), winter (soft linen).
* Every product page keeps the original studio photo as image 2, so customers can see the unstyled pack.

## Still needed: real photography (highest value)
1. The unit near Kanha: wide shot, hands making soap, soaps curing on racks, moringa seeds drying in the sun.
2. The founder and the botanist partner (portraits, natural light).
3. Texture shots: aloe gel swatch on stone, a drop of moringa oil, a cut face of each soap, foot butter swipe.
4. In-use shots with real people (written consent): misting, applying gel, foot butter with socks.
5. The founder's winter hampers, as they are packed for customers.
6. Current moringa carton (the live photo shows an older design).

Spec: 4:5 portrait, 1200 × 1500 px minimum, daylight from one side at about 45°, warm off-white or stone surface,
export WebP under 200 KB, file names like `kizora-pure-aloe-vera-gel-30g-front.webp`.

## Prompts for AI-assisted backgrounds (use only around real product photos)
Use with an image editor that supports "generative fill / background replace". Always mask the product and never let the tool
redraw the pack, label or text.

* **Face care (gels, oil):** "Replace the background with a warm off-white limestone surface and plain plaster wall, soft
  morning daylight from the left, a faint blurred shadow of aloe leaves on the wall, gentle contact shadow under the product.
  Keep the product, its label, colours and proportions exactly as they are. No added text, no extra products."
* **Face mists:** "Soft blush plaster wall and matching surface, diffused daylight, faint blurred shadow of rose leaves,
  subtle reflection on the surface. Do not alter the bottle or label."
* **Soaps and bars:** "Natural linen cloth on a light wooden table, warm afternoon light, a few dried leaves out of focus
  in the background. Keep the soap packaging and the bar exactly as photographed."
* **Lip balms (flat lay):** "Top-down view on a dusty-pink paper surface with soft shadow from a leaf, even daylight.
  Do not change the tin or its label."
* **Foot butter:** "Warm butter-yellow plaster wall and surface, soft side light, a folded cotton sock and a small brass bowl
  out of focus to the side. Product unchanged."
* **Hair oils:** "Deeper clay-coloured wall, warm light, a few curry leaves and amla fruits on the surface beside the bottle,
  out of focus. Bottle and label unchanged."
* **Morning ritual group:** "Bright morning scene on a bathroom shelf of light stone, sunlight through a window casting
  leaf shadows, products arranged left to right in order of use. Products unchanged."
* **Evening ritual group:** "Dusk scene, warm lamp glow from the right, darker clay wall, folded cotton towel and a small
  brass diya out of focus. Products unchanged."

Avoid: glossy 3D renders, floating products, fake water splashes, invented labels, before/after imagery.
