import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";
import { fallbackSiteSettings, fallbackHomepage, fallbackPillars } from "@/lib/fallback-content";
import { mapSiteSettings, mapHomepage, mapPillar, mapService } from "./adapters";
import type { HomepageData, PillarData, ServiceData, SiteSettingsData } from "./types";

/**
 * Every fetcher follows the same pattern: if the CMS isn't configured yet
 * (no database URI in the environment), or the request fails for any
 * reason, fall back to local placeholder content rather than crashing the
 * page. This keeps `npm run dev` working from a fresh clone with zero
 * setup, and keeps the live site up even if the database has a bad moment.
 */

export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (!isPayloadConfigured) return fallbackSiteSettings;

  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: "site-settings", depth: 2 });
    return mapSiteSettings(doc);
  } catch (error) {
    console.error("Failed to fetch site settings from the CMS, using fallback content:", error);
    return fallbackSiteSettings;
  }
}

export async function getHomepage(): Promise<HomepageData> {
  if (!isPayloadConfigured) return fallbackHomepage;

  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: "homepage", depth: 2 });
    return mapHomepage(doc);
  } catch (error) {
    console.error("Failed to fetch homepage from the CMS, using fallback content:", error);
    return fallbackHomepage;
  }
}

export async function getPillar(slug: string): Promise<PillarData | null> {
  if (!isPayloadConfigured) return fallbackPillars[slug] ?? null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pillars",
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    });
    const doc = result.docs[0];
    return doc ? mapPillar(doc) : (fallbackPillars[slug] ?? null);
  } catch (error) {
    console.error(`Failed to fetch pillar "${slug}" from the CMS, using fallback content:`, error);
    return fallbackPillars[slug] ?? null;
  }
}

export async function getPillarSlugs(): Promise<string[]> {
  if (!isPayloadConfigured) return Object.keys(fallbackPillars);

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pillars",
      limit: 0,
      pagination: false,
      select: { slug: true },
    });
    const slugs = result.docs.map((d) => d.slug).filter(Boolean) as string[];
    return slugs.length > 0 ? slugs : Object.keys(fallbackPillars);
  } catch (error) {
    console.error("Failed to fetch pillar slugs from the CMS, using fallback content:", error);
    return Object.keys(fallbackPillars);
  }
}

// No fallback content for services — same as projects/posts, there's no
// approved placeholder copy for these yet. If the CMS is unconfigured or
// a service doesn't exist, the page 404s via notFound() rather than
// showing fabricated content.

export async function getService(pillarSlug: string, serviceSlug: string): Promise<ServiceData | null> {
  if (!isPayloadConfigured) return null;

  try {
    const payload = await getPayloadClient();
    const pillarResult = await payload.find({
      collection: "pillars",
      where: { slug: { equals: pillarSlug } },
      limit: 1,
    });
    const pillar = pillarResult.docs[0];
    if (!pillar) return null;

    const result = await payload.find({
      collection: "services",
      where: {
        slug: { equals: serviceSlug },
        pillar: { equals: pillar.id },
      },
      depth: 2,
      limit: 1,
    });
    const doc = result.docs[0];
    return doc ? mapService(doc) : null;
  } catch (error) {
    console.error(`Failed to fetch service "${pillarSlug}/${serviceSlug}" from the CMS:`, error);
    return null;
  }
}

export async function getServiceParams(): Promise<{ slug: string; service: string }[]> {
  if (!isPayloadConfigured) return [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      limit: 0,
      pagination: false,
      depth: 1,
      select: { slug: true, pillar: true },
    });
    return result.docs
      .filter((d) => typeof d.pillar === "object" && d.pillar !== null)
      .map((d) => ({
        slug: (d.pillar as { slug: string }).slug,
        service: d.slug,
      }));
  } catch (error) {
    console.error("Failed to fetch service params from the CMS:", error);
    return [];
  }
}
