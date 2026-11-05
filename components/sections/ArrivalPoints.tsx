import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/lib/types";

export default function ArrivalPoints({ content }: { content: HomeContent }) {
  const { arrival } = content;

  return (
    <Section tone="light-1">
      <Container>
        <Reveal>
          <div data-reveal="up">
            <SectionHeading
              eyebrow={arrival.eyebrow}
              title={arrival.title}
              description={arrival.description}
              tone="light"
              align="center"
            />
          </div>
          <div data-reveal-stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {arrival.items.map((item) => (
              <FeatureCard key={item.title} {...item} tone="light" cssReveal={false} className="accent-hover-card" />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
