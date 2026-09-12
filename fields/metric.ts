import type { ArrayField } from "payload";

export const metricsField = (name = "results"): ArrayField => ({
  name,
  type: "array",
  fields: [
    // Stays text, not number: values are display strings like "+187%".
    { name: "value", type: "text" },
    { name: "label", type: "text" },
  ],
});
