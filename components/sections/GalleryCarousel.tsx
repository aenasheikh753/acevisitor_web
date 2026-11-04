"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import Section from "@/components/ui/Section";
import IconBox from "@/components/ui/IconBox";
import type { GalleryContent } from "@/lib/types";

export default function GalleryCarousel({ content }: { content: GalleryContent }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = content.slides[activeIndex];

  function showSlide(index: number) {
    setActiveIndex((index + content.slides.length) % content.slides.length);
  }

  return (
    <Section className="!pt-0">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.5fr]">
          <div className="flex flex-col gap-2" role="tablist">
            {content.slides.map((slide, index) => (
              <Button
                key={slide.title}
                type="button"
                variant="ghost"
                className={`h-auto min-h-0 w-full flex-col items-start gap-1 border px-4 py-4 text-left hover:translate-y-0 ${
                  activeIndex === index
                    ? "border-cyan/40 bg-cyan/10"
                    : "border-line bg-copy/[0.02] hover:bg-copy/[0.05]"
                }`}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="gallery-slide"
                onClick={() => showSlide(index)}
              >
                <span className="block font-heading text-sm font-semibold text-copy">{slide.title}</span>
                <span className="block text-xs leading-5 text-muted">{slide.description}</span>
              </Button>
            ))}
          </div>
          <div id="gallery-slide" role="tabpanel" className="min-w-0">
            <ImageSlot
              alt={activeSlide.alt}
              aspectRatio="1.55 / 1"
              className="transition duration-300"
            />
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-lg font-semibold text-copy">{activeSlide.title}</h2>
                <p className="mt-1 max-w-xl text-sm leading-6 text-muted">{activeSlide.description}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={content.previous}
                  onClick={() => showSlide(activeIndex - 1)}
                  icon={<IconBox icon="arrow-left" size="sm" />}
                >
                  <span className="sr-only">{content.previous}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={content.next}
                  onClick={() => showSlide(activeIndex + 1)}
                  icon={<IconBox icon="arrow-right" size="sm" />}
                >
                  <span className="sr-only">{content.next}</span>
                </Button>
              </div>
            </div>
            <div className="mt-5 flex gap-2" role="group" aria-label={content.select}>
              {content.slides.map((slide, index) => (
                <Button
                  key={slide.title}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={`h-auto min-h-0 flex-1 p-0 hover:translate-y-0 ${
                    activeIndex === index ? "opacity-100" : "opacity-55 hover:opacity-85"
                  }`}
                  aria-label={`${content.select}: ${slide.title}`}
                  aria-pressed={activeIndex === index}
                  onClick={() => showSlide(index)}
                >
                  <span
                    aria-hidden="true"
                    className="image-slot-placeholder relative block h-12 w-full overflow-hidden rounded-sm border border-copy/15"
                  >
                    <span className="image-slot-grid absolute inset-0 opacity-30" />
                    <span className="absolute inset-x-2 top-2 h-1 rounded-button bg-copy/20" />
                    <span className="absolute bottom-2 left-2 h-5 w-1/3 rounded-sm bg-cyan/20" />
                    <span className="absolute bottom-2 right-2 h-5 w-1/2 rounded-sm bg-copy/10" />
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
