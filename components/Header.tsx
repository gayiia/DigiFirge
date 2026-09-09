import Link from "next/link";
import Image from "next/image";
import type { SiteSettingsData } from "@/lib/sanity/types";
import { urlFor } from "@/sanity/lib/image";

export default function Header({ settings }: { settings: SiteSettingsData }) {
  const links = settings.navigation ?? [];
  const cta = settings.navigationCta;

  return (
    <header className="sticky top-0 z-50 bg-forge-black/95 shadow-[0_12px_14px_rgba(0,0,0,0.2)] backdrop-blur supports-[backdrop-filter]:bg-forge-black/80">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-6 md:px-12">
        {settings.logo ? (
          <Link href="/" className="shrink-0">
            <Image
              src={urlFor(settings.logo).width(320).height(80).url()}
              alt={settings.logo.alt || settings.siteName || "DigiForge home"}
              width={160}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
        ) : (
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-pure-white"
          >
            Digi<span className="text-forge-orange">forge</span>
          </Link>
        )}

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href ?? "#"}
              className="font-display text-base font-medium text-pure-white transition-colors hover:text-forge-orange-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {cta?.label && (
          <Link
            href={cta.href ?? "/contact"}
            className="press hidden shrink-0 items-center justify-center gap-2 rounded-[10px] border border-forge-orange bg-forge-orange px-5 py-2.5 font-display text-base font-medium text-pure-white transition-colors hover:bg-transparent md:inline-flex"
          >
            {cta.label}
            <ArrowIcon />
          </Link>
        )}

        <MobileNav links={links} cta={cta} />
      </div>
    </header>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" fill="none" aria-hidden="true" className="-rotate-45">
      <path d="M2 8.5H15M15 8.5L9 2.5M15 8.5L9 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MobileNav({
  links,
  cta,
}: {
  links: SiteSettingsData["navigation"];
  cta: SiteSettingsData["navigationCta"];
}) {
  return (
    <details className="relative md:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-center rounded-md p-2 text-pure-white" aria-label="Open menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="absolute right-0 top-12 flex w-56 flex-col gap-1 rounded-xl border border-white/10 bg-forge-black-darker p-3 shadow-xl">
        {(links ?? []).map((link) => (
          <Link
            key={link.href}
            href={link.href ?? "#"}
            className="rounded-lg px-3 py-2 font-display text-base text-pure-white hover:bg-white/5"
          >
            {link.label}
          </Link>
        ))}
        {cta?.label && (
          <Link
            href={cta.href ?? "/contact"}
            className="mt-1 rounded-lg bg-forge-orange px-3 py-2 text-center font-display text-base font-medium text-pure-white"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </details>
  );
}
