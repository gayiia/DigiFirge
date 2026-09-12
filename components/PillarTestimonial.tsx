import Image from "next/image";
import type { PillarData } from "@/lib/cms/types";

export default function PillarTestimonial({ pillar }: { pillar: PillarData }) {
  const testimonial = pillar.testimonial;
  if (!testimonial?.quote) return null;

  const authorLine = [testimonial.authorRole, testimonial.company].filter(Boolean).join(", ");

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-forge-black-darker p-8 sm:p-12">
        <blockquote className="font-accent text-2xl italic leading-snug text-pure-white sm:text-3xl">
          “{testimonial.quote}”
        </blockquote>
        <div className="flex items-center gap-4">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar.url}
              alt={testimonial.avatar.alt || testimonial.authorName || ""}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div aria-hidden="true" className="h-12 w-12 shrink-0 rounded-full bg-forge-orange/30" />
          )}
          <div className="flex flex-col">
            {testimonial.authorName && (
              <span className="font-display text-base font-medium text-pure-white">{testimonial.authorName}</span>
            )}
            {authorLine && <span className="font-display text-sm text-body-text">{authorLine}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
