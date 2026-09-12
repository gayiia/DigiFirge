import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceWhatIncluded from "@/components/ServiceWhatIncluded";
import TechStack from "@/components/TechStack";
import ProcessSteps from "@/components/ProcessSteps";
import ServiceFeatureBlocks from "@/components/ServiceFeatureBlocks";
import ServicesGrid from "@/components/ServicesGrid";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";
import FaqAccordion from "@/components/FaqAccordion";
import ClosingCta from "@/components/ClosingCta";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
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

  const navItems: SectionNavItem[] = [
    { id: "overview", label: "Overview" },
    (service.process?.length ?? 0) > 0 && { id: "process", label: "Process" },
    (service.caseStudies?.length ?? 0) > 0 && { id: "work", label: "Work" },
    (service.relatedServices?.length ?? 0) > 0 && { id: "related", label: "Related Services" },
    (service.faqs?.length ?? 0) >= 2 && { id: "faq", label: "FAQ" },
  ].filter((item): item is SectionNavItem => Boolean(item));

  return (
    <>
      <Header settings={settings} />
      <main>
        <div id="overview">
          <ServiceHero service={service} />
        </div>
        <SectionNav items={navItems} />
        <ServiceWhatIncluded service={service} />
        <TechStack tools={service.techStack} />
        <div id="process">
          <ProcessSteps steps={service.process} />
        </div>
        <ServiceFeatureBlocks service={service} />
        <div id="work">
          <CaseStudiesGrid projects={service.caseStudies} />
        </div>
        <div id="related">
          <ServicesGrid services={service.relatedServices} />
        </div>
        <div id="faq">
          <FaqAccordion
            eyebrow="FAQs"
            heading={`Questions about **${service.title}**`}
            faqs={service.faqs}
          />
        </div>
        <ClosingCta />
      </main>
      <Footer settings={settings} />
    </>
  );
}
