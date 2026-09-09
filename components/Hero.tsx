import Link from "next/link";
import Image from "next/image";
import type { HomepageData } from "@/lib/sanity/types";
import { parseAccentText } from "@/lib/parseAccentText";
import { urlFor } from "@/sanity/lib/image";

export default function Hero({ homepage }: { homepage: HomepageData }) {
  const headingParts = parseAccentText(homepage.heroHeading);
  const imageUrl = homepage.heroImage ? urlFor(homepage.heroImage).width(1200).url() : null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
      <div className="flex flex-col items-center gap-12 lg:flex-row">
        <div className="flex w-full flex-col items-start gap-7 lg:w-1/2">
          {homepage.heroEyebrow && (
            <span className="inline-flex items-center rounded-full border border-white px-6 py-1.5 font-display text-base font-medium text-pure-white">
              {homepage.heroEyebrow}
            </span>
          )}

          <h1 className="font-display text-5xl font-medium leading-[1.05] text-pure-white sm:text-6xl lg:text-[80px] lg:leading-[1.05]">
            {headingParts.map((part, i) =>
              part.accent ? (
                <span key={i} className="font-accent italic text-forge-orange">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </h1>

          {homepage.heroSubhead && (
            <p className="max-w-[52ch] font-display text-base text-pure-white">
              {homepage.heroSubhead}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {homepage.heroPrimaryCta?.label && (
              <Link
                href={homepage.heroPrimaryCta.href ?? "/contact"}
                className="inline-flex items-center gap-3 rounded-[10px] border border-forge-orange bg-forge-orange px-5 py-2.5 font-display text-base font-medium text-pure-white transition-colors hover:bg-transparent"
              >
                {homepage.heroPrimaryCta.label}
                <ArrowIcon />
              </Link>
            )}
            {homepage.heroSecondaryCta?.label && (
              <Link
                href={homepage.heroSecondaryCta.href ?? "/contact"}
                className="inline-flex items-center gap-3 rounded-[10px] border border-white px-5 py-2.5 font-display text-base font-medium text-pure-white transition-colors hover:bg-white hover:text-forge-black"
              >
                {homepage.heroSecondaryCta.label}
                <ArrowIcon />
              </Link>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          {imageUrl ? (
            <div className="relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[360px] lg:h-[424px]">
              <Image src={imageUrl} alt="" fill className="object-cover" priority />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-forge-orange/30 via-forge-black-light to-forge-black-darker sm:h-[360px] lg:h-[424px]"
            >
              <span className="font-accent text-2xl italic text-white/40">
                Hero image placeholder
              </span>
            </div>
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
