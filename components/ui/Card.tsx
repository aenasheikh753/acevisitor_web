import type { ReactNode } from "react";

export default function Card({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`reveal group rounded-lg border p-6 transition duration-300 hover:-translate-y-1 ${
        tone === "dark"
          ? "glass-card border-line"
          : "border-slate-ink/10 bg-mist shadow-card hover:shadow-card"
      } ${className}`}
    >
      {children}
    </div>
  );
}
