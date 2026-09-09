import { trustBar } from "@/lib/data";

export default function TrustBar() {
  // Conditional rendering per spec §3 — omit entirely if no logos configured.
  if (!trustBar.logos || trustBar.logos.length === 0) return null;

  return (
    <section
      aria-label="Trusted platforms and partners"
      className="mx-auto max-w-[1440px] overflow-hidden px-6 py-10 md:px-12"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
        {trustBar.logos.map((logo, i) => (
          <span
            key={`${logo.name}-${i}`}
            className="font-display text-lg font-medium text-pure-white"
          >
            {logo.name}
          </span>
        ))}
      </div>
    </section>
  );
}
