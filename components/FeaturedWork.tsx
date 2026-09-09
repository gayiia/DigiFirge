"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { HomepageData } from "@/lib/sanity/types";
import { parseAccentText } from "@/lib/parseAccentText";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "./Reveal";

const VISIBLE_CARDS = 2;

export default function FeaturedWork({ homepage }: { homepage: HomepageData }) {
  const projects = homepage.featuredWork ?? [];
  const showCarouselControls = projects.length > VISIBLE_CARDS;

  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(showCarouselControls);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useLayoutEffect(() => {
    updateScrollState();
  }, [projects.length]);

  // Conditional rendering per spec — omit if no featured projects exist,
  // rather than showing placeholder/duplicate cards in production. Hooks
  // above must run unconditionally on every render (Rules of Hooks).
  if (projects.length === 0) return null;

  const headingParts = parseAccentText(homepage.featuredWorkHeading);

  const scrollByDirection = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth });
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[650px] flex-col gap-3">
          {homepage.featuredWorkEyebrow && (
            <span className="inline-flex w-fit items-center rounded-full border border-white px-6 py-1.5 font-display text-base font-medium text-pure-white">
              {homepage.featuredWorkEyebrow}
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

        <div className="flex items-center gap-4">
          {showCarouselControls && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByDirection(-1)}
                disabled={!canScrollLeft}
                aria-label="Show previous case studies"
                className="press flex h-11 w-11 items-center justify-center rounded-full bg-forge-black-light text-pure-white transition-colors hover:bg-forge-orange disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-forge-black-light"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollByDirection(1)}
                disabled={!canScrollRight}
                aria-label="Show more case studies"
                className="press flex h-11 w-11 items-center justify-center rounded-full bg-forge-black-light text-pure-white transition-colors hover:bg-forge-orange disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-forge-black-light"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          )}
          {showCarouselControls && (
            <Link
              href="/work"
              className="inline-flex items-center gap-2 whitespace-nowrap font-display text-base font-medium text-forge-orange-text"
            >
              See More
              <ArrowIcon />
            </Link>
          )}
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
      >
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delayMs={i * 60}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)]"
          >
            <article className="flex h-full flex-col gap-6 rounded-2xl bg-forge-black-darker p-6">
              {project.coverImage ? (
                <div className="relative h-[260px] w-full overflow-hidden rounded-2xl sm:h-[320px]">
                  <Image src={urlFor(project.coverImage).width(700).url()} alt={project.coverImage.alt ?? `${project.title} — project screenshot`} fill className="object-cover" />
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
              <Link href={project.href} className="mt-auto inline-flex items-center gap-2 font-display text-lg font-medium text-forge-orange-text">
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

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
