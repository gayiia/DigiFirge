import Image from "next/image";
import type { PillarData } from "@/lib/cms/types";

export default function PillarTestimonial({ pillar }: { pillar: PillarData }) {
  const testimonial = pillar.testimonial;
  if (!testimonial?.quote) return null;

  const authorLine = [testimonial.authorRole, testimonial.company].filter(Boolean).join(", ");

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="relative overflow-hidden rounded-2xl bg-forge-black-darker p-10 sm:p-16">
        <QuoteMarkIcon />
        <div className="relative flex flex-col items-start gap-8">
          <blockquote className="max-w-[38ch] font-accent text-3xl italic leading-snug text-pure-white sm:text-4xl">
            {testimonial.quote}
          </blockquote>
          <div className="flex items-center gap-4">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar.url}
                alt={testimonial.avatar.alt || testimonial.authorName || ""}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-forge-orange/40"
              />
            ) : (
              <div aria-hidden="true" className="h-16 w-16 shrink-0 rounded-full bg-forge-orange/30 ring-2 ring-forge-orange/40" />
            )}
            <div className="flex flex-col">
              {testimonial.authorName && (
                <span className="font-display text-lg font-medium text-pure-white">{testimonial.authorName}</span>
              )}
              {authorLine && <span className="font-display text-sm text-body-text">{authorLine}</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteMarkIcon() {
  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden="true"
      className="absolute -right-4 -top-4 text-forge-orange/10"
    >
      <path
        d="M40 35C25 35 15 47 15 62C15 77 25 88 38 88C48 88 55 81 55 71C55 62 49 56 41 56C39 56 37 56 36 57C37 42 48 35 40 35ZM100 35C85 35 75 47 75 62C75 77 85 88 98 88C108 88 115 81 115 71C115 62 109 56 101 56C99 56 97 56 96 57C97 42 108 35 100 35Z"
        fill="currentColor"
      />
    </svg>
  );
}
