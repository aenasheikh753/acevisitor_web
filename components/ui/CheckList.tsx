import { Check } from "lucide-react";

export default function CheckList({
  items,
  tone = "dark",
}: {
  items: string[];
  tone?: "dark" | "light";
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 text-sm leading-6 ${
            tone === "dark" ? "text-muted" : "text-slate-ink/75"
          }`}
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-button bg-positive/15 text-positive">
            <Check className="h-3 w-3" aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
