import JourneyTrail from "@/components/motion/JourneyTrail";
import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/lib/types";

/** The route meanders: each step steps in and out from the trail's spine (lg and up). */
const meander = ["lg:ml-0", "lg:ml-[14%]", "lg:ml-[28%]", "lg:ml-[18%]", "lg:ml-[4%]", "lg:ml-[16%]", "lg:ml-[30%]", "lg:ml-[20%]", "lg:ml-[6%]"];

/**
 * The visit, from invite to audit — a true sequence, so it keeps its numerals.
 * Steps hang off a single clay path that draws itself as you scroll.
 */
export default function VisitorJourney({ content }: { content: HomeContent }) {
  const { journey } = content;

  return (
    <Section tone="dark-1" spacing="loose" id="journey" aria-labelledby="journey-title">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
              <SectionHeading
                id="journey-title"
                eyebrow={journey.eyebrow}
                title={journey.title}
                description={journey.description}
              />
            </div>
          </div>

          <JourneyTrail className="lg:col-span-7">
            <ol className="relative space-y-10 sm:space-y-12">
              {journey.steps.map((step, index) => (
                <li key={step.number} className={`relative pl-12 sm:pl-14 ${meander[index % meander.length]}`}>
                  <span
                    data-trail-dot
                    aria-hidden="true"
                    className="absolute left-0 top-4 grid h-7 w-7 place-items-center rounded-full border border-clay-light/60 bg-[#072b36]"
                  >
                    <span className="h-2 w-2 rounded-full bg-clay-light" />
                  </span>
                  <div className="flex max-w-[26rem] items-start gap-5">
                    <span className="w-14 shrink-0 font-display text-[2.75rem] italic leading-none text-clay-light [font-variation-settings:'SOFT'_100]">
                      {step.number}
                    </span>
                    <div className="min-w-0 pt-1">
                      <h3 className="flex items-center gap-2.5 text-h3 text-linen">
                        {step.title}
                        <IconBox icon={step.icon} size="md" className="text-linen/45" />
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-linen/70">{step.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </JourneyTrail>
        </div>
      </Container>
    </Section>
  );
}
