import Card, { type CardShape, type CardSurface } from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import IconBox from "@/components/ui/IconBox";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/lib/types";

type TileLayout = { span: string; surface: CardSurface; shape: CardShape; size: "md" | "lg" };

/**
 * Bento placement (lg, 4 columns):
 *   [ 0 0 ][ 1 1 ]
 *   [ 0 0 ][2][3]
 *   [4][ 5 5 ][6]
 *   [ 7 7 7 7 ]   ← wide strip
 */
const tiles: TileLayout[] = [
  { span: "md:col-span-2 lg:row-span-2", surface: "sage", shape: "soft", size: "lg" },
  { span: "md:col-span-2", surface: "spruce", shape: "square", size: "md" },
  { span: "", surface: "paper", shape: "square", size: "md" },
  { span: "", surface: "brass", shape: "notch", size: "md" },
  { span: "", surface: "outline", shape: "square", size: "md" },
  { span: "lg:col-span-2", surface: "paper", shape: "square", size: "md" },
  { span: "md:col-span-2 lg:col-span-1", surface: "clay", shape: "soft", size: "md" },
];

export default function Capabilities({ content }: { content: HomeContent }) {
  const { capabilities } = content;
  const lastIndex = capabilities.items.length - 1;

  return (
    <Section tone="linen" id="capabilities" aria-labelledby="capabilities-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="capabilities-title"
            eyebrow={capabilities.eyebrow}
            title={capabilities.title}
            tone="light"
            className="lg:col-span-8"
          />
          <p className="max-w-md text-body text-stone lg:col-span-4 lg:pb-2">{capabilities.description}</p>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-4">
          {capabilities.items.map((feature, index) => {
            const isStrip = index === lastIndex && index >= tiles.length;

            if (isStrip) {
              return (
                <Card key={feature.title} surface="outline" className="md:col-span-2 lg:col-span-4">
                  <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.2fr)] md:items-center md:gap-10">
                    <IconBox icon={feature.icon} size="xl" className="text-clay" />
                    <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-spruce">{feature.title}</h3>
                    <p className="text-body text-spruce/75">{feature.description}</p>
                  </div>
                </Card>
              );
            }

            const tile = tiles[index % tiles.length];
            return (
              <FeatureCard
                key={feature.title}
                {...feature}
                tone="light"
                surface={tile.surface}
                shape={tile.shape}
                size={tile.size}
                className={`${tile.span} ${tile.size === "lg" ? "flex flex-col justify-end pt-16 lg:min-h-[30rem] lg:p-10" : ""} ${tile.shape === "notch" ? "pt-10" : ""}`}
              >
                {tile.size === "lg" ? (
                  <span aria-hidden="true" className="arch pointer-events-none absolute right-8 top-8 h-40 w-28 border border-spruce/20 lg:h-56 lg:w-40" />
                ) : null}
              </FeatureCard>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
