import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";
import IconBox from "@/components/ui/IconBox";
import type { HomeContent } from "@/lib/types";

export default function MultiSiteSection({ content }: { content: HomeContent }) {
  const { multiSite } = content;

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={multiSite.eyebrow}
              title={multiSite.title}
              description={multiSite.description}
            />
            <div className="mt-8 grid grid-cols-3 gap-4">
              {multiSite.stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
            </div>
            <div className="mt-8">
              <Button href={multiSite.actionHref} variant="outline" icon={<IconBox icon="arrow-right" size="sm" />}>
                {multiSite.actionLabel}
              </Button>
            </div>
          </div>
          <ImageSlot
            src="/images/home/multi-site-overview.webp"
            alt={multiSite.imageAlt}
            aspectRatio="1.12 / 1"
          />
        </div>
      </Container>
    </Section>
  );
}
