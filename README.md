# DigiForge Website

CMS-driven website build for DigiForge — Next.js (App Router) + TypeScript +
Tailwind CSS v4 on the frontend, Payload CMS (self-hosted, Postgres) as the
CMS. Built so that adding a new pillar, service, or case study later is a
form submission in the Payload admin panel, not a code change.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the site runs immediately on local placeholder
content (see "How content works" below) even before a database is connected.

## Setting up the real CMS (Payload)

Payload is self-hosted, so unlike a managed CMS this needs a real database
of your own:

1. Provision a Postgres database — the free tier on [Neon](https://neon.com)
   or [Supabase](https://supabase.com) both work fine for this project's
   scale. Copy the connection string.
2. Copy `.env.local.example` to `.env.local` and fill in:
   ```bash
   cp .env.local.example .env.local
   ```
   - `DATABASE_URI` — the Postgres connection string from step 1
   - `PAYLOAD_SECRET` — any long random string (e.g. `openssl rand -hex 32`)
3. Run `npm run dev`, then open http://localhost:3000/admin — Payload
   auto-migrates the schema into your database on first connect. Create
   your first admin user when prompted; you'll then see:
   - **Site Settings** — logo, nav, footer, contact info, social links (a global, edit in place)
   - **Homepage** — every section of the homepage: hero copy, trust bar logos, the 4 pillar cards, featured work, final CTA, FAQs (a global)
   - **Pillars** — the 4 service pillars (`/services/[slug]`), fully wired up
   - **Services / Projects / Posts / Team Members / Testimonials / Pricing Packages** — content types future page templates (Service Detail, Work, About, etc.) will consume
4. Optionally run `npm run seed` once against a fresh database to recreate
   the baseline copy (Site Settings, Homepage, the 4 Pillars) instead of
   typing it all by hand. It doesn't seed images — upload those in the
   admin panel yourself.

Until a database is connected, the site runs on the fallback content in
`lib/fallback-content.ts` so nothing is blocked waiting on CMS setup.

## How content works

Every fetcher in `lib/cms/fetchers.ts` follows the same rule: try Payload,
and if it's not configured yet (no `DATABASE_URI`) or a request fails, fall
back to local content instead of crashing the page. This means:

- The site works immediately after `npm install`, before a database exists.
- If the database ever has an outage, the live site keeps serving its
  last-known fallback shape rather than going down.
- Nothing in `components/` imports content directly, or imports Payload's
  generated types — every component takes `homepage`/`settings`/`pillar` as
  a prop shaped by `lib/cms/types.ts`, so the same components work whether
  the data came from Payload or from the fallback file.

## Project structure

```
app/
  (frontend)/              The actual public website
    page.tsx                 Homepage — fetches CMS content, assembles sections
    services/[slug]/         Pillar page template
    layout.tsx
  (payload)/                Payload's admin panel + API, embedded at /admin
    admin/[[...segments]]/
    api/[...slug]/
  globals.css                Design tokens (colors, fonts) + accessibility defaults
components/                  All presentational, prop-driven — no hardcoded copy
  Header.tsx, Hero.tsx, TrustBar.tsx, Capabilities.tsx,
  FeaturedWork.tsx, FinalCta.tsx, Faq.tsx, Footer.tsx,
  PillarHero.tsx, PillarIntroduction.tsx, PillarWhyItMatters.tsx,
  PillarProcess.tsx, PillarServices.tsx, PillarCaseStudies.tsx, PillarTestimonial.tsx
collections/                  Payload collection configs — Pillars, Services, Projects,
                                 Posts, TeamMembers, Testimonials, PricingPackages, Media, Users
globals/                       Payload global configs — SiteSettings, Homepage
fields/                        Shared/reusable field configs (seo, cta, faqItem, processStep,
                                  metric, navigation, slug) — composed into collections/globals
payload.config.ts              Root Payload config — db adapter, collections, globals
payload-types.ts               Generated TypeScript types (run `npm run generate:types` after schema changes)
lib/
  payload.ts                    Cached getPayload() client
  cms/
    fetchers.ts                  getSiteSettings(), getHomepage(), getPillar(), getPillarSlugs() — try Payload, else fallback
    adapters.ts                   Maps Payload's generated types into the frontend contract
    types.ts                      Canonical frontend data contract — what components actually depend on
  fallback-content.ts            Local placeholder content, shaped like real CMS output
  parseAccentText.ts              Parses "Forge better **digital** businesses." into styled parts
scripts/
  seed.ts                         One-off content seed (npm run seed)
```

## Content model (what's built vs. what's next)

Fully wired to real pages right now: Site Settings, Homepage, Pillars
(`/services/[slug]`).

Collections exist and are ready in the admin panel, but no frontend
template consumes them yet (that's the next phase, page by page): Service,
Project, Post, Team Member, Testimonial, Pricing Package. Building
`/services/[pillar]/[service]` next, for example, is "write one template
that queries the `pillars` and `services` collections" — no new CMS work
required.

## Brand fonts

Clash Grotesk (primary) + Instrument Serif Italic (accent) are already in
`public/fonts/` and wired up via `@font-face` in `app/globals.css` — no
setup needed. If those files ever go missing, re-download from
[Fontshare](https://www.fontshare.com/fonts/clash-grotesk) (Clash Grotesk:
Regular/Medium/Semibold) and [Google Fonts](https://fonts.google.com/specimen/Instrument+Serif)
(Instrument Serif Italic).

## SEO

- Every content type with a public page (Homepage, Pillar, Service, Project,
  Post) has an `seo` field group: meta title/description, Open Graph
  title/description/image, canonical URL, no-index toggle.
- `generateMetadata()` in each page reads these into Next.js's native
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

Vercel is the preferred host. When you connect the repo, add `DATABASE_URI`
and `PAYLOAD_SECRET` as environment variables in the Vercel project
settings — the CMS won't work in production without them. Also plan to
switch media storage off local disk (Vercel's serverless filesystem is
ephemeral) to a storage adapter like `@payloadcms/storage-vercel-blob`
before going live — see Phase 8 in `CLAUDE.md`.
