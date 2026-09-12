import Link from "next/link";
import type { ServiceSummary } from "@/lib/cms/types";
import Reveal from "./Reveal";

export default function ServicesGrid({
  services,
  prefix = "Related",
  accentWord = "services",
}: {
  services?: ServiceSummary[];
  prefix?: string;
  accentWord?: string;
}) {
  const items = services ?? [];
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <h2 className="mb-10 font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
        {prefix ? `${prefix} ` : ""}
        <span className="font-accent italic text-forge-orange">{accentWord}</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service, i) => (
          <Reveal key={service.slug} delayMs={i * 60}>
            <Link
              href={service.href}
              className="press group flex h-full flex-col gap-4 rounded-2xl bg-forge-black-darker p-7 transition-colors hover:bg-forge-orange/10"
            >
              <h3 className="font-display text-xl font-medium text-pure-white">{service.title}</h3>
              {service.shortDescription && (
                <p className="font-display text-base text-body-text">{service.shortDescription}</p>
              )}
              <span className="mt-auto inline-flex items-center gap-2 font-display text-base font-medium text-pure-white">
                Learn More
                <ArrowIcon />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" fill="none" aria-hidden="true" className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      <path d="M2 8.5H15M15 8.5L9 2.5M15 8.5L9 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
