import Image from "next/image";
import type { PillarData } from "@/lib/cms/types";

export default function PillarHero({ pillar }: { pillar: PillarData }) {
  const imageUrl = pillar.heroImage?.url ?? null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
      <div className="flex flex-col items-center gap-12 lg:flex-row">
        <div className="flex w-full flex-col items-start gap-6 lg:w-1/2">
          {pillar.positioningStatement && (
            <span className="font-accent text-2xl italic text-forge-orange sm:text-3xl">
              {pillar.positioningStatement}
            </span>
          )}

          <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-pure-white sm:text-6xl lg:text-[60px] lg:leading-[1.05]">
            {pillar.title}
          </h1>

          {pillar.shortDescription && (
            <p className="max-w-[52ch] font-display text-base text-pure-white">
              {pillar.shortDescription}
            </p>
          )}
        </div>

        <div className="w-full lg:w-1/2">
          {imageUrl ? (
            <div className="relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[360px] lg:h-[424px]">
              <Image src={imageUrl} alt={pillar.heroImage?.alt ?? ""} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-forge-orange/30 via-forge-black-light to-forge-black-darker sm:h-[360px] lg:h-[424px]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
