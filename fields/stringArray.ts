import type { ArrayField } from "payload";

// Payload has no bare `array<string>` field type (unlike Sanity's
// `array of string`) — the standard workaround is a one-field object
// array. The adapter layer flattens `[{tag: "..."}]` back to `string[]`
// so components never see the difference.
export const stringArrayField = (name: string, itemLabel = "tag"): ArrayField => ({
  name,
  type: "array",
  fields: [{ name: itemLabel, type: "text" }],
});
