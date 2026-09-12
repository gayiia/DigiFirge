import type { CollectionConfig } from "payload";

// Auth-enabled collection — required by Payload for admin panel login.
// Sanity's equivalent (account access) lived outside the content schema
// entirely; Payload models it as a real collection.
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [],
};
