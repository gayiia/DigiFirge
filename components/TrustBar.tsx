import Image from "next/image";
import type { HomepageData } from "@/lib/sanity/types";
import { urlFor } from "@/sanity/lib/image";

export default function TrustBar({ homepage }: { homepage: HomepageData }) {
  const logos = homepage.trustBarLogos ?? [];

  // Conditional rendering per spec — omit entirely if no logos configured.
  if (logos.length === 0) return null;

  return (
    <section
      aria-label="Trusted platforms and partners"
      className="mx-auto max-w-[1440px] overflow-hidden px-6 py-10 md:px-12"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
        {logos.map((logo, i) =>
          logo.logo ? (
            <Image
              key={`${logo.name}-${i}`}
              src={urlFor(logo.logo).height(32).url()}
              alt={logo.logo.alt || logo.name || ""}
              width={140}
              height={32}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span key={`${logo.name}-${i}`} className="font-display text-lg font-medium text-pure-white">
              {logo.name}
            </span>
          )
        )}
      </div>
    </section>
  );
}
