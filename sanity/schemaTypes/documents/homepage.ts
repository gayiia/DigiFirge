import { defineField, defineType } from "sanity";
import { altField } from "../objects/imageWithAlt";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  // Singleton — see sanity/structure.ts
  groups: [
    { name: "hero", title: "Hero" },
    { name: "trustBar", title: "Trust Bar" },
    { name: "capabilities", title: "Capabilities" },
    { name: "featuredWork", title: "Featured Work" },
    { name: "finalCta", title: "Final CTA" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Hero ---
    defineField({ name: "heroEyebrow", title: "Eyebrow badge", type: "string", group: "hero" }),
    defineField({
      name: "heroHeading",
      title: "Heading",
      type: "string",
      description: "Wrap the word(s) that should render in the accent italic style with **double asterisks**, e.g. 'Forge better **digital** businesses.'",
      group: "hero",
    }),
    defineField({ name: "heroSubhead", title: "Subheading", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "hero", fields: [altField] }),
    defineField({ name: "heroPrimaryCta", title: "Primary CTA", type: "cta", group: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Secondary CTA", type: "cta", group: "hero" }),

    // --- Trust bar ---
    defineField({
      name: "trustBarLogos",
      title: "Partner / platform logos",
      type: "array",
      group: "trustBar",
      description: "Leave empty to hide this section entirely from the homepage.",
      of: [
        {
          type: "object",
          name: "trustLogo",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "logo", title: "Logo image", type: "image", fields: [altField] }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        },
      ],
    }),
    defineField({
      name: "trustBarSpeed",
      title: "Carousel speed (seconds per loop)",
      type: "number",
      group: "trustBar",
      initialValue: 30,
      description: "How long one full loop of the logo carousel takes. Lower = faster. Ignored (static row) if reduced motion is enabled on the visitor's device.",
      validation: (Rule) => Rule.min(5).max(120),
    }),

    // --- Capabilities ---
    defineField({ name: "capabilitiesEyebrow", title: "Eyebrow badge", type: "string", group: "capabilities" }),
    defineField({ name: "capabilitiesHeading", title: "Heading", type: "string", group: "capabilities" }),
    defineField({ name: "capabilitiesIntro", title: "Supporting copy", type: "text", rows: 2, group: "capabilities" }),
    defineField({
      name: "featuredPillars",
      title: "Pillars to feature",
      type: "array",
      group: "capabilities",
      description: "Usually all 4 — order here controls display order.",
      of: [{ type: "reference", to: [{ type: "pillar" }] }],
    }),

    // --- Featured work ---
    defineField({ name: "featuredWorkEyebrow", title: "Eyebrow badge", type: "string", group: "featuredWork" }),
    defineField({ name: "featuredWorkHeading", title: "Heading", type: "string", group: "featuredWork" }),
    defineField({
      name: "featuredProjects",
      title: "Projects to feature",
      type: "array",
      group: "featuredWork",
      description: "Leave empty to hide this section entirely — don't publish placeholder projects.",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),

    // --- Final CTA ---
    defineField({ name: "finalCtaHeading", title: "Heading", type: "string", group: "finalCta" }),
    defineField({ name: "finalCtaBody", title: "Body copy", type: "text", rows: 2, group: "finalCta" }),
    defineField({ name: "finalCtaTags", title: "Tag pills", type: "array", of: [{ type: "string" }], group: "finalCta" }),
    defineField({ name: "finalCtaPanelHeading", title: "Right panel heading", type: "string", group: "finalCta" }),
    defineField({ name: "finalCtaPanelBody", title: "Right panel body", type: "text", rows: 2, group: "finalCta" }),
    defineField({ name: "finalCtaPanelCta", title: "Right panel CTA", type: "cta", group: "finalCta" }),

    // --- FAQ ---
    defineField({ name: "faqEyebrow", title: "Eyebrow badge", type: "string", group: "faq" }),
    defineField({ name: "faqHeading", title: "Heading", type: "string", group: "faq" }),
    defineField({ name: "faqIntro", title: "Supporting copy", type: "text", rows: 2, group: "faq" }),
    defineField({
      name: "faqs",
      title: "FAQ items",
      type: "array",
      group: "faq",
      description: "Fewer than 2 items hides this section entirely.",
      of: [{ type: "faqItem" }],
    }),

    // --- SEO ---
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
