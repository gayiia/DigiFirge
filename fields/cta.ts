import type { GroupField } from "payload";

export const ctaField = (name: string, label?: string): GroupField => ({
  name,
  type: "group",
  label,
  fields: [
    { name: "label", type: "text" },
    { name: "href", type: "text" },
  ],
});
