import CTABanner from "@/components/ui/CTABanner";
import CheckList from "@/components/ui/CheckList";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import ImageSlot from "@/components/ui/ImageSlot";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSolutionsContent } from "@/lib/api/content";

export default async function SolutionsPage() {
  const content = await getSolutionsContent();

  return (
    <>
      <PageHero {...content.hero} />
      {content.rows.map((row, index) => (
        <Section key={row.title} tone={index % 2 === 0 ? "light" : "dark"}>
          <Container className={`grid items-center gap-10 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <SectionHeading
                eyebrow={row.eyebrow}
                title={row.title}
                description={row.description}
                tone={index % 2 === 0 ? "light" : "dark"}
              />
              <div className="mt-7">
                <CheckList items={row.checklist} tone={index % 2 === 0 ? "light" : "dark"} />
              </div>
            </div>
            <ImageSlot
              alt={row.imageAlt}
              aspectRatio="1.18 / 1"
              className={index % 2 === 0 ? "border-slate-ink/10" : ""}
            />
          </Container>
        </Section>
      ))}
      <Section tone="light">
        <Container>
          <SectionHeading
            eyebrow={content.outcomes.eyebrow}
            title={content.outcomes.title}
            tone="light"
            align="center"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {content.outcomes.items.map((item) => (
              <FeatureCard key={item.title} {...item} tone="light" />
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
