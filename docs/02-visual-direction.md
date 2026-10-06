# Visual direction

**Idea:** *"A Lebanese table set in the Bekaa Valley."* Big, warm photographs of Lebanon
(Baalbek's temples, the Bekaa's fields, olive groves, cedars, village kitchens) carry
the feeling of authenticity. Products sit in front of those landscapes like they were
just brought in from the field. The layout is calm and generous, with plenty of cream
space, so the photos and the jars do the talking.

Mood words: sun-warmed · earthy · generous · heritage · honest · premium but not fussy.

## Color palette

Colors are taken from the landscape: Baalbek limestone, cedar green, sumac and
terracotta, olive-oil gold. Contrast ratios are checked against WCAG 2.1 AA (4.5:1 for
body text, 3:1 for large text and UI).

| Role | Name | Hex | Use | Contrast |
| --- | --- | --- | --- | --- |
| Background | Limestone cream | `#FAF6EE` | Page background | — |
| Surface | Baalbek sand | `#E9DCC4` | Bands, cards, footer | Ink on sand 11.3:1 |
| Text | Ink | `#2B2420` | Body text, headings | 14.2:1 on cream |
| Text secondary | Stone | `#5C534C` | Captions, meta | 7.0:1 on cream |
| Primary | Cedar green | `#1F4D3A` | Header, links, buttons | 8.9:1 on cream; white on it 9.6:1 |
| Accent | Sumac red | `#A63A2B` | Primary CTA buttons (Find a store), highlights | White on it 6.4:1 |
| Accent 2 | Olive gold | `#B08D3C` | Decorative lines, icons, ornaments only | 2.9:1 — **never for text** |
| Accent 2 (text-safe) | Deep olive gold | `#8A6A22` | Eyebrow labels, small accents in text | 4.7:1 on cream |

Text over photos always sits on a dark gradient overlay (black 0 → 55%) so it stays readable.

## Typography (Google Fonts, free)

| Role | Font | Notes |
| --- | --- | --- |
| Headings | **Cormorant Garamond** (600) | Classical, echoes Baalbek's Roman inscriptions |
| Body & UI | **Inter** (400/500/600) | Very readable at small sizes, good for forms |
| Arabic | **Noto Naskh Arabic** (500) | Arabic product names, set slightly smaller and in olive gold-text |

Sizes (desktop / mobile): H1 64/40 px · H2 44/30 · H3 28/22 · body 18/17 · small 15.

## Graphic elements

- A thin **geometric border pattern** inspired by Lebanese tiles and the carved friezes of Baalbek, used as section dividers in olive gold.
- A simple **cedar icon** as a recurring mark (bullets, loaders, favicon fallback).
- Rounded corners kept small (6 px). Photos are full-bleed or framed with a thin gold rule, never with heavy shadows.
- Motion: slow hero crossfade (6 s), gentle fade-up on scroll. Disabled when the visitor has "reduce motion" turned on.

## Photography style

- Golden-hour light, warm tones, natural textures (stone, wood, linen, brass, clay).
- People shown through hands and gestures (harvesting, pouring oil, serving), so the site doesn't depend on model releases.
- Product shots: two sets. **Clean** (cream background, for product grids) and **lifestyle** (on a rustic table with Lebanese landscape or kitchen in the background).
- Avoid: clichéd desert imagery (Lebanon is green and mountainous), anything that looks like stock "generic Middle East", war or ruins framed negatively.

## Photo shot list

Sources, in order of preference: (1) Rami's own photos from Lebanon or a commissioned
shoot in Lebanon; (2) licensed stock with commercial use allowed (Unsplash, Pexels, or
paid Adobe Stock / Getty for hero images). **Never use images found on Google without a
license.** Record the source and license of every photo in the CMS.

| ID | Subject | Where used | Notes |
| --- | --- | --- | --- |
| IMG-01 | Baalbek temples (Jupiter columns) at golden hour, wide | Home hero slide 1 | Landscape, room for text on the left |
| IMG-02 | Bekaa Valley fields with mountains behind | Home hero slide 2, About | Spring green or harvest gold |
| IMG-03 | Olive harvest: hands, nets under trees | Home hero slide 3, Olive & Oil | |
| IMG-04 | Bekaa farmer's hands holding fresh vegetables | Home story teaser | |
| IMG-05 | Baalbek column / carved stone detail | Home gallery | Texture shot |
| IMG-06 | Overhead Lebanese mezze spread featuring our products | Home gallery, social | Product shoot |
| IMG-07 | Cedars of Lebanon | Home gallery, Contact hero | Snow or summer |
| IMG-08 | Village souk / spice and pickle stall | Home gallery | |
| IMG-09 | Pickling jars in a traditional kitchen, pink turnips | Pickles hero, gallery | |
| IMG-10 | Temple of Bacchus, Baalbek, wide | About hero | |
| IMG-11 | Olive grove, old twisted trees | About, Olive & Oil hero | |
| IMG-12 | Peppers and tomatoes sun-drying on a rooftop | About, Pastes hero | Very "Bekaa" image |
| IMG-13 | Labneh with olive oil and za'atar, breakfast table | Dairy hero | Product shoot |
| IMG-14 | Halawa, maamoul and sweets on a brass tray, Arabic coffee | Confectionery hero | Product shoot |
| IMG-15 | Well-stocked store shelf or warehouse with our products | Distributors hero | Real photo strongly preferred |
| PROD-* | Each product: front, back (label), 3/4 angle on cream background; 1 lifestyle | Product pages | 2000 px min, consistent lighting |

**Technical specs for the build:** hero images at least 2400 px wide; delivered as
AVIF/WebP with responsive sizes; every image needs meaningful alt text (written in the
CMS, e.g. "Columns of the Temple of Jupiter in Baalbek at sunset").

## Logo & brand assets needed

- Logo files (SVG preferred; or high-res PNG with transparent background), light and dark versions.
- Any existing brand colors or fonts from packaging (we'll adapt the palette above to match).
- Packaging photos or print files for every product.
