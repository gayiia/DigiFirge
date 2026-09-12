import type { Field } from "payload";

export const navLinkItemFields: Field[] = [
  { name: "label", type: "text" },
  { name: "href", type: "text" },
  { name: "hasDropdown", type: "checkbox", defaultValue: false },
];

export const socialLinkItemFields: Field[] = [
  {
    name: "platform",
    type: "select",
    options: ["Facebook", "Instagram", "LinkedIn", "X", "YouTube", "TikTok"],
  },
  { name: "url", type: "text" },
];
