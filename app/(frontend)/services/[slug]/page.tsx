import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillarHero from "@/components/PillarHero";
import PillarIntroduction from "@/components/PillarIntroduction";
import PillarWhyItMatters from "@/components/PillarWhyItMatters";
import Differentiators from "@/components/Differentiators";
import PillarProcess from "@/components/PillarProcess";
import PillarServices from "@/components/PillarServices";
import PillarCaseStudies from "@/components/PillarCaseStudies";
import PillarTestimonial from "@/components/PillarTestimonial";
import FaqAccordion from "@/components/FaqAccordion";
import ClosingCta from "@/components/ClosingCta";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
import { getPillar, getPillarSlugs, getSiteSettings } from "@/lib/cms/fetchers";

export async function generateStaticParams() {
  const slugs = await getPillarSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = await getPillar(slug);
  if (!pillar) return {};

  const seo = pillar.seo;
  return {
    title: seo?.metaTitle ?? pillar.title,
    description: seo?.metaDescription ?? pillar.shortDescription,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [pillar, settings] = await Promise.all([getPillar(slug), getSiteSettings()]);

  if (!pillar) notFound();

  const navItems: SectionNavItem[] = [
    { id: "overview", label: "Overview" },
    (pillar.process?.length ?? 0) > 0 && { id: "process", label: "Process" },
    (pillar.services?.length ?? 0) > 0 && { id: "services", label: "Services" },
    (pillar.caseStudies?.length ?? 0) > 0 && { id: "work", label: "Work" },
    (pillar.faqs?.length ?? 0) >= 2 && { id: "faq", label: "FAQ" },
  ].filter((item): item is SectionNavItem => Boolean(item));

  return (
    <>
      <Header settings={settings} />
      <main>
        <div id="overview">
          <PillarHero pillar={pillar} />
        </div>
        <SectionNav items={navItems} />
        <PillarIntroduction pillar={pillar} />
        <PillarWhyItMatters pillar={pillar} />
        <Differentiators items={pillar.differentiators} />
        <div id="process">
          <PillarProcess pillar={pillar} />
        </div>
        <div id="services">
          <PillarServices pillar={pillar} />
        </div>
        <div id="work">
          <PillarCaseStudies pillar={pillar} />
        </div>
        <PillarTestimonial pillar={pillar} />
        <div id="faq">
          <FaqAccordion
            eyebrow="FAQs"
            heading={`Questions about **${pillar.title.replace(/^Forge /, "")}**`}
            faqs={pillar.faqs}
          />
        </div>
        <ClosingCta />
      </main>
      <Footer settings={settings} />
    </>
  );
}
