# DigiForge Website

Homepage build — Step 1 of the DigiForge website project (see
`Master Specification v4.1`). Built with Next.js (App Router), React,
TypeScript, and Tailwind CSS v4, matching the approved Figma design and
DigiForge Brand Guidelines v1.0.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Adding the real brand fonts

The site currently falls back to system fonts. To get the real DigiForge
typography (Clash Grotesk + Instrument Serif Italic), download the font
files and drop them in — no code changes needed:

1. **Clash Grotesk** — free, from Fontshare:
   https://www.fontshare.com/fonts/clash-grotesk
   Place the `.woff2` files at:
   - `public/fonts/clash-grotesk/ClashGrotesk-Regular.woff2`
   - `public/fonts/clash-grotesk/ClashGrotesk-Medium.woff2`
   - `public/fonts/clash-grotesk/ClashGrotesk-Semibold.woff2`

2. **Instrument Serif** — free, on Google Fonts:
   https://fonts.google.com/specimen/Instrument+Serif
   Place the italic `.woff2` file at:
   - `public/fonts/instrument-serif/InstrumentSerif-Italic.woff2`

The `@font-face` rules are already set up in `app/globals.css`.

## Project structure

```
app/
  layout.tsx        Root layout, metadata, global font/background setup
  page.tsx           Homepage — assembles all sections
  globals.css        Design tokens (colors, fonts) + accessibility defaults
components/
  Header.tsx         Nav bar + mobile menu
  Hero.tsx
  TrustBar.tsx       Conditional — omits itself if no logos configured
  Capabilities.tsx   The 4 pillar cards (Strategy / Build / Creative / AI)
  FeaturedWork.tsx   Conditional — omits itself if no featured projects
  FinalCta.tsx
  Faq.tsx            Accessible accordion (keyboard + screen-reader correct)
  Footer.tsx         Nav columns, newsletter capture, social, legal
lib/
  data.ts            All homepage copy/content — shaped like future CMS
                      output, so swapping in real content or wiring up a
                      CMS later shouldn't require touching component code
```

## Content status

All copy, images, and logos are **placeholders** pending real content —
see `lib/data.ts` for everything editable in one place. Placeholder
images are CSS gradients rather than stock photos, to avoid shipping
anything that looks like real client/case-study material by accident.

## Design system reference

- Colors: Forge Orange `#C03E02`, Forge Black `#111111` / `#060606`,
  Pure White `#FFFFFF` — see `app/globals.css`
- Type: Clash Grotesk (primary), Instrument Serif Italic (accent)
- Full section-by-section spec: `DigiForge_Homepage_Section_Spec_v1_FINAL.md`
  in the project's shared files.

## Pushing to GitHub

This repo is already git-initialized locally with an initial commit. To
push it to your own GitHub account:

1. Create a new **empty** repository on GitHub (no README/gitignore/license
   — this project already has those) — e.g. `digiforge-website`.
2. Then run:

```bash
git remote add origin https://github.com/<your-username>/digiforge-website.git
git branch -M main
git push -u origin main
```

## Deployment

Vercel is the preferred host per the Master Spec — connecting this
GitHub repo to a new Vercel project will deploy it with zero config.
