import { defineField, defineType } from "sanity";
import { altField } from "../objects/imageWithAlt";

export default defineType({
  name: "post",
  title: "Blog / Insights Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 2, group: "content" }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", group: "content", fields: [altField] }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image", fields: [altField] }], group: "content" }),
    defineField({
      name: "category",
      title: "Category (Pillar)",
      type: "reference",
      to: [{ type: "pillar" }],
      group: "content",
      description: "Blog categories map to the 4 service pillars, plus optionally 'E-commerce/Shopify'.",
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "teamMember" }], group: "content" }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", group: "content" }),
    defineField({ name: "updatedAt", title: "Last updated", type: "datetime", group: "content" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    { title: "Publish date, new", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "coverImage" },
  },
});
