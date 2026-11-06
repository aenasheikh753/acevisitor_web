import type { ReactNode } from "react";
import type { PageHeroContent } from "@/lib/types";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Headline from "@/components/ui/Headline";
import Section from "@/components/ui/Section";
import IconBox from "@/components/ui/IconBox";

type PageHeroProps = PageHeroContent & {
  /**
   * split   — headline left, optional `aside` right (default).
   * stacked — headline runs the full width at display size; copy and action sit
   *           in an offset right-hand column beneath it.
   */
  variant?: "split" | "stacked";
  /** Visual for the right column of the split variant. */
  aside?: ReactNode;
  /** Extra content rendered inside the hero, after the copy (e.g. an overlapping image). */
  children?: ReactNode;
  className?: string;
};

/** Inner-page hero on the dark ground. Headline load animation matches Home. */
export default function PageHero({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  variant = "split",
  aside,
  children,
  className = "",
}: PageHeroProps) {
  const action =
    actionLabel && actionHref ? (
      <Button href={actionHref} tone="dark" size="lg" icon={<IconBox icon="arrow-up-right" size="sm" />}>
        {actionLabel}
      </Button>
    ) : null;

  const heading = (
    <h1
      className={`text-linen ${
        variant === "stacked"
          ? "max-w-[16ch] text-[clamp(2.9rem,7.6vw,7rem)] leading-[0.95] tracking-[-0.03em]"
          : "text-h1"
      }`}
    >
      <Headline text={title} animated emphasisClassName="text-clay-light" />
    </h1>
  );

  return (
    <Section tone="dark" spacing="hero" className={`relative overflow-hidden ${className}`}>
      <Container className="relative">
        {variant === "stacked" ? (
          <>
            <p className="margin-note text-clay-light">{eyebrow}</p>
            <div className="mt-7">{heading}</div>
            <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12">
              <div aria-hidden="true" className="hidden lg:col-span-7 lg:flex lg:items-end">
                <span className="h-px w-full max-w-md bg-clay-light/40" />
              </div>
              <div className="lg:col-span-5">
                <p className="text-body text-linen/75 sm:text-lead">{description}</p>
                {action ? <div className="mt-8">{action}</div> : null}
              </div>
            </div>
          </>
        ) : (
          <div className={`grid items-center gap-12 ${aside ? "lg:grid-cols-12 lg:gap-10" : ""}`}>
            <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
              <p className="margin-note text-clay-light">{eyebrow}</p>
              <div className="mt-7">{heading}</div>
              <p className="mt-7 max-w-2xl text-body text-linen/75 sm:text-lead">{description}</p>
              {action ? <div className="mt-9">{action}</div> : null}
            </div>
            {aside ? <div className="lg:col-span-5">{aside}</div> : null}
          </div>
        )}
        {children}
      </Container>
    </Section>
  );
}
