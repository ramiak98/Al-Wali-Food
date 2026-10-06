# Al Wali Food — Website plan & content

This folder is the source of truth for the website build. It covers what goes on
each page, the copy, the look and feel, and the US legal pages.

Al Wali Food is a Lebanese food brand sold in the USA. We sell to distributors,
who sell to stores. **The website is a showcase only: nothing is sold on it.**
It has two jobs:

1. Help **shoppers** find a store that carries Al Wali Food.
2. Help **distributors and retailers** get in touch to carry or order our products.

## Contents

| File | What it covers |
| --- | --- |
| [01-sitemap.md](01-sitemap.md) | Every page, its URL, navigation and footer |
| [02-visual-direction.md](02-visual-direction.md) | Colors, fonts, imagery and the Lebanon photo shot list |
| [content/home.md](content/home.md) | Homepage copy |
| [content/about.md](content/about.md) | About Us copy |
| [content/products.md](content/products.md) | Category and product page copy and templates |
| [content/products.json](content/products.json) | Category and **placeholder** product data to seed the CMS |
| [content/contact.md](content/contact.md) | Contact Us, Where to Buy and the two forms |
| [content/events.md](content/events.md) | Events page (hidden until launched) |
| [content/site-wide.md](content/site-wide.md) | Header, footer, 404, SEO titles and descriptions |
| [legal/terms-of-service.md](legal/terms-of-service.md) | Terms of Service |
| [legal/privacy-policy.md](legal/privacy-policy.md) | Privacy Policy (incl. CCPA/CPRA and other US state laws) |
| [legal/cookie-policy.md](legal/cookie-policy.md) | Cookie Policy and banner text |
| [legal/accessibility.md](legal/accessibility.md) | Accessibility Statement (WCAG 2.1 AA) |
| [03-open-questions.md](03-open-questions.md) | What we still need from Rami |

## Conventions

- Text in `[SQUARE BRACKETS]` is a placeholder to fill in before launch.
- Products marked **PLACEHOLDER** are examples only and must be replaced with the real catalog.
- Legal pages are drafts based on common US practice for a brand website that collects
  contact form data. **Have them reviewed by a US attorney before launch.**
- Proposed stack (for the build thread): Astro + Tailwind CSS, Sanity CMS, Vercel hosting,
  Resend or Formspree for forms with Cloudflare Turnstile, Plausible or GA4 analytics.
