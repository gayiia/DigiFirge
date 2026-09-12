import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceWhatIncluded from "@/components/ServiceWhatIncluded";
import ProcessSteps from "@/components/ProcessSteps";
import ServiceFeatureBlocks from "@/components/ServiceFeatureBlocks";
import ServicesGrid from "@/components/ServicesGrid";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";
import FaqAccordion from "@/components/FaqAccordion";
import { getService, getServiceParams, getSiteSettings } from "@/lib/cms/fetchers";

export async function generateStaticParams() {
  return getServiceParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}): Promise<Metadata> {
  const { slug, service: serviceSlug } = await params;
  const service = await getService(slug, serviceSlug);
  if (!service) return {};

  const seo = service.seo;
  return {
    title: seo?.metaTitle ?? service.title,
    description: seo?.metaDescription ?? service.shortDescription,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}) {
  const { slug, service: serviceSlug } = await params;
  const [service, settings] = await Promise.all([getService(slug, serviceSlug), getSiteSettings()]);

  if (!service) notFound();

  return (
    <>
      <Header settings={settings} />
      <main>
        <ServiceHero service={service} />
        <ServiceWhatIncluded service={service} />
        <ProcessSteps steps={service.process} />
        <ServiceFeatureBlocks service={service} />
        <CaseStudiesGrid projects={service.caseStudies} />
        <ServicesGrid services={service.relatedServices} />
        <FaqAccordion
          eyebrow="FAQs"
          heading={`Questions about **${service.title}**`}
          faqs={service.faqs}
        />
      </main>
      <Footer settings={settings} />
    </>
  );
}
