"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { getGsap } from "@/components/motion/gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Point = { x: number; y: number };

/** Smooth S-curves between points, entering and leaving each one vertically. */
function buildPath(points: Point[], height: number) {
  if (points.length === 0) return "";
  const [first] = points;
  let d = `M${first.x} 0 L${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const dy = (b.y - a.y) * 0.55;
    d += ` C${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`;
  }
  const last = points[points.length - 1];
  d += ` L${last.x} ${Math.max(last.y, height - 4)}`;
  return d;
}

/**
 * Draws the visitor path through every `[data-trail-dot]` inside it, measured from
 * the real layout (so it follows the steps at any width), and draws the line as the
 * section scrolls into view — the page's single scroll-linked moment. Without JS or
 * with reduced motion, the line is simply shown complete.
 */
export default function JourneyTrail({
  children,
  className = "",
  strokeClassName = "stroke-clay-light",
}: {
  children: ReactNode;
  className?: string;
  strokeClassName?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [geometry, setGeometry] = useState({ d: "", width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const box = root.getBoundingClientRect();
      const points = Array.from(root.querySelectorAll<HTMLElement>("[data-trail-dot]")).map((dot) => {
        const rect = dot.getBoundingClientRect();
        return { x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top };
      });
      setGeometry({ d: buildPath(points, box.height), width: box.width, height: box.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path || !geometry.d) return;

    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        path,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 75%", scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  }, [geometry.d]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${Math.max(geometry.width, 1)} ${Math.max(geometry.height, 1)}`}
        preserveAspectRatio="none"
      >
        {geometry.d ? (
          <path
            ref={pathRef}
            d={geometry.d}
            pathLength={1}
            fill="none"
            className={strokeClassName}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        ) : null}
      </svg>
      {children}
    </div>
  );
}
