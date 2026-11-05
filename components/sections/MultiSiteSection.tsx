import { RefreshCw } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitLayout from "@/components/ui/SplitLayout";
import StatCard from "@/components/ui/StatCard";
import IconBox from "@/components/ui/IconBox";
import FramedImage from "@/components/visuals/FramedImage";
import type { HomeContent, MultiSiteVisualContent } from "@/lib/types";

export default function MultiSiteSection({ content }: { content: HomeContent }) {
  const { multiSite } = content;
  const visual: MultiSiteVisualContent = multiSite.visual;

  return (
    <Section tone="dark-3" className="overflow-hidden">
      <Container>
        <Reveal>
          <SplitLayout
            start={
              <div data-reveal="left">
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
            }
            end={
              <div data-reveal="right" className="relative mx-auto w-full max-w-[38rem] pb-16 pt-5">
                <div aria-hidden="true" className="visual-glow pointer-events-none absolute -inset-8" />
                <div data-parallax="0.4" className="relative">
                  <FramedImage
                    src="/images/home/multi-site-overview.webp"
                    alt={multiSite.imageAlt}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1280px) 608px, (min-width: 1024px) 46vw, 92vw"
                  />
                </div>

                {/* Live counters */}
                <div aria-hidden="true" data-parallax="1.2" className="absolute bottom-0 left-0 z-10 w-[min(100%,23rem)] sm:-left-4">
                  <div className="hero-window rounded-2xl p-3.5 motion-safe:animate-hero-float-b sm:p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-copy/85">{visual.title}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-positive/25 bg-positive/10 px-2 py-0.5 text-[10px] font-semibold text-positive">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inset-0 rounded-full bg-positive motion-safe:animate-hero-pulse" />
                          <span className="relative h-1.5 w-1.5 rounded-full bg-positive" />
                        </span>
                        {visual.liveLabel}
                      </span>
                    </div>
                    <dl className="mt-3 grid grid-cols-3 gap-2">
                      {visual.counters.map((counter) => (
                        <div key={counter.label} className="hero-tile rounded-xl px-2.5 py-2">
                          <dt className="truncate text-[10px] text-muted">{counter.label}</dt>
                          <dd
                            className="mt-1 font-heading text-lg font-semibold leading-none tabular-nums text-copy sm:text-xl"
                            data-count-to={counter.value}
                            data-count-decimals={counter.decimals ?? 0}
                            data-count-suffix={counter.suffix ?? ""}
                          >
                            {counter.value.toLocaleString("en-US")}
                            {counter.suffix ?? ""}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div aria-hidden="true" data-parallax="1.8" className="absolute right-3 top-0 z-10">
                  <span className="flex items-center gap-2 rounded-full bg-mist py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-slate-ink shadow-float motion-safe:animate-hero-float-c">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-positive text-ink">
                      <RefreshCw className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {visual.chip}
                  </span>
                </div>
              </div>
            }
          />
        </Reveal>
      </Container>
    </Section>
  );
}
