import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import ImageSlot from "@/components/ui/ImageSlot";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";
import type { HomeContent } from "@/lib/types";

export default function SecuritySection({ content }: { content: HomeContent }) {
  const { security } = content;

  return (
    <Section tone="light" id="security">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <ImageSlot alt={security.imageAlt} aspectRatio="1.1 / 1" className="border-slate-ink/10" />
          <div>
            <SectionHeading
              eyebrow={security.eyebrow}
              title={security.title}
              description={security.description}
              tone="light"
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {security.cards.map((card) => (
                <FeatureCard key={card.title} {...card} tone="light" className="p-5" />
              ))}
            </div>
            <div className="mt-7">
              <Button href={security.actionHref} variant="outline" tone="light" icon={<IconBox icon="arrow-right" size="sm" />}>
                {security.actionLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
