/**
 * The visitor path — a single hand-drawn clay line, like a guest's route through
 * a building, that wanders between elements. Purely decorative.
 *
 * `pathLength={1}` lets a scroll animation draw it via stroke-dashoffset (1 → 0).
 */
const variants = {
  /** Hero: sweeps in from the left, loops once, and runs into the doorway. */
  hero: {
    viewBox: "0 0 600 220",
    d: "M2 168c58-6 104-38 160-36 50 2 64 44 108 44 52 0 52-70 18-82-38-13-58 40-18 62 46 26 116-10 172-42 44-25 86-46 156-48",
    end: { cx: 598, cy: 66 },
  },
  /** Footer: a long low line ending at a door. */
  footer: {
    viewBox: "0 0 1200 120",
    d: "M0 86c120-4 210-38 330-36 110 2 150 40 260 40 90 0 110-58 66-68-42-10-56 46-6 60 70 20 190-24 320-30 98-4 160 10 230 14",
    end: { cx: 1200, cy: 74 },
  },
} as const;

export default function VisitorPath({
  variant = "hero",
  className = "",
  strokeClassName = "stroke-clay",
  draw = false,
}: {
  variant?: keyof typeof variants;
  className?: string;
  strokeClassName?: string;
  /** Prepare for a scroll-drawn reveal (the motion hook sets the offset). */
  draw?: boolean;
}) {
  const { viewBox, d, end } = variants[variant];

  return (
    <svg viewBox={viewBox} fill="none" aria-hidden="true" focusable="false" className={className} preserveAspectRatio="none">
      <path
        d={d}
        pathLength={1}
        className={strokeClassName}
        strokeWidth={1.75}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        data-path-draw={draw ? "" : undefined}
      />
      <circle cx={end.cx} cy={end.cy} r={4} className={strokeClassName.replace("stroke-", "fill-")} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
