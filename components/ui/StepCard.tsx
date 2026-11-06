import type { IconName } from "@/lib/types";
import IconBox from "@/components/ui/IconBox";

/** A numbered step: oversized italic numeral, then title and description. Used only for true sequences. */
export default function StepCard({
  number,
  icon,
  title,
  description,
  tone = "dark",
}: {
  number: string;
  icon: IconName;
  title: string;
  description: string;
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";

  return (
    <div className="h-full">
      <div className="flex items-end justify-between gap-4">
        <span
          className={`font-display text-[3.5rem] italic leading-none [font-variation-settings:'SOFT'_100] ${isDark ? "text-clay-light" : "text-clay"}`}
        >
          {number}
        </span>
        <IconBox icon={icon} size="lg" className={isDark ? "text-linen/60" : "text-spruce/50"} />
      </div>
      <h3 className={`mt-5 border-t pt-5 text-h3 ${isDark ? "border-linen/15 text-linen" : "border-spruce/15 text-spruce"}`}>{title}</h3>
      <p className={`mt-2 text-[0.9375rem] leading-relaxed ${isDark ? "text-linen/75" : "text-spruce/75"}`}>{description}</p>
    </div>
  );
}
