import Link from "next/link";
import { featuredWork } from "@/lib/data";

export default function FeaturedWork() {
  // Conditional rendering per spec §5 — omit if no featured projects exist.
  if (!featuredWork || featuredWork.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="mb-9 flex items-end justify-between gap-6">
        <div className="flex max-w-[650px] flex-col gap-3">
          <span className="inline-flex w-fit items-center rounded-full border border-white px-6 py-1.5 font-display text-base font-medium text-pure-white">
            Featured Work
          </span>
          <h2 className="font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
            Work that speaks{" "}
            <span className="font-accent italic text-forge-orange">
              for itself
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {featuredWork.map((project) => (
          <article
            key={project.slug}
            className="flex flex-col gap-6 rounded-2xl bg-forge-black-darker p-6"
          >
            <div
              aria-hidden="true"
              className="h-[260px] w-full rounded-2xl bg-gradient-to-br from-forge-orange/20 via-forge-black-light to-forge-black-darker sm:h-[320px]"
            />
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-forge-orange bg-forge-orange-tint px-3 py-1 font-display text-sm font-medium text-forge-orange"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-display text-2xl font-medium leading-snug text-pure-white">
              {project.title}
            </h3>
            <Link
              href={project.href}
              className="inline-flex items-center gap-2 font-display text-lg font-medium text-forge-orange"
            >
              Learn More About This Project
              <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
