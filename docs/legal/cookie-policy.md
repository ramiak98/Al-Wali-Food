# Cookie Policy

> **DRAFT — for attorney review.** The cookie table must match what the final site
> actually sets. A consent tool (Termly or CookieYes) can scan the live site and keep
> this table up to date automatically.

**Last updated:** [DATE]

This Cookie Policy explains how [LEGAL ENTITY NAME] ("Al Wali Food") uses cookies and
similar technologies on [www.alwalifood.com]. It is part of our
[Privacy Policy](/legal/privacy).

## What are cookies?
Cookies are small text files stored on your device when you visit a website. Similar
technologies include local storage and pixels. They help a site work, remember your
choices and understand how it is used.

## Cookies we use

| Category | Purpose | Examples | Can you turn it off? |
| --- | --- | --- | --- |
| Strictly necessary | Make the Site work, remember your cookie choices, protect forms from spam | Consent cookie, Cloudflare Turnstile | No (the Site needs them) |
| Analytics | Count visits and see which pages are popular, so we can improve the Site | [Plausible: no cookies] / [Google Analytics: `_ga`, `_ga_*`] | Yes |
| Functional | Embedded maps on Where to Buy | [Google Maps / Mapbox] | Yes (map loads only after consent; a list view still works) |
| Marketing | Measure social media campaigns | [Meta Pixel, TikTok Pixel — only if added later] | Yes |

## Your choices
- Use **Cookie Settings** in the footer to change your choices at any time.
- We honor the **Global Privacy Control** signal.
- You can also block or delete cookies in your browser settings; some parts of the Site
  may not work properly if you do.

## Contact
Questions? Email [privacy@alwalifood.com].

---

<a id="banner-text"></a>
## Banner text (for the consent tool)

**Banner:**
> We use cookies to make our site work and to understand how it's used. You can accept
> all cookies, reject non-essential ones, or choose your settings.
> [Accept all] [Reject non-essential] [Settings] · [Cookie Policy]

Notes for the build:
- "Accept" and "Reject" buttons must look equally prominent.
- Non-essential scripts (analytics if cookie-based, maps, pixels) load only after consent,
  or, for US-only "opt-out" mode, until the visitor opts out or sends GPC. Recommended:
  opt-in mode, which is simplest and works for every state.
- If Plausible (cookieless) is used for analytics and no pixels are installed, the banner
  can be reduced to a short notice; keep the Cookie Settings link anyway.
