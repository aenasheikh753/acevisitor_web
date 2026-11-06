import { Check, Clock, FileCheck, MapPin, User } from "lucide-react";
import { QrGlyph } from "@/components/visuals/shared";
import type { HeroVisualContent, HeroVisualStatus } from "@/lib/types";

const statusStyles: Record<HeroVisualStatus, string> = {
  approved: "bg-ok/12 text-ok",
  "checked-in": "bg-spruce text-linen",
  expected: "bg-wait/12 text-wait",
};

const trendStyles = {
  up: "text-ok",
  down: "text-clay",
  flat: "text-stone",
} as const;

/**
 * Hero composition: a Brick Clay doorway (the arch opens on load) with the
 * site-overview console stepping out of it, a visitor badge hanging on a brass
 * lanyard, and a host-approval card. Decorative; described for screen readers.
 */
export default function HeroVisual({ content }: { content: HeroVisualContent }) {
  const peak = Math.max(...content.chartBars);
  const { badge, arrival } = content;

  return (
    <div className="relative mx-auto w-full max-w-[36rem] lg:max-w-none">
      <p className="sr-only">{content.srDescription}</p>

      <div aria-hidden="true" className="relative select-none pb-24 sm:pb-28 lg:pb-20">
        {/* The doorway */}
        <div className="anim-arch-open arch absolute bottom-0 right-0 top-0 w-[82%] bg-clay sm:w-[78%]">
          <div className="arch absolute inset-x-[9%] bottom-0 top-[6%] border border-linen/30" />
          <span className="absolute bottom-[38%] left-[14%] h-10 w-1.5 rounded-full bg-clay-light" />
        </div>

        {/* Console */}
        <div className="relative z-10 pt-[30%] sm:pt-[26%]">
          <div
            className="anim-settle mock-window w-[94%] overflow-hidden rounded-[0.75rem] sm:w-[88%]"
            style={{ ["--settle-delay" as string]: "700ms" }}
          >
            <div className="flex items-center gap-3 border-b border-spruce/10 px-4 py-3">
              <span className="min-w-0 truncate text-[0.8125rem] font-semibold">{content.windowTitle}</span>
              <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 text-[0.75rem] font-semibold text-ok">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-ok motion-safe:animate-hero-pulse" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-ok" />
                </span>
                {content.liveLabel}
              </span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-spruce/10 border-b border-spruce/10">
              {content.stats.map((stat) => (
                <div key={stat.label} className="px-3 py-3 sm:px-4">
                  <p className="truncate text-[0.6875rem] text-stone">{stat.label}</p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-[1.75rem] leading-none tracking-tight sm:text-[2.1rem]">{stat.value}</span>
                    <span className={`text-[0.6875rem] font-semibold ${trendStyles[stat.trendDirection]}`}>{stat.trend}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="px-4 pb-2 pt-3">
              <div className="flex items-center justify-between text-[0.6875rem]">
                <span className="font-semibold">{content.chartTitle}</span>
                <span className="text-stone">{content.chartCaption}</span>
              </div>
              <div className="mt-2.5 flex h-16 items-end gap-1 border-b border-spruce/15 sm:h-20 sm:gap-1.5">
                {content.chartBars.map((value, index) => (
                  <span
                    key={index}
                    className={`${value === peak ? "bg-clay" : "bg-sage"} block flex-1 origin-bottom rounded-t-full motion-safe:animate-hero-bar`}
                    style={{ height: `${value}%`, animationDelay: `${900 + index * 50}ms` }}
                  />
                ))}
              </div>
            </div>

            <ul className="px-2 pb-2">
              <li className="px-2 pb-1 pt-2 font-display text-[0.8125rem] italic text-stone">{content.visitorsTitle}</li>
              {content.visitors.map((visitor) => (
                <li key={visitor.name} className="flex items-center gap-3 rounded-[0.4rem] px-2 py-1.5 even:bg-linen">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage font-display text-[0.6875rem] text-spruce">
                    {visitor.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.8125rem] font-semibold">{visitor.name}</span>
                    <span className="block truncate text-[0.6875rem] text-stone">{visitor.detail}</span>
                  </span>
                  <span className={`shrink-0 rounded-[0.3rem] px-2 py-0.5 text-[0.6875rem] font-semibold ${statusStyles[visitor.status]}`}>
                    {visitor.statusLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Toast */}
        <div className="anim-settle absolute right-[4%] top-[17%] z-20 hidden sm:block" style={{ ["--settle-delay" as string]: "1300ms" }}>
          <div className="flex items-center gap-2 rounded-t-[1rem] rounded-b-[0.3rem] border border-linen/15 bg-spruce-2 py-2 pl-2 pr-4 text-[0.8125rem] font-semibold text-linen shadow-[var(--shadow-offset-sm)]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ok-light text-spruce">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {content.toast}
          </div>
        </div>

        {/* Visitor badge on a brass lanyard */}
        <div
          className="anim-settle absolute bottom-0 left-[2%] z-30 w-[13rem] sm:left-[-3%]"
          style={{ ["--settle-delay" as string]: "1050ms", rotate: "-5deg" }}
        >
          <span className="absolute -top-16 left-1/2 h-16 w-px -translate-x-1/2 bg-clay-light" />
          <div className="notch raised rounded-[0.75rem] border border-spruce/10 bg-paper px-4 pb-4 pt-7 text-spruce [--notch-bg:var(--spruce)]">
            <div className="flex items-center justify-between">
              <span className="rounded-[0.25rem] bg-clay px-2 py-0.5 text-[0.625rem] font-bold tracking-[0.08em] text-linen">{badge.label}</span>
              <span className="text-[0.625rem] font-semibold text-stone">{badge.badgeId}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="arch-soft grid h-11 w-10 shrink-0 place-items-center bg-sage text-spruce/60">
                <User className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-[1.0625rem] leading-tight">{badge.name}</span>
                <span className="block truncate text-[0.6875rem] text-stone">{badge.company}</span>
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-3 border-t border-dashed border-spruce/20 pt-3">
              <span className="min-w-0 text-[0.625rem] leading-4 text-stone">
                <span className="block truncate font-semibold text-spruce">{badge.host}</span>
                <span className="block truncate">{badge.valid}</span>
              </span>
              <QrGlyph className="h-11 w-11 shrink-0 text-spruce" />
            </div>
          </div>
        </div>

        {/* Host approval */}
        <div
          className="anim-settle absolute bottom-[-2%] right-0 z-20 hidden w-[14.5rem] md:block"
          style={{ ["--settle-delay" as string]: "1200ms" }}
        >
          <div className="rounded-[0.75rem] border border-linen/15 bg-spruce-2 p-4 text-linen shadow-[var(--shadow-offset-dark)]">
            <p className="font-display text-[0.8125rem] italic text-clay-light">{arrival.label}</p>
            <div className="mt-2 flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-spruce-3 text-linen/80">
                <User className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.875rem] font-semibold leading-tight">{arrival.name}</span>
                <span className="block truncate text-[0.6875rem] text-linen/65">{arrival.company}</span>
              </span>
            </div>
            <ul className="mt-3 space-y-1 text-[0.6875rem] text-linen/75">
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-linen/50" />
                <span className="truncate">{arrival.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0 text-linen/50" />
                <span className="truncate">{arrival.timing}</span>
              </li>
              <li className="flex items-center gap-2 text-ok-light">
                <FileCheck className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{arrival.ndaLabel}</span>
              </li>
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[0.75rem] font-semibold">
              <span className="rounded-t-[0.8rem] rounded-b-[0.25rem] bg-clay py-1.5 text-linen">{arrival.approveLabel}</span>
              <span className="rounded-t-[0.8rem] rounded-b-[0.25rem] border border-linen/25 py-1.5 text-linen/80">{arrival.declineLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
