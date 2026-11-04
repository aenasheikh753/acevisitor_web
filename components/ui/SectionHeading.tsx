type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan">
        {eyebrow}
      </p>
      <h2
        className={`font-heading text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl ${tone === "dark" ? "text-copy" : "text-slate-ink"}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${tone === "dark" ? "text-muted" : "text-slate-ink/70"} ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
