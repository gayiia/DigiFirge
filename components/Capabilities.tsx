import Link from "next/link";
import Image from "next/image";
import type { HomepageData } from "@/lib/sanity/types";
import { parseAccentText } from "@/lib/parseAccentText";
import { urlFor } from "@/sanity/lib/image";

export default function Capabilities({ homepage }: { homepage: HomepageData }) {
  const pillars = homepage.pillars ?? [];
  if (pillars.length === 0) return null;

  const headingParts = parseAccentText(homepage.capabilitiesHeading);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-[650px] flex-col gap-3">
          {homepage.capabilitiesEyebrow && (
            <span className="inline-flex w-fit items-center rounded-full border border-white px-6 py-1.5 font-display text-base font-medium text-pure-white">
              {homepage.capabilitiesEyebrow}
            </span>
          )}
          <h2 className="font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
            {headingParts.map((part, i) =>
              part.accent ? (
                <span key={i} className="font-accent italic text-forge-orange">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </h2>
        </div>
        {homepage.capabilitiesIntro && (
          <p className="max-w-[36ch] font-display text-base text-pure-white">
            {homepage.capabilitiesIntro}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Link
            key={pillar.slug}
            href={pillar.href}
            className={`group flex flex-col gap-6 p-9 transition-colors ${
              i % 2 === 0 ? "bg-forge-black-darker" : "bg-forge-black-light"
            } hover:bg-forge-orange/10`}
          >
            {pillar.icon ? (
              <Image src={urlFor(pillar.icon).width(35).height(35).url()} alt="" width={35} height={35} />
            ) : (
              <PillarIcon />
            )}
            <h3 className="font-display text-2xl font-medium text-pure-white">{pillar.title}</h3>
            {pillar.shortDescription && (
              <p className="font-display text-base text-body-text">{pillar.shortDescription}</p>
            )}
            <span className="mt-auto inline-flex items-center gap-2 font-display text-base font-medium text-pure-white">
              Learn More
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PillarIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" aria-hidden="true">
      <path d="M17.5 4L21 14L31 17.5L21 21L17.5 31L14 21L4 17.5L14 14L17.5 4Z" stroke="#C03E02" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
