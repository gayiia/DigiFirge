// GROQ queries used by lib/sanity/fetchers.ts.
// Kept separate from the fetch logic so they're easy to test in Sanity Vision
// (visit /studio/vision and paste any of these in).

export const siteSettingsQuery = /* groq */ `
*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  logo,
  contact,
  socialLinks,
  navigation,
  navigationCta,
  footerColumns,
  footerCopyright,
  newsletterSettings,
  defaultSeo
}
`;

export const homepageQuery = /* groq */ `
*[_type == "homepage"][0]{
  heroEyebrow,
  heroHeading,
  heroSubhead,
  heroImage{..., alt},
  heroPrimaryCta,
  heroSecondaryCta,
  trustBarLogos[]{name, logo{..., alt}},
  capabilitiesEyebrow,
  capabilitiesHeading,
  capabilitiesIntro,
  "pillars": (featuredPillars[]->{
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon{..., alt},
    "href": "/services/" + slug.current
  })[_id != null],
  featuredWorkEyebrow,
  featuredWorkHeading,
  "featuredWork": (featuredProjects[]->{
    _id,
    title,
    "slug": slug.current,
    client,
    platformTags,
    coverImage{..., alt},
    "href": "/work/" + slug.current
  })[_id != null],
  finalCtaHeading,
  finalCtaBody,
  finalCtaTags,
  finalCtaPanelHeading,
  finalCtaPanelBody,
  finalCtaPanelCta,
  faqEyebrow,
  faqHeading,
  faqIntro,
  faqs,
  seo
}
`;
