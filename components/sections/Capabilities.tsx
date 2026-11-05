import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/lib/types";

export default function Capabilities({ content }: { content: HomeContent }) {
  const { capabilities } = content;

  return (
    <Section tone="light-1" id="capabilities">
      <Container>
        <Reveal>
          <div data-reveal="up">
            <SectionHeading
              eyebrow={capabilities.eyebrow}
              title={capabilities.title}
              description={capabilities.description}
              tone="light"
            />
          </div>
          <div data-reveal-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.items.map((feature) => (
              <FeatureCard key={feature.title} {...feature} tone="light" cssReveal={false} className="accent-hover-card" />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
