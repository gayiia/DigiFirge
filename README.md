# DigiForge Website

CMS-driven homepage build for DigiForge — Next.js (App Router) + TypeScript +
Tailwind CSS v4 on the frontend, Sanity as the CMS. Built so that adding a
new pillar, service, or case study later is a form submission in Sanity
Studio, not a code change.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the homepage runs immediately on local
placeholder content (see "How content works" below), no Sanity account
needed to start developing.

## Setting up the real CMS (Sanity)

1. Go to https://www.sanity.io/manage and create a free account + new
   project (a couple of clicks — a company name/logo is all it asks for).
2. Copy `.env.local.example` to `.env.local` and fill in your project ID:
   ```bash
   cp .env.local.example .env.local
   ```
3. Run `npx sanity dataset create production` (accept the default) to
   create the dataset the app expects.
4. Restart `npm run dev`, then open http://localhost:3000/studio — that's
   your CMS. Sign in with the same account, and you'll see:
   - **Site Settings** — logo, nav, footer, contact info, social links (one document, edit in place)
   - **Homepage** — every section of the homepage: hero copy, trust bar logos, the 4 pillar cards, featured work, final CTA, FAQs
   - **Pillars / Services / Projects / Blog / Team / Testimonials / Pricing** — the content types future page templates (Service Detail, Work, About, etc.) will consume
5. Fill in the **Homepage** document and **Site Settings** document with
   real content, hit Publish, and refresh the site — your content is live.

Until you complete this, the site runs on the fallback content in
`lib/fallback-content.ts` so nothing is blocked waiting on CMS setup.

## How content works

Every fetcher in `lib/sanity/fetchers.ts` follows the same rule: try
Sanity, and if it's not configured yet (no project ID) or a request fails,
fall back to local content instead of crashing the page. This means:

- The site works immediately after `npm install`, before Sanity exists.
- If Sanity ever has an outage, the live site keeps serving its last-known
  fallback shape rather than going down.
- Nothing in `components/` imports content directly — every component
  takes `homepage` or `settings` as a prop, so the same components will
  work whether the data came from Sanity or from the fallback file.

## Project structure

```
app/
  page.tsx                Homepage — fetches CMS content, assembles sections
  layout.tsx
  globals.css              Design tokens (colors, fonts) + accessibility defaults
  studio/[[...tool]]/      Sanity Studio, embedded at /studio
components/                All presentational, prop-driven — no hardcoded copy
  Header.tsx, Hero.tsx, TrustBar.tsx, Capabilities.tsx,
  FeaturedWork.tsx, FinalCta.tsx, Faq.tsx, Footer.tsx
sanity/
  schemaTypes/
    documents/             siteSettings, homepage, pillar, service, project, post, misc
    objects/                seo, cta, faqItem, processStep, metric, navigation
  structure.ts             Studio sidebar — pins Site Settings & Homepage as singletons
  lib/client.ts             Sanity client (gracefully degrades if unconfigured)
  lib/image.ts              Image URL builder
  env.ts                    Reads NEXT_PUBLIC_SANITY_* env vars
lib/
  sanity/
    queries.ts               GROQ queries
    fetchers.ts               getSiteSettings(), getHomepage() — try Sanity, else fallback
    types.ts                  Shared TypeScript types for CMS content
  fallback-content.ts        Local placeholder content, shaped like real CMS output
  parseAccentText.ts          Parses "Forge better **digital** businesses." into styled parts
```

## Content model (what's built vs. what's next)

Fully wired to the homepage right now: Site Settings, Homepage.

Schemas exist and are ready in Studio, but no frontend template consumes
them yet (that's the next phase, page by page): Pillar, Service, Project,
Post, Team Member, Testimonial, Pricing Package. Building `/services/[pillar]`
next, for example, is "write one template that queries the `pillar` and
`service` schemas" — no new CMS work required.

## Adding the real brand fonts

The site currently falls back to system fonts. To get the real DigiForge
typography (Clash Grotesk + Instrument Serif Italic):

1. **Clash Grotesk** — free, from Fontshare: https://www.fontshare.com/fonts/clash-grotesk
   - `public/fonts/clash-grotesk/ClashGrotesk-Regular.woff2`
   - `public/fonts/clash-grotesk/ClashGrotesk-Medium.woff2`
   - `public/fonts/clash-grotesk/ClashGrotesk-Semibold.woff2`
2. **Instrument Serif** — free, on Google Fonts: https://fonts.google.com/specimen/Instrument+Serif
   - `public/fonts/instrument-serif/InstrumentSerif-Italic.woff2`

The `@font-face` rules are already set up in `app/globals.css` — dropping
the files in is all that's needed.

## SEO

- Every content type with a public page (Homepage, Pillar, Service, Project,
  Post) has a `seo` field group: meta title/description, Open Graph
  title/description/image, canonical URL, no-index toggle.
- `generateMetadata()` in `app/page.tsx` reads these into Next.js's native
  metadata API — no manual `<head>` tag editing required from the CMS side.
- Sitemap and structured data (Organization/LocalBusiness schema) are
  straightforward additions once more page templates exist — flagged for
  the next phase rather than built prematurely against non-existent pages.

## Pushing to GitHub

Already git-initialized locally. To push to your own account:

```bash
git remote add origin https://github.com/<your-username>/digiforge-website.git
git branch -M main
git push -u origin main
```

## Deployment

Vercel is the preferred host. When you connect the repo, add the same
`NEXT_PUBLIC_SANITY_*` environment variables from `.env.local` in the
Vercel project settings — the CMS won't work in production without them.

