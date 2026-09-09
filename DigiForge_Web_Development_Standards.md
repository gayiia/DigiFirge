# DigiForge Web Development Standards

**Purpose:** a single reference for every page/phase going forward, so accessibility, security, and SEO requirements don't need restating each time. Add this file to the Project's knowledge base — it'll be searched automatically on future work.

**Status:** Baseline established and verified against the Homepage (Phase 0), September 2026. Re-verify against current standards periodically — these documents update (WCAG 2.2 shipped Dec 2024; OWASP Top 10:2025 superseded the 2021 list).

---

## 1. Tech Stack (locked in)

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4**
- **Sanity** — CMS, schema-driven, embedded Studio at `/studio`
- No component library (shadcn/ui evaluated, not used — components hand-built in Tailwind to match Figma exactly)
- All content prop-driven from CMS data — nothing hardcoded in components (see §6)

## 2. Design System

| Token | Value | Use |
|---|---|---|
| Forge Orange | `#C03E02` | Large headline accents (≥18.66px bold / 24px regular), button fills with white text |
| Forge Orange (text) | `#E05014` | Small/body-size orange text — tag pills, inline links. Same hue, brightened for contrast (see §3) |
| Forge Black | `#111111` | Header/nav background |
| Forge Black (darker) | `#060606` | Cards, footer, section backgrounds |
| Forge Black (light) | `#222222` | Alternating card panels |
| Pure White | `#FFFFFF` | Primary text |

**Fonts:** Clash Grotesk (primary, via Fontshare, free) + Instrument Serif Italic (accent, via Google Fonts, free). Self-hosted via `@font-face` in `app/globals.css`, not `next/font` (avoids build-time network dependency). Files go in `public/fonts/`.

**Rule:** never introduce a new color, font, or spacing value ad hoc — extend the tokens in `app/globals.css` first, then use them.

## 3. Accessibility — WCAG 2.2 Level AA (mandatory, not a final-stage patch)

Reference: https://www.w3.org/TR/WCAG22/

**Contrast (1.4.3):**
- Normal text: minimum 4.5:1
- Large text (≥24px regular, or ≥18.66px bold): minimum 3:1
- Always calculate actual contrast ratio before shipping a new color pairing — don't eyeball it. (Method: relative luminance formula, `(L1+0.05)/(L2+0.05)`.)

**New in WCAG 2.2 — check these on every new page:**
- **2.5.8 Target Size (Minimum):** every clickable target ≥24×24 CSS px, unless inline in a text sentence.
- **2.4.11 Focus Not Obscured:** no sticky header/banner/widget may hide a focused element.
- **2.5.7 Dragging Movements:** any drag interaction needs a non-drag alternative.
- **3.3.8 Accessible Authentication:** if a login is ever added, no cognitive-function test (e.g. remembering a password unaided) without an alternative.

**Baseline checklist for every page:**
- Single `<h1>`, logical heading hierarchy after it (no skipped levels)
- All interactive elements keyboard-operable, visible focus ring (already global via `:focus-visible` in `globals.css`)
- All images have real, meaningful `alt` text via the CMS `alt` field (see §6) — empty `alt=""` only for genuinely decorative images
- Forms: every input has an associated `<label>`, errors identified in text (not color alone)
- Respect `prefers-reduced-motion` (already global)
- Don't convey information by color alone

## 4. SEO

Reference: https://developers.google.com/search/docs, https://web.dev/

- Every page-level content type (Homepage, Pillar, Service, Project, Post) has an `seo` object: meta title/description, OG title/description/image, canonical URL, no-index toggle — wired through Next.js `generateMetadata()`.
- Deferred until real pages exist (planned for Phase 7, not before): `sitemap.xml`, `robots.txt`, structured data (JSON-LD), default OG image fallback, internal linking architecture.
- Semantic HTML and correct heading structure double as on-page SEO — covered by §3.

## 5. Security — OWASP Top 10:2025

Reference: https://owasp.org/Top10/2025/

Current baseline (`next.config.ts`):
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security` (HTTPS only, no-op locally)

**Deferred, tracked, not forgotten:**
- Full Content-Security-Policy — needs Sanity Studio/CDN domains finalized first (a wrong CSP breaks Studio silently). Add once real Sanity project domains are known.
- `npm audit` currently shows 15 vulnerabilities, all in Sanity/Vercel CLI build tooling's transitive deps (editor-time only, not shipped to visitors). `npm audit fix --force` doesn't cleanly resolve and forces a breaking Sanity version bump — re-check when Sanity patches upstream, don't force it blindly.

**As real backend logic gets added (forms, auth, any write path):**
- A01 Broken Access Control, A05 Injection, A07 Authentication Failures all become live concerns — revisit this document when Phase 5 (Contact & Pricing forms) starts.
- Never trust client input; validate server-side regardless of client-side validation.
- Never expose secrets via `NEXT_PUBLIC_*` env vars — only non-sensitive config (project IDs, dataset names) belongs there.

## 6. CMS / Content Architecture Principles

- **Template once, content unlimited** — no content item (service, pillar, project, post) gets its own coded page. One template per content type, populated from Sanity.
- **Nothing hardcoded** — copy, images, nav, footer, FAQs all come from CMS schemas, not component files.
- **Conditional rendering is mandatory** — if a CMS-controlled section is empty or disabled, omit the entire section (no empty containers, headings, or placeholder blocks).
- **Every image field has an `alt` subfield** in the schema — content editors fill it in when uploading, not left to the developer to guess later.
- **Fallback-first fetchers** — every data fetch tries Sanity, falls back to local placeholder content if unconfigured or on failure. The site should never go down because Sanity had a bad moment.

## 7. Verification checklist (run before calling any page "done")

1. `npm run build` — must complete with no errors
2. `npm run lint` — must be clean
3. Contrast-check any new color pairing with actual math, not eyeballing
4. Screenshot at desktop + mobile widths, compare against Figma
5. Confirm conditional rendering: empty CMS fields → section disappears, no broken layout
6. Confirm `alt` text is wired through to the actual `<Image>` component, not left as `""`
7. Re-check target sizes and focus visibility on any new interactive element

---

*Last verified against: WCAG 2.2 (W3C Recommendation, 12 Dec 2024), OWASP Top 10:2025. Standards documents get updated — if a lot of time has passed since the "last verified" date above, worth re-checking the source links rather than assuming this file is still current.*
