import type { ReactNode } from "react";

/**
 * Section background tones. "dark" (base hero background) and "light"
 * (same as "light-1") are kept as aliases for backwards compatibility.
 */
export type SectionTone =
  | "dark"
  | "light"
  | "dark-1"
  | "dark-2"
  | "dark-3"
  | "light-1"
  | "light-2"
  | "cta";

const toneClasses: Record<SectionTone, string> = {
  dark: "section-dark",
  light: "section-tone-light-1",
  "dark-1": "section-tone-dark-1",
  "dark-2": "section-tone-dark-2",
  "dark-3": "section-tone-dark-3",
  "light-1": "section-tone-light-1",
  "light-2": "section-tone-light-2",
  cta: "section-tone-cta",
};

/** Maps a section tone to the dark/light tone that child components expect. */
export function contentTone(tone: SectionTone): "dark" | "light" {
  return tone.startsWith("light") ? "light" : "dark";
}

/**
 * Vertical padding / margin utilities that would override the section rhythm
 * (e.g. pt-0, !pb-16, sm:py-8, -mt-4). Section strips them so every section
 * always keeps padding-block: var(--section-padding-y).
 */
const verticalSpacingOverride = /^!?(?:[a-z0-9-]+:)*!?-?(?:p[tby]|m[tby])-\S+!?$/;

function withoutVerticalSpacing(className: string) {
  return className
    .split(/\s+/)
    .filter((name) => name && !verticalSpacingOverride.test(name))
    .join(" ");
}

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  /** "default" uses the section padding token; "hero" adds room for the fixed navbar at the top. */
  spacing?: "default" | "hero";
  id?: string;
  className?: string;
};

export default function Section({
  children,
  tone = "dark",
  spacing = "default",
  id,
  className = "",
}: SectionProps) {
  const spacingClass = spacing === "hero" ? "section-space-hero" : "section-space";

  return (
    <section id={id} className={`${spacingClass} ${toneClasses[tone]} ${withoutVerticalSpacing(className)}`}>
      {children}
    </section>
  );
}
