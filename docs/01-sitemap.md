# Sitemap

## Page tree

```
/                                   Home
/about                              About Us
/products                           Our Products (all categories)
  /products/pickles                 Pickles
    /products/pickles/[product]     Product detail
  /products/dairy                   Dairy
  /products/confectionery-desserts  Confectionery & Desserts
  /products/olive-oil               Olive & Oil
  /products/pastes                  Pastes (tomato, pepper, ...)
/where-to-buy                       Where to Buy (store finder + shopper form)
/distributors                       For Distributors & Retailers (inquiry/order form)
/contact                            Contact Us (general, links to the two forms above)
/events                             Events            ← built now, hidden from nav until launched
  /events/[event]                   Event detail
/legal/terms                        Terms of Service
/legal/privacy                      Privacy Policy
/legal/cookies                      Cookie Policy
/legal/accessibility                Accessibility Statement
/legal/privacy#your-choices         "Your Privacy Choices" (footer link, CCPA)
/404                                Not found
/sitemap.xml, /robots.txt           SEO (generated)
```

Every product detail page follows the same URL pattern under its category, e.g.
`/products/olive-oil/extra-virgin-olive-oil-1l`.

## Subcategories

Rami listed the five categories. The subcategories below are a proposed starting
point (confirm in [03-open-questions.md](03-open-questions.md)). They show as filter
chips on each category page, not as separate pages, so the menu stays simple.

| Category | Proposed subcategories |
| --- | --- |
| Pickles | Cucumber pickles · Turnip pickles (lefet) · Mixed pickles · Peppers · Olives in brine |
| Dairy | Labneh · Labneh balls in oil · Cheeses (akkawi, halloumi, baladi) · Ghee |
| Confectionery & Desserts | Halawa (tahini halva) · Maamoul · Turkish delight (rahat) · Nougat · Syrups (rose, orange blossom) |
| Olive & Oil | Extra virgin olive oil · Olive oil blends · Table olives · Tahini |
| Pastes | Tomato paste · Red pepper paste · Hot pepper paste · Pomegranate molasses |

## Navigation

**Header (desktop):** Logo · Home · About Us · Products ▾ · Where to Buy · Distributors · Contact Us
- *Products ▾* opens a mega-menu with the five categories, each with a photo and its subcategories.
- Primary button on the right: **Find a Store** → `/where-to-buy`.
- *Events* is added to the header between Products and Where to Buy when it launches.

**Header (mobile):** Logo · Find a Store button · menu button opening a full-screen menu with the same items.

**Footer:**
- Column 1: Logo, one-line brand promise, social icons (Instagram, TikTok, LinkedIn).
- Column 2 — Products: the five categories.
- Column 3 — Company: About Us, Events (when live), Contact Us, For Distributors.
- Column 4 — Legal: Terms of Service, Privacy Policy, Cookie Policy, Accessibility, Your Privacy Choices, Cookie Settings.
- Bottom bar: © [YEAR] [LEGAL ENTITY NAME]. All rights reserved. · [Business address] · Product of Lebanon.

## User journeys

1. **Shopper** sees the product in a store or online → lands on Home or a product page → clicks **Find a Store** → enters ZIP code → sees stores/distributors nearby, or fills the "Ask us where to buy" form.
2. **Distributor / retailer** searches for Lebanese food suppliers → lands on Home or a category page → clicks **For Distributors** → reads the catalog and logistics highlights → submits the inquiry/order form → the team replies by email.
3. **General** (press, partnerships, feedback) → Contact Us.

## CMS-managed content (Sanity)

So Rami can update the site without code:
- Categories, subcategories, products (name, Arabic name, photos, sizes, ingredients, allergens, nutrition panel image, case pack, badges).
- Store locations for Where to Buy (name, address, ZIP, coordinates, website).
- Events (title, date, location, photo, description). The Events nav link appears automatically when at least one upcoming event is published.
- Homepage hero slides and featured products.
- Site settings: contact email, phone, address, social links.
