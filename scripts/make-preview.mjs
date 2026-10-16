// Turns the Astro build (dist/) into a flat set of pages with relative links, so the
// demo can be published as a Claude Artifact preview: about/index.html -> about.html,
// products/pickles/index.html -> products-pickles.html, and so on.
// Build first with photos off (the preview cannot load outside images):
//   PUBLIC_PHOTOS=off npx astro build && node scripts/make-preview.mjs
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const OUT = 'preview-build';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
// Copy the assets (photo stand-ins, logo, favicon); pages are rewritten below.
for (const asset of ['images', 'brand', 'favicon.png']) cpSync(join(DIST, asset), join(OUT, asset), { recursive: true });

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const flatName = (urlPath) => {
  const clean = urlPath.replace(/^\/+|\/+$/g, '').replace(/\/index\.html$/, '');
  return clean === '' ? 'index.html' : clean.replace(/\//g, '-') + '.html';
};

const pages = walk(DIST).filter((f) => f.endsWith('.html'));
for (const file of pages) {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  const name = rel === '404.html' ? '404.html' : flatName(rel.replace(/index\.html$/, ''));
  let html = readFileSync(file, 'utf8');

  html = html.replace(/(href|src|data-fallback)="\/([^"]*)"/g, (_, attr, path) => {
    if (/\.(png|svg|jpe?g|webp|ico|pdf)$/i.test(path)) return `${attr}="${path}"`;
    const [p, hash] = path.split('#');
    return `${attr}="${flatName('/' + p)}${hash !== undefined ? '#' + hash : ''}"`;
  });

  if (name === 'index.html') {
    // The Artifact publish wraps the entry page in its own document skeleton.
    html = html
      .replace(/<!doctype html>/i, '')
      .replace(/<html[^>]*>|<\/html>|<head>|<\/head>/gi, '')
      .replace(/<body([^>]*)>/i, '<div$1>')
      .replace(/<\/body>/i, '</div>')
      .replace(/<meta charset="utf-8"\s*\/?>/i, '')
      .replace(/<meta name="viewport"[^>]*>/i, '<meta name="claude:viewport-fit-sides" content="cover">');
  }
  writeFileSync(join(OUT, name), html.trim() + '\n');
}
console.log(`Wrote ${pages.length} pages to ${OUT}/`);
