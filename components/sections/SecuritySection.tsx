import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SecurityVisual from "@/components/visuals/SecurityVisual";
import type { HomeContent } from "@/lib/types";

/**
 * Spruce ground. A wide headline row, then the access panel beside three
 * principles set as a ruled column (no card boxes).
 */
export default function SecuritySection({ content }: { content: HomeContent }) {
  const { security } = content;

  return (
    <Section tone="spruce" id="security" className="overflow-hidden" aria-labelledby="security-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="security-title"
            eyebrow={security.eyebrow}
            title={security.title}
            className="lg:col-span-7"
          />
          <p className="max-w-md text-body text-linen/75 lg:col-span-4 lg:col-start-9 lg:pb-2">{security.description}</p>
        </div>

        <div className="mt-14 grid items-start gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SecurityVisual content={security.visual} />
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <ul className="space-y-0">
              {security.cards.map((card) => (
                <li key={card.title} className="border-t border-linen/15 py-6 first:border-t-0 first:pt-0">
                  <IconBox icon={card.icon} size="lg" className="text-clay-light" />
                  <h3 className="mt-4 text-h3 text-linen">{card.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-linen/70">{card.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button href={security.actionHref} variant="outline" tone="dark" icon={<IconBox icon="arrow-right" size="sm" />}>
                {security.actionLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
