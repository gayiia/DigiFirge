import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { stringArrayField } from "../fields/stringArray";
import { processStepsField } from "../fields/processStep";
import { faqItemsField } from "../fields/faqItem";
import { ctaField } from "../fields/cta";
import { seoField } from "../fields/seo";

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "title", defaultColumns: ["title", "pillar"] },
  fields: [
    { name: "title", type: "text", required: true },
    // Nested under its pillar: /services/[pillar-slug]/[slug]
    slugField("title"),
    { name: "shortDescription", type: "textarea" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    ctaField("heroPrimaryCta", "Hero primary CTA"),
    ctaField("heroSecondaryCta", "Hero secondary CTA"),
    stringArrayField("whatIncluded", "item"),
    stringArrayField("techStack", "tool"),
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
