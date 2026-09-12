import Link from "next/link";
import Image from "next/image";
import type { PillarData } from "@/lib/cms/types";
import Reveal from "./Reveal";

export default function PillarCaseStudies({ pillar }: { pillar: PillarData }) {
  const caseStudies = pillar.caseStudies ?? [];
  if (caseStudies.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <h2 className="mb-10 font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
        Related <span className="font-accent italic text-forge-orange">work</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {caseStudies.map((project, i) => (
          <Reveal key={project.slug} delayMs={i * 60}>
            <article className="flex h-full flex-col gap-6 rounded-2xl bg-forge-black-darker p-6">
              {project.coverImage ? (
                <div className="relative h-[260px] w-full overflow-hidden rounded-2xl sm:h-[320px]">
                  <Image src={project.coverImage.url} alt={project.coverImage.alt || `${project.title} — project screenshot`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="h-[260px] w-full rounded-2xl bg-gradient-to-br from-forge-orange/20 via-forge-black-light to-forge-black-darker sm:h-[320px]"
                />
              )}
              <div className="flex flex-wrap gap-3">
                {(project.platformTags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-forge-orange bg-forge-orange-tint px-3 py-1 font-display text-sm font-medium text-forge-orange-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-2xl font-medium leading-snug text-pure-white">{project.title}</h3>
              <Link href={project.href} className="press mt-auto inline-flex w-fit items-center gap-2 font-display text-lg font-medium text-forge-orange-text">
                Learn More About This Project
                <ArrowIcon />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
