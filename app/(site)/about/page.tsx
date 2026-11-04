import CTABanner from "@/components/ui/CTABanner";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import ImageSlot from "@/components/ui/ImageSlot";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAboutContent } from "@/lib/api/content";

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <PageHero {...content.hero} />
      <Section className="!pt-0">
        <Container>
          <ImageSlot alt={content.heroImageAlt} aspectRatio="2.1 / 1" />
        </Container>
      </Section>
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow={content.story.eyebrow}
              title={content.story.title}
              tone="light"
            />
            <div className="space-y-5">
              {content.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-slate-ink/75">{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {content.principles.map((principle) => <FeatureCard key={principle.title} {...principle} />)}
          </div>
        </Container>
      </Section>
      <CTABanner
        title={content.cta.title}
        description={content.cta.description}
        primary={{ label: content.cta.primaryLabel, href: content.cta.primaryHref }}
        secondary={{ label: content.cta.secondaryLabel, href: content.cta.secondaryHref }}
      />
    </>
  );
}
