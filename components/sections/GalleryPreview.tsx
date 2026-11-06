import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FramedImage from "@/components/visuals/FramedImage";
import type { HomeContent } from "@/lib/types";

/** Paper tags pinned around the print, each at its own slight angle. */
const tagPlacement = [
  { position: "-top-5 left-4 sm:-left-6", rotate: "-4deg", extra: "" },
  { position: "top-[44%] -right-2 sm:-right-8", rotate: "3deg", extra: "hidden sm:block" },
  { position: "-bottom-6 left-[22%]", rotate: "-2deg", extra: "" },
];

/**
 * Spruce ground. A large print of the product on the right, the heading and
 * link on the left, offset low so the two overlap in height rather than align.
 */
export default function GalleryPreview({ content }: { content: HomeContent }) {
  const { gallery } = content;

  return (
    <Section tone="spruce" className="overflow-hidden" aria-labelledby="gallery-title">
      <Container>
        <div className="grid items-end gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 lg:pb-10">
            <SectionHeading
              id="gallery-title"
              eyebrow={gallery.eyebrow}
              title={gallery.title}
              description={gallery.description}
              size="md"
            />
            <div className="mt-8">
              <Button href={gallery.actionHref} variant="outline" tone="dark" icon={<IconBox icon="arrow-right" size="sm" />}>
                {gallery.actionLabel}
              </Button>
            </div>
          </div>

          <div className="relative py-6 lg:col-span-8">
            <FramedImage
              src="/images/home/gallery-preview.webp"
              alt={gallery.imageAlt}
              width={1600}
              height={900}
              className="border-linen/10 shadow-[var(--shadow-offset-dark)]"
              sizes="(min-width: 1280px) 820px, (min-width: 1024px) 64vw, 92vw"
            />
            {gallery.visual.chips.map((chip, index) => {
              const placement = tagPlacement[index % tagPlacement.length];
              return (
                <div
                  key={chip.label}
                  aria-hidden="true"
                  className={`absolute z-10 ${placement.position} ${placement.extra}`}
                  style={{ rotate: placement.rotate }}
                >
                  <div className="flex items-center gap-2.5 rounded-[0.4rem] bg-paper py-2 pl-2 pr-4 text-spruce shadow-[var(--shadow-offset-dark)]">
                    <span className="arch-soft grid h-9 w-8 place-items-center bg-clay text-linen">
                      <IconBox icon={chip.icon} size="sm" />
                    </span>
                    <span>
                      <span className="block text-[0.8125rem] font-semibold">{chip.label}</span>
                      <span className="block text-[0.6875rem] text-stone">{chip.detail}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
