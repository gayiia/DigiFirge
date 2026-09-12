import type {
  Homepage as PayloadHomepage,
  Media as PayloadMedia,
  Pillar as PayloadPillar,
  Project as PayloadProject,
  Service as PayloadService,
  SiteSetting as PayloadSiteSettings,
  Testimonial as PayloadTestimonial,
} from "@/payload-types";
import type {
  CtaData,
  FaqItemData,
  HomepageData,
  ImageWithAlt,
  PillarData,
  ProjectSummary,
  SeoData,
  ServiceData,
  ServiceSummary,
  SiteSettingsData,
} from "./types";

/**
 * Payload has no "weak reference" concept — deleting a document referenced
 * elsewhere just leaves other documents' relationship fields pointing at
 * nothing (an unpopulated `number` id instead of the expected object).
 * Every relationship access must filter through this, not just once.
 */
function isPopulated<T>(value: number | T | null | undefined): value is T {
  return typeof value === "object" && value !== null;
}

function mapImage(media: number | PayloadMedia | null | undefined): ImageWithAlt {
  if (!isPopulated(media) || !media.url) return null;
  return { url: media.url, alt: media.alt };
}

function mapCta(cta: { label?: string | null; href?: string | null } | null | undefined): CtaData | undefined {
  if (!cta) return undefined;
  return { label: cta.label ?? undefined, href: cta.href ?? undefined };
}

function mapSeo(seo: PayloadSiteSettings["defaultSeo"] | PayloadPillar["seo"] | null | undefined): SeoData | undefined {
  if (!seo) return undefined;
  return {
    metaTitle: seo.metaTitle ?? undefined,
    metaDescription: seo.metaDescription ?? undefined,
    ogTitle: seo.ogTitle ?? undefined,
    ogDescription: seo.ogDescription ?? undefined,
    ogImage: mapImage(seo.ogImage),
    canonicalUrl: seo.canonicalUrl ?? undefined,
    noIndex: seo.noIndex ?? undefined,
  };
}

function mapFaqs(faqs: { question: string; answer: string }[] | null | undefined): FaqItemData[] | undefined {
  if (!faqs) return undefined;
  return faqs.map((f) => ({ question: f.question, answer: f.answer }));
}

function mapStringArray(items: { [key: string]: unknown }[] | null | undefined, key: string): string[] | undefined {
  if (!items) return undefined;
  return items.map((item) => String(item[key] ?? "")).filter(Boolean);
}

export function mapSiteSettings(doc: PayloadSiteSettings): SiteSettingsData {
  return {
    siteName: doc.siteName ?? undefined,
    tagline: doc.tagline ?? undefined,
    logo: mapImage(doc.logo),
    contact: doc.contact
      ? {
          email: doc.contact.email ?? undefined,
          phone: doc.contact.phone ?? undefined,
          address: doc.contact.address ?? undefined,
        }
      : undefined,
    socialLinks: doc.socialLinks?.map((s) => ({ platform: s.platform ?? undefined, url: s.url ?? undefined })),
    navigation: doc.navigation?.map((n) => ({
      label: n.label ?? undefined,
      href: n.href ?? undefined,
      hasDropdown: n.hasDropdown ?? undefined,
    })),
    navigationCta: mapCta(doc.navigationCta),
    footerColumns: doc.footerColumns?.map((col) => ({
      heading: col.heading ?? undefined,
      links: col.links?.map((l) => ({
        label: l.label ?? undefined,
        href: l.href ?? undefined,
        hasDropdown: l.hasDropdown ?? undefined,
      })),
    })),
    footerCopyright: doc.footerCopyright ?? undefined,
    newsletterSettings: doc.newsletterSettings
      ? {
          provider: doc.newsletterSettings.provider ?? undefined,
          heading: doc.newsletterSettings.heading ?? undefined,
          enabled: doc.newsletterSettings.enabled ?? undefined,
        }
      : undefined,
    defaultSeo: mapSeo(doc.defaultSeo),
  };
}

function mapProjectSummary(project: number | PayloadProject): ProjectSummary | null {
  if (!isPopulated(project)) return null;
  return {
    title: project.title,
    slug: project.slug,
    client: project.client ?? undefined,
    platformTags: mapStringArray(project.platformTags, "tag"),
    coverImage: mapImage(project.coverImage),
    href: `/work/${project.slug}`,
  };
}

function mapPillarSummary(pillar: number | PayloadPillar) {
  if (!isPopulated(pillar)) return null;
  return {
    title: pillar.title,
    slug: pillar.slug,
    shortDescription: pillar.shortDescription ?? undefined,
    icon: mapImage(pillar.icon),
    href: `/services/${pillar.slug}`,
  };
}

