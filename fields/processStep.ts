import type { ArrayField } from "payload";

export const processStepsField = (name = "process"): ArrayField => ({
  name,
  type: "array",
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
  ],
});
