import { defineField, defineType } from "sanity";

export default defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "string", description: "e.g. '+187%' or '96%'" }),
    defineField({ name: "label", title: "Label", type: "string", description: "e.g. 'Growth in organic traffic'" }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
