// One-off content seed — recreates what was live in Sanity (plus the
// approved fallback copy) directly in Payload via the Local API. Run
// once against a fresh database: `npm run seed`.
import { getPayload } from "payload";
import config from "@payload-config";

function paragraph(text: string) {
  return {
    type: "paragraph",
    format: "" as const,
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: [{ type: "text", format: 0, style: "", mode: "normal", detail: 0, text, version: 1 }],
  };
}

function richText(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map(paragraph),
    },
  };
}

function tags(items: string[]) {
  return items.map((tag) => ({ tag }));
}

async function seed() {
  const payload = await getPayload({ config });

  // --- Project (referenced by homepage.featuredProjects) ---
  const existingProject = await payload.find({
    collection: "projects",
    where: { slug: { equals: "joey-clothing-shopify" } },
    limit: 1,
  });
  const project =
    existingProject.docs[0] ??
    (await payload.create({
      collection: "projects",
      data: {
        title: "How we redesigned JoeY Clothing's Shopify store for a seamless shopping experience",
        slug: "joey-clothing-shopify",
        client: "JoeY Clothing",
        platformTags: tags(["Shopify", "E-Commerce"]),
        featured: true,
      },
    }));
  console.log(`✓ project ready: ${project.slug}`);

  // --- Pillars ---
  const pillarInputs = [
    {
      slug: "strategy",
      title: "Forge Strategy",
      shortDescription: "Digital strategy, audits and roadmapping that give your next move a clear reason to exist.",
      positioningStatement: "Think before you build.",
      introduction: richText([
        "Most digital work fails before a single line of code is written — because nobody agreed on what problem it was solving. Forge Strategy is where we fix that.",
        "We audit what you have, map where your customers actually get stuck, and turn that into a roadmap your whole team can act on — not a deck that gets filed away.",
      ]),
      whyItMatters: richText([
        "A website, store, or campaign built on a guess is expensive to undo. Strategy is the cheapest insurance you can buy against building the wrong thing well.",
      ]),
      process: [
        { title: "Discovery & Audit", description: "We review your current site, funnel, and data to find where growth is actually leaking." },
        { title: "Market & Competitor Mapping", description: "Understand where you win, where you're outmatched, and where the real opening is." },
        { title: "Roadmap & Prioritization", description: "A sequenced plan — what to fix first, what to build next, and why." },
        { title: "Handoff", description: "A roadmap your team (or ours) can execute against immediately, with clear success metrics." },
      ],
      faqs: [
        { question: "Do I need a strategy engagement before you'll build anything?", answer: "No — but most clients find it saves money overall, since it prevents rework later. We're happy to scope a build directly if you already have a clear brief." },
        { question: "How long does a strategy engagement take?", answer: "Typically 2–3 weeks depending on scope, from kickoff to a delivered roadmap." },
      ],
      order: 1,
      seo: { metaTitle: "Forge Strategy — Digital Strategy & Audits | DigiForge", metaDescription: "Digital strategy, audits and roadmapping from DigiForge — give your next move a clear reason to exist before you spend a rupee building it." },
    },
    {
      slug: "build",
      title: "Forge Build",
      shortDescription: "Websites, e-commerce and web apps built to load fast, hold up, and actually convert.",
      positioningStatement: "Built to last, built to convert.",
      introduction: richText([
        "Forge Build is our technology arm — websites, Shopify and WooCommerce stores, and custom web applications, all built on modern, maintainable foundations rather than page-builder shortcuts.",
        "Every project ships with performance, accessibility, and security treated as requirements, not afterthoughts.",
      ]),
      whyItMatters: richText([
        "A slow, fragile site quietly taxes every marketing dollar you spend. We build so your traffic actually converts, and so your team can keep shipping after we hand it over.",
      ]),
      process: [
        { title: "Technical Scoping", description: "We define the exact stack, integrations, and architecture before writing code." },
        { title: "Build", description: "Iterative development with regular check-ins — you see progress, not just a final reveal." },
        { title: "QA & Performance Pass", description: "Cross-device testing, accessibility checks, and performance tuning before launch." },
        { title: "Launch & Handoff", description: "Deployment, documentation, and training so your team can operate it confidently." },
      ],
      faqs: [
        { question: "Do you build Shopify stores?", answer: "Yes — Shopify and e-commerce development is one of our core Forge Build services, from new store builds to migrations and ongoing support." },
        { question: "Can you work with our existing codebase?", answer: "In most cases, yes. We'll audit it first and tell you honestly whether extending it or rebuilding is the better call." },
      ],
      order: 2,
      seo: { metaTitle: "Forge Build — Web & E-Commerce Development | DigiForge", metaDescription: "Custom websites, Shopify/WooCommerce stores, and web applications from DigiForge — built to load fast, hold up, and convert." },
    },
    {
      slug: "creative",
      title: "Forge Creative",
      shortDescription: "Branding, identity and content that make your business recognizable and worth remembering.",
      positioningStatement: "Make it unmistakably yours.",
      introduction: richText([
        "Forge Creative covers everything that makes your brand recognizable at a glance — identity systems, visual design, and the content that carries your voice across every channel.",
        "We design for recall, not just for the pitch deck moment — work that still looks right a year from now.",
      ]),
      whyItMatters: richText([
        "In a crowded feed, being forgettable is the most expensive mistake a brand can make. Strong creative is what makes people stop, remember, and come back.",
      ]),
      process: [
        { title: "Brand Discovery", description: "We dig into your audience, competitors, and positioning before touching a mood board." },
        { title: "Concept & Direction", description: "A small number of distinct directions — no fence-sitting middle-ground options." },
        { title: "Design System", description: "Logo, color, type, and usage guidelines your team can apply consistently." },
        { title: "Rollout", description: "Applying the system across your real touchpoints — site, social, print, wherever it needs to live." },
      ],
      faqs: [
        { question: "Do you do full rebrands or just refreshes?", answer: "Both — we'll recommend which one your business actually needs after the discovery phase, rather than defaulting to the bigger (more expensive) option." },
        { question: "Will we own the final files and system?", answer: "Yes — full ownership and source files are yours on project completion." },
      ],
      order: 3,
      seo: { metaTitle: "Forge Creative — Branding & Identity | DigiForge", metaDescription: "Branding, identity and content from DigiForge — make your business recognizable and worth remembering." },
    },
    {
      slug: "ai-automation",
      title: "Forge AI",
      shortDescription: "Chatbots, automation and analytics that take repetitive work off your team's plate.",
      positioningStatement: "Let the busywork run itself.",
      introduction: richText([
        "Forge AI is where we automate the repetitive parts of running a digital business — customer support, lead follow-up, reporting — so your team can spend time on what actually needs a human.",
        "We're pragmatic about it: no AI for AI's sake, only where it measurably saves time or catches revenue you're currently leaving on the table.",
      ]),
      whyItMatters: richText([
        "Every hour your team spends on a task a workflow could handle is an hour not spent on strategy, relationships, or growth. Automation done well pays for itself quickly.",
      ]),
      process: [
        { title: "Workflow Audit", description: "We map your current manual processes to find where automation actually pays off." },
        { title: "Tool Selection", description: "Pick the right chatbot, CRM, or automation platform for your stack — not the trendiest one." },
        { title: "Build & Integrate", description: "Wire it into your existing tools so it fits how your team already works." },
        { title: "Monitor & Refine", description: "We tune based on real usage data after launch, not just a one-time setup." },
      ],
      faqs: [
        { question: "Will a chatbot replace our support team?", answer: "No — it handles the repetitive first-line questions so your team can focus on the ones that actually need a person." },
        { question: "What platforms do you integrate with?", answer: "Most common CRMs, email/marketing platforms, and e-commerce tools — we'll confirm compatibility with your specific stack during scoping." },
      ],
      order: 4,
      seo: { metaTitle: "Forge AI — Automation & Chatbots | DigiForge", metaDescription: "Chatbots, automation and analytics from DigiForge — take repetitive work off your team's plate." },
    },
  ];

  const pillars: Record<string, { id: number }> = {};
  for (const p of pillarInputs) {
    const existing = await payload.find({ collection: "pillars", where: { slug: { equals: p.slug } }, limit: 1 });
    const doc = existing.docs[0] ?? (await payload.create({ collection: "pillars", data: p }));
    pillars[p.slug] = doc;
    console.log(`✓ pillar ready: ${p.slug}`);
  }

  // --- Site Settings ---
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      siteName: "DigiForge",
      tagline: "Forge Better Digital Businesses.",
      contact: { email: "hello@digiforge.lk", phone: "+94 77 123 4567", address: "Sri Lanka" },
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
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
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
      ],
      footerCopyright: `© ${new Date().getFullYear()} DigiForge — Sri Lanka`,
      newsletterSettings: { provider: "", heading: "Get occasional updates, not spam.", enabled: true },
      defaultSeo: {
        metaTitle: "DigiForge — Forge Better Digital Businesses",
        metaDescription: "DigiForge is an independent digital agency in Sri Lanka helping ambitious businesses build, launch and grow through Strategy, Technology, Creative and AI.",
      },
    },
  });
  console.log("✓ site-settings updated");

  // --- Homepage ---
  await payload.updateGlobal({
    slug: "homepage",
    data: {
      heroEyebrow: "Strategy. Technology. Creative. AI.",
      heroHeading: "Forge better **digital** businesses.",
      heroSubhead: "An independent digital agency in Sri Lanka helping ambitious businesses build, launch, and grow with clarity.",
      heroPrimaryCta: { label: "Start a Project", href: "/contact" },
      heroSecondaryCta: { label: "Get a Quote", href: "/contact" },
      trustBarLogos: [
        { name: "Meta Business Partner" },
        { name: "WooCommerce" },
        { name: "Shopify Partner" },
        { name: "Klaviyo" },
      ],
      trustBarSpeed: 30,
      capabilitiesEyebrow: "What We Do",
      capabilitiesHeading: "Digital solutions that drive **real impact**",
      capabilitiesIntro: "From brand strategy to AI automation, we provide end-to-end solutions to help your business grow, scale and succeed.",
      featuredPillars: [pillars.strategy.id, pillars.build.id, pillars.creative.id, pillars["ai-automation"].id],
      featuredWorkEyebrow: "Featured Work",
      featuredWorkHeading: "Work that speaks **for itself**",
      featuredProjects: [project.id],
      finalCtaHeading: "Ready to **transform** your digital presence?",
      finalCtaBody: "Every great digital transformation starts with a conversation. Tell us about your business, and let's figure out the right next step together.",
      finalCtaTags: tags(["Free Consultation", "Quick Response"]),
      finalCtaPanelHeading: "Let's discuss your next project",
      finalCtaPanelBody: "Book a free consultation call with our team.",
      finalCtaPanelCta: { label: "Schedule a Call", href: "/contact" },
      faqEyebrow: "FAQs",
      faqHeading: "Frequently Asked **Questions**",
      faqIntro: "Clear answers to the questions we hear most from businesses ready to grow digitally.",
      faqs: [
        { question: "What services does DigiForge offer?", answer: "We help businesses with digital strategy, website and Shopify development, branding and creative, and AI automation — everything you need to build, launch, and grow a digital presence, all under one roof." },
        { question: "Do you build Shopify stores?", answer: "Yes — Shopify and e-commerce development is one of our core Forge Build services, from new store builds to migrations and ongoing support." },
        { question: "How long does a typical project take?", answer: "It depends on scope, but most website projects run 4–8 weeks from kickoff to launch. We'll give you a clear timeline before any work begins." },
        { question: "What makes DigiForge different from other agencies?", answer: "We work end-to-end across strategy, technology, creative and AI, so you're not stitching together separate vendors — one team, one plan, one point of accountability." },
        { question: "How do we get started?", answer: "Start a project or request a quote using the buttons above — we'll follow up to understand your goals and recommend the right next step." },
      ],
      seo: {
        metaTitle: "DigiForge — Forge Better Digital Businesses",
        metaDescription: "An independent digital agency in Sri Lanka helping ambitious businesses build, launch and grow through Strategy, Technology, Creative and AI.",
      },
    },
  });
  console.log("✓ homepage updated");

  console.log("\nDone. Note: no images were seeded (hero image, trust bar logos, pillar icons, project cover) — upload those directly in /admin when ready.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
