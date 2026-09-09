export type TextPart = { text: string; accent: boolean };

/**
 * Splits a string like "Forge better **digital** businesses." into parts,
 * flagging the **wrapped** segment as `accent: true` so components can
 * render it in the Instrument Serif italic / Forge Orange treatment.
 *
 * Lets CMS editors control which word gets the accent style from a single
 * plain-text field, instead of needing structured rich-text input for a
 * one-word emphasis.
 */
export function parseAccentText(input: string | undefined | null): TextPart[] {
  if (!input) return [];
  const segments = input.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return segments.map((segment) => {
    const isAccent = segment.startsWith("**") && segment.endsWith("**");
    return {
      text: isAccent ? segment.slice(2, -2) : segment,
      accent: isAccent,
    };
  });
}
