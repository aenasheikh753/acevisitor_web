import { BellRing, Check } from "lucide-react";
import { QrGlyph } from "@/components/visuals/shared";
import type { HeroVisualStatus, ShowcaseVisualContent } from "@/lib/types";

const statusStyles: Record<HeroVisualStatus, string> = {
  approved: "bg-ok/12 text-ok",
  "checked-in": "bg-spruce text-linen",
  expected: "bg-wait/12 text-wait",
};

/**
 * Code-made composition: a spruce kiosk standing in front of the paper front-desk
 * console, with a badge laid on top. Decorative; described for screen readers.
 */
export default function ShowcaseVisual({ content }: { content: ShowcaseVisualContent }) {
  const { kiosk, console: deskConsole, badge, chips } = content;

  return (
    <div className="relative mx-auto w-full max-w-[40rem]">
      <p className="sr-only">{content.srDescription}</p>

      <div aria-hidden="true" className="relative select-none pb-24 pt-14 sm:pb-20">
        {/* Front desk console */}
        <div className="relative z-10 ml-auto w-[74%]">
          <div className="mock-window overflow-hidden rounded-[0.75rem]">
            <div className="flex items-center gap-2.5 border-b border-spruce/10 px-4 py-3">
              <span className="min-w-0 truncate text-[0.8125rem] font-semibold">{deskConsole.title}</span>
              <span className="ml-auto hidden shrink-0 font-display text-[0.75rem] italic text-clay sm:inline">{deskConsole.caption}</span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-spruce/10 border-b border-spruce/10">
              {deskConsole.stats.map((stat) => (
                <div key={stat.label} className="px-3 py-2.5">
                  <span className="block truncate text-[0.6875rem] text-stone">{stat.label}</span>
                  <span className="mt-0.5 block font-display text-[1.5rem] leading-tight">{stat.value}</span>
                </div>
              ))}
            </div>
            <ul className="p-2">
              {deskConsole.rows.map((row) => (
                <li key={row.name} className="flex items-center gap-2.5 rounded-[0.4rem] px-2 py-2 even:bg-linen">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage font-display text-[0.6875rem]">
                    {row.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.75rem] font-semibold">{row.name}</span>
                    <span className="hidden truncate text-[0.6875rem] text-stone sm:block">{row.host}</span>
                  </span>
                  <span className="hidden shrink-0 text-[0.6875rem] tabular-nums text-stone md:inline">{row.time}</span>
                  <span className={`shrink-0 rounded-[0.3rem] px-2 py-0.5 text-[0.625rem] font-semibold sm:text-[0.6875rem] ${statusStyles[row.status]}`}>
                    {row.statusLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Self-service kiosk: an arched screen on a slim stand */}
        <div className="absolute left-0 top-0 z-20 w-[32%] min-w-[8rem] max-w-[13rem]">
          <div className="arch-soft bg-spruce p-2 shadow-[var(--shadow-offset)]">
            <div className="rounded-t-[1.9rem] rounded-b-[0.3rem] bg-spruce-2 px-3.5 pb-4 pt-6 text-linen">
              <p className="font-display text-[1.25rem] leading-none sm:text-[1.75rem]">{kiosk.greeting}</p>
              <p className="mt-1.5 text-[0.6875rem] leading-4 text-linen/70">{kiosk.subtitle}</p>
              <div className="mt-3.5 space-y-1.5">
                {kiosk.actions.map((action, index) => (
                  <span
                    key={action}
                    className={`block truncate rounded-[0.3rem] px-2.5 py-2 text-[0.6875rem] font-semibold ${
                      index === 0 ? "bg-clay text-linen" : "border border-linen/20 text-linen/85"
                    }`}
                  >
                    {action}
                  </span>
                ))}
              </div>
              <div className="mt-4 grid place-items-center rounded-[0.4rem] border border-dashed border-linen/25 py-3 text-linen/75">
                <QrGlyph className="h-9 w-9" />
              </div>
            </div>
          </div>
          <div className="mx-auto h-10 w-2 bg-spruce" />
          <div className="mx-auto h-1.5 w-[55%] rounded-full bg-spruce" />
        </div>

        {/* Visitor badge */}
        <div className="absolute bottom-0 left-[30%] z-30 w-[12.5rem] sm:left-[36%]" style={{ rotate: "4deg" }}>
          <div className="notch raised rounded-[0.75rem] border border-spruce/10 bg-paper px-3.5 pb-3.5 pt-7 text-spruce [--notch-bg:var(--sage)]">
            <span className="rounded-[0.25rem] bg-clay px-2 py-0.5 text-[0.625rem] font-bold tracking-[0.08em] text-linen">{badge.label}</span>
            <div className="mt-2.5 flex items-end justify-between gap-2">
              <span className="min-w-0">
                <span className="block truncate font-display text-[1rem] leading-tight">{badge.name}</span>
                <span className="block truncate text-[0.6875rem] text-stone">{badge.company}</span>
                <span className="mt-1 block truncate text-[0.6875rem] font-semibold">{badge.host}</span>
              </span>
              <QrGlyph className="h-10 w-10 shrink-0 text-spruce" />
            </div>
          </div>
        </div>

        {/* Status tags */}
        <div className="absolute right-[6%] top-2 z-30">
          <span className="flex items-center gap-2 rounded-t-[1rem] rounded-b-[0.3rem] bg-spruce py-1.5 pl-1.5 pr-3.5 text-[0.75rem] font-semibold text-linen shadow-[var(--shadow-offset-sm)]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ok-light text-spruce">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {chips.checkedIn}
          </span>
        </div>
        <div className="absolute bottom-8 right-0 z-30 hidden sm:block">
          <span className="flex items-center gap-2 rounded-[0.4rem] border border-spruce/10 bg-paper py-1.5 pl-1.5 pr-3.5 text-[0.75rem] font-semibold text-spruce shadow-[var(--shadow-offset-sm)]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-clay text-linen">
              <BellRing className="h-3.5 w-3.5" />
            </span>
            {chips.hostNotified}
          </span>
        </div>
      </div>
    </div>
  );
}
