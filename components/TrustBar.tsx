import Image from "next/image";
import type { HomepageData } from "@/lib/cms/types";

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
      <div className="marquee-fade relative overflow-hidden">
        {/* Two back-to-back copies of the same set. Every single logo
            (both copies, no exceptions) carries the same trailing
            margin instead of a flex `gap` — a `gap` only sits between
            the two copy wrappers, which is asymmetric (one gap exists
            in the DOM, but the wrap-around gap back to the start
            doesn't), and that asymmetry is what caused the visible
            snap at the loop point. Uniform per-item margins make the
            two copies exactly equal width, so plain translateX(-50%)
            is precise — no JS measurement needed. */}
        <div
          className="marquee-track hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] flex w-max items-center py-1 opacity-70 grayscale"
          style={{ animationDuration: `${speed}s` }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {logos.map((logo, i) => (
                <div key={`${logo.name}-${i}`} className="mr-16 shrink-0">
                  {logo.logo ? (
                    <Image
                      src={logo.logo.url}
                      alt={copy === 0 ? logo.logo.alt || logo.name || "" : ""}
                      width={140}
                      height={32}
                      className="h-8 w-auto object-contain"
                    />
                  ) : (
                    <span className="whitespace-nowrap font-display text-lg font-medium text-pure-white">
                      {logo.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
