import type { PillarData } from "@/lib/cms/types";
import ServicesGrid from "./ServicesGrid";

export default function PillarServices({ pillar }: { pillar: PillarData }) {
  return <ServicesGrid services={pillar.services} prefix="Services under" accentWord={pillar.title} />;
}
