import type { HomepageData } from "@/lib/cms/types";
import FaqAccordion from "./FaqAccordion";

export default function Faq({ homepage }: { homepage: HomepageData }) {
  return (
    <FaqAccordion
      eyebrow={homepage.faqEyebrow}
      heading={homepage.faqHeading}
      intro={homepage.faqIntro}
      faqs={homepage.faqs}
    />
  );
}
