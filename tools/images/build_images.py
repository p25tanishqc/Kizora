import os, numpy as np
from PIL import Image
import compose as c
OUT = c.OUT
SLUG = dict(aloe30="pure-aloe-vera-gel", aloeE="aloe-vera-gel-with-vitamin-e", aloeRose="aloe-vera-gel-with-rose-oil", roseMist="rose-hydrating-mist",
 teaMist="tea-tree-purifying-mist", eucMist="eucalyptus-soothing-mist", moringa="cold-pressed-moringa-oil", aloeBar="aloe-vera-bathing-bar",
 milkBar="cow-milk-bathing-bar", ubtanBar="ubtan-bathing-bar", kupSoap="kuppaimeni-soap", hibSoap="hibiscus-rose-soap", tomSoap="tomato-extract-soap",
 showerWash="fig-vanilla-shower-wash", footButter="avocado-olive-ghee-foot-butter", beetBalm="beetroot-ghee-lip-balm", licBalm="licorice-cocoa-ghee-lip-balm",
 onionOil="red-onion-hair-oil", brahmiOil="bringa-brahmi-hair-oil")
for i, (pid, slug) in enumerate(SLUG.items()):
    if pid == "beetBalm":
        W, H = 1200, 1500; bg = c.background(W, H, "lips", horizon=0.03, seed=40)
        c.place(bg, c.load(pid), W * 0.5, int(H * 0.80), width=W * 0.62, height=H * 0.66, key="lips")
        c.save(bg, f"{OUT}/products/{slug}/main.webp"); c.save(bg.resize((600, 750), Image.LANCZOS), f"{OUT}/products/{slug}/card.webp", q=80)
        det = bg.crop((168, 270, 1032, 1350)).resize((1200, 1500), Image.LANCZOS); c.save(det, f"{OUT}/products/{slug}/detail.webp")
    else:
        c.product_main(pid, slug, seed=10 + i)
    # honest studio photo (as supplied by Kizora), magenta frame removed, padded to 4:5 on white
    im = Image.open(f"assets-source/photos-original/{pid}.jpg").convert("RGB"); a = np.asarray(im).astype(int)
    mag = (a[..., 0] > 200) & (a[..., 1] < 90) & (a[..., 2] > 200)
    r = np.where(mag.mean(1) < 0.5)[0]; cc = np.where(mag.mean(0) < 0.5)[0]
    im = im.crop((cc[0] + 4, r[0] + 4, cc[-1] - 4, r[-1] - 4))
    can = Image.new("RGB", (1200, 1500), (250, 249, 247)); im.thumbnail((1200, 1500), Image.LANCZOS)
    can.paste(im, ((1200 - im.width) // 2, (1500 - im.height) // 2)); c.save(can, f"{OUT}/products/{slug}/studio.webp", q=82)
    print(slug)

G = c.group
G(["roseMist", "aloe30"], f"{OUT}/rituals/morning.webp", 1800, 1200, "morning", [(0.56, 0.82, 0.62, None), (0.76, 0.85, None, 0.38)], seed=5)
G(["teaMist", "aloe30"], f"{OUT}/rituals/morning-oily.webp", 1800, 1200, "morning", [(0.56, 0.82, 0.62, None), (0.76, 0.85, None, 0.38)], seed=6)
G(["aloeBar", "roseMist", "moringa", "licBalm", "footButter"], f"{OUT}/rituals/evening.webp", 1800, 1200, "evening",
  [(0.20, 0.86, None, 0.34), (0.41, 0.80, 0.62, None), (0.57, 0.88, 0.36, None), (0.71, 0.91, None, 0.16), (0.86, 0.88, None, 0.26)], seed=7)
K = 1200, 1500
G(["roseMist", "aloe30"], f"{OUT}/kits/morning-ritual-kit.webp", *K, "morning", [(0.33, 0.80, 0.58, None), (0.66, 0.84, None, 0.52)], seed=8)
G(["teaMist", "aloe30"], f"{OUT}/kits/morning-ritual-kit-oily-skin.webp", *K, "clay", [(0.33, 0.80, 0.58, None), (0.66, 0.84, None, 0.52)], seed=9)
G(["moringa", "licBalm"], f"{OUT}/kits/evening-ritual-kit.webp", *K, "evening", [(0.38, 0.80, 0.42, None), (0.68, 0.86, None, 0.40)], seed=11)
G(["milkBar", "footButter"], f"{OUT}/kits/winter-night-care-set.webp", *K, "winter", [(0.36, 0.78, None, 0.48), (0.66, 0.88, None, 0.52)], seed=12)
G(["aloeBar", "roseMist", "moringa", "licBalm", "footButter"], f"{OUT}/kits/complete-evening-ritual.webp", *K, "evening",
  [(0.30, 0.72, None, 0.50), (0.68, 0.70, 0.40, None), (0.24, 0.90, 0.22, None), (0.48, 0.92, None, 0.24), (0.75, 0.93, None, 0.42)], seed=13)
B = 1800, 1100
cols = {
 "face-gels": (["aloeE", "aloe30", "aloeRose"], "face", [(0.50, 0.84, None, 0.27), (0.70, 0.86, None, 0.28), (0.88, 0.83, None, 0.22)]),
 "face-mists": (["teaMist", "roseMist", "eucMist"], "rose", [(0.58, 0.82, 0.60, None), (0.72, 0.85, 0.64, None), (0.86, 0.82, 0.60, None)]),
 "oils": (["onionOil", "moringa", "brahmiOil"], "sage", [(0.56, 0.84, 0.62, None), (0.72, 0.87, 0.40, None), (0.88, 0.84, 0.58, None)]),
 "soaps-bathing-bars": (["kupSoap", "hibSoap", "tomSoap", "ubtanBar"], "body", [(0.52, 0.74, None, 0.17), (0.69, 0.74, None, 0.17), (0.86, 0.74, None, 0.17), (0.70, 0.93, None, 0.34)]),
 "lip-care": (["licBalm", "beetBalm"], "lips", [(0.62, 0.84, None, 0.24), (0.84, 0.86, 0.48, None)]),
 "hands-feet": (["footButter"], "feet", [(0.72, 0.86, None, 0.40)]),
 "hair": (["onionOil", "brahmiOil"], "hair", [(0.64, 0.86, 0.66, None), (0.82, 0.86, 0.66, None)]),
 "body-wash": (["showerWash", "aloeBar"], "body", [(0.62, 0.84, 0.66, None), (0.82, 0.88, None, 0.30)]),
 "aloe-vera-essentials": (["aloeE", "aloe30", "aloeBar"], "face", [(0.52, 0.80, None, 0.26), (0.72, 0.82, None, 0.27), (0.80, 0.95, None, 0.30)]),
 "sets-hampers": (["milkBar", "footButter", "roseMist"], "winter", [(0.55, 0.84, None, 0.22), (0.86, 0.88, None, 0.24), (0.70, 0.82, 0.58, None)]),
}
for k, (ps, key, lay) in cols.items():
    G(ps, f"{OUT}/collections/{k}.webp", *B, key, lay, seed=hash(k) % 97)
G(["kupSoap", "aloe30", "roseMist", "moringa", "footButter"], f"{OUT}/home/hero.webp", 2200, 1300, "face",
  [(0.555, 0.80, None, 0.14), (0.70, 0.84, None, 0.20), (0.825, 0.80, 0.58, None), (0.915, 0.86, 0.27, None), (0.63, 0.95, None, 0.16)], seed=21)
G(["roseMist", "aloe30", "moringa"], f"{OUT}/home/og.webp", 1200, 630, "face", [(0.55, 0.85, 0.62, None), (0.72, 0.87, None, 0.26), (0.88, 0.88, 0.40, None)], seed=22)
print("done")
