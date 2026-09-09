// ---------------------------------------------------------------------
// Placeholder homepage content, shaped the way it will eventually come
// out of the CMS (see Master Spec §8 — Pillar / Service content types).
// Swap these values for real content; component code should not need
// to change.
// ---------------------------------------------------------------------

export const nav = {
  links: [
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Work", href: "/work" },
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/insights" },
  ],
  cta: { label: "Get a Quote", href: "/contact" },
};

export const hero = {
  eyebrow: "Strategy. Technology. Creative. AI.",
  heading: [
    { text: "Forge better ", accent: false },
    { text: "digital", accent: true },
    { text: " businesses.", accent: false },
  ],
  subhead:
    "An independent digital agency in Sri Lanka helping ambitious businesses build, launch, and grow with clarity.",
  primaryCta: { label: "Start a Project", href: "/contact" },
  secondaryCta: { label: "Get a Quote", href: "/contact" },
};

export const trustBar = {
  // Confirmed real per project decision — replace/reorder via CMS.
  logos: [
    { name: "Meta Business Partner" },
    { name: "Meta Business Partner" },
    { name: "WooCommerce" },
    { name: "Shopify Partner" },
    { name: "Klaviyo" },
  ],
};

export const pillars = [
  {
    slug: "strategy",
    title: "Forge Strategy",
    description:
      "Digital strategy, audits and roadmapping that give your next move a clear reason to exist.",
    href: "/services/strategy",
  },
  {
    slug: "build",
    title: "Forge Build",
    description:
      "Websites, e-commerce and web apps built to load fast, hold up, and actually convert.",
    href: "/services/build",
  },
  {
    slug: "creative",
    title: "Forge Creative",
    description:
      "Branding, identity and content that make your business recognizable and worth remembering.",
    href: "/services/creative",
  },
  {
    slug: "ai-automation",
    title: "Forge AI",
    description:
      "Chatbots, automation and analytics that take repetitive work off your team's plate.",
    href: "/services/ai-automation",
  },
];

export const featuredWork = [
  {
    slug: "joey-clothing-shopify",
    client: "JoeY Clothing",
    tags: ["Shopify", "E-Commerce"],
    title:
      "How we redesigned JoeY Clothing's Shopify store for a seamless shopping experience",
    href: "/work/joey-clothing-shopify",
  },
];

export const finalCta = {
  heading: [
    { text: "Ready to ", accent: false },
    { text: "transform", accent: true },
    { text: " your digital presence?", accent: false },
  ],
  body: "Every great digital transformation starts with a conversation. Tell us about your business, and let's figure out the right next step together.",
  tags: ["Free Consultation", "Quick Response"],
  panel: {
    heading: "Let's discuss your next project",
    body: "Book a free consultation call with our team.",
    cta: { label: "Schedule a Call", href: "/contact" },
  },
};

export const faqs = [
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
];

export const footer = {
  newsletter: {
    heading: "Get occasional updates, not spam.",
    placeholder: "Enter your email",
    cta: "Subscribe",
  },
  columns: [
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
  social: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "X", href: "https://x.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  copyright: `© ${new Date().getFullYear()} DigiForge — Sri Lanka`,
};
