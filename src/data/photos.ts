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
  souk: {
    id: 'IMG-08',
    unsplash: 'photo-1758745464235-ccb8c1253074',
    alt: 'Colorful spices and dried goods displayed at a market stall',
  },
  'olive-grove': {
    id: 'IMG-11',
    unsplash: 'photo-1697829234209-5497520a9fc6',
    alt: 'A grove of olive trees with mountains in the background',
  },
  warehouse: {
    id: 'IMG-15',
    unsplash: 'photo-1757801752791-8bcd63cec878',
    alt: 'Store shelves stocked with spices and pantry goods',
  },
  'dairy-goats': {
    id: 'IMG-16',
    unsplash: 'photo-1622837699015-9a4cb8b7a94b',
    alt: 'A herd of goats grazing on a green hillside',
  },
  'dairy-cows': {
    id: 'IMG-17',
    unsplash: 'photo-1787662977220-3d6235361df5',
    alt: 'Cows with bells grazing on a grassy mountain slope',
  },
  'tomato-vine': {
    id: 'IMG-18',
    unsplash: 'photo-1471194402529-8e0f5a675de6',
    alt: 'Ripe tomatoes hanging on the vine',
  },
  'pepper-plant': {
    id: 'IMG-19',
    unsplash: 'photo-1663500617750-350be54823e2',
    alt: 'A red pepper ripening on the plant',
  },
  'cucumber-vine': {
    id: 'IMG-20',
    unsplash: 'photo-1757111084609-17bbd129a7f6',
    alt: 'Green cucumbers growing on a vine in the sun',
  },
  'date-palm': {
    id: 'IMG-21',
    unsplash: 'photo-1757525473919-2ef9bc84d811',
    alt: 'Clusters of ripe dates hanging from a palm tree',
  },
  pistachios: {
    id: 'IMG-22',
    unsplash: 'photo-1704079662049-d00890d21a69',
    alt: 'A pile of freshly harvested pistachios',
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
