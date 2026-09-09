import type { Image } from "sanity";

// Every image field now carries an editor-provided alt field alongside
// the asset — see sanity/schemaTypes/objects/imageWithAlt.ts.
export type ImageWithAlt = Image & { alt?: string };

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
