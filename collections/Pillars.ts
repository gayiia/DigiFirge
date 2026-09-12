import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { processStepsField } from "../fields/processStep";
import { faqItemsField } from "../fields/faqItem";
import { differentiatorsField } from "../fields/differentiator";
import { ctaField } from "../fields/cta";
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
    ctaField("heroPrimaryCta", "Hero primary CTA"),
    ctaField("heroSecondaryCta", "Hero secondary CTA"),
    { name: "introduction", type: "richText" },
    { name: "whyItMatters", type: "richText" },
    differentiatorsField("differentiators"),
    processStepsField("process"),
    faqItemsField("faqs"),
    { name: "order", type: "number" },
    { name: "services", type: "relationship", relationTo: "services", hasMany: true },
    { name: "caseStudies", type: "relationship", relationTo: "projects", hasMany: true },
    { name: "testimonial", type: "relationship", relationTo: "testimonials" },
    seoField(),
  ],
};
