import type { ReactNode } from "react";

export default function Card({
  children,
  tone = "dark",
  className = "",
  cssReveal = true,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  /** Use the CSS scroll-timeline reveal. Turn off where GSAP animates the card instead. */
  cssReveal?: boolean;
}) {
  return (
    <div
      className={`${cssReveal ? "reveal" : ""} group rounded-lg border p-6 transition duration-300 hover:-translate-y-1 ${
        tone === "dark"
          ? "glass-card border-line"
          : "border-slate-ink/10 bg-mist shadow-card hover:shadow-card"
      } ${className}`}
    >
      {children}
    </div>
  );
}
