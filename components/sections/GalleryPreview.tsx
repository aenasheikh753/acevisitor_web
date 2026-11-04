import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";
import type { HomeContent } from "@/lib/types";

export default function GalleryPreview({ content }: { content: HomeContent }) {
  const { gallery } = content;

  return (
    <Section>
      <Container>
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <SectionHeading
            eyebrow={gallery.eyebrow}
            title={gallery.title}
            description={gallery.description}
          />
          <Button href={gallery.actionHref} variant="outline" icon={<IconBox icon="arrow-right" size="sm" />}>
            {gallery.actionLabel}
          </Button>
        </div>
        <div className="mt-10">
          <ImageSlot alt={gallery.imageAlt} aspectRatio="2.1 / 1" />
        </div>
      </Container>
    </Section>
  );
}
