import { defineField } from "sanity";

/**
 * Spread this into any `type: "image"` field's `fields` array to add a
 * required-in-practice alt text input alongside the asset picker.
 *
 * Usage:
 *   defineField({ name: "heroImage", type: "image", fields: [altField] })
 */
export const altField = defineField({
  name: "alt",
  title: "Alternative text",
  type: "string",
  description:
    "Describe the image for screen readers and SEO. Leave blank only for purely decorative images.",
  validation: (Rule) =>
    Rule.custom((value, context) => {
      // Only require alt text once an actual image asset has been uploaded —
      // an empty, not-yet-used image field shouldn't block saving.
      const parent = context.parent as { asset?: unknown } | undefined;
      if (parent?.asset && !value) {
        return "Add alt text, or explicitly confirm this image is decorative.";
      }
      return true;
    }),
});
