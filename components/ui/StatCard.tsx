/** Oversized word/number with a short caption beneath a brass rule. */
export default function StatCard({
  value,
  label,
  tone = "dark",
}: {
  value: string;
  label: string;
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";

  return (
    <div>
      <p
        className={`font-display text-[clamp(2.5rem,5vw,4.25rem)] italic leading-none tracking-[-0.03em] [font-variation-settings:'SOFT'_100] ${isDark ? "text-clay-light" : "text-clay"}`}
      >
        {value}
      </p>
      <p className={`mt-3 border-t border-brass/70 pt-3 text-[0.9375rem] leading-snug ${isDark ? "text-linen/75" : "text-stone"}`}>
        {label}
      </p>
    </div>
  );
}
