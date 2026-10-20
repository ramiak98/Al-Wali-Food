// Generates the illustrated placeholder artwork used by the demo site.
// These stand in for the photos in docs/02-visual-direction.md (IMG-01…IMG-15, PROD-*)
// until real or licensed photography is supplied. Run: npm run images
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const OUT = new URL('../public/images/', import.meta.url);
mkdirSync(new URL('products/', OUT), { recursive: true });

// Small seeded RNG so the artwork is stable between runs.
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

const W = 1600;
const H = 1000;
const svg = (body, defs = '', w = W, h = H) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">` +
  `<defs>${defs}</defs>${body}</svg>\n`;

const lin = (id, stops, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">` +
  stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('') +
  `</linearGradient>`;

const grain = `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .07 0"/></filter>`;
const grainRect = `<rect width="100%" height="100%" filter="url(#grain)"/>`;

// A ridge line across the canvas, as a closed path down to the bottom.
function ridge(r, y, amp, steps, color, bottom = H) {
  let d = `M0 ${bottom} L0 ${y}`;
  for (let i = 1; i <= steps; i++) {
    const x = (W / steps) * i;
    d += ` L${x.toFixed(0)} ${(y - r() * amp + amp / 2).toFixed(0)}`;
  }
  return `<path d="${d} L${W} ${bottom} Z" fill="${color}"/>`;
}

function smoothRidge(r, y, amp, steps, color) {
  const pts = [];
  for (let i = 0; i <= steps; i++) pts.push([(W / steps) * i, y - r() * amp]);
  let d = `M0 ${H} L0 ${pts[0][1].toFixed(0)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx.toFixed(0)} ${y0.toFixed(0)} ${cx.toFixed(0)} ${y1.toFixed(0)} ${x1.toFixed(0)} ${y1.toFixed(0)}`;
  }
  return `<path d="${d} L${W} ${H} Z" fill="${color}"/>`;
}

function column(x, top, base, w, color, shade) {
  const cap = 26;
  let g = `<rect x="${x}" y="${top + cap}" width="${w}" height="${base - top - cap}" fill="${color}"/>`;
  // flutes
  for (let i = 1; i < 4; i++) {
    g += `<rect x="${x + (w / 4) * i - 1.5}" y="${top + cap + 6}" width="3" height="${base - top - cap - 12}" fill="${shade}" opacity=".45"/>`;
  }
  g += `<path d="M${x - 12} ${top} h${w + 24} l-8 ${cap} h-${w + 8} z" fill="${color}"/>`;
  g += `<rect x="${x - 10}" y="${base}" width="${w + 20}" height="16" fill="${color}"/>`;
  return g;
}

function sky(id, stops) {
  return lin(id, stops);
}

const scenes = {};





function oliveTree(x, y, s, r, leaf = '#7d8c4f', dark = '#5d6b3a', trunk = '#5a4632') {
  let g = `<path d="M${x - 10 * s} ${y} C${x - 18 * s} ${y - 60 * s} ${x + 22 * s} ${y - 70 * s} ${x - 4 * s} ${y - 120 * s} L${x + 10 * s} ${y - 120 * s} C${x + 34 * s} ${y - 70 * s} ${x + 8 * s} ${y - 40 * s} ${x + 16 * s} ${y} Z" fill="${trunk}"/>`;
  for (let i = 0; i < 9; i++) {
    const cx = x + (r() * 150 - 75) * s;
    const cy = y - (130 + r() * 70) * s;
    g += `<ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${(50 + r() * 30) * s}" ry="${(32 + r() * 16) * s}" fill="${i % 3 ? leaf : dark}" opacity=".95"/>`;
  }
  return g;
}

