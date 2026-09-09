import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Capabilities from "@/components/Capabilities";
import FeaturedWork from "@/components/FeaturedWork";
import FinalCta from "@/components/FinalCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Capabilities />
        <FeaturedWork />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
