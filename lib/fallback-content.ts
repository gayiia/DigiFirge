// ---------------------------------------------------------------------
// Fallback content — shaped exactly like the data lib/sanity/fetchers.ts
// returns from Sanity, so the site works immediately in development
// before a real Sanity project exists, and degrades gracefully if a
// fetch ever fails in production.
//
// Once real content exists in Sanity, none of this file is used — but
// it's worth keeping in sync structurally as the schema evolves.
// ---------------------------------------------------------------------

import type { SiteSettingsData, HomepageData } from "./sanity/types";

export const fallbackSiteSettings: SiteSettingsData = {
  siteName: "DigiForge",
  tagline: "Forge Better Digital Businesses.",
  logo: null,
  contact: {
    email: "hello@digiforge.lk",
    phone: "",
    address: "Sri Lanka",
  },
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "X", url: "https://x.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
  ],
  navigation: [
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Work", href: "/work", hasDropdown: false },
    { label: "About Us", href: "/about", hasDropdown: false },
    { label: "Pricing", href: "/pricing", hasDropdown: false },
    { label: "Blog", href: "/insights", hasDropdown: false },
  ],
  navigationCta: { label: "Get a Quote", href: "/contact" },
  footerColumns: [
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/about/careers" },
        { label: "Our Process", href: "/about/process" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "Forge Strategy", href: "/services/strategy" },
        { label: "Forge Build", href: "/services/build" },
        { label: "Forge Creative", href: "/services/creative" },
        { label: "Forge AI", href: "/services/ai-automation" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Insights", href: "/insights" },
        { label: "Pricing", href: "/pricing" },
        { label: "Work", href: "/work" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ],
  footerCopyright: `© ${new Date().getFullYear()} DigiForge — Sri Lanka`,
  newsletterSettings: {
    provider: "",
    heading: "Get occasional updates, not spam.",
    enabled: true,
  },
  defaultSeo: {
    metaTitle: "DigiForge — Forge Better Digital Businesses",
    metaDescription:
      "DigiForge is an independent digital agency in Sri Lanka helping ambitious businesses build, launch and grow through Strategy, Technology, Creative and AI.",
  },
};

export const fallbackHomepage: HomepageData = {
  heroEyebrow: "Strategy. Technology. Creative. AI.",
  heroHeading: "Forge better **digital** businesses.",
  heroSubhead:
    "An independent digital agency in Sri Lanka helping ambitious businesses build, launch, and grow with clarity.",
  heroImage: null,
  heroPrimaryCta: { label: "Start a Project", href: "/contact" },
  heroSecondaryCta: { label: "Get a Quote", href: "/contact" },

  trustBarLogos: [
    { name: "Meta Business Partner", logo: null },
    { name: "WooCommerce", logo: null },
    { name: "Shopify Partner", logo: null },
    { name: "Klaviyo", logo: null },
  ],
  trustBarSpeed: 30,

  capabilitiesEyebrow: "What We Do",
  capabilitiesHeading: "Digital solutions that drive **real impact**",
  capabilitiesIntro:
    "From brand strategy to AI automation, we provide end-to-end solutions to help your business grow, scale and succeed.",
  pillars: [
    {
      title: "Forge Strategy",
      slug: "strategy",
      shortDescription:
        "Digital strategy, audits and roadmapping that give your next move a clear reason to exist.",
      icon: null,
      href: "/services/strategy",
    },
    {
      title: "Forge Build",
      slug: "build",
      shortDescription:
        "Websites, e-commerce and web apps built to load fast, hold up, and actually convert.",
      icon: null,
      href: "/services/build",
    },
    {
      title: "Forge Creative",
      slug: "creative",
      shortDescription:
        "Branding, identity and content that make your business recognizable and worth remembering.",
      icon: null,
      href: "/services/creative",
    },
    {
      title: "Forge AI",
      slug: "ai-automation",
      shortDescription:
        "Chatbots, automation and analytics that take repetitive work off your team's plate.",
      icon: null,
      href: "/services/ai-automation",
    },
  ],

  featuredWorkEyebrow: "Featured Work",
  featuredWorkHeading: "Work that speaks **for itself**",
  featuredWork: [
    {
      title:
        "How we redesigned JoeY Clothing's Shopify store for a seamless shopping experience",
      slug: "joey-clothing-shopify",
      client: "JoeY Clothing",
      platformTags: ["Shopify", "E-Commerce"],
      coverImage: null,
      href: "/work/joey-clothing-shopify",
    },
  ],

  finalCtaHeading: "Ready to **transform** your digital presence?",
  finalCtaBody:
    "Every great digital transformation starts with a conversation. Tell us about your business, and let's figure out the right next step together.",
  finalCtaTags: ["Free Consultation", "Quick Response"],
  finalCtaPanelHeading: "Let's discuss your next project",
  finalCtaPanelBody: "Book a free consultation call with our team.",
  finalCtaPanelCta: { label: "Schedule a Call", href: "/contact" },

  faqEyebrow: "FAQs",
  faqHeading: "Frequently Asked **Questions**",
  faqIntro:
    "Clear answers to the questions we hear most from businesses ready to grow digitally.",
  faqs: [
    {
      question: "What services does DigiForge offer?",
      answer:
        "We help businesses with digital strategy, website and Shopify development, branding and creative, and AI automation — everything you need to build, launch, and grow a digital presence, all under one roof.",
    },
    {
      question: "Do you build Shopify stores?",
      answer:
        "Yes — Shopify and e-commerce development is one of our core Forge Build services, from new store builds to migrations and ongoing support.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "It depends on scope, but most website projects run 4–8 weeks from kickoff to launch. We'll give you a clear timeline before any work begins.",
    },
    {
      question: "What makes DigiForge different from other agencies?",
      answer:
        "We work end-to-end across strategy, technology, creative and AI, so you're not stitching together separate vendors — one team, one plan, one point of accountability.",
    },
    {
      question: "How do we get started?",
      answer:
        "Start a project or request a quote using the buttons above — we'll follow up to understand your goals and recommend the right next step.",
    },
  ],

  seo: {
    metaTitle: "DigiForge — Forge Better Digital Businesses",
    metaDescription:
      "An independent digital agency in Sri Lanka helping ambitious businesses build, launch and grow through Strategy, Technology, Creative and AI.",
  },
};
