// Turns the static export in /out into a "portable" copy that works from any sub-folder or preview host
// (every URL becomes relative and pages are addressed as .../index.html).
// Usage: npm run build && node scripts/make-portable.mjs [outDir=preview]
// Not needed for Vercel or Netlify, which serve /out at the domain root.
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'out';
const DST = process.argv.slice(2).find(a => !a.startsWith('--')) || 'preview';
// Some preview hosts reserve names starting with "_" (e.g. "_next"): pass --rename-next to move it to "kz-assets".
const RENAME = process.argv.includes('--rename-next');
fs.rmSync(DST, { recursive: true, force: true });
fs.cpSync(SRC, DST, { recursive: true });
if (RENAME) fs.renameSync(path.join(DST, '_next'), path.join(DST, 'kz-assets'));
for (const f of fs.readdirSync(DST)) if (f.endsWith('.txt')) fs.rmSync(path.join(DST, f));

const mapPath = (p) => {
  const m = p.match(/^([^?#]*)(.*)$/); let a = m[1]; const rest = m[2];
  if (/\.[a-z0-9]+$/i.test(a)) return a.replace(/^\//, '') + rest;
  a = a.replace(/^\//, ''); if (a && !a.endsWith('/')) a += '/';
  return a + 'index.html' + rest;
};

const boot = (rel) => `<script>window.__KZ_ROOT=new URL(${JSON.stringify(rel)},location.href).href;(function(){var m=${mapPath.toString()};document.addEventListener('click',function(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;var a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target==='_blank')return;var h=a.getAttribute('href');if(!h||h.charAt(0)==='#'||/^[a-z]+:/i.test(h))return;e.stopImmediatePropagation();if(h.charAt(0)==='/'&&h.charAt(1)!=='/'){e.preventDefault();location.href=window.__KZ_ROOT+m(h);}},true);})();</script>`;

let pages = 0;
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((f) => {
  const fp = path.join(d, f.name);
  if (f.isDirectory()) return walk(fp);
  const rel = path.relative(DST, fp);
  if (fp.endsWith('.html')) {
    const depth = rel.split(path.sep).length - 1;
    const up = depth ? '../'.repeat(depth) : './';
    let h = fs.readFileSync(fp, 'utf8');
    h = h.replace(/(\s(?:href|src|imageSrcSet|srcSet|srcset))="\/(?!\/)([^"]*)"/g, (_, attr, p) => `${attr}="${up}${mapPath('/' + p)}"`);
    // URLs inside the inline React Server Component payload (CSS, fonts, images used as props)
    h = h.replace(/\\"\/(_next\/static\/|images\/)/g, (_, p) => `\\"${up}${p}`);
    h = h.replace('<head>', '<head>' + boot(up));
    fs.writeFileSync(fp, h); pages++;
  } else if (fp.endsWith('.css')) {
    fs.writeFileSync(fp, fs.readFileSync(fp, 'utf8').replace(/url\(\/_next\/static\/media\//g, 'url(../media/'));
  } else if (/webpack-[^/]*\.js$/.test(fp)) {
    fs.writeFileSync(fp, fs.readFileSync(fp, 'utf8').replace('.p="/_next/"', '.p=(window.__KZ_ROOT||"/")+"_next/"'));
  }
});
walk(DST);
if (RENAME) {
  const fix = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((f) => {
    const fp = path.join(d, f.name);
    if (f.isDirectory()) return fix(fp);
    if (/\.(html|js|css)$/.test(fp)) fs.writeFileSync(fp, fs.readFileSync(fp, 'utf8').split('_next/').join('kz-assets/').replace(/\uFFFD/g, '\\ufffd'));
  });
  fix(DST);
}
console.log(`portable copy written to ${DST}/ (${pages} pages)`);
