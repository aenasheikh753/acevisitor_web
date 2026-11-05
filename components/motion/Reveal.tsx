"use client";

import { useRef, type ReactNode } from "react";
import { useScrollReveal } from "@/components/motion/useScrollReveal";

/**
 * Client boundary that runs scroll animations for its server-rendered children.
 * Mark descendants with data-reveal / data-reveal-stagger / data-parallax / data-count-to.
 */
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
