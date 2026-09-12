import Link from "next/link";
import Image from "next/image";
import type { ServiceData } from "@/lib/cms/types";

export default function ServiceHero({ service }: { service: ServiceData }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
      <div className="flex flex-col items-center gap-12 lg:flex-row">
        <div className="flex w-full flex-col items-start gap-6 lg:w-1/2">
          {service.pillar && (
            <Link
              href={service.pillar.href}
              className="press inline-flex items-center gap-2 font-display text-sm font-medium text-forge-orange-text"
            >
              <BackIcon />
              {service.pillar.title}
            </Link>
          )}

          <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-pure-white sm:text-6xl lg:text-[60px] lg:leading-[1.05]">
            {service.title}
          </h1>

          {service.shortDescription && (
            <p className="max-w-[52ch] font-display text-base text-pure-white">{service.shortDescription}</p>
          )}

          {service.pricingStartingFrom && (
            <span className="inline-flex w-fit items-center rounded-full border border-forge-orange bg-forge-orange-tint px-6 py-1.5 font-display text-base font-medium text-forge-orange-text">
              Starting from {service.pricingStartingFrom}
            </span>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {service.heroPrimaryCta?.label && (
              <Link
                href={service.heroPrimaryCta.href ?? "/contact"}
                className="press inline-flex items-center gap-3 rounded-[10px] border border-forge-orange bg-forge-orange px-5 py-2.5 font-display text-base font-medium text-pure-white transition-colors hover:bg-transparent"
              >
                {service.heroPrimaryCta.label}
                <ArrowIcon />
              </Link>
            )}
            {service.heroSecondaryCta?.label && (
              <Link
                href={service.heroSecondaryCta.href ?? "/work"}
                className="press inline-flex items-center gap-3 rounded-[10px] border border-white px-5 py-2.5 font-display text-base font-medium text-pure-white transition-colors hover:bg-white hover:text-forge-black"
              >
                {service.heroSecondaryCta.label}
                <ArrowIcon />
              </Link>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          {service.heroImage ? (
            <div className="relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[360px] lg:h-[424px]">
              <Image
                src={service.heroImage.url}
                alt={service.heroImage.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
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

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" fill="none" aria-hidden="true" className="-rotate-45">
      <path d="M2 8.5H15M15 8.5L9 2.5M15 8.5L9 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" fill="none" aria-hidden="true" className="rotate-[135deg]">
      <path d="M2 8.5H15M15 8.5L9 2.5M15 8.5L9 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
