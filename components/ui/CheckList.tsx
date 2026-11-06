import { Icon } from "@/components/ui/IconBox";

export default function CheckList({
  items,
  tone = "dark",
}: {
  items: string[];
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 text-[0.9375rem] leading-relaxed ${isDark ? "text-linen/80" : "text-spruce/80"}`}
        >
          <Icon icon="check" className={`mt-1 h-4 w-4 shrink-0 ${isDark ? "text-clay-light" : "text-clay"}`} strokeWidth={2} />
          {item}
        </li>
      ))}
    </ul>
  );
}
