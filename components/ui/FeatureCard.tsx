import type { ReactNode } from "react";
import type { FeatureContent } from "@/lib/types";
import Card from "@/components/ui/Card";
import IconBox from "@/components/ui/IconBox";

export default function FeatureCard({
  icon,
  title,
  description,
  tone = "dark",
  className = "",
  cssReveal = true,
  children,
}: FeatureContent & { tone?: "dark" | "light"; className?: string; cssReveal?: boolean; children?: ReactNode }) {
  return (
    <Card tone={tone} cssReveal={cssReveal} className={`h-full ${className}`}>
      <div
        className={`feature-icon mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md ${
          tone === "dark" ? "bg-cyan/10 text-cyan" : "bg-cyan/10 text-slate-ink"
        }`}
      >
        <IconBox icon={icon} />
      </div>
      <h3
        className={`font-heading text-lg font-semibold tracking-tight ${
          tone === "dark" ? "text-copy" : "text-slate-ink"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-3 text-sm leading-6 ${
          tone === "dark" ? "text-muted" : "text-slate-ink/70"
        }`}
      >
        {description}
      </p>
      {children}
    </Card>
  );
}
