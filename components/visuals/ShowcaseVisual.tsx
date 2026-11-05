import { BellRing, Check } from "lucide-react";
import { QrGlyph, statusChipStyles } from "@/components/visuals/shared";
import type { ShowcaseVisualContent } from "@/lib/types";

/** Code-made composition: kiosk + front-desk console + badge, with floating status chips. */
export default function ShowcaseVisual({ content }: { content: ShowcaseVisualContent }) {
  const { kiosk, console: deskConsole, badge, chips } = content;

  return (
    <div className="relative mx-auto w-full max-w-[36rem]">
      <p className="sr-only">{content.srDescription}</p>

      <div aria-hidden="true" className="relative select-none pb-28 pt-16 sm:pb-24">
        <div className="visual-glow pointer-events-none absolute -inset-10" />
        <div className="hero-visual-grid pointer-events-none absolute -inset-6" />

        {/* Front desk console */}
        <div data-parallax="0.5" className="relative z-10 ml-auto w-[68%]">
          <div className="hero-window overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2.5 border-b border-copy/8 px-3.5 py-3">
              <span className="flex shrink-0 gap-1">
                <i className="h-2 w-2 rounded-full bg-copy/15" />
                <i className="h-2 w-2 rounded-full bg-copy/15" />
                <i className="h-2 w-2 rounded-full bg-copy/15" />
              </span>
              <span className="min-w-0 truncate text-xs font-semibold text-copy/90">{deskConsole.title}</span>
              <span className="ml-auto hidden shrink-0 rounded-full bg-cyan/12 px-2 py-0.5 text-[10px] font-semibold text-cyan sm:inline">
                {deskConsole.caption}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 px-2.5 pt-2.5 sm:px-3 sm:pt-3">
              {deskConsole.stats.map((stat) => (
                <div key={stat.label} className="hero-tile rounded-xl px-2.5 py-2">
                  <span className="block truncate text-[10px] text-muted">{stat.label}</span>
                  <span className="mt-0.5 block font-heading text-lg font-semibold leading-tight text-copy">{stat.value}</span>
                </div>
              ))}
            </div>
            <ul className="space-y-1.5 p-2.5 sm:p-3">
              {deskConsole.rows.map((row) => (
                <li key={row.name} className="hero-tile flex items-center gap-2.5 rounded-xl px-2.5 py-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan/15 font-heading text-[10px] font-bold text-cyan">
                    {row.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-copy">{row.name}</span>
                    <span className="hidden truncate text-[10px] text-muted sm:block">{row.host}</span>
                  </span>
                  <span className="hidden shrink-0 text-[10px] tabular-nums text-muted md:inline">{row.time}</span>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold sm:text-[10px] ${statusChipStyles[row.status]}`}>
                    {row.statusLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Self-service kiosk */}
        <div data-parallax="1.1" className="absolute left-0 top-0 z-20 w-[36%] min-w-[7.5rem] max-w-[13rem]">
          <div className="motion-safe:animate-hero-float-a">
            <div className="rounded-[1.35rem] border border-copy/12 bg-panel-raised p-1.5 shadow-float">
              <div className="rounded-[1rem] bg-ink px-3.5 pb-4 pt-3.5">
                <div className="flex items-center gap-1.5">
                  <i className="h-1.5 w-1.5 rounded-full bg-positive" />
                  <i className="h-1 w-8 rounded-full bg-copy/15" />
                </div>
                <p className="mt-5 font-heading text-base font-semibold leading-none text-copy sm:text-2xl">{kiosk.greeting}</p>
                <p className="mt-1.5 text-[10px] leading-4 text-muted">{kiosk.subtitle}</p>
                <div className="mt-3.5 space-y-1.5">
                  {kiosk.actions.map((action, index) => (
                    <span
                      key={action}
                      className={`block truncate rounded-lg px-2.5 py-2.5 text-[10px] font-semibold ${
                        index === 0 ? "bg-cyan text-ink" : "border border-copy/12 text-copy/80"
                      }`}
                    >
                      {action}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-copy/12 py-3 text-copy/70">
                  <QrGlyph className="h-9 w-9" />
                </div>
              </div>
            </div>
            <div className="mx-auto h-8 w-[22%] bg-gradient-to-b from-panel-raised to-panel" />
            <div className="mx-auto h-2 w-[60%] rounded-full bg-panel-raised shadow-float" />
          </div>
        </div>

        {/* Visitor badge */}
        <div data-parallax="1.4" className="absolute bottom-0 left-[40%] z-30 w-[10.5rem] sm:left-[44%]">
          <div className="rounded-2xl bg-mist p-3.5 text-slate-ink shadow-float ring-1 ring-slate-ink/5 motion-safe:animate-hero-float-b">
            <span className="rounded-full bg-ink px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-mist">{badge.label}</span>
            <div className="mt-2.5 flex items-end justify-between gap-2">
              <span className="min-w-0">
                <span className="block truncate font-heading text-sm font-semibold leading-tight">{badge.name}</span>
                <span className="block truncate text-[10px] text-slate-ink/60">{badge.company}</span>
                <span className="mt-1 block truncate text-[10px] font-semibold text-slate-ink/75">{badge.host}</span>
              </span>
              <QrGlyph className="h-10 w-10 shrink-0 text-ink" />
            </div>
          </div>
        </div>

        {/* Floating chips */}
        <div data-parallax="1.8" className="absolute right-0 top-1 z-30">
          <span className="flex items-center gap-2 rounded-full bg-mist py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-slate-ink shadow-float motion-safe:animate-hero-float-c">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-positive text-ink">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {chips.checkedIn}
          </span>
        </div>
        <div data-parallax="-0.8" className="absolute bottom-10 right-0 z-30 hidden sm:block">
          <span className="glass-card flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-copy motion-safe:animate-hero-float-a">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-cyan/20 text-cyan">
              <BellRing className="h-3.5 w-3.5" />
            </span>
            {chips.hostNotified}
          </span>
        </div>
      </div>
    </div>
  );
}
