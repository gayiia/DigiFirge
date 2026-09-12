import type { PillarData } from "@/lib/cms/types";
import ProcessSteps from "./ProcessSteps";

export default function PillarProcess({ pillar }: { pillar: PillarData }) {
  return <ProcessSteps steps={pillar.process} />;
}
