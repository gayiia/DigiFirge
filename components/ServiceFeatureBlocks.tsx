import Image from "next/image";
import type { ServiceData } from "@/lib/cms/types";
import Reveal from "./Reveal";

export default function ServiceFeatureBlocks({ service }: { service: ServiceData }) {
  const blocks = service.featureBlocks ?? [];
  if (blocks.length === 0) return null;

  return (
    <section className="mx-auto flex max-w-[1440px] flex-col gap-16 px-6 py-16 md:px-12">
      {blocks.map((block, i) => (
        <Reveal key={block.heading ?? i}>
          <div className={`flex flex-col items-center gap-10 lg:flex-row ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
            <div className="w-full lg:w-1/2">
              {block.image ? (
                <div className="relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[360px]">
                  <Image
                    src={block.image.url}
                    alt={block.image.alt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="h-[280px] w-full rounded-2xl bg-gradient-to-br from-forge-orange/20 via-forge-black-light to-forge-black-darker sm:h-[360px]"
                />
              )}
            </div>
            <div className="flex w-full flex-col gap-4 lg:w-1/2">
              {block.heading && (
                <h3 className="font-display text-3xl font-medium leading-tight text-pure-white">{block.heading}</h3>
              )}
              {block.body && <p className="font-display text-base text-body-text">{block.body}</p>}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
