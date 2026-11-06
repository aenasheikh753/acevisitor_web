"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  /**
   * accent  — Brick Clay, the primary call to action.
   * primary — Spruce Ink (on light grounds) / Linen (on dark grounds).
   * outline — a drawn outline in the current ground's ink.
   * ghost   — text only.
   */
  variant?: "accent" | "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "circle";
  /** The ground the button sits on. */
  tone?: "dark" | "light";
  href?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  role?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-selected"?: boolean;
  "aria-pressed"?: boolean;
};

const variantClasses = {
  light: {
    accent: "bg-clay text-linen hover:bg-clay-deep hover:shadow-[3px_3px_0_var(--spruce)]",
    primary: "bg-spruce text-linen hover:bg-spruce-3 hover:shadow-[3px_3px_0_var(--clay)]",
    outline: "border border-spruce/70 text-spruce hover:border-spruce hover:bg-spruce hover:text-linen",
    ghost: "text-spruce hover:bg-spruce/8",
  },
  dark: {
    accent: "bg-clay text-linen hover:bg-clay-deep hover:shadow-[3px_3px_0_var(--linen)]",
    primary: "bg-linen text-spruce hover:bg-paper hover:shadow-[3px_3px_0_var(--clay-light)]",
    outline: "border border-linen/60 text-linen hover:border-linen hover:bg-linen hover:text-spruce",
    ghost: "text-linen hover:bg-linen/10",
  },
} as const;

const sizeClasses = {
  sm: "min-h-10 px-4 text-[0.875rem]",
  md: "min-h-12 px-5 text-[0.9375rem]",
  lg: "min-h-14 px-7 text-base",
};

/**
 * Buttons carry the arch: a soft rounded top over a near-square base.
 * Hover lifts onto a crisp offset shadow; press settles back down.
 */
export default function Button({
  variant = "accent",
  size = "md",
  shape = "rounded",
  tone = "dark",
  href,
  fullWidth = false,
  icon,
  children,
  className: additionalClassName = "",
  disabled = false,
  type = "button",
  onClick,
  ...ariaProps
}: ButtonProps) {
  const radiusClass = shape === "circle" ? "rounded-full" : "rounded-t-[1.25rem] rounded-b-[0.35rem]";
  const className = `pressable group/button inline-flex items-center justify-center gap-2.5 ${radiusClass} font-semibold tracking-[-0.005em] hover:-translate-x-px hover:-translate-y-px disabled:pointer-events-none disabled:opacity-50 ${variantClasses[tone][variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${additionalClassName}`;
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="inline-flex transition-transform duration-200 group-hover/button:translate-x-0.5">{icon}</span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} {...ariaProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled} {...ariaProps}>
      {content}
    </button>
  );
}
