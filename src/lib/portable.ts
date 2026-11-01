// Helpers that let the static export also run from a sub-folder (e.g. a private preview host)
// after `node scripts/make-portable.mjs`. On a normal deployment __KZ_ROOT is undefined and these are no-ops.
declare global { interface Window { __KZ_ROOT?: string } }

export function mapPath(path: string): string {
  const m = path.match(/^([^?#]*)(.*)$/)!; let p = m[1]; const rest = m[2];
  if (/\.[a-z0-9]+$/i.test(p)) return p.replace(/^\//, '') + rest;
  p = p.replace(/^\//, ''); if (p && !p.endsWith('/')) p += '/';
  return p + 'index.html' + rest;
}
export function asset(path: string): string {
  if (typeof window !== 'undefined' && window.__KZ_ROOT) return window.__KZ_ROOT + path.replace(/^\//, '');
  return path;
}
export function go(path: string, push: (p: string) => void) {
  if (typeof window !== 'undefined' && window.__KZ_ROOT) window.location.href = window.__KZ_ROOT + mapPath(path);
  else push(path);
}
