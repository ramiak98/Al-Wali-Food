// Catalog for the demo. The structure comes from docs/content/products.json;
// copy comes from docs/content/products.md. Every product is a PLACEHOLDER until
// Al Wali Food sends the real catalog (see docs/03-open-questions.md).
import raw from './products.json';
import type { PhotoKey } from './photos';

type RawProduct = (typeof raw.categories)[number]['products'][number];

export interface Product extends RawProduct {
  category: string;
  description: string;
  serving: string[];
}

interface CategoryCopy {
  line: string;
  intro: string;
  photo: PhotoKey;
  seoTitle: string;
}

const copy: Record<string, CategoryCopy> = {
  pickles: {
    line: 'Crunchy, tangy, made for the mezze table.',
    intro:
      'No Lebanese table is complete without a bowl of pickles. Our cucumbers, pink turnips and peppers are pickled the traditional way for that bright crunch that goes with everything from falafel to shawarma.',
    photo: 'pickle-jars',
    seoTitle: 'Lebanese Pickles | Turnip, Cucumber & Mixed Pickles',
  },
  dairy: {
    line: 'Creamy labneh and cheeses, just like in the village.',
    intro:
      'Thick, tangy labneh drizzled with olive oil is a Lebanese breakfast staple. Discover our labneh, labneh balls and traditional white cheeses.',
    photo: 'labneh-breakfast',
    seoTitle: 'Lebanese Labneh & Cheeses',
  },
  'confectionery-desserts': {
    line: 'Halawa, maamoul and sweets for every celebration.',
    intro:
      'Celebrations in Lebanon end with something sweet. From tahini halawa to date-filled maamoul and rose-scented syrups, bring that moment home.',
    photo: 'sweets-tray',
    seoTitle: 'Lebanese Sweets, Halawa & Maamoul',
  },
  'olive-oil': {
    line: 'Golden olive oil and olives from Lebanese groves.',
    intro:
      "Lebanon's olive trees have been tended for millennia. Our olive oil and olives bring that golden, peppery taste to your kitchen.",
    photo: 'olive-grove',
    seoTitle: 'Lebanese Extra Virgin Olive Oil & Olives',
  },
  pastes: {
    line: 'Rich tomato and pepper pastes, the base of every stew.',
    intro:
      'Sun-ripened tomatoes and peppers, slowly cooked down into deep, concentrated pastes. A spoonful is the start of countless Lebanese stews, dips and marinades.',
    photo: 'sun-drying',
    seoTitle: 'Lebanese Tomato & Red Pepper Paste',
  },
};

