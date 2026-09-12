import { RichText } from "@payloadcms/richtext-lexical/react";
import type { PillarData } from "@/lib/cms/types";

export default function PillarWhyItMatters({ pillar }: { pillar: PillarData }) {
  const hasContent = (pillar.whyItMatters?.root?.children as unknown[] | undefined)?.length;
  if (!hasContent) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
      <div className="flex flex-col gap-6 rounded-2xl bg-forge-black-darker p-8 sm:p-12">
        <h2 className="font-display text-3xl font-medium leading-tight text-pure-white sm:text-4xl">
          Why it <span className="font-accent italic text-forge-orange">matters</span>
        </h2>
        <RichText
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- LexicalRichText is intentionally loose; RichText's generic node typing isn't worth threading through here.
          data={pillar.whyItMatters as any}
          className="flex flex-col gap-4 [&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-forge-orange [&_blockquote]:py-1 [&_blockquote]:pl-6 [&_blockquote]:font-accent [&_blockquote]:text-2xl [&_blockquote]:italic [&_blockquote]:leading-snug [&_blockquote]:text-pure-white [&_em]:font-accent [&_em]:italic [&_p]:max-w-[75ch] [&_p]:font-display [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-body-text [&_strong]:font-semibold [&_strong]:text-pure-white"
        />
      </div>
    </section>
  );
}
