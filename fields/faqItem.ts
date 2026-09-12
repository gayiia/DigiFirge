import type { ArrayField } from "payload";

export const faqItemsField = (name = "faqs"): ArrayField => ({
  name,
  type: "array",
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
  ],
});
