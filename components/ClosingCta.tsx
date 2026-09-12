import Link from "next/link";

// Static, not CMS-driven — a generic "ready to start" banner doesn't
// need per-page customization. Gives Pillar/Service pages the closing
// conversion moment the homepage already has via FinalCta, instead of
// trailing off right after the FAQ.
export default function ClosingCta() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-2xl bg-forge-black-darker p-10 sm:p-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-forge-orange/40 via-forge-orange/5 to-forge-black-darker opacity-70"
        />
        <div className="relative flex flex-col gap-4">
          <h2 className="max-w-[24ch] font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
            Ready to start a <span className="font-accent italic text-forge-orange">project</span>?
          </h2>
          <p className="max-w-[46ch] font-display text-base text-pure-white">
            Tell us about your business, and let&rsquo;s figure out the right next step together.
          </p>
        </div>
        <Link
          href="/contact"
          className="press relative inline-flex w-fit items-center gap-3 rounded-[10px] border border-forge-orange bg-forge-orange px-5 py-2.5 font-display text-base font-medium text-pure-white transition-colors hover:border-pure-white hover:bg-transparent"
        >
          Start a Project
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" fill="none" aria-hidden="true" className="-rotate-45">
      <path d="M2 8.5H15M15 8.5L9 2.5M15 8.5L9 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
