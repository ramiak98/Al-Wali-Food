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

// IMG-01 Baalbek, Temple of Jupiter columns at golden hour
scenes['baalbek-jupiter'] = (() => {
  const r = rng(1);
  const defs = sky('s', [[0, '#3b2a4a'], [0.45, '#c8673a'], [0.75, '#efb15e'], [1, '#f6d79a']]) + grain +
    `<radialGradient id="sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3cf"/><stop offset=".4" stop-color="#ffd98a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += `<circle cx="1180" cy="640" r="260" fill="url(#sun)"/>`;
  b += ridge(r, 690, 90, 14, '#9a5a4a');
  b += ridge(r, 760, 60, 18, '#6e3f38');
  // six standing columns on a podium
  const podiumY = 760;
  const colTop = 260;
  b += `<rect x="360" y="${podiumY}" width="900" height="60" fill="#3a2320"/>`;
  b += `<rect x="330" y="${podiumY + 60}" width="960" height="40" fill="#2f1c1a"/>`;
  b += `<path d="M380 ${colTop - 70} h860 v46 h-860z" fill="#3a2320"/>`;
  b += `<path d="M370 ${colTop - 90} h880 v26 h-880z" fill="#3a2320"/>`;
  for (let i = 0; i < 6; i++) b += column(410 + i * 150, colTop - 24, podiumY - 16, 64, '#3a2320', '#5a3a30');
  b += smoothRidge(r, 900, 40, 6, '#24160f');
  b += grainRect;
  return svg(b, defs);
})();

// IMG-10 Temple of Bacchus, wide
scenes['baalbek-bacchus'] = (() => {
  const r = rng(10);
  const defs = sky('s', [[0, '#8fb3c9'], [0.6, '#e9d3b0'], [1, '#f3e4c7']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += smoothRidge(r, 620, 80, 6, '#a9b7b0');
  b += smoothRidge(r, 700, 60, 7, '#8a9a7d');
  const stone = '#d8b98a';
  const shade = '#b89464';
  b += `<path d="M300 330 L800 190 L1300 330 Z" fill="${stone}"/>`;
  b += `<path d="M340 320 L800 205 L1260 320 Z" fill="${shade}" opacity=".5"/>`;
  b += `<rect x="290" y="330" width="1020" height="56" fill="${stone}"/>`;
  b += `<rect x="290" y="372" width="1020" height="10" fill="${shade}"/>`;
  for (let i = 0; i < 8; i++) b += column(318 + i * 128, 386, 780, 54, stone, shade);
  b += `<rect x="250" y="796" width="1100" height="50" fill="${shade}"/>`;
  b += `<rect x="220" y="846" width="1160" height="40" fill="#a37f52"/>`;
  b += smoothRidge(r, 940, 30, 5, '#6f7d55');
  b += grainRect;
  return svg(b, defs);
})();

// IMG-05 Carved stone detail
scenes['baalbek-detail'] = (() => {
  const defs = lin('s', [[0, '#e3c99d'], [1, '#b38c5c']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  for (let row = 0; row < 3; row++) {
    const y = 140 + row * 270;
    b += `<rect x="0" y="${y}" width="${W}" height="10" fill="#8f6b40" opacity=".5"/>`;
    for (let i = 0; i < 12; i++) {
      const x = 70 + i * 135;
      if (row === 1) {
        b += `<g transform="translate(${x} ${y + 130})" fill="none" stroke="#7d5a32" stroke-width="7" opacity=".7"><circle r="52"/><path d="M0-52 Q26 0 0 52 Q-26 0 0-52M-52 0 Q0 26 52 0 Q0-26 -52 0"/></g>`;
      } else {
        b += `<path d="M${x - 50} ${y + 220} q50 -170 100 0" fill="none" stroke="#7d5a32" stroke-width="8" opacity=".6"/>`;
        b += `<circle cx="${x}" cy="${y + 90}" r="12" fill="#7d5a32" opacity=".5"/>`;
      }
    }
  }
  b += grainRect;
  return svg(b, defs);
})();

// IMG-02 Bekaa Valley fields with mountains
scenes['bekaa-valley'] = (() => {
  const r = rng(2);
  const defs = sky('s', [[0, '#9cc3d8'], [0.7, '#e7e2c9'], [1, '#f2e8cc']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += smoothRidge(r, 420, 140, 5, '#9aaab4');
  b += `<path d="M560 300 l70 -40 l60 30 l-40 20z" fill="#f4f1ea" opacity=".9"/>`;
  b += smoothRidge(r, 520, 90, 7, '#7f9078');
  const fields = ['#c9b25a', '#7c9a4e', '#d9c27a', '#5f8a45', '#b8a24a', '#8daa58', '#cfb565'];
  for (let i = 0; i < 7; i++) {
    const y = 560 + i * 62;
    b += smoothRidge(r, y, 30, 4, fields[i]);
    // crop rows
    for (let k = 0; k < 18; k++) {
      const x = r() * W;
      b += `<path d="M${x.toFixed(0)} ${y + 50} l${(r() * 80 - 40).toFixed(0)} 30" stroke="#00000018" stroke-width="3"/>`;
    }
  }
  // poplar line
  for (let i = 0; i < 9; i++) {
    const x = 980 + i * 34;
    b += `<ellipse cx="${x}" cy="575" rx="11" ry="46" fill="#3e5a34"/>`;
  }
  b += grainRect;
  return svg(b, defs);
})();

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

// IMG-07 Cedars of Lebanon
scenes['cedars'] = (() => {
  const r = rng(7);
  const defs = sky('s', [[0, '#a9c4d6'], [1, '#e9eef0']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += ridge(r, 380, 160, 9, '#c9d4dc');
  b += ridge(r, 470, 80, 12, '#f2f4f5');
  b += smoothRidge(r, 700, 60, 5, '#e8ecee');
  b += cedar(380, 820, 1.4, '#1f4d3a', '#2c6049', true);
  b += cedar(900, 760, 1.0, '#244f3c', '#336650', true);
  b += cedar(1300, 860, 1.7, '#1a4433', '#28583f', true);
  b += smoothRidge(r, 900, 30, 5, '#f7f8f8');
  b += grainRect;
  return svg(b, defs);
})();

function jar(x, y, w, h, fill, lid = '#2b2420', label = '#faf6ee', band = '#a63a2b') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.14}" fill="${fill}"/>` +
    `<rect x="${x + w * 0.08}" y="${y - h * 0.12}" width="${w * 0.84}" height="${h * 0.14}" rx="6" fill="${lid}"/>` +
    `<rect x="${x + w * 0.1}" y="${y + h * 0.38}" width="${w * 0.8}" height="${h * 0.3}" fill="${label}"/>` +
    `<rect x="${x + w * 0.1}" y="${y + h * 0.38}" width="${w * 0.8}" height="${h * 0.06}" fill="${band}"/>` +
    `<rect x="${x + w * 0.12}" y="${y + h * 0.06}" width="${w * 0.1}" height="${h * 0.8}" rx="6" fill="#ffffff" opacity=".18"/>`;
}

// IMG-09 Pickling jars in a traditional kitchen
scenes['pickle-jars'] = (() => {
  const r = rng(9);
  const defs = lin('s', [[0, '#e6d3b3'], [1, '#c9ab80']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  // arched window
  b += `<path d="M1080 120 h300 v420 h-300z M1080 270 a150 150 0 0 1 300 0" fill="#f6e7c4"/>`;
  b += `<path d="M1080 270 a150 150 0 0 1 300 0 v270 h-300z" fill="#bcd3d9"/>`;
  b += `<rect x="1225" y="140" width="10" height="400" fill="#c9ab80"/>`;
  // shelf
  b += `<rect x="0" y="600" width="${W}" height="30" fill="#7a5233"/>`;
  b += `<rect x="0" y="630" width="${W}" height="${H - 630}" fill="#a77c51"/>`;
  const fills = ['#d64f7a', '#9db35a', '#c94f6d', '#7f9a46', '#e0708f', '#b8c46a', '#d65a70'];
  for (let i = 0; i < 7; i++) {
    const w = 130 + r() * 50;
    const h = 220 + r() * 120;
    b += jar(70 + i * 210, 600 - h, w, h, fills[i], '#5b4636', '#f4ead4', '#1f4d3a');
  }
  b += grainRect;
  return svg(b, defs);
})();

// IMG-12 Peppers and tomatoes sun-drying on a rooftop
scenes['sun-drying'] = (() => {
  const r = rng(12);
  const defs = sky('s', [[0, '#8fbbd6'], [1, '#e9e1c6']]) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += smoothRidge(r, 420, 120, 5, '#9aa59a');
  b += `<path d="M0 520 L${W} 470 V${H} H0Z" fill="#e2cfa8"/>`;
  for (let row = 0; row < 4; row++) {
    const y = 560 + row * 110;
    b += `<path d="M60 ${y + 40 - row * 10} L1540 ${y - row * 10}" stroke="#d9c7a2" stroke-width="80" stroke-linecap="round"/>`;
    for (let i = 0; i < 26; i++) {
      const x = 100 + i * 55 + r() * 10;
      const yy = y + 40 - row * 10 - ((x - 60) / 1480) * 40;
      const tomato = (i + row) % 3 === 0;
      b += tomato
        ? `<circle cx="${x.toFixed(0)}" cy="${yy.toFixed(0)}" r="20" fill="#c8402c"/>`
        : `<ellipse cx="${x.toFixed(0)}" cy="${yy.toFixed(0)}" rx="26" ry="11" transform="rotate(${(r() * 50 - 25).toFixed(0)} ${x.toFixed(0)} ${yy.toFixed(0)})" fill="${r() > 0.3 ? '#a8261c' : '#d0552b'}"/>`;
    }
  }
  b += grainRect;
  return svg(b, defs);
})();

function bowl(cx, cy, rad, fill, rim = '#f4efe4') {
  return `<circle cx="${cx}" cy="${cy}" r="${rad + 18}" fill="${rim}"/><circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fill}"/>`;
}

// IMG-13 Labneh with olive oil and za'atar
scenes['labneh-breakfast'] = (() => {
  const r = rng(13);
  const defs = lin('s', [[0, '#b98f63'], [1, '#8a643f']], 1, 1) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  for (let i = 0; i < 9; i++) b += `<rect x="0" y="${i * 115}" width="${W}" height="3" fill="#00000014"/>`;
  b += `<rect x="120" y="120" width="420" height="760" rx="10" fill="#efe4cf" opacity=".9"/>`;
  b += bowl(800, 500, 260, '#f7f2e8', '#2c5c8a');
  b += `<path d="M640 470 q160 -120 320 0 q-160 120 -320 0" fill="#d1b23a" opacity=".85"/>`;
  for (let i = 0; i < 160; i++) {
    const a = r() * Math.PI * 2;
    const d = r() * 210;
    b += `<circle cx="${(800 + Math.cos(a) * d).toFixed(0)}" cy="${(500 + Math.sin(a) * d).toFixed(0)}" r="4" fill="#5d6b2e"/>`;
  }
  b += bowl(1300, 260, 110, '#3b3a22');
  for (let i = 0; i < 14; i++) b += `<ellipse cx="${1240 + (i % 5) * 30}" cy="${210 + Math.floor(i / 5) * 40}" rx="16" ry="12" fill="#556b2f"/>`;
  b += bowl(1320, 740, 120, '#d64f7a');
  // bread
  b += `<ellipse cx="330" cy="560" rx="170" ry="260" fill="#e2c38d"/><ellipse cx="330" cy="560" rx="140" ry="225" fill="#d8b276"/>`;
  b += grainRect;
  return svg(b, defs);
})();

// IMG-14 Sweets on a brass tray with Arabic coffee
scenes['sweets-tray'] = (() => {
  const r = rng(14);
  const defs = lin('s', [[0, '#5a2f2a'], [1, '#3a1e1b']], 1, 1) + grain +
    `<radialGradient id="brass" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#f0cf7a"/><stop offset="1" stop-color="#a87a2c"/></radialGradient>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  b += `<circle cx="700" cy="500" r="420" fill="url(#brass)"/>`;
  b += `<circle cx="700" cy="500" r="380" fill="none" stroke="#8a6224" stroke-width="6" stroke-dasharray="4 14"/>`;
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    const x = 700 + Math.cos(a) * 250;
    const y = 500 + Math.sin(a) * 250;
    b += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="62" fill="#e8c88f"/>`;
    for (let k = 0; k < 8; k++) {
      const aa = (k / 8) * Math.PI * 2;
      b += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l${(Math.cos(aa) * 50).toFixed(0)} ${(Math.sin(aa) * 50).toFixed(0)}" stroke="#c99e5e" stroke-width="5"/>`;
    }
  }
  for (let i = 0; i < 12; i++) b += `<rect x="${590 + (i % 4) * 56}" y="${410 + Math.floor(i / 4) * 56}" width="48" height="48" rx="8" fill="${i % 2 ? '#e7a0b0' : '#f3d9e0'}"/>`;
  // coffee cup and dallah
  b += `<circle cx="1320" cy="300" r="90" fill="#f4efe4"/><circle cx="1320" cy="300" r="70" fill="#4a2b17"/>`;
  b += `<circle cx="1360" cy="720" r="120" fill="#b8892f"/><path d="M1300 600 q60 -140 120 0z" fill="#b8892f"/><path d="M1460 690 q80 -40 110 -110" stroke="#b8892f" stroke-width="22" fill="none"/>`;
  b += grainRect;
  return svg(b, defs);
})();

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

// IMG-06 Mezze spread, overhead
scenes['mezze'] = (() => {
  const r = rng(6);
  const defs = lin('s', [[0, '#7f5a3a'], [1, '#5e3f27']], 1, 1) + grain;
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/>`;
  const dishes = [
    [300, 280, 150, '#f7f2e8'], [720, 230, 120, '#d64f7a'], [1120, 300, 170, '#c8402c'],
    [460, 700, 170, '#e9d8a6'], [880, 620, 140, '#7f9a46'], [1300, 720, 130, '#3b3a22'],
  ];
  for (const [x, y, rad, c] of dishes) b += bowl(x, y, rad, c, '#efe7d6');
  b += `<path d="M260 280 q40 -50 80 0" stroke="#d1b23a" stroke-width="18" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < 40; i++) b += `<circle cx="${(880 + (r() - 0.5) * 220).toFixed(0)}" cy="${(620 + (r() - 0.5) * 220).toFixed(0)}" r="9" fill="#4f6a2a"/>`;
  for (let i = 0; i < 30; i++) b += `<circle cx="${(1120 + (r() - 0.5) * 260).toFixed(0)}" cy="${(300 + (r() - 0.5) * 260).toFixed(0)}" r="6" fill="#f0c7a0"/>`;
  b += grainRect;
  return svg(b, defs);
})();

// IMG-04 Fresh vegetables from the Bekaa (basket overhead)
scenes['bekaa-produce'] = (() => {
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
    writeFileSync(new URL(`products/${p.slug}.svg`, OUT), packshot(p));
  }
}

console.log(`Wrote ${Object.keys(scenes).length} scenes and product packshots to public/images/`);
