/**
 * Splits a headline at its first internal clause break (", " or ". ") so the
 * second half can be set in Fraunces italic. Copy is never altered — only
 * styled. Headlines without a break render unchanged.
 */
export function splitHeadline(text: string): [string, string] | null {
  const match = /^(.+?[,.])\s+(.+)$/.exec(text);
  if (!match || match[2].length < 4) return null;
  return [match[1], match[2]];
}

/** A headline whose second clause is set in clay italic. */
export default function Headline({
  text,
  emphasisClassName = "text-clay",
  animated = false,
}: {
  text: string;
  /** Colour/utility for the italic clause (e.g. text-clay-light on spruce). */
  emphasisClassName?: string;
  /** Hero load: each clause rises in sequence. */
  animated?: boolean;
}) {
  const parts = splitHeadline(text);
  const lineClass = animated ? "anim-line" : "";

  if (!parts) {
    return <span className={lineClass}>{text}</span>;
  }

  return (
    <>
      <span className={lineClass} style={{ ["--line" as string]: 0 }}>
        {parts[0]}
      </span>{" "}
      <em
        className={`${lineClass} font-display italic [font-variation-settings:'SOFT'_100] ${emphasisClassName}`}
        style={{ ["--line" as string]: 1 }}
      >
        {parts[1]}
      </em>
    </>
  );
}
