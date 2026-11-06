import type { IconName } from "@/lib/types";

/**
 * AceVisitor icon set — drawn in-house on a 24px grid, 1.6px stroke, round joins.
 * Shapes borrow from the doorway arch (door, lock shackle, message bubble) and use
 * slightly curved shafts and ticks so they read as drawn rather than stamped.
 */
const paths: Record<IconName, string> = {
  "arrow-down": "M12 4c.2 5 .3 10 .3 15M7 14l5.3 5 4.7-5",
  "arrow-left": "M20 12.4c-5-.3-10-.4-15-.4M10 7l-5 5 5 5",
  "arrow-right": "M4 12.4c5-.3 10-.4 15-.4M14 7l5 5-5 5",
  "arrow-up-right": "M6 18c3.9-4 7.8-7.8 11.5-11.5M9 6h9v9",
  audit:
    "M8 4.5H6.5A1.5 1.5 0 0 0 5 6v13.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H16M9 3h6v3H9zM8.5 13.2l2.5 2.5c1.3-2 2.8-3.7 4.5-5",
  badge:
    "M6 6h12a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 18 21H6a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 6 6ZM10 3h4v4.5h-4zM12 9.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM8.8 17.5c.6-1.4 1.8-2.2 3.2-2.2s2.6.8 3.2 2.2",
  building:
    "M4 21V5.5L12 3v18M12 8l8 2.5V21M2.5 21h19M7 8h2M7 11.5h2M7 15h2M15 13.5h2M15 17h2",
  calendar: "M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4M8 14h2M12 14h2M8 17h2",
  check: "M5 12.6l4.2 4.2C11.8 12.4 15 8.8 19.5 6",
  "chevron-down": "M6 9.5l6 5.5 6-5.5",
  clock: "M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7.5V12l3 2",
  contractor: "M3.5 18h17M5.5 18v-3a6.5 6.5 0 0 1 13 0v3M10 8.8V6.5h4v2.3M12 9.2v3.8",
  door: "M6 21V10a6 6 0 0 1 12 0v11M3.5 21h17M14.5 13.5v1.6",
  globe:
    "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5Z",
  health:
    "M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10ZM7 12.5h2.5l1.3-2 2 4 1.2-2H17",
  id: "M3.5 6.5h17v11h-17zM9 9.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM6.5 15.2c.6-1.2 1.5-1.8 2.5-1.8s1.9.6 2.5 1.8M14 10.2h3.5M14 13.2h2.5",
  key: "M8.5 15.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12.3 11.5h8.2M17.5 11.5v3M20 11.5v2",
  layers: "M12 4l8.5 4.5L12 13 3.5 8.5 12 4ZM3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5",
  lock: "M5.5 10.5h13v10h-13zM8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5V17",
  map: "M12 13.5s4.5-3.6 4.5-7a4.5 4.5 0 0 0-9 0c0 3.4 4.5 7 4.5 7ZM12 6.3h.01M7 14.5 3.5 16v4.5l5.5-2 6 2 5.5-2V14l-3-1.2",
  menu: "M4 8.5h16M4 15.5h10.5",
  message: "M4.5 18.5V10a7.5 7.5 0 0 1 15 0v1a7.5 7.5 0 0 1-7.5 7.5H4.5ZM9 10.5h6M9 13.5h3.5",
  monitor: "M3.5 5h17v11h-17zM9 20h6M12 16v4",
  school: "M12 4l9 4.5-9 4.5-9-4.5L12 4ZM6.5 10.5V15c1.6 1.6 3.4 2.3 5.5 2.3s3.9-.7 5.5-2.3v-4.5M21 8.5v5",
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.3 15.3 20 20",
  shield: "M12 3.5l7 2.6v5.4c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6.1l7-2.6ZM9 12.1l2.2 2.2c1.2-1.6 2.6-3 4.3-4.3",
  sparkles:
    "M12 3.5c.6 3.8 2.2 5.4 6 6-3.8.6-5.4 2.2-6 6-.6-3.8-2.2-5.4-6-6 3.8-.6 5.4-2.2 6-6ZM18.5 15.5c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z",
  "user-check":
    "M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM3.5 20c.6-3.4 3-5.5 6-5.5 1.3 0 2.5.4 3.5 1.1M15 18l2 2c1.2-1.7 2.5-3.2 4-4.5",
  users:
    "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M15.5 4.3a3.5 3.5 0 0 1 0 6.4M18 14.8c1.9.7 3.1 2.6 3.5 5.2",
  x: "M6.5 6.5l11 11M17.5 6.5l-11 11",
};

const sizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-7 w-7", xl: "h-10 w-10" } as const;

export function Icon({
  icon,
  className = "h-5 w-5",
  strokeWidth = 1.6,
}: {
  icon: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={paths[icon]} />
    </svg>
  );
}

export default function IconBox({
  icon,
  size = "md",
  className = "",
}: {
  icon: IconName;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center ${className}`}>
      <Icon icon={icon} className={sizes[size]} strokeWidth={size === "xl" ? 1.3 : 1.6} />
    </span>
  );
}
