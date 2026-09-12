import type { GlobalConfig } from "payload";
import { navLinkItemFields, socialLinkItemFields } from "../fields/navigation";
import { ctaField } from "../fields/cta";
import { seoField } from "../fields/seo";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  fields: [
    { name: "siteName", type: "text" },
    { name: "tagline", type: "text" },
    { name: "logo", type: "upload", relationTo: "media" },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "email", type: "text" },
        { name: "phone", type: "text" },
        { name: "address", type: "textarea" },
      ],
    },
    { name: "socialLinks", type: "array", fields: socialLinkItemFields },
    { name: "navigation", type: "array", fields: navLinkItemFields },
    ctaField("navigationCta"),
    {
      name: "footerColumns",
      type: "array",
      fields: [
        { name: "heading", type: "text" },
        { name: "links", type: "array", fields: navLinkItemFields },
      ],
    },
    { name: "footerCopyright", type: "text" },
    {
      name: "newsletterSettings",
      type: "group",
      fields: [
        { name: "provider", type: "text" },
        { name: "heading", type: "text" },
        { name: "enabled", type: "checkbox", defaultValue: false },
      ],
    },
    {
      name: "analytics",
      type: "group",
      fields: [
        { name: "googleAnalyticsId", type: "text" },
        { name: "metaPixelId", type: "text" },
      ],
    },
    { ...seoField(), name: "defaultSeo", label: "Default SEO" },
  ],
};
