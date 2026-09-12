// Canonical frontend data contract — components depend only on these
// shapes, never on Payload's generated types directly (those are only
// ever imported inside adapters.ts). Kept byte-identical to the old
// lib/sanity/types.ts wherever possible so the ~20 presentational
// components needed zero changes for the CMS swap.

// Payload's serialized Lexical rich-text value. Passed straight through
// to <RichText> — nothing in this codebase inspects its internals.
export type LexicalRichText = {
  root: { [key: string]: unknown };
  [key: string]: unknown;
} | null;

// Every image field carries a required alt string on the Media document
// itself (Payload's idiomatic pattern) rather than per usage site.
export type ImageWithAlt = { url: string; alt: string } | null;

export type CtaData = { label?: string; href?: string };
export type NavLinkData = { label?: string; href?: string; hasDropdown?: boolean };
export type FaqItemData = { question: string; answer: string };
export type SocialLinkData = { platform?: string; url?: string };
export type SeoData = {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: ImageWithAlt | null;
  canonicalUrl?: string;
  noIndex?: boolean;
};

export type FooterColumnData = { heading?: string; links?: NavLinkData[] };

export type SiteSettingsData = {
  siteName?: string;
  tagline?: string;
  logo?: ImageWithAlt | null;
  contact?: { email?: string; phone?: string; address?: string };
  socialLinks?: SocialLinkData[];
  navigation?: NavLinkData[];
  navigationCta?: CtaData;
  footerColumns?: FooterColumnData[];
  footerCopyright?: string;
  newsletterSettings?: { provider?: string; heading?: string; enabled?: boolean };
  defaultSeo?: SeoData;
};

export type PillarSummary = {
  title: string;
  slug: string;
  shortDescription?: string;
  icon?: ImageWithAlt | null;
  href: string;
};

export type ProjectSummary = {
  title: string;
  slug: string;
  client?: string;
  platformTags?: string[];
  coverImage?: ImageWithAlt | null;
  href: string;
};

export type TrustLogoData = { name?: string; logo?: ImageWithAlt | null };

export type HomepageData = {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubhead?: string;
  heroImage?: ImageWithAlt | null;
  heroPrimaryCta?: CtaData;
  heroSecondaryCta?: CtaData;

  trustBarLogos?: TrustLogoData[];
  trustBarSpeed?: number;

  capabilitiesEyebrow?: string;
  capabilitiesHeading?: string;
  capabilitiesIntro?: string;
  pillars?: PillarSummary[];

  featuredWorkEyebrow?: string;
  featuredWorkHeading?: string;
  featuredWork?: ProjectSummary[];

  finalCtaHeading?: string;
  finalCtaBody?: string;
  finalCtaTags?: string[];
  finalCtaPanelHeading?: string;
  finalCtaPanelBody?: string;
  finalCtaPanelCta?: CtaData;

  faqEyebrow?: string;
  faqHeading?: string;
  faqIntro?: string;
  faqs?: FaqItemData[];

  seo?: SeoData;
};

export type ProcessStepData = { title?: string; description?: string };
export type DifferentiatorData = { title?: string; description?: string };
export type ServiceSummary = { title: string; slug: string; shortDescription?: string; href: string };
export type TestimonialData = {
  quote?: string;
  authorName?: string;
  authorRole?: string;
  company?: string;
  avatar?: ImageWithAlt | null;
};

export type PillarData = {
  title: string;
  slug: string;
  icon?: ImageWithAlt | null;
  shortDescription?: string;
  positioningStatement?: string;
  heroImage?: ImageWithAlt | null;
  heroPrimaryCta?: CtaData;
  heroSecondaryCta?: CtaData;
  introduction?: LexicalRichText;
  whyItMatters?: LexicalRichText;
  differentiators?: DifferentiatorData[];
  process?: ProcessStepData[];
  faqs?: FaqItemData[];
  services?: ServiceSummary[];
  caseStudies?: ProjectSummary[];
  testimonial?: TestimonialData | null;
  seo?: SeoData;
};

export type FeatureBlockData = { heading?: string; body?: string; image?: ImageWithAlt | null };

export type ServiceData = {
  title: string;
  slug: string;
  shortDescription?: string;
  heroImage?: ImageWithAlt | null;
  heroPrimaryCta?: CtaData;
  heroSecondaryCta?: CtaData;
  whatIncluded?: string[];
  techStack?: string[];
  process?: ProcessStepData[];
  pricingStartingFrom?: string;
  featureBlocks?: FeatureBlockData[];
  faqs?: FaqItemData[];
  pillar?: PillarSummary | null;
  caseStudies?: ProjectSummary[];
  relatedServices?: ServiceSummary[];
  seo?: SeoData;
};
