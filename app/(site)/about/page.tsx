import CTABanner from "@/components/ui/CTABanner";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import type { CardShape, CardSurface } from "@/components/ui/Card";
import IconBox from "@/components/ui/IconBox";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FramedImage from "@/components/visuals/FramedImage";
import { getAboutContent } from "@/lib/api/content";

/** Principles step down the page; each takes its own surface and shape. */
const principleStyles: { surface: CardSurface; shape: CardShape; offset: string }[] = [
  { surface: "clay", shape: "soft", offset: "" },
  { surface: "outline", shape: "square", offset: "md:mt-16" },
  { surface: "paper", shape: "notch", offset: "md:mt-32" },
];

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <PageHero
        {...content.hero}
        aside={
          /* The team photo in a doorway, an olive arch behind, a badge tag on a lanyard */
          <div className="relative mx-auto mt-6 max-w-xs sm:max-w-sm lg:mt-0">
            <div aria-hidden="true" className="arch absolute -right-6 -top-6 bottom-12 w-4/5 bg-clay" />
            <FramedImage
              src="/images/about/acevisitor-team.webp"
              alt={content.heroImageAlt}
              width={1086}
              height={1448}
              shape="arch"
              priority
              className="border-linen/10 shadow-[var(--shadow-offset-dark)]"
              sizes="(min-width: 640px) 384px, 320px"
            />
            <div aria-hidden="true" className="absolute -bottom-6 -left-4 -rotate-6 sm:-left-10">
              <span className="absolute -top-10 left-1/2 h-10 w-px bg-clay-light" />
              <span className="notch block rounded-lg border border-spruce/10 bg-paper px-4 pb-3 pt-6 font-display text-base italic text-spruce shadow-[var(--shadow-offset-dark)] [--notch-bg:var(--spruce)]">
                {content.hero.eyebrow}
              </span>
            </div>
          </div>
        }
      />

      {/* Point of view: the headline holds the left, the story reads on the right with a drop cap */}
      <Section tone="linen" spacing="loose" aria-labelledby="about-story-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionHeading id="about-story-title" eyebrow={content.story.eyebrow} title={content.story.title} tone="light" />
              </div>
            </div>
            <div className="space-y-6 lg:col-span-6 lg:col-start-7">
              {content.story.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-lead text-spruce first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:leading-none first-letter:text-clay"
                      : "text-body text-spruce/75"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Principles: three cards stepping down, each its own surface */}
      <Section tone="dark-2">
        <Container>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {content.principles.map((principle, index) => {
              const style = principleStyles[index % principleStyles.length];
              return (
                <FeatureCard
                  key={principle.title}
                  {...principle}
                  surface={style.surface}
                  shape={style.shape}
                  className={`${style.offset} ${style.shape === "notch" ? "pt-10 [--notch-bg:#0a2537]" : ""} md:min-h-72`}
                />
              );
            })}
          </div>
        </Container>
      </Section>

      <CTABanner
        title={content.cta.title}
        description={content.cta.description}
        primary={{ label: content.cta.primaryLabel, href: content.cta.primaryHref }}
        secondary={{ label: content.cta.secondaryLabel, href: content.cta.secondaryHref }}
        icon={<IconBox icon="arrow-up-right" size="sm" />}
      />
    </>
  );
}
