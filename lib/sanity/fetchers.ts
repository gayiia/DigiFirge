import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { siteSettingsQuery, homepageQuery } from "./queries";
import { fallbackSiteSettings, fallbackHomepage } from "@/lib/fallback-content";
import type { SiteSettingsData, HomepageData } from "./types";

/**
 * Every fetcher follows the same pattern: if Sanity isn't configured yet
 * (no project ID in the environment), or the request fails for any reason,
 * fall back to local placeholder content rather than crashing the page.
 * This keeps `npm run dev` working from a fresh clone with zero setup,
 * and keeps the live site up even if Sanity has a bad moment.
 */

export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (!isSanityConfigured) return fallbackSiteSettings;

  try {
    const data = await client.fetch<SiteSettingsData | null>(siteSettingsQuery, {}, { next: { revalidate: 60 } });
    return data ?? fallbackSiteSettings;
  } catch (error) {
    console.error("Failed to fetch site settings from Sanity, using fallback content:", error);
    return fallbackSiteSettings;
  }
}

export async function getHomepage(): Promise<HomepageData> {
  if (!isSanityConfigured) return fallbackHomepage;

  try {
    const data = await client.fetch<HomepageData | null>(homepageQuery, {}, { next: { revalidate: 60 } });
    return data ?? fallbackHomepage;
  } catch (error) {
    console.error("Failed to fetch homepage from Sanity, using fallback content:", error);
    return fallbackHomepage;
  }
}
