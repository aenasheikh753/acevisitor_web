import Button from "@/components/ui/Button";
import CTABanner from "@/components/ui/CTABanner";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";
import FramedImage from "@/components/visuals/FramedImage";
import { getPlatformContent } from "@/lib/api/content";

/**
 * The front desk's day as a dial: hour ticks arching over the doorway-shaped
 * screenshot, with one hand pointing at "what's next". Decorative.
 * Positioned 2rem outside the frame on every side, so its centre always lands on
 * the arch's centre: (W + 4rem) / 2 = W / 2 + 2rem.
 */
function DayDial() {
  const ticks = Array.from({ length: 13 }, (_, index) => {
    const angle = Math.PI + (index * Math.PI) / 12;
    const long = index % 3 === 0;
    const inner = long ? 86 : 90;
    return {
      x1: 100 + inner * Math.cos(angle),
      y1: 100 + inner * Math.sin(angle),
      x2: 100 + 96 * Math.cos(angle),
      y2: 100 + 96 * Math.sin(angle),
      long,
    };
  });

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 200 104"
      className="pointer-events-none absolute -left-8 -right-8 -top-8 overflow-visible"
      fill="none"
    >
      <path d="M4 100a96 96 0 0 1 192 0" className="stroke-clay-light/30" strokeWidth={0.6} />
      {ticks.map((tick, index) => (
        <line
          key={index}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          className={tick.long ? "stroke-clay-light" : "stroke-clay-light/50"}
          strokeWidth={tick.long ? 1.2 : 0.7}
          strokeLinecap="round"
        />
      ))}
      <circle cx={100 + 96 * Math.cos(Math.PI * 1.72)} cy={100 + 96 * Math.sin(Math.PI * 1.72)} r={2.6} className="fill-clay" />
    </svg>
  );
}

export default async function PlatformPage() {
  const content = await getPlatformContent();
  const [leadGovernance, ...otherGovernance] = content.governance.cards;

  return (
    <>
      <PageHero {...content.hero} variant="stacked" />

      {/* Overview print straddles the dark hero and the light section below */}
      <div className="bg-[linear-gradient(to_bottom,var(--spruce)_50%,var(--linen)_50%)] pb-4 pt-2">
        <Container>
          <FramedImage
            src="/images/platform/platform-overview.png"
            alt={content.heroImageAlt}
            width={1536}
            height={1024}
            shape="soft"
            priority
            sizes="(min-width: 1024px) 896px, 92vw"
            className="mx-auto max-w-4xl"
          />
        </Container>
      </div>

      {/* Capabilities: a ruled index beside a sticky heading */}
      <Section tone="linen" aria-labelledby="platform-capabilities-title">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  id="platform-capabilities-title"
                  eyebrow={content.capabilitiesEyebrow}
                  title={content.capabilitiesTitle}
                  description={content.capabilitiesDescription}
                  tone="light"
                  size="md"
                />
              </div>
            </div>
            <ul className="grid border-t border-spruce/15 sm:grid-cols-2 lg:col-span-8">
              {content.capabilities.map((feature, index) => (
                <li
                  key={feature.title}
                  className={`group border-b border-spruce/15 py-8 sm:px-6 ${index % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"}`}
                >
                  <IconBox
                    icon={feature.icon}
                    size="lg"
                    className="text-clay transition-transform duration-200 group-hover:-translate-y-1"
                  />
                  <h3 className="mt-5 text-h3 text-spruce">{feature.title}</h3>
                  <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-spruce/75">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Live view: the screen inside a doorway under the day dial, copy to the right */}
      <Section tone="dark-2" spacing="loose" className="overflow-hidden" aria-labelledby="live-view-title">
        <Container>
          <div className="grid items-center gap-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="relative mx-auto mt-8 max-w-xs sm:max-w-sm">
                <DayDial />
                <FramedImage
                  src="/images/platform/front-desk-live-view.webp"
                  alt={content.liveView.imageAlt}
                  width={1400}
                  height={1250}
                  shape="arch"
                  className="border-linen/10 shadow-[var(--shadow-offset-dark)]"
                  sizes="(min-width: 640px) 384px, 320px"
                />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHeading
                id="live-view-title"
                eyebrow={content.liveView.eyebrow}
                title={content.liveView.title}
                description={content.liveView.description}
                size="md"
              />
              <ul className="mt-10 border-t border-linen/15">
                {content.liveView.cards.map((card) => (
                  <li key={card.title} className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-b border-linen/15 py-5">
                    <IconBox
                      icon={card.icon}
                      size="lg"
                      className="mt-0.5 text-clay-light transition-transform duration-200 group-hover:-translate-y-0.5"
                    />
                    <div>
                      <h3 className="text-[1.375rem] leading-tight text-linen">{card.title}</h3>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-linen/70">{card.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Kiosk: big statement left, a small tilted print on an olive doorway right */}
      <Section tone="light-2" className="overflow-hidden" aria-labelledby="kiosk-title">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <SectionHeading
                id="kiosk-title"
                eyebrow={content.kiosk.eyebrow}
                title={content.kiosk.title}
                description={content.kiosk.description}
                tone="light"
              />
              <div className="mt-9">
                <Button href="/gallery" variant="outline" tone="light" icon={<IconBox icon="arrow-right" size="sm" />}>
                  {content.hero.actionLabel}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="relative mx-auto max-w-xs sm:max-w-sm">
                <div aria-hidden="true" className="arch absolute -bottom-6 -right-6 top-10 w-3/4 bg-clay" />
                <div aria-hidden="true" className="arch absolute -left-5 -top-5 h-24 w-16 border border-clay" />
                <div className="relative -rotate-2">
                  <FramedImage
                    src="/images/platform/kiosk-and-badge.webp"
                    alt={content.kiosk.imageAlt}
                    width={1400}
                    height={1250}
                    sizes="(min-width: 640px) 384px, 320px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Governance: one tall lead principle, two stacked beside it */}
      <Section tone="dark-3" aria-labelledby="governance-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              id="governance-title"
              eyebrow={content.governance.eyebrow}
              title={content.governance.title}
              className="lg:col-span-7"
            />
            <p className="max-w-md text-body text-linen/75 lg:col-span-4 lg:col-start-9 lg:pb-2">{content.governance.description}</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-5">
            {leadGovernance ? (
              <FeatureCard
                {...leadGovernance}
                surface="clay"
                shape="soft"
                size="lg"
                className="flex flex-col justify-end pt-20 md:row-span-2 lg:col-span-5 lg:min-h-96 lg:p-10"
              />
            ) : null}
            {otherGovernance.map((card) => (
              <FeatureCard key={card.title} {...card} surface="outline" className="lg:col-span-7" />
            ))}
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
