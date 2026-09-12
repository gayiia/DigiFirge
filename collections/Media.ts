import type { CollectionConfig } from "payload";

// Replaces the asset half of every Sanity `image` field. `alt` lives once
// on the Media document (Payload's idiomatic pattern) rather than per
// usage site — satisfies the project's WCAG-mandatory-alt rule via the
// required field itself, no custom validation needed.
export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumb", width: 400 },
      { name: "card", width: 800 },
      { name: "hero", width: 1600 },
    ],
    mimeTypes: ["image/*"],
  },
  access: { read: () => true },
  fields: [{ name: "alt", type: "text", required: true }],
};
