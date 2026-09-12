import type { FieldHook, TextField } from "payload";

function formatSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Payload has no built-in "slug" field type (unlike Sanity's `slug`/
// `slug.current`) — this is the standard community pattern: a plain
// unique/indexed text field that auto-derives from a source field
// (usually `title`) when left empty.
function autoSlugify(sourceField: string): FieldHook {
  return ({ value, data, originalDoc }) => {
    if (value) return formatSlug(value);
    const source = data?.[sourceField] ?? originalDoc?.[sourceField];
    if (source) return formatSlug(source);
    return value;
  };
}

export const slugField = (sourceField = "title"): TextField => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  hooks: {
    beforeValidate: [autoSlugify(sourceField)],
  },
});
