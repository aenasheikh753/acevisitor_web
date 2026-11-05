import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/lib/types";

/** Staircase offsets per column (lg): each row reads as a rising step. */
const columnOffset = ["", "lg:mt-8", "lg:mt-16"];

export default function VisitorJourney({ content }: { content: HomeContent }) {
  const { journey } = content;
  const lastIndex = journey.steps.length - 1;

  return (
    <Section tone="dark-1" id="journey">
      <Container>
        <Reveal>
          <div data-reveal="up">
            <SectionHeading
              eyebrow={journey.eyebrow}
              title={journey.title}
              description={journey.description}
            />
          </div>
          <ol data-reveal-stagger className="mt-12 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4">
            {journey.steps.map((step, index) => (
              <li key={step.number} className={`relative h-fit ${columnOffset[index % 3]}`}>
                <div className="glass-card gradient-border rounded-2xl p-5 transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-glow">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-1 text-[11px] font-bold tracking-[0.14em] text-cyan">
                      {step.number}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/15">
                      <IconBox icon={step.icon} size="sm" />
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-copy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{step.description}</p>
                </div>

                {/* Connector to the next step: horizontal on desktop rows, vertical when stacked. */}
                {index % 3 !== 2 && index !== lastIndex ? (
                  <span aria-hidden="true" className="absolute -right-6 top-9 hidden w-6 items-center lg:flex">
                    <i className="h-px flex-1 border-t border-dashed border-cyan/35" />
                    <i className="h-1.5 w-1.5 rounded-full bg-cyan/70" />
                  </span>
                ) : null}
                {index !== lastIndex ? (
                  <span aria-hidden="true" className="absolute -bottom-4 left-9 flex h-4 flex-col items-center sm:hidden">
                    <i className="w-px flex-1 border-l border-dashed border-cyan/35" />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
