// Photos used on the site, keyed by the shot-list IDs in docs/02-visual-direction.md.
//
// `unsplash` is a free photo from unsplash.com (Unsplash License: free for commercial
// use, no attribution required). `fallback` is the drawn stand-in from
// scripts/make-placeholder-art.mjs, used when photos are turned off (the Claude preview,
// which cannot load outside images) or if the photo fails to load.
// Replace both with Al Wali Food's own or licensed photos before launch.

export type PhotoKey = keyof typeof photos;

export const photos = {
  'olive-harvest': {
    id: 'IMG-03',
    unsplash: 'photo-1753703986174-95e74e094b0e',
    alt: 'Freshly picked olives and leaves gathered on a harvest net',
  },
  'fresh-produce': {
    id: 'IMG-04',
    unsplash: 'photo-1664791461482-79f5deee490f',
    alt: 'Fresh vegetables and fruit from the harvest',
  },
  mezze: {
    id: 'IMG-06',
    unsplash: 'photo-1743674453093-592bed88018e',
    alt: 'A platter of mezze dishes',
  },
  souk: {
    id: 'IMG-08',
    unsplash: 'photo-1758745464235-ccb8c1253074',
    alt: 'Colorful spices and dried goods displayed at a market stall',
  },
  'pickle-jars': {
    id: 'IMG-09',
    unsplash: 'photo-1774456567094-726973275d34',
    alt: 'Pickles with dill and spices in a glass jar',
  },
  'olive-grove': {
    id: 'IMG-11',
    unsplash: 'photo-1697829234209-5497520a9fc6',
    alt: 'A grove of olive trees with mountains in the background',
  },
  'sun-drying': {
    id: 'IMG-12',
    unsplash: 'photo-1641738119374-0a0ed1fb1764',
    alt: 'Ripe red peppers on a wooden table',
  },
  'labneh-breakfast': {
    id: 'IMG-13',
    unsplash: 'photo-1783696074463-3fb850d181a1',
    alt: 'Creamy dips drizzled with olive oil, ready for the breakfast table',
  },
  'sweets-tray': {
    id: 'IMG-14',
    unsplash: 'photo-1761828122856-8703baac8e86',
    alt: 'Golden pastries filled with chopped pistachios',
  },
  warehouse: {
    id: 'IMG-15',
    unsplash: 'photo-1757801752791-8bcd63cec878',
    alt: 'Store shelves stocked with spices and pantry goods',
  },
} as const;

const usePhotos = import.meta.env.PUBLIC_PHOTOS !== 'off';

export function photoSrc(key: PhotoKey, width = 1600) {
  const p = photos[key];
  return usePhotos
    ? `https://images.unsplash.com/${p.unsplash}?auto=format&fit=crop&w=${width}&q=75`
    : fallbackSrc(key);
}

export function fallbackSrc(key: PhotoKey) {
  return `/images/${key}.svg`;
}
