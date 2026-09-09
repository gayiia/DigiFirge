import { defineField, defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "Link", type: "string" }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
