import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Capabilities from "@/components/Capabilities";
import FeaturedWork from "@/components/FeaturedWork";
import FinalCta from "@/components/FinalCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { getHomepage, getSiteSettings } from "@/lib/sanity/fetchers";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  const seo = homepage.seo;
  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function Home() {
  const [settings, homepage] = await Promise.all([getSiteSettings(), getHomepage()]);

  return (
    <>
      <Header settings={settings} />
      <main>
        <Hero homepage={homepage} />
        <TrustBar homepage={homepage} />
        <Capabilities homepage={homepage} />
        <FeaturedWork homepage={homepage} />
        <FinalCta homepage={homepage} />
        <Faq homepage={homepage} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
