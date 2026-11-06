import CTABanner from "@/components/ui/CTABanner";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import IconBox from "@/components/ui/IconBox";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FramedImage from "@/components/visuals/FramedImage";
import { getSecurityContent } from "@/lib/api/content";

/** Hero aside: nested shield outlines around a doorway-shaped keyhole. Decorative. */
function ShieldDrawing() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 240 280" fill="none" className="mx-auto h-auto w-full max-w-xs">
      <path d="M120 8 20 46v76c0 70 42 124 100 150 58-26 100-80 100-150V46L120 8Z" className="stroke-clay-light/25" strokeWidth={1} />
      <path d="M120 34 44 63v60c0 54 32 96 76 117 44-21 76-63 76-117V63l-76-29Z" className="stroke-clay-light/50" strokeWidth={1.2} />
      <path d="M120 60 68 80v44c0 38 22 68 52 84 30-16 52-46 52-84V80l-52-20Z" className="fill-clay stroke-clay" strokeWidth={1.2} />
      <path d="M106 156v-22a14 14 0 0 1 28 0v22" className="stroke-linen" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M100 156h40" className="stroke-linen" strokeWidth={2.4} strokeLinecap="round" />
      <circle cx="120" cy="142" r="3" className="fill-linen" />
    </svg>
  );
}

export default async function SecurityPage() {
  const content = await getSecurityContent();
  const [leadControl, ...otherControls] = content.controls;

  return (
    <>
      <PageHero {...content.hero} aside={<ShieldDrawing />} />

      {/* Responsible by design — copy left, the MFA + admin console photo right */}
      <Section tone="dark-1" className="overflow-hidden" aria-labelledby="security-intro-title">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionHeading
                id="security-intro-title"
                eyebrow={content.intro.eyebrow}
                title={content.intro.title}
                description={content.intro.description}
                size="md"
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="relative mx-auto max-w-xl">
                <div aria-hidden="true" className="arch-soft absolute -right-4 -top-4 bottom-8 left-12 border border-clay-light/30" />
                <FramedImage
                  src="/images/home/security-controls.webp"
                  alt={content.heroImageAlt}
                  width={1536}
                  height={1024}
                  className="border-linen/10 shadow-[var(--shadow-offset-dark)]"
                  sizes="(min-width: 640px) 576px, 92vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Controls: one lead control, the rest in a 2 × 2 */}
      <Section tone="linen" aria-labelledby="security-controls-title">
        <Container>
          <SectionHeading
            id="security-controls-title"
            eyebrow={content.hero.eyebrow}
            title={content.intro.title}
            description={content.intro.description}
            tone="light"
          />
          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
            {leadControl ? (
              <FeatureCard
                {...leadControl}
                surface="spruce"
                shape="soft"
                size="lg"
                className="flex flex-col justify-end pt-20 lg:col-span-5 lg:min-h-96 lg:p-10"
              />
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
              {otherControls.map((control, index) => (
                <FeatureCard
                  key={control.title}
                  {...control}
                  tone="light"
                  surface={index === 1 ? "brass" : index === 2 ? "outline" : "paper"}
                  shape={index === 1 ? "notch" : "square"}
                  className={index === 1 ? "pt-10" : ""}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CTABanner
        title={content.cta.title}
        description={content.cta.description}
        primary={{ label: content.cta.primaryLabel, href: content.cta.primaryHref }}
        secondary={{ label: content.cta.secondaryLabel, href: content.cta.secondaryHref }}
        icon={<IconBox icon="arrow-up-right" size="sm" />}
      />
    </>
  );
}
