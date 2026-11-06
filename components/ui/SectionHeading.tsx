import Headline from "@/components/ui/Headline";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** "lg" for section openers, "md" for secondary blocks. */
  size?: "md" | "lg";
  as?: "h1" | "h2" | "h3";
  /** Italicise the headline's second clause. */
  emphasis?: boolean;
  className?: string;
  id?: string;
};

/**
 * Headline block. The eyebrow is set as a margin note (brass rule + italic serif),
 * never as an uppercase label.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  size = "lg",
  as: Tag = "h2",
  emphasis = true,
  className = "",
  id,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const centered = align === "center";

  return (
    <div className={`${size === "lg" ? "max-w-4xl" : "max-w-2xl"} ${centered ? "mx-auto text-center" : ""} ${className}`}>
      <p className={`margin-note mb-5 ${isDark ? "text-clay-light" : "text-clay"} ${centered ? "justify-center" : ""}`}>
        {eyebrow}
      </p>
      <Tag
        id={id}
        className={`${size === "lg" ? "text-h2" : "text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.1] tracking-[-0.015em]"} ${isDark ? "text-linen" : "text-spruce"}`}
      >
        {emphasis ? <Headline text={title} emphasisClassName={isDark ? "text-clay-light" : "text-clay"} /> : title}
      </Tag>
      {description ? (
        <p
          className={`mt-6 max-w-2xl text-body sm:text-lead ${isDark ? "text-linen/75" : "text-spruce/75"} ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
