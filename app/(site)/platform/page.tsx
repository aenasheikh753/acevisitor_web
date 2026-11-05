import Button from "@/components/ui/Button";
import CTABanner from "@/components/ui/CTABanner";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import ImageSlot from "@/components/ui/ImageSlot";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitLayout from "@/components/ui/SplitLayout";
import IconBox from "@/components/ui/IconBox";
import { getPlatformContent } from "@/lib/api/content";

export default async function PlatformPage() {
  const content = await getPlatformContent();

  return (
    <>
      <PageHero {...content.hero} />
      <Section tone="dark-1">
        <Container>
          <ImageSlot src="/images/platform/platform-overview.png" alt={content.heroImageAlt} aspectRatio="2 / 1" />
        </Container>
      </Section>
      <Section tone="light-1">
        <Container>
          <SectionHeading
            eyebrow={content.capabilitiesEyebrow}
            title={content.capabilitiesTitle}
            description={content.capabilitiesDescription}
            tone="light"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.capabilities.map((feature) => (
              <FeatureCard key={feature.title} {...feature} tone="light" />
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="dark-2">
        <Container>
          <SplitLayout
            start={
              <>
                <SectionHeading
                  eyebrow={content.liveView.eyebrow}
                  title={content.liveView.title}
                  description={content.liveView.description}
                />
                <div className="mt-8 grid gap-3">
                  {content.liveView.cards.map((card) => (
                    <FeatureCard key={card.title} {...card} className="p-5" />
                  ))}
                </div>
              </>
            }
            end={<ImageSlot src="/images/platform/front-desk-live-view.webp" alt={content.liveView.imageAlt} aspectRatio="1.12 / 1" />}
          />
        </Container>
      </Section>
      <Section tone="light-2">
        <Container>
          <SplitLayout
            start={
              <ImageSlot
                src="/images/platform/kiosk-and-badge.webp"
                alt={content.kiosk.imageAlt}
                aspectRatio="1.12 / 1"
                className="border-slate-ink/10"
              />
            }
            end={
              <>
                <SectionHeading
                  eyebrow={content.kiosk.eyebrow}
                  title={content.kiosk.title}
                  description={content.kiosk.description}
                  tone="light"
                />
                <div className="mt-7">
                  <Button href="/gallery" variant="outline" tone="light" icon={<IconBox icon="arrow-right" size="sm" />}>
                    {content.hero.actionLabel}
                  </Button>
                </div>
              </>
            }
          />
        </Container>
      </Section>
      <Section tone="dark-3">
        <Container>
          <SectionHeading
            eyebrow={content.governance.eyebrow}
            title={content.governance.title}
            description={content.governance.description}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {content.governance.cards.map((card) => <FeatureCard key={card.title} {...card} />)}
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
