import type { ReactNode } from "react";

export default function Badge({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-button border px-3 py-1.5 text-xs font-semibold tracking-wide ${
        tone === "dark"
          ? "border-line bg-copy/5 text-copy"
          : "border-slate-ink/10 bg-mist text-slate-ink"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-button bg-positive" />
      {children}
    </span>
  );
}
