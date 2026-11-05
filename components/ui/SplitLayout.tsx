import type { CSSProperties, ReactNode } from "react";

type SplitLayoutProps = {
  /** First column in reading order (stacks on top below lg). */
  start: ReactNode;
  /** Second column in reading order. */
  end: ReactNode;
  /** Visually swap the columns from lg up without changing reading order. */
  reverse?: boolean;
  /** CSS grid-template-columns used from lg up, e.g. "0.9fr 1.1fr". Defaults to two equal columns. */
  columns?: string;
  /** Column gap from lg up (any CSS length). */
  gap?: string;
  className?: string;
};

/**
 * Shared two-column layout. Columns stack below lg and are vertically
 * centred against each other from lg up, so the shorter side never sits
 * stuck at the top. Uses the `.split-grid` utility from globals.css.
 */
export default function SplitLayout({ start, end, reverse = false, columns, gap, className = "" }: SplitLayoutProps) {
  const style = {
    ...(columns ? { "--split-cols": columns } : {}),
    ...(gap ? { "--split-gap": gap } : {}),
  } as CSSProperties;

  return (
    <div className={`split-grid ${className}`} data-reverse={reverse ? "true" : undefined} style={style}>
      <div>{start}</div>
      <div>{end}</div>
    </div>
  );
}
