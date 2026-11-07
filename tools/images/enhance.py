"""Kizora site images: the product photos supplied by the founder team, upscaled for HD.

Source files: assets-source/new-photos/<slug>.png|.jpg|.jpeg (improved set of 7 Nov 2026, 820 to 1126 px wide;
beetroot lip balm still uses the 2 Nov photo), Kizora_main_page_image.jpg, Kizora_face_image.jpg.
A landscape photo (the ubtan bar, 3:2) is fitted to 4:5 without cutting any product: only plain margins are
trimmed at the sides and the plain wall and floor are continued above and below (extend_45).
Each photo is upscaled 4x with Real-ESRGAN (realesr-general-x4v3, BSD-3 licence, run through ONNX Runtime
on the CPU), blended 15% with a plain Lanczos upscale so natural texture stays, then resized and saved as WebP:
  public/images/products/<slug>/1.webp    1600 x 2000  (4:5, the product photo frame used across the site)
  public/images/products/<slug>/card.webp  600 x 750
  public/images/home/hero.webp            2000 px wide (homepage)
  public/images/home/og.webp              1200 x 630  (social share card, padded, not cropped)
  public/images/home/aloe-face.webp       1800 px wide (Face gels collection, aloe vera ingredient page)

Setup (once):
  pip install onnx onnxruntime pillow numpy
  curl -LO https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesr-general-x4v3.pth
  python tools/images/enhance.py --build-model realesr-general-x4v3.pth   # writes realesr-general-x4v3.onnx
Run:
  python tools/images/enhance.py          # product photos
  python tools/images/enhance.py --all    # also the homepage image, share card and aloe face image
"""
import glob, os, pickle, sys, zipfile
import numpy as np
from PIL import Image, ImageFilter

SRC, OUT, MODEL = "assets-source/new-photos", "public/images", "realesr-general-x4v3.onnx"


def build_model(pth):
    """Convert the PyTorch weights to ONNX without needing PyTorch installed."""
    import onnx
    from onnx import helper, numpy_helper, TensorProto
    z = zipfile.ZipFile(pth); root = z.namelist()[0].split("/")[0]
    DT = {"FloatStorage": np.float32, "HalfStorage": np.float16}

    def rebuild(storage, offset, size, stride, *a):
        key, dtype = storage; buf = np.frombuffer(z.read(f"{root}/data/{key}"), dtype=dtype)
        return np.array(np.lib.stride_tricks.as_strided(buf[offset:], shape=size, strides=[s * buf.itemsize for s in stride]), np.float32)

    class U(pickle.Unpickler):
        def find_class(self, mod, name):
            if name == "_rebuild_tensor_v2": return rebuild
            if name in DT: return name
            if name == "_rebuild_parameter": return lambda t, *a: t
            return super().find_class(mod, name)
        def persistent_load(self, pid): return (pid[2], DT[pid[1]])

    sd = U(z.open(f"{root}/data.pkl")).load(); sd = sd.get("params", sd.get("params_ema", sd))
    nodes, inits, cur = [], [], "input"
    W = lambda n, a: (inits.append(numpy_helper.from_array(a.astype(np.float32), n)), n)[1]
    for j in sorted({int(k.split(".")[1]) for k in sd}):
        w = sd[f"body.{j}.weight"]
        if w.ndim == 4:
            nodes.append(helper.make_node("Conv", [cur, W(f"w{j}", w), W(f"b{j}", sd[f"body.{j}.bias"])], [f"c{j}"], pads=[1, 1, 1, 1], kernel_shape=[3, 3])); cur = f"c{j}"
        else:
            nodes.append(helper.make_node("PRelu", [cur, W(f"a{j}", w.reshape(-1, 1, 1))], [f"p{j}"])); cur = f"p{j}"
    nodes += [helper.make_node("DepthToSpace", [cur], ["ps"], blocksize=4, mode="CRD"),
              helper.make_node("Resize", ["input", "", W("scales", np.array([1, 1, 4, 4], np.float32))], ["base"], mode="nearest"),
              helper.make_node("Add", ["ps", "base"], ["output"])]
    io = lambda n: helper.make_tensor_value_info(n, TensorProto.FLOAT, [1, 3, None, None])
    m = helper.make_model(helper.make_graph(nodes, "srvgg", [io("input")], [io("output")], inits), opset_imports=[helper.make_opsetid("", 13)])
    m.ir_version = 8; onnx.save(m, MODEL); print("wrote", MODEL)


