import { Check, FileCheck2, Lock } from "lucide-react";
import { ShieldGlyph, toneDotStyles } from "@/components/visuals/shared";
import type { SecurityVisualContent } from "@/lib/types";

/** Code-made security panel: roles, separated workspaces, and an audit timeline. */
export default function SecurityVisual({ content }: { content: SecurityVisualContent }) {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <p className="sr-only">{content.srDescription}</p>

      <div aria-hidden="true" className="relative select-none pt-6">
        <div className="visual-glow pointer-events-none absolute -inset-8" />

        <div data-parallax="0.5" className="hero-window relative z-10 overflow-hidden rounded-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-copy/8 px-4 py-3.5 sm:px-5">
            <span className="relative grid h-11 w-10 shrink-0 place-items-center">
              <span className="absolute inset-0 rounded-full bg-cyan/30 blur-xl" />
              <ShieldGlyph className="relative h-10 w-9" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-heading text-sm font-semibold text-copy">{content.title}</span>
              <span className="block truncate text-[11px] text-muted">{content.subtitle}</span>
            </span>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-positive/25 bg-positive/10 px-2.5 py-1 text-[10px] font-semibold text-positive">
              <Check className="h-3 w-3" strokeWidth={3} />
              {content.mfaLabel}
            </span>
          </div>

          <div className="space-y-3 p-3.5 sm:p-4">
            {/* Roles */}
            <div className="hero-tile rounded-xl p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{content.rolesTitle}</p>
              <ul className="space-y-1.5">
                {content.roles.map((role) => (
                  <li key={role.label} className="flex items-center gap-2.5 rounded-lg bg-copy/[0.03] px-2.5 py-2">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-copy">{role.label}</span>
                      <span className="block truncate text-[10px] text-muted">{role.access}</span>
                    </span>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                        role.granted ? "bg-positive/15 text-positive" : "bg-copy/8 text-muted"
                      }`}
                    >
                      {role.granted ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Lock className="h-3 w-3" />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Workspaces */}
            <div className="hero-tile rounded-xl p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{content.workspacesTitle}</p>
              <div className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate rounded-lg border border-cyan/20 bg-cyan/8 px-2.5 py-2 text-center text-[11px] font-semibold text-copy">
                  {content.workspaces[0]}
                </span>
                <span className="flex shrink-0 flex-col items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted">
                  <Lock className="h-3 w-3 text-cyan" />
                  {content.isolationLabel}
                </span>
                <span className="min-w-0 flex-1 truncate rounded-lg border border-copy/12 bg-copy/[0.04] px-2.5 py-2 text-center text-[11px] font-semibold text-copy">
                  {content.workspaces[1]}
                </span>
              </div>
            </div>

            {/* Audit timeline */}
            <div className="hero-tile rounded-xl p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{content.auditTitle}</p>
              <div className="relative">
              <i className="absolute bottom-1.5 left-[3px] top-1.5 w-px bg-copy/12" />
              <ol className="space-y-2.5 pl-4">
                {content.audit.map((entry) => (
                  <li key={entry.time + entry.event} className="relative flex items-baseline gap-2 text-[11px]">
                    <i className={`absolute -left-4 top-1 h-[7px] w-[7px] rounded-full ring-2 ring-panel ${toneDotStyles[entry.tone]}`} />
                    <span className="shrink-0 tabular-nums text-muted">{entry.time}</span>
                    <span className="shrink-0 font-semibold text-copy">{entry.actor}</span>
                    <span className="min-w-0 truncate text-copy/70">{entry.event}</span>
                  </li>
                ))}
              </ol>
              </div>
            </div>
          </div>
        </div>

        <div data-parallax="1.6" className="absolute -top-1 right-2 z-20 sm:right-4">
          <span className="flex items-center gap-2 rounded-full bg-mist py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-slate-ink shadow-float ring-1 ring-slate-ink/8 motion-safe:animate-hero-float-c">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-positive text-ink">
              <FileCheck2 className="h-3.5 w-3.5" />
            </span>
            {content.chip}
          </span>
        </div>
      </div>
    </div>
  );
}
