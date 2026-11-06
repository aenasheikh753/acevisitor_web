import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Headline from "@/components/ui/Headline";
import HeroVisual from "@/components/sections/HeroVisual";
import IconBox from "@/components/ui/IconBox";
import VisitorPath from "@/components/visuals/VisitorPath";
import type { HomeContent } from "@/lib/types";

/**
 * Home hero. Oversized serif headline on the left; on the right a Brick Clay
 * doorway that opens on load with the product stepping out of it. The visitor
 * path runs beneath the copy and into the doorway.
 */
export default function HomeHero({ content }: { content: HomeContent }) {
  const { hero } = content;

  return (
    <section className="ground-spruce relative overflow-hidden pb-[clamp(4rem,8vw,7rem)] pt-[calc(var(--nav-h)+clamp(2.5rem,6vw,5rem))]">
      <Container className="relative">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 lg:col-span-6 lg:self-center xl:col-span-6">
            <p className="margin-note text-clay-light">{hero.eyebrow}</p>
            <h1 className="mt-7 text-[clamp(3rem,7.4vw,6.4rem)] leading-[0.95] tracking-[-0.03em] text-linen">
              <Headline text={hero.title} animated emphasisClassName="text-clay-light" />
            </h1>
            <p className="mt-8 max-w-[34rem] text-body text-linen/75 sm:text-lead">{hero.description}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={hero.actionHref} tone="dark" size="lg" icon={<IconBox icon="arrow-up-right" size="sm" />}>
                {hero.actionLabel}
              </Button>
              <Button href="/platform" variant="outline" tone="dark" size="lg">
                {content.gallery.actionLabel}
              </Button>
            </div>
            <p className="mt-10 flex items-center gap-2.5 text-[0.9375rem] text-linen">
              <IconBox icon="door" size="md" className="text-clay-light" />
              <span className="font-display italic">{hero.proofLine}</span>
            </p>
          </div>

          <div className="lg:col-span-6 xl:col-span-6">
            <HeroVisual content={content.heroVisual} />
          </div>
        </div>

        <VisitorPath
          variant="hero"
          strokeClassName="stroke-clay-light"
          className="pointer-events-none absolute -bottom-10 left-0 hidden h-28 w-[62%] lg:block"
        />
      </Container>
    </section>
  );
}
