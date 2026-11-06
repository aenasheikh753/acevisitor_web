import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ShowcaseVisual from "@/components/visuals/ShowcaseVisual";
import type { HomeContent } from "@/lib/types";

/**
 * Sage band. The product composition takes the wider left column; the copy sits
 * right with its three touchpoints set as a ruled list rather than cards.
 */
export default function PlatformShowcase({ content }: { content: HomeContent }) {
  const { showcase } = content;

  return (
    <Section tone="sage" className="overflow-hidden" aria-labelledby="showcase-title">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <ShowcaseVisual content={showcase.visual} />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <SectionHeading
              id="showcase-title"
              eyebrow={showcase.eyebrow}
              title={showcase.title}
              description={showcase.description}
              tone="light"
              size="md"
            />
            <ul className="mt-10 border-t border-spruce/20">
              {showcase.cards.map((card) => (
                <li key={card.title} className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-b border-spruce/20 py-5">
                  <IconBox
                    icon={card.icon}
                    size="lg"
                    className="mt-0.5 text-clay-deep transition-transform duration-200 group-hover:-translate-y-0.5"
                  />
                  <div>
                    <h3 className="text-[1.375rem] leading-tight text-spruce">{card.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-spruce/80">{card.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
