import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { processStepsField } from "../fields/processStep";
import { faqItemsField } from "../fields/faqItem";
import { seoField } from "../fields/seo";

export const Pillars: CollectionConfig = {
  slug: "pillars",
  admin: { useAsTitle: "title", defaultColumns: ["title", "order"] },
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    // Produces /services/[slug]
    slugField("title"),
    { name: "icon", type: "upload", relationTo: "media" },
    { name: "shortDescription", type: "textarea" },
    { name: "positioningStatement", type: "text" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "introduction", type: "richText" },
    { name: "whyItMatters", type: "richText" },
    processStepsField("process"),
    faqItemsField("faqs"),
    { name: "order", type: "number" },
    { name: "services", type: "relationship", relationTo: "services", hasMany: true },
    { name: "caseStudies", type: "relationship", relationTo: "projects", hasMany: true },
    { name: "testimonial", type: "relationship", relationTo: "testimonials" },
    seoField(),
  ],
};
