import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: ["Facebook", "Instagram", "LinkedIn", "X", "YouTube", "TikTok"],
      },
    }),
    defineField({ name: "url", title: "URL", type: "url" }),
  ],
  preview: {
    select: { title: "platform", subtitle: "url" },
  },
});

export const navLink = defineType({
  name: "navLink",
  title: "Navigation link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "Link", type: "string" }),
    defineField({
      name: "hasDropdown",
      title: "Has dropdown (Services mega-menu)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
