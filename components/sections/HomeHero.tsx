import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HeroVisual from "@/components/sections/HeroVisual";
import IconBox from "@/components/ui/IconBox";
import type { HomeContent } from "@/lib/types";

export default function HomeHero({ content }: { content: HomeContent }) {
  const { hero } = content;

  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <div aria-hidden="true" className="absolute -left-40 top-16 h-96 w-96 rounded-button bg-cyan/10 blur-3xl" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-10">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-cyan">{hero.eyebrow}</p>
          <h1 className="font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-copy sm:text-6xl lg:text-[4.25rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={hero.actionHref} size="lg" icon={<IconBox icon="arrow-up-right" size="sm" />}>
              {hero.actionLabel}
            </Button>
            <Button href="/platform" variant="outline" size="lg">{content.gallery.actionLabel}</Button>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-medium text-muted">
            <span className="h-2 w-2 rounded-button bg-positive" />
            {hero.proofLine}
          </div>
        </div>
        <div className="relative min-w-0 lg:flex lg:items-center">
          <HeroVisual content={content.heroVisual} />
        </div>
      </Container>
    </section>
  );
}
