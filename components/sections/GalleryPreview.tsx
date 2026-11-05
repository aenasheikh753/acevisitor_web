import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitLayout from "@/components/ui/SplitLayout";
import IconBox from "@/components/ui/IconBox";
import FramedImage from "@/components/visuals/FramedImage";
import type { HomeContent } from "@/lib/types";

/** Floating chip placement around the framed image (index-matched to content chips). */
const chipPlacement = [
  { position: "-top-4 left-3 sm:-left-5", float: "motion-safe:animate-hero-float-a", parallax: "1.6", extra: "" },
  { position: "top-[42%] -right-3 sm:-right-6", float: "motion-safe:animate-hero-float-c", parallax: "-1", extra: "hidden sm:block" },
  { position: "-bottom-5 left-[18%]", float: "motion-safe:animate-hero-float-b", parallax: "1.2", extra: "" },
];

export default function GalleryPreview({ content }: { content: HomeContent }) {
  const { gallery } = content;

  return (
    <Section tone="dark-1" className="overflow-hidden">
      <Container>
        <Reveal>
          <SplitLayout
            reverse
            columns="minmax(0, 1.15fr) minmax(0, 0.85fr)"
            start={
              <div data-reveal="right">
                <SectionHeading
                  eyebrow={gallery.eyebrow}
                  title={gallery.title}
                  description={gallery.description}
                />
                <div className="mt-8">
                  <Button href={gallery.actionHref} variant="outline" icon={<IconBox icon="arrow-right" size="sm" />}>
                    {gallery.actionLabel}
                  </Button>
                </div>
              </div>
            }
            end={
              <div data-reveal="left" className="relative mx-auto w-full max-w-[42rem] py-6">
                <div aria-hidden="true" className="visual-glow pointer-events-none absolute -inset-8" />
                <div data-parallax="0.4" className="relative">
                  <FramedImage
                    src="/images/home/gallery-preview.webp"
                    alt={gallery.imageAlt}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1280px) 672px, (min-width: 1024px) 54vw, 92vw"
                  />
                </div>
                {gallery.visual.chips.map((chip, index) => {
                  const placement = chipPlacement[index % chipPlacement.length];
                  return (
                    <div
                      key={chip.label}
                      aria-hidden="true"
                      data-parallax={placement.parallax}
                      className={`absolute z-10 ${placement.position} ${placement.extra}`}
                    >
                      <div className={`glass-card flex items-center gap-2.5 rounded-xl py-2 pl-2 pr-3.5 backdrop-blur-xl ${placement.float}`}>
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan/15 text-cyan">
                          <IconBox icon={chip.icon} size="sm" />
                        </span>
                        <span>
                          <span className="block text-xs font-semibold text-copy">{chip.label}</span>
                          <span className="block text-[10px] text-muted">{chip.detail}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            }
          />
        </Reveal>
      </Container>
    </Section>
  );
}
