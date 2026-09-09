import { defineField, defineType } from "sanity";
import { altField } from "./../objects/imageWithAlt";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", fields: [altField] }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({ name: "skillTags", title: "Skill tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "authorName", title: "Author name", type: "string" }),
    defineField({ name: "authorRole", title: "Author role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "avatar", title: "Avatar", type: "image", fields: [altField] }),
    defineField({
      name: "relatedProject",
      title: "Related project",
      type: "reference",
      to: [{ type: "project" }],
    }),
  ],
  preview: { select: { title: "authorName", subtitle: "company", media: "avatar" } },
});

export const pricingPackage = defineType({
  name: "pricingPackage",
  title: "Pricing Package",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Package name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "price", title: "Price", type: "string", description: "e.g. 'LKR 250,000' or 'Custom'" }),
    defineField({ name: "billingNote", title: "Billing note", type: "string", description: "e.g. 'one-time' or 'per month'" }),
    defineField({ name: "features", title: "Included features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "highlighted", title: "Highlight this package", type: "boolean", initialValue: false }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "price" } },
});
