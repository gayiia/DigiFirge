import type { GroupField } from "payload";

export const seoField = (): GroupField => ({
  name: "seo",
  type: "group",
  label: "SEO",
  fields: [
    { name: "metaTitle", type: "text", maxLength: 60 },
    { name: "metaDescription", type: "textarea", maxLength: 160 },
    { name: "ogTitle", type: "text" },
    { name: "ogDescription", type: "textarea" },
    { name: "ogImage", type: "upload", relationTo: "media" },
    { name: "canonicalUrl", type: "text" },
    { name: "noIndex", type: "checkbox", defaultValue: false },
  ],
});
