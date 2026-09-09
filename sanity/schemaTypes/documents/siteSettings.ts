import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — Studio structure (deskStructure.ts) prevents creating more than one.
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string", initialValue: "DigiForge" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Forge Better Digital Businesses.",
    }),
    defineField({
      name: "contact",
      title: "Contact details",
      type: "object",
      fields: [
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "navigation",
      title: "Main navigation",
      type: "array",
      of: [{ type: "navLink" }],
    }),
    defineField({
      name: "navigationCta",
      title: "Nav bar CTA button",
      type: "cta",
    }),
    defineField({
      name: "footerColumns",
      title: "Footer link columns",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerColumn",
          fields: [
            defineField({ name: "heading", title: "Column heading", type: "string" }),
            defineField({ name: "links", title: "Links", type: "array", of: [{ type: "navLink" }] }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
    defineField({
      name: "footerCopyright",
      title: "Footer copyright line",
      type: "string",
    }),
    defineField({
      name: "newsletterSettings",
      title: "Newsletter settings",
      type: "object",
      fields: [
        defineField({
          name: "provider",
          title: "Provider",
          type: "string",
          description: "e.g. Mailchimp, Klaviyo — TBD until chosen (Master Spec §9).",
        }),
        defineField({ name: "heading", title: "Signup heading", type: "string" }),
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: false }),
      ],
    }),
    defineField({
      name: "analytics",
      title: "Analytics IDs",
      type: "object",
      fields: [
        defineField({ name: "googleAnalyticsId", title: "Google Analytics ID", type: "string" }),
        defineField({ name: "metaPixelId", title: "Meta Pixel ID", type: "string" }),
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      description: "Used as a fallback whenever a page doesn't set its own SEO fields.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
