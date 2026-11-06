import type { PageHeroContent } from "@/lib/types";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import IconBox from "@/components/ui/IconBox";

export default function PageHero({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: PageHeroContent) {
  return (
    <Section spacing="hero" className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <div aria-hidden="true" className="absolute -right-36 -top-32 h-96 w-96 rounded-button bg-cyan/10 blur-3xl" />
      <Container className="relative">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
          <h1 className="font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-copy sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {description}
          </p>
          {actionLabel && actionHref ? (
            <div className="mt-8">
              <Button href={actionHref} icon={<IconBox icon="arrow-up-right" size="sm" />}>
                {actionLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
