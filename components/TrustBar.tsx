"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import type { HomepageData } from "@/lib/cms/types";

export default function TrustBar({ homepage }: { homepage: HomepageData }) {
  const logos = homepage.trustBarLogos ?? [];
  const speed = homepage.trustBarSpeed ?? 30;

  const groupRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;

    const measure = () => {
      // Exact pixel width of one logo group PLUS the gap that separates
      // it from the next group — the precise distance to translate so
      // the loop point is invisible. A percentage-based translateX(-50%)
      // doesn't account for flex `gap` symmetrically (one inter-copy gap
      // gets counted in the split, but the wrap-around gap back to the
      // start doesn't exist in the DOM), which is what caused the
      // visible "reset" snap.
      const parentStyles = el.parentElement ? getComputedStyle(el.parentElement) : null;
      const gap = parentStyles ? parseFloat(parentStyles.columnGap || parentStyles.gap || "0") : 0;
      setDistance(el.getBoundingClientRect().width + gap);
    };

    measure();
    // Re-measure once images finish loading (natural width replaces the
    // next/image width hint) and on any resize.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [logos.length]);

  // Conditional rendering per spec — omit entirely if no logos configured.
  if (logos.length === 0) return null;

  return (
    <section
      aria-label="Trusted platforms and partners"
      className="mx-auto max-w-[1440px] overflow-hidden px-6 py-10 md:px-12"
    >
      <div className="marquee-fade relative overflow-hidden">
        {/* Two back-to-back copies of the same set — translating by the
            exact measured pixel width of one copy (incl. trailing gap)
            loops seamlessly from the last logo back to the first. */}
        <div
          className="marquee-track hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] flex w-max items-center gap-x-16 py-1 opacity-70 grayscale"
          style={
            {
              animationDuration: `${speed}s`,
              // Left unset until measured — the keyframe's `var(--marquee-distance, 0px)`
              // fallback then renders a static (not paused, just motionless)
              // frame, so there's no jump once the real distance kicks in.
              // Deliberately NOT setting animationPlayState here: inline
              // styles beat the hover/focus :pause CSS rules regardless of
              // value, which would silently break the WCAG 2.2.2 pause
              // mechanism below.
              ...(distance != null && { "--marquee-distance": `${distance}px` }),
            } as CSSProperties
          }
        >
          <div ref={groupRef} className="flex shrink-0 items-center gap-x-16">
            {logos.map((logo, i) =>
              logo.logo ? (
                <Image
                  key={`${logo.name}-${i}`}
                  src={logo.logo.url}
                  alt={logo.logo.alt || logo.name || ""}
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
          <div aria-hidden="true" className="flex shrink-0 items-center gap-x-16">
            {logos.map((logo, i) =>
              logo.logo ? (
                <Image
                  key={`${logo.name}-${i}-dup`}
                  src={logo.logo.url}
                  alt=""
                  width={140}
                  height={32}
                  className="h-8 w-auto shrink-0 object-contain"
                />
              ) : (
                <span key={`${logo.name}-${i}-dup`} className="shrink-0 whitespace-nowrap font-display text-lg font-medium text-pure-white">
                  {logo.name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
