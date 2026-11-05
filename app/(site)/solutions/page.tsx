import CTABanner from "@/components/ui/CTABanner";
import CheckList from "@/components/ui/CheckList";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import ImageSlot from "@/components/ui/ImageSlot";
import PageHero from "@/components/ui/PageHero";
import Section, { contentTone, type SectionTone } from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitLayout from "@/components/ui/SplitLayout";
import { getSolutionsContent } from "@/lib/api/content";

/** Alternating backgrounds for the solution rows: light / dark, cycling tints. */
const rowTones: SectionTone[] = ["light-1", "dark-1", "light-2", "dark-2"];

export default async function SolutionsPage() {
  const content = await getSolutionsContent();
  const lastRowTone = rowTones[(content.rows.length - 1) % rowTones.length];
  const outcomesTone: SectionTone = lastRowTone === "light-1" ? "light-2" : "light-1";

  return (
    <>
      <PageHero {...content.hero} />
      {content.rows.map((row, index) => {
        const tone = rowTones[index % rowTones.length];
        const childTone = contentTone(tone);

        return (
          <Section key={row.title} tone={tone}>
            <Container>
              <SplitLayout
                reverse={index % 2 === 1}
                gap="2.5rem"
                start={
                  <>
                    <SectionHeading
                      eyebrow={row.eyebrow}
                      title={row.title}
                      description={row.description}
                      tone={childTone}
                    />
                    <div className="mt-7">
                      <CheckList items={row.checklist} tone={childTone} />
                    </div>
                  </>
                }
                end={
                  <ImageSlot
                    src={`/images/solutions/${row.imageSlug}.webp`}
                    alt={row.imageAlt}
                    aspectRatio="1.18 / 1"
                    className={childTone === "light" ? "border-slate-ink/10" : ""}
                  />
                }
              />
            </Container>
          </Section>
        );
      })}
      <Section tone={outcomesTone}>
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
