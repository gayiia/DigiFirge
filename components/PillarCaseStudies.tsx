import type { PillarData } from "@/lib/cms/types";
import CaseStudiesGrid from "./CaseStudiesGrid";

export default function PillarCaseStudies({ pillar }: { pillar: PillarData }) {
  return <CaseStudiesGrid projects={pillar.caseStudies} />;
}
