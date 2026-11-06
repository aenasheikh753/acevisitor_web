import { Check, FileCheck2, Lock } from "lucide-react";
import { ShieldGlyph, toneDotStyles } from "@/components/visuals/shared";
import type { SecurityVisualContent } from "@/lib/types";

function PanelLabel({ children }: { children: string }) {
  return <p className="mb-2.5 font-display text-[0.875rem] italic text-clay-light">{children}</p>;
}

/** Code-made security panel on spruce: roles, separated workspaces, and an audit timeline. */
export default function SecurityVisual({ content }: { content: SecurityVisualContent }) {
  return (
    <div className="relative mx-auto w-full max-w-[36rem]">
      <p className="sr-only">{content.srDescription}</p>

      <div aria-hidden="true" className="relative select-none pt-6">
        <div className="relative z-10 overflow-hidden rounded-[0.75rem] border border-linen/15 bg-spruce-2 text-linen shadow-[var(--shadow-offset-dark)]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-linen/10 px-4 py-3.5 sm:px-5">
            <ShieldGlyph className="h-9 w-8 shrink-0" />
            <span className="min-w-0">
              <span className="block truncate font-display text-[1.0625rem]">{content.title}</span>
              <span className="block truncate text-[0.6875rem] text-linen/65">{content.subtitle}</span>
            </span>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-[0.3rem] bg-ok-light/15 px-2 py-1 text-[0.6875rem] font-semibold text-ok-light">
              <Check className="h-3 w-3" strokeWidth={3} />
              {content.mfaLabel}
            </span>
          </div>

          <div className="divide-y divide-linen/10">
            {/* Roles */}
            <div className="px-4 py-4 sm:px-5">
              <PanelLabel>{content.rolesTitle}</PanelLabel>
              <ul className="space-y-1">
                {content.roles.map((role) => (
                  <li key={role.label} className="flex items-center gap-2.5 rounded-[0.4rem] px-2 py-1.5 odd:bg-linen/[0.04]">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.8125rem] font-semibold">{role.label}</span>
                      <span className="block truncate text-[0.6875rem] text-linen/65">{role.access}</span>
                    </span>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                        role.granted ? "bg-ok-light/20 text-ok-light" : "bg-linen/10 text-linen/60"
                      }`}
                    >
                      {role.granted ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Lock className="h-3 w-3" />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Workspaces: two doorways with a wall between */}
            <div className="px-4 py-4 sm:px-5">
              <PanelLabel>{content.workspacesTitle}</PanelLabel>
              <div className="flex items-end gap-3">
                <span className="arch-soft min-w-0 flex-1 truncate bg-clay px-2.5 pb-2 pt-5 text-center text-[0.75rem] font-semibold text-linen">
                  {content.workspaces[0]}
                </span>
                <span className="flex shrink-0 flex-col items-center gap-1 text-[0.625rem] font-semibold text-linen/65">
                  <Lock className="h-3.5 w-3.5 text-clay-light" />
                  {content.isolationLabel}
                </span>
                <span className="arch-soft min-w-0 flex-1 truncate border border-linen/25 px-2.5 pb-2 pt-5 text-center text-[0.75rem] font-semibold">
                  {content.workspaces[1]}
                </span>
              </div>
            </div>

            {/* Audit timeline */}
            <div className="px-4 py-4 sm:px-5">
              <PanelLabel>{content.auditTitle}</PanelLabel>
              <div className="relative">
                <i className="absolute bottom-1.5 left-[3px] top-1.5 w-px bg-linen/15" />
                <ol className="space-y-2.5 pl-4">
                  {content.audit.map((entry) => (
                    <li key={entry.time + entry.event} className="relative flex items-baseline gap-2 text-[0.75rem]">
                      <i className={`absolute -left-4 top-1 h-[7px] w-[7px] rounded-full ${toneDotStyles[entry.tone]}`} />
                      <span className="shrink-0 tabular-nums text-linen/60">{entry.time}</span>
                      <span className="shrink-0 font-semibold">{entry.actor}</span>
                      <span className="min-w-0 truncate text-linen/75">{entry.event}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-1 right-3 z-20 sm:right-5" style={{ rotate: "3deg" }}>
          <span className="flex items-center gap-2 rounded-[0.4rem] bg-paper py-1.5 pl-1.5 pr-3.5 text-[0.75rem] font-semibold text-spruce shadow-[var(--shadow-offset-dark)]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-clay text-linen">
              <FileCheck2 className="h-3.5 w-3.5" />
            </span>
            {content.chip}
          </span>
        </div>
      </div>
    </div>
  );
}
