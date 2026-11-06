import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/lib/types";

/**
 * Three arrival points drawn as three doorways of different heights standing on
 * one floor line — a small façade. Text sits at the foot of each door.
 */
const doors = [
  { surface: "bg-spruce text-linen", body: "text-linen/75", icon: "text-clay-light", height: "lg:h-[28rem]" },
  { surface: "bg-clay text-linen", body: "text-linen/90", icon: "text-linen", height: "lg:h-[34rem]" },
  { surface: "border border-spruce/25 bg-paper text-spruce", body: "text-spruce/75", icon: "text-clay", height: "lg:h-[24rem]" },
];

export default function ArrivalPoints({ content }: { content: HomeContent }) {
  const { arrival } = content;

  return (
    <Section tone="light-2" aria-labelledby="arrival-title">
      <Container>
        <SectionHeading
          id="arrival-title"
          eyebrow={arrival.eyebrow}
          title={arrival.title}
          description={arrival.description}
          tone="light"
          align="center"
        />

        <ul className="mx-auto mt-16 grid max-w-5xl gap-4 border-b-2 border-spruce sm:grid-cols-3 sm:items-end sm:gap-5 lg:mt-24 lg:gap-8">
          {arrival.items.map((item, index) => {
            const door = doors[index % doors.length];
            return (
              <li
                key={item.title}
                className={`arch lift group flex min-h-[22rem] flex-col justify-end px-6 pb-8 pt-32 sm:min-h-[24rem] sm:px-7 ${door.surface} ${door.height}`}
              >
                <IconBox
                  icon={item.icon}
                  size="xl"
                  className={`${door.icon} mb-6 transition-transform duration-300 group-hover:-translate-y-1`}
                />
                <h3 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-tight">{item.title}</h3>
                <p className={`mt-2 text-[0.9375rem] leading-relaxed ${door.body}`}>{item.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
