import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Falls back to the page title if left blank.",
      validation: (Rule) => Rule.max(60).warning("Longer titles may be truncated in search results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160).warning("Longer descriptions may be truncated in search results."),
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph title",
      type: "string",
      description: "Falls back to Meta title if left blank.",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      description: "Falls back to the site default OG image if left blank.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Only set this if this page is a duplicate of another URL.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
  options: { collapsible: true, collapsed: true },
});
