import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "../env";

export const client = createClient({
  // createClient validates projectId eagerly, even though we never call
  // .fetch() on this client when Sanity isn't configured (see
  // lib/sanity/fetchers.ts) — so a harmless placeholder keeps the build
  // from failing before a real Sanity project exists.
  projectId: isSanityConfigured ? projectId : "placeholder",
  dataset,
  apiVersion,
  // Published content only for the live site; drafts are viewed in Studio's
  // own preview, not through this client.
  useCdn: process.env.NODE_ENV === "production",
});
