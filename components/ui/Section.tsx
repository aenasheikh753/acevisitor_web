import type { ReactNode } from "react";

/**
 * Section grounds.
 * Design-system names: "linen" | "paper" | "sage" | "spruce" | "clay".
 * Legacy names are kept so existing pages keep working: dark/dark-1/2/3/cta → spruce,
 * light/light-1 → linen, light-2 → soft sage.
 */
export type SectionTone =
  | "linen"
  | "paper"
  | "sage"
  | "spruce"
  | "clay"
  | "dark"
  | "light"
  | "dark-1"
  | "dark-2"
  | "dark-3"
  | "light-1"
  | "light-2"
  | "cta";

const toneClasses: Record<SectionTone, string> = {
  linen: "ground-linen",
  paper: "ground-paper",
  sage: "ground-sage",
  spruce: "ground-spruce",
  clay: "ground-clay",
  dark: "section-dark",
  light: "section-tone-light-1",
  "dark-1": "section-tone-dark-1",
  "dark-2": "section-tone-dark-2",
  "dark-3": "section-tone-dark-3",
  "light-1": "section-tone-light-1",
  "light-2": "section-tone-light-2",
  cta: "section-tone-cta",
};

const darkTones = new Set<SectionTone>(["spruce", "clay", "dark", "dark-1", "dark-2", "dark-3", "cta"]);

/** Maps a section tone to the dark/light tone that child components expect. */
export function contentTone(tone: SectionTone): "dark" | "light" {
  return darkTones.has(tone) ? "dark" : "light";
}

/**
 * Vertical padding / margin utilities that would override the section rhythm
 * (e.g. pt-0, !pb-16, sm:py-8, -mt-4). Section strips them so rhythm is set
 * only through the `spacing` prop.
 */
const verticalSpacingOverride = /^!?(?:[a-z0-9-]+:)*!?-?(?:p[tby]|m[tby])-\S+!?$/;

function withoutVerticalSpacing(className: string) {
  return className
    .split(/\s+/)
    .filter((name) => name && !verticalSpacingOverride.test(name))
    .join(" ");
}

const spacingClasses = {
  default: "section-space",
  tight: "section-space-tight",
  loose: "section-space-loose",
  hero: "section-space-hero",
  none: "",
} as const;

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  /** Rhythm varies on purpose: tight bands, default sections, loose feature moments, or hero. */
  spacing?: keyof typeof spacingClasses;
  id?: string;
  className?: string;
  "aria-labelledby"?: string;
};

export default function Section({
  children,
  tone = "dark",
  spacing = "default",
  id,
  className = "",
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${spacingClasses[spacing]} ${toneClasses[tone]} ${withoutVerticalSpacing(className)}`}
      {...rest}
    >
      {children}
    </section>
  );
}
