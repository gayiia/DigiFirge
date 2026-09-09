import { defineField, defineType } from "sanity";

export default defineType({
  name: "pillar",
  title: "Pillar",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relations", title: "Relations" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: "Produces /services/[slug] — e.g. 'strategy', 'build', 'creative', 'ai-automation'.",
    }),
    defineField({ name: "icon", title: "Icon", type: "image", group: "content" }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 2, group: "content" }),
    defineField({ name: "positioningStatement", title: "Positioning statement", type: "string", group: "content", description: "e.g. 'Think before you build.'" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "content" }),
    defineField({ name: "introduction", title: "Introduction", type: "array", of: [{ type: "block" }], group: "content" }),
    defineField({ name: "whyItMatters", title: "Why it matters", type: "array", of: [{ type: "block" }], group: "content" }),
    defineField({ name: "process", title: "Process steps", type: "array", of: [{ type: "processStep" }], group: "content" }),
    defineField({ name: "faqs", title: "FAQs", type: "array", of: [{ type: "faqItem" }], group: "content" }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "content",
      description: "Controls order in nav mega-menu and Capabilities section.",
    }),

    defineField({
      name: "services",
      title: "Services under this pillar",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Managed here or from each Service's own 'Pillar' field — keep in sync.",
    }),
    defineField({
      name: "caseStudies",
      title: "Related case studies",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "testimonial",
      title: "Featured testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
      group: "relations",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "positioningStatement", media: "icon" },
  },
});
