"use client";

import { useState } from "react";
import type { FaqItemData } from "@/lib/cms/types";
import { parseAccentText } from "@/lib/parseAccentText";

export default function FaqAccordion({
  eyebrow,
  heading,
  intro,
  faqs,
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  faqs?: FaqItemData[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = faqs ?? [];

  // Conditional rendering per spec — omit if fewer than 2 FAQs.
  if (items.length < 2) return null;

  const headingParts = parseAccentText(heading);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-[380px] lg:shrink-0">
          {eyebrow && (
            <span className="inline-flex w-fit items-center rounded-full border border-white px-6 py-1.5 font-display text-base font-medium text-pure-white">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
            {headingParts.map((part, i) =>
              part.accent ? (
                <span key={i} className="font-accent italic text-forge-orange">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </h2>
          {intro && <p className="font-display text-base text-pure-white">{intro}</p>}
        </div>

        <div className="flex-1 rounded-2xl bg-forge-black-darker p-6 sm:p-10">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={item.question} className={index > 0 ? "border-t border-white/10" : ""}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="press flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-pure-white sm:text-2xl"
                  >
                    {item.question}
                    <CaretIcon isOpen={isOpen} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className="grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 font-display text-base text-body-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaretIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? "rotate-180" : ""}`}>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
