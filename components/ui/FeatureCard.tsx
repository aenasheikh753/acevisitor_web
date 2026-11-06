import type { ReactNode } from "react";
import type { FeatureContent } from "@/lib/types";
import Card, { type CardShape, type CardSurface } from "@/components/ui/Card";
import IconBox from "@/components/ui/IconBox";

const darkSurfaces = new Set<CardSurface>(["spruce", "clay"]);

export default function FeatureCard({
  icon,
  title,
  description,
  tone = "dark",
  surface,
  shape,
  size = "md",
  className = "",
  children,
}: FeatureContent & {
  tone?: "dark" | "light";
  surface?: CardSurface;
  shape?: CardShape;
  /** "lg" sets a display-size title for feature tiles in a bento grid. */
  size?: "md" | "lg";
  className?: string;
  cssReveal?: boolean;
  children?: ReactNode;
}) {
  // Outline cards are transparent, so they take the ground's tone.
  const onDark = surface && surface !== "outline" ? darkSurfaces.has(surface) : tone === "dark";
  const iconColour = surface === "clay" ? "text-linen" : onDark ? "text-clay-light" : "text-clay";

  return (
    <Card tone={tone} surface={surface} shape={shape} className={`h-full ${className}`}>
      <IconBox icon={icon} size={size === "lg" ? "xl" : "lg"} className={`${iconColour} ${size === "lg" ? "mb-10" : "mb-6"}`} />
      <h3
        className={`${size === "lg" ? "text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.02em]" : "text-h3"} ${onDark ? "text-linen" : "text-spruce"}`}
      >
        {title}
      </h3>
      <p className={`mt-3 ${size === "lg" ? "max-w-md text-body" : "text-[0.9375rem] leading-relaxed"} ${onDark ? "text-linen/75" : "text-spruce/75"}`}>
        {description}
      </p>
      {children}
    </Card>
  );
}
