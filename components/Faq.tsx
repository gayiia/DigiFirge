"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Conditional rendering per spec §7 — omit if fewer than 2 FAQs.
  if (!faqs || faqs.length < 2) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-[380px] lg:shrink-0">
          <span className="inline-flex w-fit items-center rounded-full border border-white px-6 py-1.5 font-display text-base font-medium text-pure-white">
            FAQs
          </span>
          <h2 className="font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
            Frequently Asked{" "}
            <span className="font-accent italic text-forge-orange">
              Questions
            </span>
          </h2>
          <p className="font-display text-base text-pure-white">
            Clear answers to the questions we hear most from businesses ready
            to grow digitally.
          </p>
        </div>

        <div className="flex-1 rounded-2xl bg-forge-black-darker p-6 sm:p-10">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={item.question}
                className={index > 0 ? "border-t border-white/10" : ""}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-pure-white sm:text-2xl"
                  >
                    {item.question}
                    <CaretIcon isOpen={isOpen} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-5 font-display text-base text-body-text"
                >
                  {item.answer}
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
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
