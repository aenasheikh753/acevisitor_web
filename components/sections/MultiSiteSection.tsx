import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";
import FramedImage from "@/components/visuals/FramedImage";
import type { HomeContent, MultiSiteVisualContent } from "@/lib/types";

/**
 * Linen. Three oversized italic words carry the section; the product image sits
 * in a soft doorway frame with a spruce live-counter card overlapping its edge.
 */
export default function MultiSiteSection({ content }: { content: HomeContent }) {
  const { multiSite } = content;
  const visual: MultiSiteVisualContent = multiSite.visual;

  return (
    <Section tone="linen" spacing="loose" className="overflow-hidden" aria-labelledby="multisite-title">
      <Container>
        <SectionHeading
          id="multisite-title"
          eyebrow={multiSite.eyebrow}
          title={multiSite.title}
          tone="light"
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-20">
          {multiSite.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} tone="light" />
          ))}
        </div>

        <div className="mt-20 grid items-center gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="text-lead text-spruce/80">{multiSite.description}</p>
            <div className="mt-8">
              <Button href={multiSite.actionHref} variant="outline" tone="light" icon={<IconBox icon="arrow-right" size="sm" />}>
                {multiSite.actionLabel}
              </Button>
            </div>
          </div>

          <div className="relative pb-24 sm:pb-16 lg:col-span-8 lg:pl-10">
            <FramedImage
              src="/images/home/multi-site-overview.png"
              alt={multiSite.imageAlt}
              width={1600}
              height={900}
              shape="soft"
              sizes="(min-width: 1280px) 780px, (min-width: 1024px) 62vw, 92vw"
            />

            {/* Live counters */}
            <div aria-hidden="true" className="absolute bottom-0 left-0 z-10 w-[min(100%,24rem)] lg:-left-4">
              <div className="rounded-[0.75rem] bg-spruce p-4 text-linen shadow-[var(--shadow-offset)]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-[0.9375rem] italic text-clay-light">{visual.title}</span>
                  <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-ok-light">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-ok-light motion-safe:animate-hero-pulse" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-ok-light" />
                    </span>
                    {visual.liveLabel}
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-3 divide-x divide-linen/15">
                  {visual.counters.map((counter) => (
                    <div key={counter.label} className="px-3 first:pl-0">
                      <dt className="truncate text-[0.6875rem] text-linen/65">{counter.label}</dt>
                      <dd className="mt-1 font-display text-[1.6rem] leading-none tabular-nums">
                        {counter.value.toLocaleString("en-US")}
                        {counter.suffix ?? ""}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div aria-hidden="true" className="absolute -top-4 right-4 z-10" style={{ rotate: "-3deg" }}>
              <span className="flex items-center gap-2 rounded-[0.4rem] border border-spruce/10 bg-paper py-1.5 pl-1.5 pr-3.5 text-[0.75rem] font-semibold text-spruce shadow-[var(--shadow-offset-sm)]">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ok text-linen">
                  <IconBox icon="check" size="sm" />
                </span>
                {visual.chip}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
