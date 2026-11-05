import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitLayout from "@/components/ui/SplitLayout";
import IconBox from "@/components/ui/IconBox";
import SecurityVisual from "@/components/visuals/SecurityVisual";
import type { HomeContent } from "@/lib/types";

export default function SecuritySection({ content }: { content: HomeContent }) {
  const { security } = content;

  return (
    <Section tone="light-2" id="security" className="overflow-hidden">
      <Container>
        <Reveal>
          <SplitLayout
            start={
              <div data-reveal="left">
                <SecurityVisual content={security.visual} />
              </div>
            }
            end={
              <div data-reveal="right">
                <SectionHeading
                  eyebrow={security.eyebrow}
                  title={security.title}
                  description={security.description}
                  tone="light"
                />
                <div data-reveal-stagger className="mt-8 grid gap-3 sm:grid-cols-3">
                  {security.cards.map((card) => (
                    <FeatureCard key={card.title} {...card} tone="light" cssReveal={false} className="accent-hover-card p-5" />
                  ))}
                </div>
                <div className="mt-7">
                  <Button href={security.actionHref} variant="outline" tone="light" icon={<IconBox icon="arrow-right" size="sm" />}>
                    {security.actionLabel}
                  </Button>
                </div>
              </div>
            }
          />
        </Reveal>
      </Container>
    </Section>
  );
}
