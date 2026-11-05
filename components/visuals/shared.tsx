import type { HeroVisualStatus, VisualTone } from "@/lib/types";

/** Chip styles for visitor statuses (dark surfaces). */
export const statusChipStyles: Record<HeroVisualStatus, string> = {
  approved: "border-positive/25 bg-positive/12 text-positive",
  "checked-in": "border-cyan/25 bg-cyan/12 text-cyan",
  expected: "border-caution/25 bg-caution/12 text-caution",
};

/** Dot colours for generic tones. */
export const toneDotStyles: Record<VisualTone, string> = {
  positive: "bg-positive",
  primary: "bg-cyan",
  warning: "bg-caution",
};

/** Deterministic QR-style module path (decorative only). */
function buildQrPath(seedValue: number, size = 21) {
  const finder = (x: number, y: number) =>
    `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`;
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);

  let seed = seedValue;
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

const qrPath = buildQrPath(4242);

export function QrGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-1 -1 23 23" className={className} shapeRendering="crispEdges" fill="currentColor" fillRule="evenodd">
      <path d={qrPath} />
    </svg>
  );
}

/** Glowing shield mark used in the security panel. */
export function ShieldGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} fill="none">
      <path
        d="M24 3 6 10v14c0 13 7.7 23.6 18 29 10.3-5.4 18-16 18-29V10L24 3Z"
        className="fill-cyan/15 stroke-cyan"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m16 28 6 6 11-12" className="stroke-cyan" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
