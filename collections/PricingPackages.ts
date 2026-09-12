import type { CollectionConfig } from "payload";
import { stringArrayField } from "../fields/stringArray";
import { ctaField } from "../fields/cta";

export const PricingPackages: CollectionConfig = {
  slug: "pricing-packages",
  admin: { useAsTitle: "name", defaultColumns: ["name", "price", "order"] },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "price", type: "text", admin: { description: "e.g. 'LKR 250,000' or 'Custom'" } },
    { name: "billingNote", type: "text", admin: { description: "e.g. 'one-time' or 'per month'" } },
    stringArrayField("features", "feature"),
    { name: "highlighted", type: "checkbox", defaultValue: false },
    ctaField("cta"),
    { name: "order", type: "number" },
  ],
};
