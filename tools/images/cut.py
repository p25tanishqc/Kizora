import os, sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
from rembg import remove, new_session
sess = new_session("isnet-general-use")
RAW, CUT = "assets-source/photos-original", "assets-source/cutouts"
os.makedirs(CUT, exist_ok=True)
YMAX = {"aloe30.jpg": 714, "aloeE.jpg": 752, "aloeRose.jpg": 738}
only = sys.argv[1:]
for f in sorted(os.listdir(RAW)):
    if "_carton" in f or f == "milkBar.jpg" or (only and f not in only): continue
    im = Image.open(f"{RAW}/"+f).convert("RGB")
    if f in YMAX: im = im.crop((0, 0, 800, YMAX[f]))
    a = np.asarray(im).astype(int)
    mag = (a[...,0]>200)&(a[...,1]<90)&(a[...,2]>200)
    rows = np.where(mag.mean(1) < 0.5)[0]; cols = np.where(mag.mean(0) < 0.5)[0]
    im = im.crop((cols[0]+4, rows[0]+4, cols[-1]-4, rows[-1]-(0 if f in YMAX else 4)))
    out = remove(im, session=sess)
    al = np.asarray(out.getchannel("A"))
    m = al > 70
    m = ndimage.binary_fill_holes(m)
    lab, n = ndimage.label(m)
    if n > 1:
        sizes = ndimage.sum(m, lab, range(1, n+1)); keep = [i+1 for i, s in enumerate(sizes) if s > 0.01*m.sum()]
        m = np.isin(lab, keep)
    m = ndimage.binary_erosion(m, iterations=1)
    mask = Image.fromarray((m*255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.1))
    rgba = im.convert("RGBA"); rgba.putalpha(mask)
    bb = mask.point(lambda v: 255 if v > 20 else 0).getbbox()
    rgba.crop(bb).save(f"{CUT}/"+f.replace(".jpg", ".png")); print(f, bb)
