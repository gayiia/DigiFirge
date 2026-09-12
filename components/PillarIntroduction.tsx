import { RichText } from "@payloadcms/richtext-lexical/react";
import type { PillarData } from "@/lib/cms/types";

export default function PillarIntroduction({ pillar }: { pillar: PillarData }) {
  const hasContent = (pillar.introduction?.root?.children as unknown[] | undefined)?.length;
  if (!hasContent) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-16 md:px-12">
      <RichText
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- LexicalRichText is intentionally loose; RichText's generic node typing isn't worth threading through here.
        data={pillar.introduction as any}
        className="flex flex-col gap-4 [&_p]:max-w-[75ch] [&_p]:font-display [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-body-text [&_strong]:font-semibold [&_strong]:text-pure-white [&_em]:font-accent [&_em]:italic"
      />
    </section>
  );
}
