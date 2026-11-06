import CTABanner from "@/components/ui/CTABanner";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitLayout from "@/components/ui/SplitLayout";
import FramedImage from "@/components/visuals/FramedImage";
import { getAboutContent } from "@/lib/api/content";

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <PageHero {...content.hero} />
      <Section tone="dark-1">
        <Container>
          <FramedImage
            src="/images/about/acevisitor-team.webp"
            alt={content.heroImageAlt}
            width={1086}
            height={1448}
            maxWidth="30rem"
            sizes="(min-width: 560px) 480px, 92vw"
            className="mx-auto"
          />
        </Container>
      </Section>
      <Section tone="light-1">
        <Container>
          <SplitLayout
            columns="minmax(0, 0.8fr) minmax(0, 1.2fr)"
            start={
              <SectionHeading
                eyebrow={content.story.eyebrow}
                title={content.story.title}
                tone="light"
              />
            }
            end={
              <div className="space-y-5">
                {content.story.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-ink/75">{paragraph}</p>
                ))}
              </div>
            }
          />
        </Container>
      </Section>
      <Section tone="dark-2">
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
