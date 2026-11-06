import type { ReactNode } from "react";

/** Small status tag with a brass dot. Square-ish, not a pill. */
export default function Badge({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-[0.3rem] border px-2.5 py-1 text-label font-semibold ${
        tone === "dark" ? "border-linen/20 text-linen" : "border-spruce/15 bg-paper text-spruce"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brass" />
      {children}
    </span>
  );
}
