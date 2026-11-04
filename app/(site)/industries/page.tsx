import CTABanner from "@/components/ui/CTABanner";
import Container from "@/components/ui/Container";
import CheckList from "@/components/ui/CheckList";
import FeatureCard from "@/components/ui/FeatureCard";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { getIndustriesContent } from "@/lib/api/content";

export default async function IndustriesPage() {
  const content = await getIndustriesContent();

  return (
    <>
      <PageHero {...content.hero} />
      <Section tone="light" className="!pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.industries.map(({ bullets, ...industry }) => (
              <FeatureCard key={industry.title} {...industry} tone="light" className="flex flex-col">
                <div className="mt-5">
                  <CheckList items={bullets} tone="light" />
                </div>
              </FeatureCard>
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
