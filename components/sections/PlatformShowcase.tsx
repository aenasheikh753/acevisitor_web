import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitLayout from "@/components/ui/SplitLayout";
import ShowcaseVisual from "@/components/visuals/ShowcaseVisual";
import type { HomeContent } from "@/lib/types";

export default function PlatformShowcase({ content }: { content: HomeContent }) {
  const { showcase } = content;

  return (
    <Section tone="dark-2" className="overflow-hidden">
      <Container>
        <Reveal>
          <SplitLayout
            columns="minmax(0, 0.9fr) minmax(0, 1.1fr)"
            start={
              <div data-reveal="left">
                <SectionHeading
                  eyebrow={showcase.eyebrow}
                  title={showcase.title}
                  description={showcase.description}
                />
                <ul data-reveal-stagger className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {showcase.cards.map((card) => (
                    <li key={card.title} className="glass-card flex items-start gap-4 rounded-xl p-4 transition-[translate,border-color] duration-200 hover:-translate-y-0.5 hover:border-cyan/30">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan/10 text-cyan">
                        <IconBox icon={card.icon} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-heading text-base font-semibold text-copy">{card.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-muted">{card.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            }
            end={
              <div data-reveal="right">
                <ShowcaseVisual content={showcase.visual} />
              </div>
            }
          />
        </Reveal>
      </Container>
    </Section>
  );
}
