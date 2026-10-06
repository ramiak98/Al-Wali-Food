# Contact, Where to Buy & Distributors

Three pages, two forms. Every form submission is emailed to the team and protected
by Cloudflare Turnstile (invisible spam check). Each form links to the Privacy Policy
next to the submit button.

---

## 1. Where to Buy (`/where-to-buy`)

**SEO title:** Where to Buy Al Wali Food | Find a Store Near You
**Meta description:** Find Al Wali Food Lebanese products at stores near you. Search by ZIP code or ask us directly.

> **Heading:** Find Al Wali Food near you
> **Subhead:** Our products are available at Middle Eastern, Mediterranean and international grocery stores across the US.

**Store finder**
- Search box: "Enter your ZIP code or city" + [Search] + "Use my location" (browser location, only on click).
- Results: map with pins + list (store name, address, distance, link to directions).
- Data comes from the CMS store list. If Rami prefers not to list individual stores yet, launch with the form only and add the map later.

**No results message:**
> We couldn't find a store near you yet. Tell us where you shop and we'll let you know the closest place to find Al Wali Food, and ask the store to carry us.

**Form: "Ask us where to buy"**

| Field | Type | Required |
| --- | --- | --- |
| Name | text | yes |
| Email | email | yes |
| ZIP code | text (5 digits) | yes |
| Which products are you looking for? | multi-select of the five categories + "Not sure" | no |
| Your favorite store (name & city) | text | no |
| Message | textarea | no |
| ☐ Send me occasional news and recipes from Al Wali Food (unchecked by default) | checkbox | no |

Button: **Send**

Success message:
> Thank you! We received your message and will get back to you within [2 business days] with the closest place to find Al Wali Food.

## 2. For Distributors & Retailers (`/distributors`)

**SEO title:** Wholesale Lebanese Food Supplier | Distributors & Retailers | Al Wali Food
**Meta description:** Carry Al Wali Food's authentic Lebanese pickles, dairy, olive oil, pastes and sweets. Contact us for our catalog, case packs and availability.

Hero photo: `IMG-15` warehouse/pallets or a well-stocked shelf (real photo preferred).

> **Heading:** Partner with Al Wali Food
> **Subhead:** Bring authentic Lebanese products to your customers. We work directly with distributors and retailers across the United States.

**Why partner with us** (4 cards; confirm each claim)
- **A complete Lebanese range** — five categories, one supplier.
- **Consistent supply** — [reliable import schedule / US warehouse in STATE].
- **Shelf-ready packaging** — US-compliant labels with English nutrition facts and allergen statements.
- **Marketing support** — product photos, shelf talkers and social content for your stores.

**Downloads:** [Download our catalog (PDF)] — shown once the catalog is available.

**Form: "Distributor & retailer inquiry"**

| Field | Type | Required |
| --- | --- | --- |
| Full name | text | yes |
| Company name | text | yes |
| Business type | select: Distributor / Wholesaler · Retail store / chain · Restaurant / foodservice · Other | yes |
| Business email | email | yes |
| Phone | tel | yes |
| City & state | text | yes |
| Website | url | no |
| Products of interest | multi-select of categories (pre-filled when coming from a product page) | no |
| Inquiry type | select: Request catalog & pricing · Place an order · Become a distributor · Other | yes |
| Estimated monthly volume | select: Under 10 cases · 10–50 · 50–200 · 200+ · Not sure | no |
| Message / order details | textarea | no |

Button: **Send inquiry**

Note under the button:
> Orders placed through this form are requests only. Our team will confirm availability, pricing and delivery with you directly.

Success message:
> Thank you for your interest in Al Wali Food. Our sales team will contact you within [1–2 business days].

Auto-reply email to the sender (optional): same text + contact email + catalog link.

## 3. Contact Us (`/contact`)

**SEO title:** Contact Al Wali Food
**Meta description:** Get in touch with Al Wali Food: find our products, become a distributor, or send us a message.

Hero photo: `IMG-07` cedars of Lebanon.

> **Heading:** We'd love to hear from you
> **Subhead:** Ahlan wa sahlan. Choose how we can help.

Three cards:
1. **Looking for our products?** → [Find a store] /where-to-buy
2. **Distributor or retailer?** → [Partner with us] /distributors
3. **Anything else?** → short general form below

**General form:** Name (req) · Email (req) · Subject select: Product question · Feedback · Press / media · Other (req) · Message (req) · Button **Send message**.

**Contact details block**
- Email: [hello@alwalifood.com]
- Phone: [+1 (XXX) XXX-XXXX] — Mon–Fri, 9am–5pm [time zone]
- Address: [Business mailing address]
- Social: Instagram · TikTok · LinkedIn

## Who receives what

| Form | Default recipient |
| --- | --- |
| Where to buy | [info@ address] |
| Distributor inquiry | [sales@ address] |
| General | [info@ address] |
