# DigiForge Website — Project Memory

This file is auto-loaded by Claude Code at the start of every session in
this repo. Keep it accurate and current — it's the persistent context
that replaces re-explaining the project each time.

## What this project is

DigiForge — an independent digital agency in Sri Lanka (Strategy,
Technology, Creative, AI). This repo is the company's own marketing
website. Currently in **Phase 1** (Pillar pages) after finishing Phase 0
(Homepage). See "Phases" below.

## Tech stack (do not change without discussion)

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 — no other styling system
- Sanity — CMS, schema-driven. Studio embedded at `/studio`.
- No component library (shadcn/ui deliberately not used — components are
  hand-built in Tailwind to match the approved Figma design exactly)

## Commands

```bash
npm install
npm run dev          # localhost:3000
npm run build         # must pass with zero errors before calling anything done
npm run lint           # must be clean
npx sanity dataset create production   # one-time, after creating a Sanity project
```

## Core architecture principle

**Build the template once, create unlimited content from the CMS.** No
service, pillar, project, or blog post gets its own coded page — one
template per content type, populated from Sanity. Never hardcode copy,
nav, footer, or FAQs into components; everything is a prop sourced from
`lib/sanity/fetchers.ts` (which tries Sanity, falls back to
`lib/fallback-content.ts` if unconfigured or on failure — never let a
CMS outage take the site down).

**Conditional rendering is mandatory:** if a CMS-controlled section is
empty or disabled, omit the entire section. No empty containers,
headings, or placeholder blocks in production.

## Design tokens (`app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--color-forge-orange` | `#C03E02` | Large headline accents (≥18.66px bold/24px regular), button fills w/ white text |
| `--color-forge-orange-text` | `#E05014` | Small/body-size orange text (tag pills, inline links) — same hue, brightened for AA contrast |
| `--color-forge-black` | `#111111` | Header/nav bg |
| `--color-forge-black-darker` | `#060606` | Cards, footer, section backgrounds |
| `--color-forge-black-light` | `#222222` | Alternating card panels |

Fonts: Clash Grotesk (primary) + Instrument Serif Italic (accent), self-hosted via `@font-face`, not `next/font`. Files go in `public/fonts/` (see README for download links — both free).

**Never introduce a new color/font ad hoc — extend tokens in `app/globals.css` first.**

## Accessibility — WCAG 2.2 AA, mandatory on every page

- Contrast: 4.5:1 normal text, 3:1 large text (≥24px regular/≥18.66px bold). Calculate actual ratios, don't eyeball.
- Target size ≥24×24 CSS px for all clickable elements (WCAG 2.2 SC 2.5.8, new).
- No sticky/overlay element may obscure a focused component (SC 2.4.11, new).
- Single `<h1>` per page, no skipped heading levels.
- Every image has a real `alt` — schema field is `alt`, wired through to `<Image alt={...}>`. Empty `alt=""` only for genuinely decorative images.
- Visible focus rings are global (`:focus-visible` in `globals.css`) — don't override without a reason.
- Respect `prefers-reduced-motion` (already global).

## Security — OWASP Top 10:2025

Baseline headers already in `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.

Full CSP deliberately deferred until Sanity project domains are finalized (wrong CSP breaks Studio silently). Revisit once live.

As real backend logic gets added (forms, auth — Phase 5), Broken Access Control / Injection / Auth Failures become live concerns. Never trust client input; validate server-side. Never put secrets in `NEXT_PUBLIC_*` env vars.

## Verification checklist before calling any page "done"

1. `npm run build` — zero errors
2. `npm run lint` — clean
3. Contrast-check any new color pairing with actual math
4. Screenshot desktop + mobile, compare against Figma
5. Confirm conditional rendering: empty CMS field → section disappears cleanly
6. Confirm `alt` text reaches the actual `<Image>`, not left as `""`
7. Check target sizes / focus visibility on new interactive elements

## Phases

- [x] Phase 0 — Homepage
- [ ] Phase 1 — Pillar pages (`/services/strategy`, `/build`, `/creative`, `/ai-automation`) — schema exists, template not yet built
- [ ] Phase 2 — Service detail pages (16 services, 1 template)
- [ ] Phase 3 — Work / case studies
- [ ] Phase 4 — About
- [ ] Phase 5 — Contact & Pricing (forms — security baseline above becomes live)
- [ ] Phase 6 — Blog / Insights
- [ ] Phase 7 — Sitewide SEO (sitemap, structured data, default OG image)
- [ ] Phase 8 — Deploy (Vercel)

## Full standards reference

`DigiForge_Web_Development_Standards.md` (in the claude.ai Project's
files) has the full detail behind the summarized rules above, including
source links to WCAG 2.2, OWASP Top 10:2025, and Google's SEO docs. This
CLAUDE.md is the fast-loading summary; that document is the source of
truth if anything here seems ambiguous.
