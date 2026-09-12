import type { ProcessStepData } from "@/lib/cms/types";
import Reveal from "./Reveal";

export default function ProcessSteps({ steps }: { steps?: ProcessStepData[] }) {
  const items = steps ?? [];
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <h2 className="mb-10 font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
        How we <span className="font-accent italic text-forge-orange">work</span>
      </h2>

      <div className="relative">
        {/* Connecting path — vertical through circle centers on mobile
            (single column), horizontal through circle centers on
            desktop (one row). Two elements, toggled by breakpoint,
            since the axis genuinely flips rather than just resizing. */}
        <div aria-hidden="true" className="absolute bottom-5 left-5 top-5 w-px bg-white/15 sm:hidden" />
        <div aria-hidden="true" className="absolute left-5 right-5 top-5 hidden h-px bg-white/15 sm:block" />

        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {items.map((step, i) => (
            <Reveal key={step.title ?? i} delayMs={i * 60}>
              <div className="relative flex gap-5 sm:flex-col sm:gap-5">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-forge-orange bg-forge-black font-display text-base font-semibold text-forge-orange">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-2 pt-1 sm:pt-0">
                  {step.title && (
                    <h3 className="font-display text-xl font-medium text-pure-white">{step.title}</h3>
                  )}
                  {step.description && (
                    <p className="font-display text-base text-body-text">{step.description}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
