import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillarHero from "@/components/PillarHero";
import PillarIntroduction from "@/components/PillarIntroduction";
import PillarWhyItMatters from "@/components/PillarWhyItMatters";
import PillarProcess from "@/components/PillarProcess";
import PillarServices from "@/components/PillarServices";
import PillarCaseStudies from "@/components/PillarCaseStudies";
import PillarTestimonial from "@/components/PillarTestimonial";
import FaqAccordion from "@/components/FaqAccordion";
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

  return (
    <>
      <Header settings={settings} />
      <main>
        <PillarHero pillar={pillar} />
        <PillarIntroduction pillar={pillar} />
        <PillarWhyItMatters pillar={pillar} />
        <PillarProcess pillar={pillar} />
        <PillarServices pillar={pillar} />
        <PillarCaseStudies pillar={pillar} />
        <PillarTestimonial pillar={pillar} />
        <FaqAccordion
          eyebrow="FAQs"
          heading={`Questions about **${pillar.title.replace(/^Forge /, "")}**`}
          faqs={pillar.faqs}
        />
      </main>
      <Footer settings={settings} />
    </>
  );
}