def up4(img, sess, tile=200, pad=10):
    a = np.asarray(img.convert("RGB")).astype(np.float32) / 255; h, w = a.shape[:2]
    out = np.zeros((h * 4, w * 4, 3), np.float32)
    for y in range(0, h, tile):
        for x in range(0, w, tile):
            y0, x0, y1, x1 = max(0, y - pad), max(0, x - pad), min(h, y + tile + pad), min(w, x + tile + pad)
            r = sess.run(None, {"input": a[y0:y1, x0:x1].transpose(2, 0, 1)[None]})[0][0].transpose(1, 2, 0)
            th, tw = min(tile, h - y), min(tile, w - x)
            out[y*4:(y+th)*4, x*4:(x+tw)*4] = r[(y-y0)*4:(y-y0+th)*4, (x-x0)*4:(x-x0+tw)*4]
    sr = Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8))
    return Image.blend(sr, img.convert("RGB").resize(sr.size, Image.LANCZOS), 0.15)


def finish(im, size):
    im = im.resize(size, Image.LANCZOS)
    return im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=35, threshold=2))


def fit_45(im):
    """Trim to an exact 4:5 frame. The supplied photos are 820 x 1024, so this removes at most a pixel or two."""
    w, h = im.size; tw = round(h * 0.8)
    if tw < w:
        l = (w - tw) // 2; return im.crop((l, 0, l + tw, h))
    th = round(w / 0.8); t = (h - th) // 2; return im.crop((0, t, w, t + th))


def extend_45(img):
    """Landscape photo -> 4:5 frame, keeping every product: trim plain side margins, continue wall and floor."""
    import cv2
    a = np.asarray(img.convert("RGB")).astype(np.float32); h, w = a.shape[:2]
    a = a[:, int(w * 0.025):int(w * 0.975)]; w = a.shape[1]
    H = round(w / 0.8); add = H - h; top = int(add * 0.62); bot = add - top
    edge = lambda rows: cv2.GaussianBlur(rows.mean(axis=0)[None], (0, 0), sigmaX=90, sigmaY=0.1)[0]
    ct, cb = edge(a[:140]), edge(a[-110:])
    c = np.zeros((H, w, 3), np.float32)
    c[:top] = ct[None] * (1 + 0.035 * np.linspace(1, 0, top, dtype=np.float32)[:, None, None])
    c[top + h:] = cb[None] * (1 - 0.03 * np.linspace(0, 1, bot, dtype=np.float32)[:, None, None])
    ft, fb = 170, 120; al = np.ones((h, 1, 1), np.float32)
    al[:ft, 0, 0] = np.linspace(0, 1, ft) ** 1.5; al[h - fb:, 0, 0] = np.linspace(1, 0, fb) ** 1.5
    plain = np.where(np.arange(h)[:, None, None] < h / 2, ct[None], cb[None])
    c[top:top + h] = a * al + plain * (1 - al)
    m = np.ones((H, 1, 1), np.float32); m[top + ft:top + h - fb] = 0
    c = c + np.random.default_rng(1).normal(0, 1.4, c.shape).astype(np.float32) * m
    return Image.fromarray(np.clip(c, 0, 255).astype(np.uint8))


def main(sess, ups=up4, extras=False):
    os.makedirs(f"{OUT}/home", exist_ok=True)
    for f in sorted(glob.glob(f"{SRC}/*")):
        slug = os.path.basename(f).rsplit(".", 1)[0]
        if slug.startswith("Kizora_"): continue
        d = f"{OUT}/products/{slug}"; os.makedirs(d, exist_ok=True)
        for old in glob.glob(f"{d}/*.webp"): os.remove(old)
        src = Image.open(f).convert("RGB")
        if src.width / src.height > 0.9: src = extend_45(src)
        big = fit_45(ups(src, sess))
        finish(big, (1600, 2000)).save(f"{d}/1.webp", quality=88, method=6)
        finish(big, (600, 750)).save(f"{d}/card.webp", quality=84, method=6); print(slug, flush=True)
    if not extras: return
    hero = ups(Image.open(f"{SRC}/Kizora_main_page_image.jpg"), sess)
    hw = 2000; hh = round(hero.height * hw / hero.width)
    finish(hero, (hw, hh)).save(f"{OUT}/home/hero.webp", quality=88, method=6)
    # share card: the whole picture fitted into 1200 x 630, plain studio background extended at the sides
    s = finish(hero, (round(hero.width * 630 / hero.height), 630)); a = np.asarray(s); l = (1200 - a.shape[1]) // 2
    a = np.pad(a, ((0, 0), (l, 1200 - a.shape[1] - l), (0, 0)), mode="edge")
    Image.fromarray(a).save(f"{OUT}/home/og.webp", quality=86)
    face = ups(Image.open(f"{SRC}/Kizora_face_image.jpg"), sess)
    finish(face, (1800, round(face.height * 1800 / face.width))).save(f"{OUT}/home/aloe-face.webp", quality=88, method=6)
    print("done")


if __name__ == "__main__":
    if len(sys.argv) > 2 and sys.argv[1] == "--build-model":
        build_model(sys.argv[2]); sys.exit()
    import onnxruntime as ort
    main(ort.InferenceSession(MODEL, providers=["CPUExecutionProvider"]), extras="--all" in sys.argv)
