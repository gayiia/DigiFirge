import type { DifferentiatorData } from "@/lib/cms/types";
import Reveal from "./Reveal";

export default function Differentiators({ items }: { items?: DifferentiatorData[] }) {
  const points = items ?? [];
  if (points.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <h2 className="mb-10 font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
        Why <span className="font-accent italic text-forge-orange">DigiForge</span>
      </h2>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point, i) => (
          <Reveal key={point.title ?? i} delayMs={i * 60} className="h-full">
            <div className="flex h-full flex-col gap-3 bg-forge-black-darker p-7">
              <span className="font-accent text-2xl italic text-forge-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              {point.title && (
                <h3 className="font-display text-lg font-medium text-pure-white">{point.title}</h3>
              )}
              {point.description && (
                <p className="font-display text-base text-body-text">{point.description}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
