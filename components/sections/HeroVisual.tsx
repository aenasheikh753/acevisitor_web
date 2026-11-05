import { Check, Clock, FileCheck, MapPin, Minus, TrendingDown, TrendingUp, User } from "lucide-react";
import type { HeroVisualContent, HeroVisualStat, HeroVisualStatus } from "@/lib/types";

const statusStyles: Record<HeroVisualStatus, string> = {
  approved: "border-positive/25 bg-positive/12 text-positive",
  "checked-in": "border-cyan/25 bg-cyan/12 text-cyan",
  expected: "border-caution/25 bg-caution/12 text-caution",
};

const trendStyles: Record<HeroVisualStat["trendDirection"], string> = {
  up: "bg-positive/12 text-positive",
  down: "bg-cyan/12 text-cyan",
  flat: "bg-copy/8 text-muted",
};

const trendIcons = { up: TrendingUp, down: TrendingDown, flat: Minus } as const;

/** Builds a deterministic, QR-style module path (decorative only). */
function buildQrPath(size = 21) {
  const finder = (x: number, y: number) =>
    `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`;
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);

  let seed = 1337;
  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  let modules = "";
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (inFinder(x, y)) continue;
      const timing = (x === 6 || y === 6) && (x + y) % 2 === 0;
      if (timing || random() > 0.52) modules += `M${x} ${y}h1v1h-1z`;
    }
  }
  return finder(0, 0) + finder(size - 7, 0) + finder(0, size - 7) + modules;
}

const qrPath = buildQrPath();

function QrCode({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-1 -1 23 23" className={className} shapeRendering="crispEdges" fill="currentColor" fillRule="evenodd">
      <path d={qrPath} />
    </svg>
  );
}

