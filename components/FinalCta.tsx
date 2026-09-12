import Link from "next/link";
import type { HomepageData } from "@/lib/cms/types";
import { parseAccentText } from "@/lib/parseAccentText";

export default function FinalCta({ homepage }: { homepage: HomepageData }) {
  const headingParts = parseAccentText(homepage.finalCtaHeading);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-8 md:px-12">
      <div className="flex flex-col overflow-hidden rounded-2xl bg-forge-black-darker lg:flex-row">
        <div className="flex flex-col gap-6 p-10 lg:w-1/2 lg:p-12">
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
          {homepage.finalCtaBody && (
            <p className="max-w-[46ch] font-display text-base text-pure-white">{homepage.finalCtaBody}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {(homepage.finalCtaTags ?? []).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-forge-orange bg-forge-orange-tint px-3 py-1 font-display text-sm font-medium text-forge-orange-text"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col justify-center gap-5 overflow-hidden p-10 lg:w-1/2 lg:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-forge-orange/50 via-forge-orange/10 to-forge-black-darker opacity-70"
          />
          <div className="relative flex flex-col gap-5">
            {homepage.finalCtaPanelHeading && (
              <h3 className="font-display text-2xl font-medium text-pure-white sm:text-[32px]">
                {homepage.finalCtaPanelHeading}
              </h3>
            )}
            {homepage.finalCtaPanelBody && (
              <p className="max-w-[42ch] font-display text-base text-pure-white">{homepage.finalCtaPanelBody}</p>
            )}
            {homepage.finalCtaPanelCta?.label && (
              <Link
                href={homepage.finalCtaPanelCta.href ?? "/contact"}
                className="press inline-flex w-fit items-center gap-3 rounded-[10px] border border-forge-orange bg-forge-orange px-5 py-2.5 font-display text-base font-medium text-pure-white transition-colors hover:border-pure-white hover:bg-transparent"
              >
                {homepage.finalCtaPanelCta.label}
                <ArrowIcon />
              </Link>
            )}
          </div>
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
