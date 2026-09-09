import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project / Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relations", title: "Relations" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "client", title: "Client name", type: "string", group: "content" }),
    defineField({ name: "industry", title: "Industry", type: "string", group: "content" }),
    defineField({
      name: "platformTags",
      title: "Platform tags",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      description: "e.g. Shopify, WordPress, Webflow, Custom.",
    }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", group: "content" }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }], group: "content" }),
    defineField({ name: "challenge", title: "Challenge", type: "array", of: [{ type: "block" }], group: "content" }),
    defineField({ name: "strategy", title: "Strategy", type: "array", of: [{ type: "block" }], group: "content" }),
    defineField({ name: "solution", title: "Solution", type: "array", of: [{ type: "block" }], group: "content" }),
    defineField({ name: "results", title: "Results metrics", type: "array", of: [{ type: "metric" }], group: "content" }),
    defineField({
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
      group: "content",
      description: "Also add it to the Homepage document's 'Projects to feature' list to control ordering.",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
      group: "content",
      description: "e.g. '6 weeks'",
    }),

    defineField({
      name: "pillars",
      title: "Related pillars",
      type: "array",
      of: [{ type: "reference", to: [{ type: "pillar" }] }],
      group: "relations",
    }),
    defineField({
      name: "services",
      title: "Services provided",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      group: "relations",
    }),
    defineField({
      name: "testimonial",
      title: "Client testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
      group: "relations",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
