"""Prepare the ORIGINAL kizoraskincare.com product photos for this site.
Nothing is cut, recoloured or retouched. Each photo is only:
  1. flattened onto white if it is a transparent PNG,
  2. widened to a 4:5 frame by repeating its own edge background (no cropping), and
  3. resized and saved as WebP.
Source: the product galleries on kizoraskincare.com, downloaded 2 November 2026,
kept in assets-source/original-site/<slug>/<n>.<ext> in the live site's gallery order."""
import os, glob, sys, numpy as np, cv2
from PIL import Image
SRC, OUT = "assets-source/original-site", "public/images/products"
# gallery order per product: the main shot first, then the rest in the live site's order.
# Left out: the foot butter "before/after" heel photo (an unproven result claim).
ORDER = {
 "pure-aloe-vera-gel": [2, 1, 3, 4], "aloe-vera-gel-with-vitamin-e": [1, 3, 4, 5, 2], "aloe-vera-gel-with-rose-oil": [2, 1, 3, 5, 4],
 "rose-hydrating-mist": [1, 4, 3, 2], "tea-tree-purifying-mist": [1, 3, 4, 2], "eucalyptus-soothing-mist": [1, 2, 3, 4],
 "cold-pressed-moringa-oil": [1, 2, 3], "aloe-vera-bathing-bar": [1, 4, 2, 3], "cow-milk-bathing-bar": [1, 3, 2],
 "ubtan-bathing-bar": [1, 2, 3, 4], "kuppaimeni-soap": [1, 2, 3, 4], "hibiscus-rose-soap": [1, 3, 2, 4],
 "tomato-extract-soap": [1, 2, 4, 3], "fig-vanilla-shower-wash": [1, 2], "avocado-olive-ghee-foot-butter": [3, 1],
 "beetroot-ghee-lip-balm": [1, 2, 4, 3], "licorice-cocoa-ghee-lip-balm": [1, 2, 4, 3], "red-onion-hair-oil": [3, 1, 2],
 "bringa-brahmi-hair-oil": [2, 1, 3],
}
def to_45(path):
    im = Image.open(path)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA"); bg = Image.new("RGBA", im.size, (255, 255, 255, 255)); bg.alpha_composite(im); im = bg
    a = np.asarray(im.convert("RGB"))
    h, w = a.shape[:2]; tw = round(h * 0.8)
    if tw > w:   # too narrow: extend both sides with the photo's own edge background
        l = (tw - w) // 2; a = cv2.copyMakeBorder(a, 0, 0, l, tw - w - l, cv2.BORDER_REPLICATE)
        # soften the repeated columns so the extension reads as plain backdrop
        ext = np.zeros(a.shape[:2], np.uint8); ext[:, :l + 2] = 255; ext[:, l + w - 2:] = 255
        blur = cv2.GaussianBlur(a, (0, 0), 12); m = cv2.GaussianBlur(ext, (0, 0), 3)[..., None] / 255.0
        a = (a * (1 - m) + blur * m).astype(np.uint8)
    elif tw < w:  # too wide: extend top and bottom
        th = round(w / 0.8); t = (th - h) // 2; a = cv2.copyMakeBorder(a, t, th - h - t, 0, 0, cv2.BORDER_REPLICATE)
    return Image.fromarray(a)
for slug, order in ORDER.items():
    files = {int(os.path.basename(f).split(".")[0]): f for f in glob.glob(f"{SRC}/{slug}/*")}
    d = f"{OUT}/{slug}"; os.makedirs(d, exist_ok=True)
    for old in glob.glob(f"{d}/*.webp"): os.remove(old)
    for n, idx in enumerate(order, 1):
        im = to_45(files[idx]); H = min(1500, im.height); im = im.resize((round(H * 0.8), H), Image.LANCZOS)
        im.save(f"{d}/{n}.webp", quality=84, method=6)
        if n == 1: im.resize((600, 750), Image.LANCZOS).save(f"{d}/card.webp", quality=82, method=6)
    print(slug, len(order))
