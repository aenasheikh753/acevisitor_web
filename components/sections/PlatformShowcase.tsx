import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import ImageSlot from "@/components/ui/ImageSlot";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/lib/types";

export default function PlatformShowcase({ content }: { content: HomeContent }) {
  const { showcase } = content;

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={showcase.eyebrow}
              title={showcase.title}
              description={showcase.description}
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {showcase.cards.map((card) => (
                <FeatureCard key={card.title} {...card} className="p-5" />
              ))}
            </div>
          </div>
          <ImageSlot src="/images/home/platform-showcase.webp" alt={showcase.imageAlt} aspectRatio="1 / 1" />
        </div>
      </Container>
    </Section>
  );
}
