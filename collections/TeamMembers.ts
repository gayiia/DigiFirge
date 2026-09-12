import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { stringArrayField } from "../fields/stringArray";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: { useAsTitle: "name", defaultColumns: ["name", "role"] },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "role", type: "text" },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "bio", type: "textarea" },
    stringArrayField("skillTags", "tag"),
    { name: "linkedin", type: "text" },
    { name: "order", type: "number" },
  ],
};
