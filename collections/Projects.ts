import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { stringArrayField } from "../fields/stringArray";
import { metricsField } from "../fields/metric";
import { seoField } from "../fields/seo";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: { useAsTitle: "title", defaultColumns: ["title", "client", "featured"] },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    { name: "client", type: "text" },
    { name: "industry", type: "text" },
    stringArrayField("platformTags", "tag"),
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "gallery",
      type: "array",
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    { name: "challenge", type: "richText" },
    { name: "strategy", type: "richText" },
    { name: "solution", type: "richText" },
    metricsField("results"),
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "timeline", type: "text" },
    { name: "pillars", type: "relationship", relationTo: "pillars", hasMany: true },
    { name: "services", type: "relationship", relationTo: "services", hasMany: true },
    { name: "testimonial", type: "relationship", relationTo: "testimonials" },
    seoField(),
  ],
};
