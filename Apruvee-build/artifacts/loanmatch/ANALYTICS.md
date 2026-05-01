# Site analytics setup

This artifact is wired for Google Analytics 4, Google Search Console, and Bing
Webmaster Tools. All three are activated by environment variables — no code
changes are needed once you have the IDs.

## Environment variables

| Variable | Purpose | Where to get it |
| --- | --- | --- |
| `VITE_GA4_MEASUREMENT_ID` | GA4 tag (`G-XXXXXXXXXX`). Loads gtag.js and tracks page views + the `generate_lead` conversion. | analytics.google.com → Admin → Data Streams |
| `VITE_GOOGLE_SITE_VERIFICATION` | Value of the Search Console `google-site-verification` meta tag. | search.google.com/search-console → Add property → HTML tag method |
| `VITE_BING_SITE_VERIFICATION` | Value of the Bing `msvalidate.01` meta tag. | bing.com/webmasters → Add a site → Meta tag method |

Set each one in the artifact's environment (Replit → Secrets) and rebuild. If a
variable is missing the corresponding tag is simply omitted from `index.html`,
so dev previews stay clean.

## What is already in place

- `vite.config.ts` injects the GA4 snippet and verification meta tags into
  `index.html` at build/serve time when the env vars are set.
- `src/lib/analytics.ts` exposes `trackPageView`, `trackEvent`, and
  `trackLeadConversion` helpers that no-op when GA4 is not configured.
- `src/hooks/use-analytics-page-views.ts` fires a `page_view` on every wouter
  route change (the gtag config is initialized with `send_page_view: false` to
  avoid a duplicate initial hit).
- `src/pages/apply.tsx` calls `trackLeadConversion` on a successful lead
  submission. In GA4, mark `generate_lead` as a key event to count it as a
  conversion.
- `public/robots.txt` allows crawling of marketing pages, disallows
  `/apply` and `/results`, and points to the sitemap.
- `public/sitemap.xml` lists the indexable routes (home, about, contact, faq,
  blog, blog post, privacy, terms). Submit
  `https://apruvee.com/sitemap.xml` in both Search Console and Bing Webmaster
  Tools.

## Verifying once IDs are in place

After setting the env vars and redeploying:

1. View source on `https://apruvee.com/` — confirm the `google-site-verification`
   and `msvalidate.01` meta tags render and the `gtag/js` script tag is
   present.
2. In GA4 → Reports → Realtime, complete an apply form and confirm a
   `generate_lead` event appears.
3. In Search Console and Bing Webmaster Tools, click "Verify" — verification
   succeeds against the meta tag.
4. In each tool, submit `https://apruvee.com/sitemap.xml`.
