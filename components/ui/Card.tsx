import type { ReactNode } from "react";

export type CardSurface = "outline" | "paper" | "sage" | "spruce" | "clay" | "brass";
export type CardShape = "square" | "arch" | "soft" | "notch";

const surfaceClasses: Record<CardSurface, string> = {
  outline: "border border-current/15 bg-transparent",
  paper: "border border-spruce/10 bg-paper text-spruce",
  sage: "bg-sage text-spruce",
  spruce: "bg-spruce text-linen [--focus:var(--clay-light)]",
  clay: "bg-clay text-linen [--focus:var(--linen)]",
  brass: "bg-brass/25 text-spruce",
};

const shapeClasses: Record<CardShape, string> = {
  square: "rounded-[0.375rem]",
  soft: "arch-soft",
  arch: "arch",
  notch: "notch rounded-[0.875rem]",
};

/**
 * Card surfaces vary on purpose — pick a surface and a shape per placement so
 * neighbouring cards never read as identical boxes. `interactive` lifts the
 * card onto the offset shadow on hover/focus-within.
 */
export default function Card({
  children,
  tone = "dark",
  surface,
  shape = "square",
  interactive = true,
  className = "",
}: {
  children: ReactNode;
  /** Legacy: the ground the card sits on, used when no surface is given. */
  tone?: "dark" | "light";
  surface?: CardSurface;
  shape?: CardShape;
  interactive?: boolean;
  className?: string;
  /** Deprecated: per-card scroll reveals were removed from the design. */
  cssReveal?: boolean;
}) {
  const resolvedSurface = surface ?? (tone === "dark" ? "outline" : "paper");

  return (
    <div
      className={`group relative p-6 sm:p-7 ${surfaceClasses[resolvedSurface]} ${shapeClasses[shape]} ${interactive ? "lift" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