export function mapHomepage(doc: PayloadHomepage): HomepageData {
  return {
    heroEyebrow: doc.heroEyebrow ?? undefined,
    heroHeading: doc.heroHeading ?? undefined,
    heroSubhead: doc.heroSubhead ?? undefined,
    heroImage: mapImage(doc.heroImage),
    heroPrimaryCta: mapCta(doc.heroPrimaryCta),
    heroSecondaryCta: mapCta(doc.heroSecondaryCta),

    trustBarLogos: doc.trustBarLogos?.map((t) => ({ name: t.name ?? undefined, logo: mapImage(t.logo) })),
    trustBarSpeed: doc.trustBarSpeed ?? undefined,

    capabilitiesEyebrow: doc.capabilitiesEyebrow ?? undefined,
    capabilitiesHeading: doc.capabilitiesHeading ?? undefined,
    capabilitiesIntro: doc.capabilitiesIntro ?? undefined,
    pillars: (doc.featuredPillars ?? []).map(mapPillarSummary).filter((p) => p !== null),

    featuredWorkEyebrow: doc.featuredWorkEyebrow ?? undefined,
    featuredWorkHeading: doc.featuredWorkHeading ?? undefined,
    featuredWork: (doc.featuredProjects ?? []).map(mapProjectSummary).filter((p) => p !== null),

    finalCtaHeading: doc.finalCtaHeading ?? undefined,
    finalCtaBody: doc.finalCtaBody ?? undefined,
    finalCtaTags: mapStringArray(doc.finalCtaTags, "tag"),
    finalCtaPanelHeading: doc.finalCtaPanelHeading ?? undefined,
    finalCtaPanelBody: doc.finalCtaPanelBody ?? undefined,
    finalCtaPanelCta: mapCta(doc.finalCtaPanelCta),

    faqEyebrow: doc.faqEyebrow ?? undefined,
    faqHeading: doc.faqHeading ?? undefined,
    faqIntro: doc.faqIntro ?? undefined,
    faqs: mapFaqs(doc.faqs),

    seo: mapSeo(doc.seo as PayloadSiteSettings["defaultSeo"]),
  };
}

function mapServiceSummary(service: number | PayloadService, pillarSlug: string): ServiceSummary | null {
  if (!isPopulated(service)) return null;
  return {
    title: service.title,
    slug: service.slug,
    shortDescription: service.shortDescription ?? undefined,
    href: `/services/${pillarSlug}/${service.slug}`,
  };
}

export function mapPillar(doc: PayloadPillar): PillarData {
  const testimonial: PayloadTestimonial | null = isPopulated(doc.testimonial) ? doc.testimonial : null;

  return {
    title: doc.title,
    slug: doc.slug,
    icon: mapImage(doc.icon),
    shortDescription: doc.shortDescription ?? undefined,
    positioningStatement: doc.positioningStatement ?? undefined,
    heroImage: mapImage(doc.heroImage),
    introduction: doc.introduction ?? null,
    whyItMatters: doc.whyItMatters ?? null,
    process: doc.process?.map((p) => ({ title: p.title ?? undefined, description: p.description ?? undefined })),
    faqs: mapFaqs(doc.faqs),
    services: (doc.services ?? []).map((s) => mapServiceSummary(s, doc.slug)).filter((s) => s !== null),
    caseStudies: (doc.caseStudies ?? []).map(mapProjectSummary).filter((p) => p !== null),
    testimonial: testimonial
      ? {
          quote: testimonial.quote ?? undefined,
          authorName: testimonial.authorName ?? undefined,
          authorRole: testimonial.authorRole ?? undefined,
          company: testimonial.company ?? undefined,
          avatar: mapImage(testimonial.avatar),
        }
      : null,
    seo: mapSeo(doc.seo),
  };
}

export function mapService(doc: PayloadService): ServiceData {
  const pillar: PayloadPillar | null = isPopulated(doc.pillar) ? doc.pillar : null;
  // Related services are usually siblings under the same pillar — if a
  // related service's own `pillar` relationship isn't populated at this
  // query depth, fall back to this service's pillar for its href rather
  // than dropping the link entirely.
  const fallbackPillarSlug = pillar?.slug ?? "";

  return {
    title: doc.title,
    slug: doc.slug,
    shortDescription: doc.shortDescription ?? undefined,
    heroImage: mapImage(doc.heroImage),
    whatIncluded: mapStringArray(doc.whatIncluded, "item"),
    process: doc.process?.map((p) => ({ title: p.title ?? undefined, description: p.description ?? undefined })),
    pricingStartingFrom: doc.pricingStartingFrom ?? undefined,
    featureBlocks: doc.featureBlocks?.map((b) => ({
      heading: b.heading ?? undefined,
      body: b.body ?? undefined,
      image: mapImage(b.image),
    })),
    faqs: mapFaqs(doc.faqs),
    pillar: pillar ? mapPillarSummary(pillar) : null,
    caseStudies: (doc.caseStudies ?? []).map(mapProjectSummary).filter((p) => p !== null),
    relatedServices: (doc.relatedServices ?? [])
      .map((s) => {
        if (!isPopulated(s)) return null;
        const slug = isPopulated(s.pillar) ? s.pillar.slug : fallbackPillarSlug;
        return mapServiceSummary(s, slug);
      })
      .filter((s) => s !== null),
    seo: mapSeo(doc.seo),
  };
}
