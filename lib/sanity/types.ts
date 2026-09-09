import type { Image } from "sanity";

export type CtaData = { label?: string; href?: string };
export type NavLinkData = { label?: string; href?: string; hasDropdown?: boolean };
export type FaqItemData = { question: string; answer: string };
export type SocialLinkData = { platform?: string; url?: string };
export type SeoData = {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: Image | null;
  canonicalUrl?: string;
  noIndex?: boolean;
};

export type FooterColumnData = { heading?: string; links?: NavLinkData[] };

export type SiteSettingsData = {
  siteName?: string;
  tagline?: string;
  logo?: Image | null;
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
  icon?: Image | null;
  href: string;
};

export type ProjectSummary = {
  title: string;
  slug: string;
  client?: string;
  platformTags?: string[];
  coverImage?: Image | null;
  href: string;
};

export type TrustLogoData = { name?: string; logo?: Image | null };

export type HomepageData = {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubhead?: string;
  heroImage?: Image | null;
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
