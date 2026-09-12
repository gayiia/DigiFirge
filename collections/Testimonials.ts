import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "authorName", defaultColumns: ["authorName", "company"] },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "authorName", type: "text" },
    { name: "authorRole", type: "text" },
    { name: "company", type: "text" },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "relatedProject", type: "relationship", relationTo: "projects" },
  ],
};
