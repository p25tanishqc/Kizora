"""Kizora product compositions: real product cut-outs placed on procedurally generated,
category-specific backgrounds (warm surfaces, paper grain, soft botanical light shadows).
The product pixels are never altered: only scaled and placed."""
import os, math, random, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageChops

CUT = os.environ.get("CUT", "assets-source/cutouts")
OUT = os.environ.get("OUT", "public/images")

PAL = {  # wall top, wall bottom, surface, shadow tint, gobo strength
 "face":  dict(wall=(240, 235, 226), wall2=(228, 222, 210), surf=(222, 214, 200), tint=(70, 60, 45), gobo=0.10, leaf="aloe"),
 "rose":  dict(wall=(244, 232, 228), wall2=(234, 216, 210), surf=(226, 205, 198), tint=(90, 55, 50), gobo=0.09, leaf="round"),
 "sage":  dict(wall=(233, 237, 228), wall2=(218, 225, 212), surf=(205, 213, 198), tint=(50, 65, 45), gobo=0.10, leaf="long"),
 "clay":  dict(wall=(238, 228, 216), wall2=(226, 211, 194), surf=(214, 196, 175), tint=(80, 55, 35), gobo=0.10, leaf="long"),
 "body":  dict(wall=(239, 231, 218), wall2=(229, 217, 199), surf=(214, 198, 175), tint=(80, 60, 40), gobo=0.08, leaf="round", linen=True),
 "lips":  dict(wall=(242, 228, 222), wall2=(232, 210, 203), surf=(222, 196, 188), tint=(90, 50, 45), gobo=0.07, leaf="round"),
 "feet":  dict(wall=(245, 237, 214), wall2=(236, 224, 192), surf=(224, 208, 172), tint=(85, 65, 30), gobo=0.09, leaf="long"),
 "hair":  dict(wall=(226, 216, 200), wall2=(208, 194, 174), surf=(186, 168, 144), tint=(60, 45, 30), gobo=0.12, leaf="long"),
 "morning": dict(wall=(247, 238, 214), wall2=(238, 226, 196), surf=(226, 211, 182), tint=(90, 70, 35), gobo=0.13, leaf="aloe"),
 "evening": dict(wall=(206, 190, 172), wall2=(176, 158, 140), surf=(150, 128, 108), tint=(35, 25, 18), gobo=0.16, leaf="long", dusk=True),
 "winter": dict(wall=(236, 228, 220), wall2=(220, 208, 196), surf=(200, 184, 168), tint=(60, 45, 35), gobo=0.08, leaf="round", linen=True),
}

