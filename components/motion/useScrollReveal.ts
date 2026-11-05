"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { getGsap } from "@/components/motion/gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DESKTOP = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
/** Inline props GSAP leaves behind; cleared after a reveal so CSS hover transforms keep working. */
const REVEAL_CLEAR_PROPS = "transform,translate,rotate,scale,opacity,visibility";
const MOBILE = "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)";

/**
 * Scroll-driven motion for everything inside `ref`, declared with data attributes:
 *
 * - `data-reveal="left" | "right" | "up"`: fade + slide in when entering the viewport
 *   (left/right use an x offset on md+ only; on mobile they fall back to a small y offset).
 * - `data-reveal-stagger`: the element's direct children fade up one after another.
 * - `data-parallax="<speed>"`: gentle scroll-linked y drift (md+ only); negative speeds drift the other way.
 * - `data-count-to="<number>"` (+ optional `data-count-decimals`, `data-count-prefix`, `data-count-suffix`):
 *   the text counts up from zero when visible.
 *
 * Nothing is hidden until this hook runs, so content stays visible without JS, and every
 * animation is skipped under `prefers-reduced-motion: reduce`. All tweens and ScrollTriggers
 * are reverted on unmount.
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add({ desktop: DESKTOP, mobile: MOBILE }, (context) => {
      const isDesktop = Boolean(context.conditions?.desktop);
      const select = <T extends HTMLElement>(selector: string) =>
        Array.from(root.querySelectorAll<T>(selector));

      select("[data-reveal]").forEach((element) => {
        const direction = element.dataset.reveal;
        const offset =
          isDesktop && direction === "left"
            ? { x: -40 }
            : isDesktop && direction === "right"
              ? { x: 40 }
              : { y: 24 };

        gsap.from(element, {
          ...offset,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 85%", once: true },
          clearProps: REVEAL_CLEAR_PROPS,
        });
      });

      select("[data-reveal-stagger]").forEach((group) => {
        gsap.from(Array.from(group.children), {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
          clearProps: REVEAL_CLEAR_PROPS,
        });
      });

      if (isDesktop) {
        select("[data-parallax]").forEach((element) => {
          const speed = Number.parseFloat(element.dataset.parallax ?? "1") || 1;
          gsap.fromTo(
            element,
            { y: 16 * speed },
            {
              y: -16 * speed,
              ease: "none",
              scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      }

      const restoreCounters: Array<() => void> = [];
      select("[data-count-to]").forEach((element) => {
        const target = Number.parseFloat(element.dataset.countTo ?? "");
        if (!Number.isFinite(target)) return;

        const decimals = Number.parseInt(element.dataset.countDecimals ?? "0", 10) || 0;
        const prefix = element.dataset.countPrefix ?? "";
        const suffix = element.dataset.countSuffix ?? "";
        const finalText = element.textContent ?? "";
        const format = (value: number) =>
          `${prefix}${value.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`;
        const counter = { value: 0 };

        element.textContent = format(0);
        restoreCounters.push(() => {
          element.textContent = finalText;
        });

        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
          onUpdate: () => {
            element.textContent = format(counter.value);
          },
          onComplete: () => {
            element.textContent = finalText;
          },
        });
      });

      return () => restoreCounters.forEach((restore) => restore());
    });

    return () => mm.revert();
  }, [ref]);
}
