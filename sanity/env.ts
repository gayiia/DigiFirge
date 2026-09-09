export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// The CMS is considered "connected" only once a real project ID is set.
// Until then, the site runs on local fallback content (see lib/sanity/queries.ts)
// so development isn't blocked on Sanity account setup.
export const isSanityConfigured = Boolean(projectId);
