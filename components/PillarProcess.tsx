import type { PillarData } from "@/lib/cms/types";
import Reveal from "./Reveal";

export default function PillarProcess({ pillar }: { pillar: PillarData }) {
  const steps = pillar.process ?? [];
  if (steps.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <h2 className="mb-10 font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
        How we <span className="font-accent italic text-forge-orange">work</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.title ?? i} delayMs={i * 60}>
            <div className="flex h-full flex-col gap-4 rounded-2xl bg-forge-black-darker p-7">
              <span className="font-accent text-3xl italic text-forge-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step.title && (
                <h3 className="font-display text-xl font-medium text-pure-white">{step.title}</h3>
              )}
              {step.description && (
                <p className="font-display text-base text-body-text">{step.description}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
