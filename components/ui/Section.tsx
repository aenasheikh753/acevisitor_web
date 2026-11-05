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

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  className?: string;
};

export default function Section({
  children,
  tone = "dark",
  id,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`section-space ${toneClasses[tone]} ${className}`}>
      {children}
    </section>
  );
}
