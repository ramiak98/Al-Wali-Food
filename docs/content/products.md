# Products

All product names below are **PLACEHOLDERS** until Rami sends the real catalog.
The structured version for the CMS is in [products.json](products.json).

No prices, carts or "buy" buttons anywhere. Every product page leads to
**Find a store** (shoppers) or **Request this product** (distributors).

---

## A. All products page (`/products`)

**SEO title:** Our Products | Al Wali Food Lebanese Pantry
**Meta description:** Browse Al Wali Food's Lebanese pickles, dairy, olive oil, pastes, confectionery and desserts.

> **Heading:** The Lebanese pantry
> **Intro:** From the mezze table to dessert, discover everything we bring from Lebanon.

Five large category cards (photo, name, one line, "View products"), then a
"Not sure where to find us? [Find a store]" band.

## B. Category pages

Layout: hero photo with category name and intro → subcategory filter chips → product grid
(photo, name, Arabic name, size) → distributor CTA band.

### Pickles (`/products/pickles`)
**SEO title:** Lebanese Pickles | Turnip, Cucumber & Mixed Pickles | Al Wali Food
**Meta description:** Crunchy Lebanese pickles: pink pickled turnips, cucumbers, peppers and mixed pickles, made the traditional way.
> **Heading:** Pickles
> **Intro:** No Lebanese table is complete without a bowl of pickles. Our cucumbers, pink turnips and peppers are pickled the traditional way for that bright crunch that goes with everything from falafel to shawarma.
Hero photo: `IMG-09` pickle jars in a traditional kitchen.

### Dairy (`/products/dairy`)
**SEO title:** Lebanese Labneh & Cheeses | Al Wali Food
**Meta description:** Creamy Lebanese labneh, labneh balls in olive oil and traditional cheeses like akkawi and halloumi.
> **Heading:** Dairy
> **Intro:** Thick, tangy labneh drizzled with olive oil is a Lebanese breakfast staple. Discover our labneh, labneh balls and traditional white cheeses.
Hero photo: `IMG-13` labneh with olive oil and za'atar, breakfast table.

### Confectionery & Desserts (`/products/confectionery-desserts`)
**SEO title:** Lebanese Sweets, Halawa & Maamoul | Al Wali Food
**Meta description:** Lebanese halawa, maamoul, Turkish delight and syrups for every celebration.
> **Heading:** Confectionery & Desserts
> **Intro:** Celebrations in Lebanon end with something sweet. From tahini halawa to date-filled maamoul and rose-scented syrups, bring that moment home.
Hero photo: `IMG-14` sweets on a brass tray with Arabic coffee.

### Olive & Oil (`/products/olive-oil`)
**SEO title:** Lebanese Extra Virgin Olive Oil & Olives | Al Wali Food
**Meta description:** Extra virgin olive oil, table olives and tahini, the foundation of Lebanese cooking.
> **Heading:** Olive & Oil
> **Intro:** Lebanon's olive trees have been tended for millennia. Our olive oil and olives bring that golden, peppery taste to your kitchen.
Hero photo: `IMG-11` olive grove / `IMG-03` olive harvest.

### Pastes (`/products/pastes`)
**SEO title:** Lebanese Tomato & Red Pepper Paste | Al Wali Food
**Meta description:** Rich tomato paste, sweet and hot red pepper paste and pomegranate molasses for authentic Lebanese cooking.
> **Heading:** Pastes
> **Intro:** Sun-ripened tomatoes and peppers, slowly cooked down into deep, concentrated pastes. A spoonful is the start of countless Lebanese stews, dips and marinades.
Hero photo: `IMG-12` peppers and tomatoes drying in the sun.

## C. Product detail page template

| Block | Content |
| --- | --- |
| Breadcrumb | Products › Category › Product |
| Gallery | Front of pack, back of pack, lifestyle/serving photo |
| Title | English name + Arabic name (e.g. "Pickled Turnips · مخلل لفت") |
| Short description | 1–2 sentences |
| Sizes | e.g. 500 g jar, 1 kg jar |
| Serving ideas | 2–3 bullets |
| Ingredients | Exactly as on the label |
| **Allergens** | "Contains:" statement exactly as on the label. Must cover the 9 US major allergens (milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soybeans, **sesame**). |
| Nutrition Facts | Image of the US Nutrition Facts panel from the label, plus text alternative |
| Storage | e.g. "Refrigerate after opening." |
| Badges | Only if true and certified: Halal, Vegetarian, Vegan, Non-GMO, Gluten-free |
| Country of origin | "Product of Lebanon" |
| For distributors | UPC, case pack, case dimensions, shelf life (shown in a collapsed "Trade information" panel) |
| CTAs | [Find a store] · [Request this product] (pre-fills the distributor form) |
| Related | 4 products from the same category |

**Label disclaimer (small text under ingredients):**
> Product information is provided for convenience. Ingredients and packaging can change, so always read the label on the product you buy for the most current information, especially if you have food allergies.

**California Proposition 65:** if any product requires a Prop 65 warning on its label,
the same warning must appear on its product page. Confirm with the supplier/importer.

## D. Distributor CTA band (bottom of every category page)

> **Heading:** Stock Al Wali Food in your stores
> **Text:** We work with distributors and retailers across the US. Request our full catalog, case packs and availability.
> **Button:** [Become a partner] → /distributors
