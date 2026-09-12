import type { GlobalConfig } from "payload";
import { ctaField } from "../fields/cta";
import { faqItemsField } from "../fields/faqItem";
import { stringArrayField } from "../fields/stringArray";
import { seoField } from "../fields/seo";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  fields: [
    // --- Hero ---
    { name: "heroEyebrow", type: "text" },
    {
      name: "heroHeading",
      type: "text",
      admin: {
        description: "Wrap the accent word(s) in **double asterisks**, e.g. 'Forge better **digital** businesses.'",
      },
    },
    { name: "heroSubhead", type: "textarea" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    ctaField("heroPrimaryCta", "Primary CTA"),
    ctaField("heroSecondaryCta", "Secondary CTA"),

    // --- Trust bar ---
    {
      name: "trustBarLogos",
      type: "array",
      admin: { description: "Leave empty to hide this section entirely." },
      fields: [
        { name: "name", type: "text" },
        { name: "logo", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "trustBarSpeed",
      type: "number",
      defaultValue: 30,
      min: 5,
      max: 120,
      admin: { description: "Seconds per full carousel loop. Lower = faster." },
    },

    // --- Capabilities ---
    { name: "capabilitiesEyebrow", type: "text" },
    { name: "capabilitiesHeading", type: "text" },
    { name: "capabilitiesIntro", type: "textarea" },
    { name: "featuredPillars", type: "relationship", relationTo: "pillars", hasMany: true },

    // --- Featured work ---
    { name: "featuredWorkEyebrow", type: "text" },
    { name: "featuredWorkHeading", type: "text" },
    { name: "featuredProjects", type: "relationship", relationTo: "projects", hasMany: true },

    // --- Final CTA ---
    { name: "finalCtaHeading", type: "text" },
    { name: "finalCtaBody", type: "textarea" },
    stringArrayField("finalCtaTags", "tag"),
    { name: "finalCtaPanelHeading", type: "text" },
    { name: "finalCtaPanelBody", type: "textarea" },
    ctaField("finalCtaPanelCta", "Right panel CTA"),

    // --- FAQ ---
    { name: "faqEyebrow", type: "text" },
    { name: "faqHeading", type: "text" },
    { name: "faqIntro", type: "textarea" },
    faqItemsField("faqs"),

    seoField(),
  ],
};
