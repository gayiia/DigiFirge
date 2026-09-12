import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { stringArrayField } from "../fields/stringArray";
import { processStepsField } from "../fields/processStep";
import { faqItemsField } from "../fields/faqItem";
import { seoField } from "../fields/seo";

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "title", defaultColumns: ["title", "pillar"] },
  fields: [
    { name: "title", type: "text", required: true },
    // Unique globally for now — /services/[pillar]/[slug] nesting decided
    // at Phase 2 when the service detail route actually gets built.
    slugField("title"),
    { name: "shortDescription", type: "textarea" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    stringArrayField("whatIncluded", "item"),
    processStepsField("process"),
    { name: "pricingStartingFrom", type: "text" },
    {
      name: "featureBlocks",
      type: "array",
      fields: [
        { name: "heading", type: "text" },
        { name: "body", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    faqItemsField("faqs"),
    { name: "pillar", type: "relationship", relationTo: "pillars", required: true },
    { name: "caseStudies", type: "relationship", relationTo: "projects", hasMany: true },
    { name: "relatedServices", type: "relationship", relationTo: "services", hasMany: true },
    seoField(),
  ],
};
