import Image from "next/image";
import type { CSSProperties } from "react";
import type { HomepageData } from "@/lib/sanity/types";
import { urlFor } from "@/sanity/lib/image";

export default function TrustBar({ homepage }: { homepage: HomepageData }) {
  const logos = homepage.trustBarLogos ?? [];

  // Conditional rendering per spec — omit entirely if no logos configured.
  if (logos.length === 0) return null;

  const speed = homepage.trustBarSpeed ?? 30;

  return (
    <section
      aria-label="Trusted platforms and partners"
      className="mx-auto max-w-[1440px] overflow-hidden px-6 py-10 md:px-12"
    >
      <div
        className="marquee-fade group relative overflow-hidden"
        style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
      >
        {/* Two back-to-back copies of the same set — translating exactly
            -50% loops seamlessly from the last logo back to the first. */}
        <div
          className="marquee-track hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] flex w-max items-center gap-x-16 py-1 opacity-70 grayscale"
          style={{ animationDuration: "var(--marquee-duration)" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-x-16">
              {logos.map((logo, i) =>
                logo.logo ? (
                  <Image
                    key={`${logo.name}-${i}`}
                    src={urlFor(logo.logo).height(32).url()}
                    alt={copy === 0 ? logo.logo.alt || logo.name || "" : ""}
                    width={140}
                    height={32}
                    className="h-8 w-auto shrink-0 object-contain"
                  />
                ) : (
                  <span key={`${logo.name}-${i}`} className="shrink-0 whitespace-nowrap font-display text-lg font-medium text-pure-white">
                    {logo.name}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
