import type { ArrayField } from "payload";

// Scannable proof-point blocks ("Why choose us") — distinct from the
// free-form `whyItMatters` rich text: this is for short, punchy claims
// editors want as a grid, not prose.
export const differentiatorsField = (name = "differentiators"): ArrayField => ({
  name,
  type: "array",
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
  ],
});