export default function HeroVisual({ content }: { content: HeroVisualContent }) {
  const peak = Math.max(...content.chartBars);
  const { badge, arrival } = content;

  return (
    <div className="relative mx-auto w-full max-w-[34rem] md:max-w-[40rem] lg:max-w-none">
      <p className="sr-only">{content.srDescription}</p>

      <div aria-hidden="true" className="relative select-none md:pb-40 md:pl-8 md:pr-12 md:pt-10 lg:pl-4 lg:pr-10 xl:pl-8 xl:pr-14">
        {/* Background glows and grid */}
        <div className="hero-visual-glow pointer-events-none absolute -inset-12" />
        <div className="hero-visual-grid pointer-events-none absolute -inset-8" />

        {/* Main dashboard window */}
        <div className="hero-window relative z-10 overflow-hidden rounded-2xl">
          <div className="flex items-center gap-3 border-b border-copy/8 px-4 py-3.5 sm:px-5">
            <span className="flex shrink-0 gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-copy/15" />
              <i className="h-2.5 w-2.5 rounded-full bg-copy/15" />
              <i className="h-2.5 w-2.5 rounded-full bg-copy/15" />
            </span>
            <span className="min-w-0 truncate text-[13px] font-semibold text-copy/90">{content.windowTitle}</span>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-positive/25 bg-positive/10 px-2.5 py-1 text-[11px] font-semibold text-positive">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-positive motion-safe:animate-hero-pulse" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-positive" />
              </span>
              {content.liveLabel}
            </span>
          </div>

          <div className="space-y-3 p-3.5 sm:p-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {content.stats.map((stat) => {
                const TrendIcon = trendIcons[stat.trendDirection];
                return (
                  <div key={stat.label} className="hero-tile rounded-xl p-3">
                    <p className="truncate text-[11px] font-medium text-muted">{stat.label}</p>
                    <div className="mt-2 flex flex-wrap items-end justify-between gap-1">
                      <span className="font-heading text-2xl font-semibold leading-none tracking-tight text-copy sm:text-[1.75rem]">
                        {stat.value}
                      </span>
                      <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${trendStyles[stat.trendDirection]}`}>
                        <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart */}
            <div className="hero-tile rounded-xl p-3.5 sm:p-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-copy/85">{content.chartTitle}</span>
                <span className="text-muted">{content.chartCaption}</span>
              </div>
              <div className="relative mt-3 h-20 sm:h-24">
                <div className="absolute inset-0 flex flex-col justify-between">
                  <i className="block border-t border-dashed border-copy/8" />
                  <i className="block border-t border-dashed border-copy/8" />
                  <i className="block border-t border-copy/10" />
                </div>
                <div className="relative flex h-full items-end gap-1.5 sm:gap-2">
                  {content.chartBars.map((value, index) => (
                    <span
                      key={index}
                      className={`${value === peak ? "hero-bar-peak" : "hero-bar"} block flex-1 origin-bottom rounded-t-[5px] rounded-b-[2px] motion-safe:animate-hero-bar`}
                      style={{ height: `${value}%`, animationDelay: `${150 + index * 60}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Visitors */}
            <div>
              <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{content.visitorsTitle}</p>
              <ul className="space-y-1.5">
                {content.visitors.map((visitor) => (
                  <li key={visitor.name} className="hero-tile flex items-center gap-3 rounded-xl px-3 py-2">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan/15 font-heading text-[11px] font-bold text-cyan">
                      {visitor.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-copy">{visitor.name}</span>
                      <span className="block truncate text-[11px] text-muted">{visitor.detail}</span>
                    </span>
                    <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[visitor.status]}`}>
                      {visitor.statusLabel}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className="absolute right-0 top-0 z-30 hidden md:block xl:right-2">
          <div className="relative flex items-center gap-2.5 overflow-hidden rounded-full bg-mist py-2 pl-2 pr-4 text-sm font-semibold text-slate-ink shadow-float motion-safe:animate-hero-float-c">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-positive text-ink">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            {content.toast}
            <span className="hero-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-0 motion-safe:animate-hero-shimmer motion-safe:opacity-100" />
          </div>
        </div>

        {/* Visitor badge */}
        <div className="relative z-20 -mt-12 ml-4 w-fit md:absolute md:bottom-9 md:left-0 md:mt-0 md:ml-0">
          <div className="w-[13rem] rounded-2xl bg-mist p-4 text-slate-ink shadow-float ring-1 ring-slate-ink/5 motion-safe:animate-hero-float-a sm:w-[13.5rem]">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-mist">{badge.label}</span>
              <span className="text-[10px] font-semibold text-slate-ink/50">{badge.badgeId}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-ink/8 text-slate-ink/45">
                <User className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-heading text-[15px] font-semibold leading-tight">{badge.name}</span>
                <span className="block truncate text-[11px] text-slate-ink/60">{badge.company}</span>
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-3 border-t border-slate-ink/10 pt-3">
              <span className="min-w-0 text-[10px] leading-4 text-slate-ink/65">
                <span className="block truncate font-semibold text-slate-ink/80">{badge.host}</span>
                <span className="block truncate">{badge.valid}</span>
              </span>
              <QrCode className="h-12 w-12 shrink-0 text-ink" />
            </div>
          </div>
        </div>

        {/* Visitor arrival approval */}
        <div className="absolute bottom-0 right-0 z-20 hidden md:block">
          <div className="w-[14.5rem] rounded-2xl bg-mist p-4 text-slate-ink shadow-float ring-1 ring-slate-ink/5 motion-safe:animate-hero-float-b xl:w-[15.5rem]">
            <i className="mx-auto mb-3 block h-1 w-8 rounded-full bg-slate-ink/15" />
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-ink/50">{arrival.label}</p>
            <div className="mt-2.5 flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cyan/25 text-ink">
                <User className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold leading-tight">{arrival.name}</span>
                <span className="block truncate text-[11px] text-slate-ink/60">{arrival.company}</span>
              </span>
            </div>
            <ul className="mt-3 space-y-1.5 text-[11px] text-slate-ink/70">
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-ink/45" />
                <span className="truncate">{arrival.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0 text-slate-ink/45" />
                <span className="truncate">{arrival.timing}</span>
              </li>
            </ul>
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-positive/20 px-2.5 py-1 text-[10px] font-semibold text-slate-ink">
              <FileCheck className="h-3 w-3" />
              {arrival.ndaLabel}
            </span>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs font-semibold">
              <span className="rounded-lg bg-ink py-2 text-mist">{arrival.approveLabel}</span>
              <span className="rounded-lg border border-slate-ink/15 py-2 text-slate-ink/80">{arrival.declineLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
