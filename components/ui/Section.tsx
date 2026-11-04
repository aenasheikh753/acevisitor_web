import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  tone?: "dark" | "light";
  id?: string;
  className?: string;
};

export default function Section({
  children,
  tone = "dark",
  id,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section-space ${tone === "dark" ? "section-dark" : "section-light"} ${className}`}
    >
      {children}
    </section>
  );
}
