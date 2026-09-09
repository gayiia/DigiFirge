import { defineField, defineType } from "sanity";
import { altField } from "../objects/imageWithAlt";

export default defineType({
  name: "service",
  title: "Service",
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
      description: "Produces /services/[pillar]/[slug].",
    }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 2, group: "content" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "content", fields: [altField] }),
    defineField({
      name: "whatIncluded",
      title: "What's included",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      description: "Bulleted list of deliverables.",
    }),
    defineField({ name: "process", title: "Process steps", type: "array", of: [{ type: "processStep" }], group: "content" }),
    defineField({
      name: "pricingStartingFrom",
      title: "\"Starting from\" price",
      type: "string",
      group: "content",
      description: "Short display string, e.g. 'LKR 150,000' — links through to /pricing for detail.",
    }),
    defineField({
      name: "featureBlocks",
      title: "Feature blocks",
      type: "array",
      group: "content",
      description: "2–3 alternating differentiator modules.",
      of: [
        {
          type: "object",
          name: "featureBlock",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({ name: "image", title: "Image", type: "image", fields: [altField] }),
          ],
          preview: { select: { title: "heading", media: "image" } },
        },
      ],
    }),
    defineField({ name: "faqs", title: "FAQs", type: "array", of: [{ type: "faqItem" }], group: "content" }),

    defineField({
      name: "pillar",
      title: "Pillar",
      type: "reference",
      to: [{ type: "pillar" }],
      group: "relations",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caseStudies",
      title: "Related case studies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      group: "relations",
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      type: "array",
      description: "Usually 3 sibling services under the same pillar.",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      group: "relations",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "pillar.title" },
  },
});