def lerp(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def leaf_poly(cx, cy, L, W, ang, kind):
    pts = []
    n = 24
    for i in range(n + 1):
        t = i / n
        w = W * math.sin(math.pi * t) ** (0.9 if kind == "round" else 1.4)
        pts.append((t * L, w))
    pts += [(t, -w) for t, w in reversed(pts)]
    ca, sa = math.cos(ang), math.sin(ang)
    return [(cx + x * ca - y * sa, cy + x * sa + y * ca) for x, y in pts]

def gobo(w, h, kind, seed):
    rnd = random.Random(seed)
    g = Image.new("L", (w, h), 0); d = ImageDraw.Draw(g)
    # two or three stems entering from the upper right, as if a plant sits near a window
    for s in range(3):
        x0 = w * (0.62 + 0.18 * rnd.random()); y0 = -h * 0.05
        ang0 = math.radians(100 + rnd.uniform(-25, 25))
        for k in range(9 if kind != "aloe" else 5):
            t = k / 8
            px = x0 + math.cos(ang0) * h * 0.75 * t; py = y0 + math.sin(ang0) * h * 0.75 * t
            if kind == "aloe":
                L = h * rnd.uniform(0.35, 0.55); W = L * 0.09; a = ang0 + rnd.uniform(-0.9, 0.9)
            elif kind == "long":
                L = h * rnd.uniform(0.12, 0.2); W = L * 0.22; a = ang0 + (1 if k % 2 else -1) * rnd.uniform(0.6, 1.1)
            else:
                L = h * rnd.uniform(0.08, 0.13); W = L * 0.45; a = ang0 + (1 if k % 2 else -1) * rnd.uniform(0.5, 1.2)
            d.polygon(leaf_poly(px, py, L, W, a, kind), fill=255)
        d.line([(x0, y0), (x0 + math.cos(ang0) * h * 0.75, y0 + math.sin(ang0) * h * 0.75)], fill=255, width=max(2, w // 300))
    return g.filter(ImageFilter.GaussianBlur(w / 70))

def grain(w, h, amt, seed):
    rng = np.random.default_rng(seed)
    n = rng.normal(0, amt, (h, w)).astype(np.float32)
    return n

def linen(w, h, seed):
    rng = np.random.default_rng(seed)
    a = rng.normal(0, 1, (h, 1)) * 2.2 + rng.normal(0, 1, (1, w)) * 2.2
    return Image.fromarray(np.clip(128 + a, 0, 255).astype("uint8")).filter(ImageFilter.GaussianBlur(0.6))

def background(w, h, key, horizon=0.68, seed=1):
    p = PAL[key]
    yy = np.linspace(0, 1, h)[:, None]; xx = np.linspace(0, 1, w)[None, :]
    wall_t = np.clip(yy / horizon, 0, 1) * 0.8 + xx * 0.2
    wall = np.stack([p["wall"][i] + (p["wall2"][i] - p["wall"][i]) * wall_t for i in range(3)], -1)
    st = np.clip((yy - horizon) / (1 - horizon), 0, 1)
    surf2 = lerp(p["surf"], p["wall2"], 0.25)
    surf = np.stack([np.full_like(wall_t, surf2[i]) + (p["surf"][i] - surf2[i]) * st for i in range(3)], -1)
    # soft horizon blend
    blend = 1 / (1 + np.exp(-(yy - horizon) * h / 18))
    img = wall * (1 - blend[..., None]) + surf * blend[..., None]
    # window light: brighter upper-left pool
    light = np.exp(-(((xx - 0.25) / 0.55) ** 2 + ((yy - 0.25) / 0.6) ** 2))
    img = img + light[..., None] * (10 if not p.get("dusk") else 22) * np.array([1.0, 0.95, 0.85])
    if p.get("dusk"):  # warm lamp glow
        img = img + np.exp(-(((xx - 0.8) / 0.4) ** 2 + ((yy - 0.3) / 0.5) ** 2))[..., None] * np.array([28, 16, 4])
    img = img + grain(w, h, 2.2, seed)[..., None]
    im = Image.fromarray(np.clip(img, 0, 255).astype("uint8"))
    if p.get("linen"):
        top = max(0, int(h * horizon) - 10)
        im_s = im.crop((0, top, w, h))
        ln = linen(w, h - top, seed)
        im_s = Image.blend(im_s, ImageChops.overlay(im_s, Image.merge("RGB", [ln] * 3)), 0.5)
        im.paste(im_s, (0, top))
    g = gobo(w, h, p["leaf"], seed)
    shade = Image.new("RGB", (w, h), p["tint"])
    im = Image.composite(shade, im, g.point(lambda v: int(v * p["gobo"])))
    return im

def load(slug):
    return Image.open(f"{CUT}/{slug}.png").convert("RGBA")

def place(canvas, prod, cx, base_y, height=None, width=None, key="face", light_dx=0.35):
    """Scale product to height/width, place with base at base_y; add contact and cast shadows."""
    pw, ph = prod.size
    s = min(height / ph if height else 9e9, width / pw if width else 9e9)
    prod = prod.resize((max(1, int(pw * s)), max(1, int(ph * s))), Image.LANCZOS)
    pw, ph = prod.size
    x = int(cx - pw / 2); y = int(base_y - ph)
    tint = PAL[key]["tint"]
    a = prod.getchannel("A")
    # back shadow on the wall: blurred silhouette offset to the right, clipped at the base line
    pad = max(20, pw // 6)
    sil = Image.new("L", (pw + 2 * pad, ph + 2 * pad), 0); sil.paste(a, (pad, pad))
    sil = sil.filter(ImageFilter.GaussianBlur(max(8, pw // 12)))
    sx, sy = int(x - pad + pw * 0.14), int(y - pad - ph * 0.03)
    clip = sil.crop((0, 0, sil.width, max(1, base_y - sy)))
    canvas.paste(Image.new("RGB", clip.size, tint), (sx, sy), clip.point(lambda v: int(v * 0.17)))
    # long soft floor shadow toward the back right
    fw, fh = int(pw * 1.5), max(10, int(pw * 0.16))
    fl = Image.new("L", (fw + 120, fh + 120), 0); ImageDraw.Draw(fl).ellipse((60, 60, 60 + fw, 60 + fh), fill=255)
    fl = fl.filter(ImageFilter.GaussianBlur(max(10, pw // 9)))
    canvas.paste(Image.new("RGB", fl.size, tint), (int(cx - fw * 0.3 - 60), int(base_y - fh * 0.75 - 60)), fl.point(lambda v: int(v * 0.22)))
    # contact shadow
    cw, chh = int(pw * 1.05), max(8, int(pw * 0.09))
    c = Image.new("L", (cw + 80, chh + 80), 0); ImageDraw.Draw(c).ellipse((40, 40, 40 + cw, 40 + chh), fill=255)
    c = c.filter(ImageFilter.GaussianBlur(max(8, pw // 22)))
    canvas.paste(Image.new("RGB", c.size, tint), (int(cx - cw / 2 - 40 + pw * 0.04), int(base_y - chh / 2 - 40)), c.point(lambda v: int(v * 0.42)))
    tight = Image.new("L", (cw + 40, chh + 40), 0); ImageDraw.Draw(tight).ellipse((20 + cw * 0.08, 20 + chh * 0.25, 20 + cw * 0.92, 20 + chh * 0.75), fill=255)
    tight = tight.filter(ImageFilter.GaussianBlur(4))
    canvas.paste(Image.new("RGB", tight.size, tint), (int(cx - cw / 2 - 20), int(base_y - chh / 2 - 20)), tight.point(lambda v: int(v * 0.35)))
    canvas.paste(prod, (x, y), prod)
    return (x, y, pw, ph)

def save(im, path, q=84):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "WEBP", quality=q, method=6)

CAT = {"aloe30": "face", "aloeE": "face", "aloeRose": "rose", "roseMist": "rose", "teaMist": "clay", "eucMist": "sage", "moringa": "sage",
       "aloeBar": "body", "milkBar": "body", "ubtanBar": "body", "kupSoap": "body", "hibSoap": "body", "tomSoap": "body", "showerWash": "body",
       "footButter": "feet", "beetBalm": "lips", "licBalm": "lips", "onionOil": "hair", "brahmiOil": "hair"}
SLUG = {}  # filled by caller

def product_main(pid, slug, seed):
    W, H = 1200, 1500
    key = CAT[pid]; bg = background(W, H, key, horizon=0.70, seed=seed)
    p = load(pid); pw, ph = p.size; ar = pw / ph
    if ar < 0.5:   tall = dict(height=H * 0.66)
    elif ar < 0.9: tall = dict(height=H * 0.52, width=W * 0.62)
    else:          tall = dict(width=W * 0.70, height=H * 0.50)
    place(bg, p, W * 0.5, int(H * 0.80), key=key, **tall)
    save(bg, f"{OUT}/products/{slug}/main.webp")
    save(bg.resize((600, 750), Image.LANCZOS), f"{OUT}/products/{slug}/card.webp", q=80)
    # detail: closer crop of the same composition
    cx0 = int(W * 0.14); cy0 = int(H * 0.18)
    det = bg.crop((cx0, cy0, W - cx0, cy0 + int((W - 2 * cx0) * 1.25))).resize((1200, 1500), Image.LANCZOS)
    save(det, f"{OUT}/products/{slug}/detail.webp")

def group(pids, path, W, H, key, layout, seed=3, horizon=0.66, base=0.82):
    bg = background(W, H, key, horizon=horizon, seed=seed)
    # place back to front (higher base first), layout: list of (cx_frac, base_frac, height_frac or None, width_frac or None)
    order = sorted(zip(pids, layout), key=lambda t: t[1][1])
    for pid, (cxf, bf, hf, wf) in order:
        place(bg, load(pid), W * cxf, int(H * bf), height=H * hf if hf else None, width=W * wf if wf else None, key=key)
    save(bg, path)
    return bg
