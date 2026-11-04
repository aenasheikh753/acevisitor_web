import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/lib/types";

export default function Capabilities({ content }: { content: HomeContent }) {
  const { capabilities } = content;

  return (
    <Section tone="light" id="capabilities">
      <Container>
        <SectionHeading
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          description={capabilities.description}
          tone="light"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.items.map((feature) => (
            <FeatureCard key={feature.title} {...feature} tone="light" />
          ))}
        </div>
      </Container>
    </Section>
  );
}