// IMG-11 Olive grove
scenes['olive-grove'] = (() => {
  const r = rng(11);
  const defs = sky('s', [[0, '#bcd2d6'], [1, '#efe6cc']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += smoothRidge(r, 520, 110, 5, '#a9b39a');
  b += smoothRidge(r, 640, 70, 6, '#bda877');
  for (let i = 0; i < 7; i++) b += oliveTree(120 + i * 230, 700, 0.6, r, '#8b9a63', '#6d7b47');
  b += smoothRidge(r, 760, 40, 5, '#c7a96a');
  for (let i = 0; i < 4; i++) b += oliveTree(200 + i * 400, 960, 1.25, r);
  b += grainRect;
  return svg(b, defs);
})();

// IMG-03 Olive harvest: nets under trees, baskets of olives
scenes['olive-harvest'] = (() => {
  const r = rng(3);
  const defs = sky('s', [[0, '#d8c79a'], [1, '#f4e8c8']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += smoothRidge(r, 560, 80, 5, '#a59a6c');
  for (let i = 0; i < 3; i++) b += oliveTree(300 + i * 520, 760, 1.3, r);
  b += `<path d="M0 820 Q400 760 800 830 T1600 800 V1000 H0Z" fill="#c45f3c" opacity=".85"/>`;
  for (let i = 0; i < 220; i++) {
    const x = r() * W;
    const y = 840 + r() * 150;
    b += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="9" ry="7" fill="${r() > 0.5 ? '#2e2a22' : '#4f5a2a'}"/>`;
  }
  // basket
  b += `<path d="M1180 820 h260 l-30 150 h-200z" fill="#8a6237"/>`;
  for (let k = 0; k < 5; k++) b += `<path d="M1185 ${840 + k * 26} h250" stroke="#6d4a26" stroke-width="5"/>`;
  b += grainRect;
  return svg(b, defs);
})();

function cedar(x, y, s, c1, c2, snow) {
  let g = `<rect x="${x - 8 * s}" y="${y - 40 * s}" width="${16 * s}" height="${40 * s}" fill="#4a3424"/>`;
  const tiers = 5;
  for (let i = 0; i < tiers; i++) {
    const ty = y - 40 * s - i * 46 * s;
    const hw = (180 - i * 30) * s;
    g += `<path d="M${x - hw} ${ty} Q${x} ${ty - 40 * s} ${x + hw} ${ty} Q${x} ${ty - 14 * s} ${x - hw} ${ty}Z" fill="${i % 2 ? c1 : c2}"/>`;
    if (snow) g += `<path d="M${x - hw * 0.8} ${ty - 12 * s} Q${x} ${ty - 44 * s} ${x + hw * 0.8} ${ty - 12 * s}" stroke="#f6f3ec" stroke-width="${7 * s}" fill="none" stroke-linecap="round"/>`;
  }
  return g;
}


function jar(x, y, w, h, fill, lid = '#2b2420', label = '#faf6ee', band = '#a63a2b') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.14}" fill="${fill}"/>` +
    `<rect x="${x + w * 0.08}" y="${y - h * 0.12}" width="${w * 0.84}" height="${h * 0.14}" rx="6" fill="${lid}"/>` +
    `<rect x="${x + w * 0.1}" y="${y + h * 0.38}" width="${w * 0.8}" height="${h * 0.3}" fill="${label}"/>` +
    `<rect x="${x + w * 0.1}" y="${y + h * 0.38}" width="${w * 0.8}" height="${h * 0.06}" fill="${band}"/>` +
    `<rect x="${x + w * 0.12}" y="${y + h * 0.06}" width="${w * 0.1}" height="${h * 0.8}" rx="6" fill="#ffffff" opacity=".18"/>`;
}



function bowl(cx, cy, rad, fill, rim = '#f4efe4') {
  return `<circle cx="${cx}" cy="${cy}" r="${rad + 18}" fill="${rim}"/><circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fill}"/>`;
}



// IMG-08 Village souk: arches, sacks and jars
scenes['souk'] = (() => {
  const r = rng(8);
  const defs = lin('s', [[0, '#e2c69a'], [1, '#c39a65']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  for (let i = 0; i < 4; i++) {
    const x = 60 + i * 390;
    b += `<path d="M${x} 620 V260 a170 170 0 0 1 340 0 V620z" fill="#6b4a2f"/>`;
    b += `<path d="M${x + 20} 620 V270 a150 150 0 0 1 300 0 V620z" fill="#3e2a1c"/>`;
  }
  b += `<rect x="0" y="620" width="${W}" height="${H - 620}" fill="#b08657"/>`;
  const spice = ['#c4462e', '#e0a33a', '#7c8a3a', '#9a4a2a', '#d8b05a', '#5e6e2c', '#b8392a', '#e6c56e'];
  for (let i = 0; i < 8; i++) {
    const x = 90 + i * 185;
    b += `<path d="M${x} 900 q-10 -170 30 -200 h110 q40 30 30 200z" fill="#e7d6b4"/>`;
    b += `<ellipse cx="${x + 85}" cy="705" rx="60" ry="22" fill="${spice[i]}"/>`;
  }
  b += grainRect;
  return svg(b, defs);
})();


// IMG-04 Fresh vegetables from the Bekaa (basket overhead)
scenes['fresh-produce'] = (() => {
  const r = rng(4);
  const defs = lin('s', [[0, '#d7c39b'], [1, '#b9a074']], 1, 1) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += `<ellipse cx="800" cy="520" rx="560" ry="380" fill="#8a6237"/><ellipse cx="800" cy="520" rx="510" ry="335" fill="#6d4a26"/>`;
  for (let i = 0; i < 70; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    const x = 800 + Math.cos(a) * d * 440;
    const y = 520 + Math.sin(a) * d * 280;
    const t = r();
    b += t < 0.35
      ? `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="44" fill="#c8402c"/><circle cx="${x.toFixed(0)}" cy="${(y - 34).toFixed(0)}" r="9" fill="#4f6a2a"/>`
      : t < 0.6
        ? `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="70" ry="24" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})" fill="#5f8a45"/>`
        : t < 0.8
          ? `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="38" fill="#efe0f0"/><circle cx="${x.toFixed(0)}" cy="${(y + 10).toFixed(0)}" r="30" fill="#b9487a"/>`
          : `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="56" ry="26" fill="#e09a2c" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
  }
  b += grainRect;
  return svg(b, defs);
})();

// IMG-15 Warehouse / stocked shelves
scenes['warehouse'] = (() => {
  const r = rng(15);
  const defs = lin('s', [[0, '#d9d2c4'], [1, '#b9b0a0']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  for (let s = 0; s < 3; s++) {
    const x = 80 + s * 500;
    b += `<rect x="${x}" y="80" width="14" height="860" fill="#2f4f8a"/><rect x="${x + 420}" y="80" width="14" height="860" fill="#2f4f8a"/>`;
    for (let lvl = 0; lvl < 3; lvl++) {
      const y = 340 + lvl * 290;
      b += `<rect x="${x}" y="${y}" width="434" height="16" fill="#e0703a"/>`;
      let cx = x + 22;
      while (cx < x + 400) {
        const w = 70 + r() * 50;
        const h = 90 + r() * 120;
        if (cx + w > x + 414) break;
        b += `<rect x="${cx.toFixed(0)}" y="${(y - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${r() > 0.5 ? '#c9a46e' : '#b88f58'}"/>`;
        b += `<rect x="${(cx + 10).toFixed(0)}" y="${(y - h + 14).toFixed(0)}" width="${(w - 20).toFixed(0)}" height="18" fill="#1f4d3a"/>`;
        cx += w + 8;
      }
    }
  }
  b += grainRect;
  return svg(b, defs);
})();

// Where the ingredients come from: animals, fields and orchards.
function goat(x, y, s, body, r) {
  const k = (v) => (v * s).toFixed(0);
  let g = `<ellipse cx="${x}" cy="${y}" rx="${k(70)}" ry="${k(38)}" fill="${body}"/>`;
  for (const dx of [-45, -25, 25, 45]) g += `<rect x="${(x + dx * s).toFixed(0)}" y="${y}" width="${k(10)}" height="${k(62)}" fill="${body}"/>`;
  g += `<path d="M${x + 55 * s} ${y - 15 * s} l${k(30)} -${k(55)} l${k(34)} ${k(12)} l-${k(18)} ${k(48)}z" fill="${body}"/>`;
  g += `<path d="M${x + 88 * s} ${y - 70 * s} q-${k(20)} -${k(30)} -${k(4)} -${k(46)}" stroke="#4a3b2c" stroke-width="${k(5)}" fill="none"/>`;
  return g;
}
function cow(x, y, s, r) {
  const k = (v) => (v * s).toFixed(0);
  let g = `<rect x="${x}" y="${y}" width="${k(170)}" height="${k(80)}" rx="${k(30)}" fill="#8a5a36"/>`;
  g += `<ellipse cx="${(x + 60 * s).toFixed(0)}" cy="${(y + 30 * s).toFixed(0)}" rx="${k(26)}" ry="${k(20)}" fill="#f2ead8"/>`;
  for (const dx of [18, 40, 130, 150]) g += `<rect x="${(x + dx * s).toFixed(0)}" y="${(y + 70 * s).toFixed(0)}" width="${k(14)}" height="${k(60)}" fill="#6e4528"/>`;
  g += `<rect x="${(x + 160 * s).toFixed(0)}" y="${(y - 20 * s).toFixed(0)}" width="${k(50)}" height="${k(56)}" rx="${k(18)}" fill="#8a5a36"/>`;
  g += `<circle cx="${(x + 168 * s).toFixed(0)}" cy="${(y + 46 * s).toFixed(0)}" r="${k(8)}" fill="#d8b04a"/>`;
  return g;
}
function leafyRow(r, y, n, leaf, dark, rad) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const x = (W / n) * i + r() * 40;
    g += `<circle cx="${x.toFixed(0)}" cy="${(y + r() * 30).toFixed(0)}" r="${(rad * (0.8 + r() * 0.5)).toFixed(0)}" fill="${i % 2 ? leaf : dark}"/>`;
  }
  return g;
}

scenes['dairy-goats'] = (() => {
  const r = rng(21);
  const defs = sky('s', [[0, '#bcd6dc'], [1, '#eef0d8']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += smoothRidge(r, 470, 120, 5, '#9fb08f');
  b += smoothRidge(r, 620, 60, 6, '#8fae5e');
  const coats = ['#f3eee2', '#7a5032', '#e9e1cf', '#3b302a', '#c49a6c', '#f3eee2'];
  for (let i = 0; i < 6; i++) b += goat(180 + i * 240 + r() * 40, 700 + (i % 2) * 90, 0.9 + r() * 0.4, coats[i], r);
  b += grainRect;
  return svg(b, defs);
})();

scenes['dairy-cows'] = (() => {
  const r = rng(22);
  const defs = sky('s', [[0, '#a9c7d6'], [1, '#f0ead2']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += smoothRidge(r, 380, 200, 4, '#8b9c96');
  b += smoothRidge(r, 560, 90, 5, '#7fa252');
  for (let i = 0; i < 4; i++) b += cow(120 + i * 360 + r() * 60, 640 + (i % 2) * 110, 1 + r() * 0.3, r);
  b += grainRect;
  return svg(b, defs);
})();

scenes['tomato-vine'] = (() => {
  const r = rng(23);
  const defs = lin('s', [[0, '#5f7f3c'], [1, '#2f4a22']], 1, 1) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  for (let i = 0; i < 90; i++) b += `<ellipse cx="${(r() * W).toFixed(0)}" cy="${(r() * H).toFixed(0)}" rx="${(40 + r() * 50).toFixed(0)}" ry="${(18 + r() * 20).toFixed(0)}" transform="rotate(${(r() * 180).toFixed(0)})" fill="${r() > 0.5 ? '#4d7a2e' : '#6b9a3c'}" opacity=".8"/>`;
  for (let c = 0; c < 4; c++) {
    const cx = 250 + c * 370, cy = 380 + (c % 2) * 220;
    b += `<path d="M${cx} 0 Q${cx + 30} ${cy / 2} ${cx} ${cy}" stroke="#3c5c22" stroke-width="10" fill="none"/>`;
    for (let t = 0; t < 5; t++) {
      const x = cx + (r() - 0.5) * 180, y = cy + (r() - 0.2) * 160;
      b += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(46 + r() * 20).toFixed(0)}" fill="${t === 4 ? '#e2803a' : '#c8302a'}"/><path d="M${(x - 16).toFixed(0)} ${(y - 44).toFixed(0)} l16 10 l16 -10" stroke="#3c5c22" stroke-width="7" fill="none"/>`;
    }
  }
  b += grainRect;
  return svg(b, defs);
})();

scenes['pepper-plant'] = (() => {
  const r = rng(24);
  const defs = sky('s', [[0, '#cfe0c0'], [1, '#86a65a']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  for (let row = 0; row < 3; row++) b += leafyRow(r, 360 + row * 230, 12, '#4f7d2f', '#3d6624', 90 - row * 10);
  for (let i = 0; i < 26; i++) {
    const x = 60 + r() * 1480, y = 380 + r() * 560;
    b += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q34 10 22 96 q-8 30 -30 6 q-30 -50 8 -102z" fill="${r() > 0.25 ? '#b8231c' : '#5f8a2a'}"/>`;
  }
  b += grainRect;
  return svg(b, defs);
})();

scenes['cucumber-vine'] = (() => {
  const r = rng(25);
  const defs = sky('s', [[0, '#e3ecd0'], [1, '#9cbc6c']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  for (let x = 80; x < W; x += 160) b += `<path d="M${x} 0 V${H}" stroke="#d8d2c2" stroke-width="4"/>`;
  for (let y = 80; y < H; y += 160) b += `<path d="M0 ${y} H${W}" stroke="#d8d2c2" stroke-width="4"/>`;
  for (let i = 0; i < 40; i++) b += `<path d="M${(r() * W).toFixed(0)} ${(r() * H).toFixed(0)} l60 -70 l60 70 l-30 50 h-60z" fill="${r() > 0.5 ? '#5d8f32' : '#4a7a26'}"/>`;
  for (let i = 0; i < 14; i++) {
    const x = 80 + r() * 1440, y = 120 + r() * 700;
    b += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="38" height="${(150 + r() * 60).toFixed(0)}" rx="19" fill="#2f5a1e"/><circle cx="${(x + 19).toFixed(0)}" cy="${(y - 6).toFixed(0)}" r="14" fill="#f2c434"/>`;
  }
  b += grainRect;
  return svg(b, defs);
})();

scenes['date-palm'] = (() => {
  const r = rng(26);
  const defs = sky('s', [[0, '#8fbfe0'], [1, '#f4e3bc']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += `<path d="M760 ${H} Q800 600 780 300 h50 Q860 600 840 ${H}z" fill="#8a6a46"/>`;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    b += `<path d="M805 300 Q${(805 + Math.cos(a) * 380).toFixed(0)} ${(300 + Math.sin(a) * 160 - 120).toFixed(0)} ${(805 + Math.cos(a) * 640).toFixed(0)} ${(300 + Math.sin(a) * 300).toFixed(0)}" stroke="#4f7a36" stroke-width="34" fill="none" stroke-linecap="round"/>`;
  }
  for (const [cx, cy] of [[690, 400], [930, 420], [810, 450]]) {
    for (let i = 0; i < 40; i++) b += `<ellipse cx="${(cx + (r() - 0.5) * 120).toFixed(0)}" cy="${(cy + r() * 200).toFixed(0)}" rx="13" ry="20" fill="${r() > 0.4 ? '#c6782a' : '#8a3f1c'}"/>`;
  }
  b += grainRect;
  return svg(b, defs);
})();

scenes['pistachios'] = (() => {
  const r = rng(27);
  const defs = lin('s', [[0, '#d9c49a'], [1, '#b89a68']], 1, 1) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  for (let i = 0; i < 320; i++) {
    const x = r() * W, y = r() * H, a = (r() * 180).toFixed(0);
    b += `<g transform="rotate(${a} ${x.toFixed(0)} ${y.toFixed(0)})"><ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="34" ry="22" fill="#e8d7b0" stroke="#b39566" stroke-width="3"/><ellipse cx="${(x + 6).toFixed(0)}" cy="${y.toFixed(0)}" rx="16" ry="9" fill="${r() > 0.5 ? '#8aa83a' : '#a0743c'}"/></g>`;
  }
  b += grainRect;
  return svg(b, defs);
})();

for (const [name, content] of Object.entries(scenes)) {
  writeFileSync(new URL(`${name}.svg`, OUT), content);
}

// ---------- Product packshots ----------
const catalog = JSON.parse(readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'));

const PW = 800;
const PH = 800;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// What each product looks like: package shape and contents color.
const look = {
  'pickled-cucumbers': ['jar', '#8ea24e'], 'pickled-turnips': ['jar', '#d64f7a'], 'mixed-pickles': ['jar', '#b7a14a'],
  'pickled-hot-peppers': ['jar', '#9fb34a'], 'green-olives-in-brine': ['jar', '#7d8c3a'],
  labneh: ['tub', '#f6f1e6'], 'labneh-balls-in-olive-oil': ['jar', '#d8c06a'], 'akkawi-cheese': ['tub', '#f3eedf'],
  'halloumi-cheese': ['pack', '#efe6cf'], ghee: ['jar', '#e8c35a'],
  'plain-halawa': ['tub', '#d9bd8e'], 'pistachio-halawa': ['tub', '#cdbf86'], 'date-maamoul': ['box', '#a63a2b'],
  'rose-turkish-delight': ['box', '#c96a86'], 'pistachio-nougat': ['box', '#1f4d3a'], 'rose-water': ['bottle', '#f3dbe2'],
  'orange-blossom-water': ['bottle', '#f3ecd0'],
  'extra-virgin-olive-oil': ['tin', '#1f4d3a'], 'olive-oil-blend': ['bottle', '#c9a83a'], 'black-olives': ['jar', '#2e2a22'],
  tahini: ['jar', '#c9a272'],
  'tomato-paste': ['jar', '#b8301f'], 'sweet-red-pepper-paste': ['jar', '#a8261c'], 'hot-red-pepper-paste': ['jar', '#8a1d16'],
  'pomegranate-molasses': ['bottle', '#4a1018'],
};

// The Al Wali logo badge, embedded so each packshot is a self-contained file.
const logoData = 'data:image/png;base64,' + readFileSync(new URL('./logo-label.png', import.meta.url)).toString('base64');
const logoImage = (cx, top, width) => {
  const height = (width * 118) / 240;
  return `<image href="${logoData}" x="${cx - width / 2}" y="${top}" width="${width}" height="${height}"/>`;
};

function label(x, y, w, h, p) {
  const name = esc(p.name);
  const fs = name.length > 18 ? 26 : 32;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#faf6ee"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="12" fill="#a63a2b"/>` +
    `<rect x="${x}" y="${y + h - 12}" width="${w}" height="12" fill="#1f4d3a"/>` +
    logoImage(x + w / 2, y + 16, Math.min(w * 0.5, 170)) +
    `<text x="${x + w / 2}" y="${y + h - 66}" text-anchor="middle" font-family="Georgia,serif" font-size="${fs}" fill="#2b2420">${name}</text>` +
    `<text x="${x + w / 2}" y="${y + h - 30}" text-anchor="middle" font-family="'Noto Naskh Arabic','Geeza Pro',serif" font-size="26" fill="#8a6a22" direction="rtl">${esc(p.nameAr)}</text>`;
}

function packshot(p) {
  const [shape, fill] = look[p.slug] ?? ['jar', '#b7a14a'];
  let b = `<rect width="${PW}" height="${PH}" fill="#f3ece0"/><ellipse cx="400" cy="700" rx="230" ry="26" fill="#00000018"/>`;
  if (shape === 'jar') {
    b += `<rect x="215" y="200" width="370" height="500" rx="46" fill="${fill}"/>`;
    b += `<rect x="235" y="140" width="330" height="76" rx="10" fill="#a8842f"/><rect x="235" y="200" width="330" height="10" fill="#7d5f1e"/>`;
    b += label(215, 330, 370, 240, p);
    b += `<rect x="240" y="225" width="30" height="450" rx="14" fill="#fff" opacity=".22"/>`;
  } else if (shape === 'tub') {
    b += `<path d="M190 300 h420 l-30 400 h-360z" fill="${fill}"/><rect x="175" y="262" width="450" height="52" rx="12" fill="#1f4d3a"/>`;
    b += label(222, 380, 356, 240, p);
  } else if (shape === 'box') {
    b += `<path d="M150 330 l250 -90 l250 90 v320 l-250 70 l-250 -70z" fill="${fill}"/><path d="M150 330 l250 70 l250 -70 l-250 -90z" fill="#ffffff" opacity=".18"/><path d="M400 400 v320" stroke="#00000022" stroke-width="4"/>`;
    b += `<g transform="translate(170 420) skewY(16)">${label(0, 0, 210, 190, { ...p, name: p.name.split(' ').slice(-1)[0] })}</g>`;
  } else if (shape === 'pack') {
    b += `<rect x="170" y="300" width="460" height="360" rx="30" fill="${fill}" stroke="#d8cdb4" stroke-width="6"/>`;
    b += label(220, 360, 360, 240, p);
  } else if (shape === 'tin') {
    b += `<rect x="230" y="150" width="340" height="550" rx="14" fill="${fill}"/><rect x="360" y="110" width="80" height="50" rx="8" fill="#b08d3c"/>`;
    b += label(250, 320, 300, 250, p);
    b += `<rect x="230" y="190" width="340" height="14" fill="#b08d3c"/><rect x="230" y="660" width="340" height="14" fill="#b08d3c"/>`;
  } else {
    b += `<path d="M350 110 h100 v120 q110 50 110 160 v300 q0 20 -20 20 h-280 q-20 0 -20 -20 v-300 q0 -110 110 -160z" fill="${fill}"/><rect x="345" y="90" width="110" height="40" rx="8" fill="#a8842f"/>`;
    b += label(250, 400, 300, 230, p);
  }
  return svg(b, '', PW, PH);
}

for (const cat of catalog.categories) {
  for (const p of cat.products) {
    if (!p.placeholder) continue; // real products use their photos in public/images/products/photos
    writeFileSync(new URL(`products/${p.slug}.svg`, OUT), packshot(p));
  }
}

console.log(`Wrote ${Object.keys(scenes).length} scenes and product packshots to public/images/`);
