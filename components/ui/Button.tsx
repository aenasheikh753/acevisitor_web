"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  variant?: "accent" | "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "circle";
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
  accent: "bg-lime text-[var(--color-accent-foreground)] hover:brightness-105 shadow-glow",
  primary: "bg-cyan text-ink hover:brightness-105",
  outline: "border border-line bg-copy/5 text-copy hover:border-cyan/50 hover:bg-copy/10",
  ghost: "bg-transparent text-copy hover:bg-copy/8",
};

const lightOutlineClasses =
  "border border-slate-ink/20 bg-slate-ink/5 text-slate-ink hover:border-slate-ink/35 hover:bg-slate-ink/10";

const sizeClasses = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-7 text-base",
};

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
  const selectedVariant =
    variant === "outline" && tone === "light"
      ? lightOutlineClasses
      : variantClasses[variant];
  const radiusClass =
    shape === "circle" ? "rounded-full" : "rounded-[10px]";
  const className = `inline-flex items-center justify-center gap-2 ${radiusClass} font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50 ${selectedVariant} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${additionalClassName}`;
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        {...ariaProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...ariaProps}
    >
      {content}
    </button>
  );
}
