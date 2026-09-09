import Link from "next/link";
import Image from "next/image";
import type { SiteSettingsData } from "@/lib/sanity/types";
import { urlFor } from "@/sanity/lib/image";

export default function Footer({ settings }: { settings: SiteSettingsData }) {
  const columns = settings.footerColumns ?? [];
  const social = settings.socialLinks ?? [];
  const newsletter = settings.newsletterSettings;

  return (
    <footer className="mx-auto max-w-[1440px] px-6 pb-6 md:px-12">
      <div className="rounded-2xl bg-forge-black-darker px-6 py-14 sm:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Newsletter — capture-only until a provider is chosen; collapses if disabled. */}
          {newsletter?.enabled && (
            <div className="flex flex-col gap-4">
              {settings.logo ? (
                <Image
                  src={urlFor(settings.logo).width(480).height(120).url()}
                  alt={settings.logo.alt || settings.siteName || "DigiForge"}
                  width={240}
                  height={60}
                  className="h-12 w-auto self-start"
                />
              ) : (
                <p className="self-start font-display text-2xl font-semibold tracking-tight text-pure-white">
                  Digi<span className="text-forge-orange">forge</span>
                </p>
              )}
              {newsletter.heading && (
                <p className="font-display text-lg font-medium text-pure-white">{newsletter.heading}</p>
              )}
              <NewsletterForm />
            </div>
          )}

          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-4">
              <p className="font-display text-base font-medium text-white/60">{column.heading}</p>
              <ul className="flex flex-col gap-3">
                {(column.links ?? []).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href ?? "#"} className="font-display text-base text-pure-white transition-colors hover:text-forge-orange-text">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-10 h-px w-full bg-white/10" aria-hidden="true" />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="font-display text-sm text-white/60">{settings.footerCopyright}</p>
          <div className="flex items-center gap-5">
            {social.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                aria-label={s.platform}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-sm text-pure-white transition-colors hover:text-forge-orange-text"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  // Capture-only for v1 — provider TBD (Master Spec §9). Swap the onSubmit
  // handler once a provider is chosen; markup won't need to change.
  return (
    <form className="flex items-center gap-2" aria-label="Newsletter signup">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Enter your email"
        className="w-full min-w-0 rounded-full bg-white px-4 py-2.5 font-display text-sm text-forge-black placeholder:text-forge-black/50"
      />
      <button
        type="submit"
        className="press shrink-0 rounded-full bg-forge-orange px-4 py-2.5 font-display text-sm font-medium text-pure-white transition-colors hover:bg-forge-orange/80"
      >
        Subscribe
      </button>
    </form>
  );
}
