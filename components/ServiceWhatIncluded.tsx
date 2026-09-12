import type { ServiceData } from "@/lib/cms/types";

export default function ServiceWhatIncluded({ service }: { service: ServiceData }) {
  const items = service.whatIncluded ?? [];
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="flex flex-col gap-6 rounded-2xl bg-forge-black-darker p-8 sm:p-12">
        <h2 className="font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
          What&rsquo;s <span className="font-accent italic text-forge-orange">included</span>
        </h2>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 font-display text-base text-body-text">
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-forge-orange">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
