import CTABanner from "@/components/ui/CTABanner";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import ImageSlot from "@/components/ui/ImageSlot";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitLayout from "@/components/ui/SplitLayout";
import { getSecurityContent } from "@/lib/api/content";

export default async function SecurityPage() {
  const content = await getSecurityContent();

  return (
    <>
      <PageHero {...content.hero} />
      <Section tone="dark-1">
        <Container>
          <SplitLayout
            columns="minmax(0, 1.05fr) minmax(0, 0.95fr)"
            gap="2.5rem"
            start={<ImageSlot src="/images/security/security-governance.webp" alt={content.heroImageAlt} aspectRatio="1.25 / 1" />}
            end={
              <SectionHeading
                eyebrow={content.intro.eyebrow}
                title={content.intro.title}
                description={content.intro.description}
              />
            }
          />
        </Container>
      </Section>
      <Section tone="light-1">
        <Container>
          <SectionHeading
            eyebrow={content.hero.eyebrow}
            title={content.intro.title}
            description={content.intro.description}
            tone="light"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.controls.map((control) => (
              <FeatureCard key={control.title} {...control} tone="light" />
            ))}
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