// Demo descriptions so the product pages read naturally. Replace with the real label copy.
const details: Record<string, [string, string[]]> = {
  'pickled-cucumbers': ['Small, crisp cucumbers pickled in brine with garlic, the classic partner for grilled meats.', ['Serve with shawarma and toum', 'Slice into a falafel wrap', 'Add to any mezze platter']],
  'pickled-turnips': ['Bright pink turnips, colored naturally with beetroot, with a sharp and refreshing crunch.', ['The must-have side for falafel', 'Chop into fattoush', 'Snack on them straight from the jar']],
  'mixed-pickles': ['A colorful mix of cucumbers, turnips, carrots and peppers, ready for the table.', ['Serve with kebbeh', 'Pair with labneh sandwiches', 'Brighten a rice dish']],
  'pickled-hot-peppers': ['Green chili peppers pickled whole for a clean, fiery bite.', ['Serve alongside grilled meats', 'Slice over hummus', 'Add heat to sandwiches']],
  'green-olives-in-brine': ['Firm green olives cured in a simple brine, as they are kept in Lebanese homes.', ['Breakfast with labneh and bread', 'Add to salads', 'Serve with cheese']],
  labneh: ['Thick, strained yogurt with a gentle tang, smooth enough to spread.', ['Swirl with olive oil and za’atar', 'Spread in a warm pita with mint', 'Serve as a dip with vegetables']],
  'labneh-balls-in-olive-oil': ['Small balls of aged labneh preserved in olive oil, rich and creamy.', ['Serve on a breakfast spread', 'Roll in za’atar or chili', 'Toss into a salad']],
  'akkawi-cheese': ['A mild white brined cheese, soft and slightly salty, used in savory pastries and sweets.', ['Bake into man’oushe', 'Melt into knefeh', 'Slice with watermelon in summer']],
  'halloumi-cheese': ['A firm cheese that holds its shape when grilled or fried, turning golden outside.', ['Grill and serve with tomatoes', 'Fry for breakfast', 'Add to a warm salad']],
  ghee: ['Clarified butter with a nutty aroma, used for frying and in traditional sweets.', ['Cook rice and vermicelli', 'Fry eggs the village way', 'Bake maamoul']],
  'plain-halawa': ['Tahini halva with a soft, flaky texture and a deep sesame flavor.', ['Eat with bread for breakfast', 'Serve with tea', 'Crumble over ice cream']],
  'pistachio-halawa': ['Our tahini halawa studded with green pistachios.', ['Serve with Arabic coffee', 'Pack for a sweet snack', 'Share at celebrations']],
  'date-maamoul': ['Shortbread cookies filled with dates, made for Eid and Easter tables.', ['Serve with coffee to guests', 'Gift for the holidays', 'Enjoy with tea']],
  'rose-turkish-delight': ['Soft rahat cubes scented with rose water and dusted with sugar.', ['Serve with coffee', 'Fill a gift box', 'Share after dinner']],
  'pistachio-nougat': ['Chewy white nougat packed with pistachios.', ['Slice for a dessert board', 'Serve with tea', 'Give as a gift']],
  'rose-water': ['Distilled rose water, the fragrance of Lebanese desserts.', ['Flavor syrups for sweets', 'Add to lemonade', 'Scent rice puddings']],
  'orange-blossom-water': ['Distilled orange blossom water with a delicate floral aroma.', ['Flavor ashta and puddings', 'Add a drop to white coffee', 'Use in maamoul dough']],
  'extra-virgin-olive-oil': ['Cold-extracted olive oil with a fresh, peppery finish.', ['Drizzle over hummus and labneh', 'Dress tabbouleh and fattoush', 'Dip with bread and za’atar']],
  'olive-oil-blend': ['A lighter olive oil blend for everyday cooking.', ['Sauté vegetables', 'Roast potatoes', 'Fry falafel']],
  'black-olives': ['Ripe black olives with a soft texture and rich flavor.', ['Serve at breakfast', 'Add to pizza and man’oushe', 'Snack with cheese']],
  tahini: ['Smooth paste of ground sesame seeds, the base of hummus and tarator.', ['Make hummus and baba ghanouj', 'Whisk into tarator sauce', 'Drizzle over roasted vegetables']],
  'tomato-paste': ['Concentrated paste of sun-ripened tomatoes.', ['Start a stew', 'Flavor stuffed vegetables', 'Enrich a rice dish']],
  'sweet-red-pepper-paste': ['Mild red pepper paste with a sweet, smoky depth.', ['Mix into muhammara', 'Spread on man’oushe', 'Marinate chicken']],
  'hot-red-pepper-paste': ['Spicy red pepper paste for those who like heat.', ['Stir into stews', 'Make a quick chili dip', 'Spice up marinades']],
  'pomegranate-molasses': ['Tart, dark syrup made by slowly reducing pomegranate juice.', ['Dress fattoush', 'Glaze grilled meats', 'Mix into muhammara']],
};

export const categories = raw.categories.map((c) => {
  const products: Product[] = c.products.map((p) => ({
    ...p,
    category: c.slug,
    description: details[p.slug]?.[0] ?? '',
    serving: details[p.slug]?.[1] ?? [],
  }));
  return { ...c, ...copy[c.slug], products };
});

export type Category = (typeof categories)[number];

export const allProducts = categories.flatMap((c) => c.products);

export const featuredSlugs = [
  'pickled-turnips',
  'labneh',
  'extra-virgin-olive-oil',
  'sweet-red-pepper-paste',
  'pistachio-halawa',
  'pomegranate-molasses',
  'date-maamoul',
  'green-olives-in-brine',
];

export const featured = featuredSlugs
  .map((s) => allProducts.find((p) => p.slug === s))
  .filter((p): p is Product => Boolean(p));

export const productUrl = (p: Product) => `/products/${p.category}/${p.slug}/`;
export const productImage = (p: Product) => `/images/products/${p.slug}.svg`;
