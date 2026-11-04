import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StepCard from "@/components/ui/StepCard";
import type { HomeContent } from "@/lib/types";

export default function VisitorJourney({ content }: { content: HomeContent }) {
  const { journey } = content;

  return (
    <Section id="journey">
      <Container>
        <SectionHeading
          eyebrow={journey.eyebrow}
          title={journey.title}
          description={journey.description}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journey.steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
