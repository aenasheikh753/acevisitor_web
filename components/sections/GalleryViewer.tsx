"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import Section from "@/components/ui/Section";
import type { GalleryContent } from "@/lib/types";

const controlLabels = {
  expand: "Expand image",
  close: "Close expanded image",
  previous: "Previous gallery image",
  next: "Next gallery image",
};

function GalleryImage({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const hasFailed = failedSrc === src;

  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-mist ${className}`}
    >
      {hasFailed ? (
        <ImageSlot
          alt={alt}
          aspectRatio="16 / 10"
          className="absolute inset-0 h-full w-full rounded-none border-0 shadow-none"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}

function GalleryArrow({
  direction,
  label,
  onClick,
  className = "",
}: {
  direction: "previous" | "next";
  label: string;
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-10 w-10 place-items-center rounded-full border border-line bg-mist text-slate-ink transition-colors hover:bg-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${className}`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default function GalleryViewer({
  content,
  emptyState,
}: {
  content: GalleryContent;
  emptyState: {
    title: string;
    description: string;
  };
}) {
  const visibleItems = content.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const activeItem =
    visibleItems.length > 0
      ? visibleItems[activeIndex % visibleItems.length]
      : undefined;

  function showItem(index: number) {
    if (visibleItems.length === 0) {
      return;
    }

    setActiveIndex(
      ((index % visibleItems.length) + visibleItems.length) %
        visibleItems.length,
    );
  }

  function handleGalleryKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft" && visibleItems.length > 0) {
      event.preventDefault();
      showItem(activeIndex - 1);
    } else if (event.key === "ArrowRight" && visibleItems.length > 0) {
      event.preventDefault();
      showItem(activeIndex + 1);
    }
  }

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const expandButton = expandButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setLightboxOpen(false);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((index) =>
          ((index - 1) % visibleItems.length + visibleItems.length) %
          visibleItems.length,
        );
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % visibleItems.length);
        return;
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLButtonElement>(
          "button:not([disabled])",
        );
        if (!focusable?.length) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (
          document.activeElement !== first &&
          document.activeElement !== last
        ) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      expandButton?.focus();
    };
  }, [lightboxOpen, visibleItems.length]);

  return (
    <>
      <Section className="relative overflow-hidden">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-cyan">
                {content.eyebrow}
              </p>
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-copy sm:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {content.description}
              </p>
            </div>
            <Button href={content.ctaHref} variant="accent" className="w-fit">
              {content.ctaLabel}
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="pt-10">
        <Container>
          {visibleItems.length === 0 ? (
            <div className="rounded-xl border border-line bg-mist p-8 text-center shadow-card sm:p-12">
              <h2 className="font-heading text-2xl font-semibold text-slate-ink">
                {emptyState.title}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-ink/70">
                {emptyState.description}
              </p>
            </div>
          ) : (
            <>
              <div
                className="grid gap-6 lg:grid-cols-[minmax(13rem,0.78fr)_minmax(0,2fr)] lg:gap-10"
                onKeyDown={handleGalleryKeyDown}
                tabIndex={0}
              >
                <div
                  role="tablist"
                  aria-label={content.title}
                  className="flex min-w-0 gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0"
                >
                  {visibleItems.map((item, index) => {
                    const selected = index === activeIndex;

                    return (
                      <button
                        key={item.id}
                        id={`gallery-tab-${index}`}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls="gallery-item-panel"
                        onClick={() => showItem(index)}
                        className={`flex shrink-0 items-center gap-3 rounded-[10px] border-l-2 px-4 py-3 text-left text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan lg:w-full ${
                          selected
                            ? "border-l-cyan bg-cyan/10 font-medium text-slate-ink"
                            : "border-l-transparent text-slate-ink/70 hover:bg-slate-ink/5"
                        }`}
                      >
                        <span className="text-xs font-semibold tracking-wide text-cyan">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="whitespace-nowrap">{item.title}</span>
                      </button>
                    );
                  })}
                </div>

                {activeItem && (
                  <div
                    id="gallery-item-panel"
                    role="tabpanel"
                    aria-labelledby={`gallery-tab-${activeIndex}`}
                    tabIndex={0}
                    className="min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    <div className="relative">
                      <GalleryImage
                        key={activeItem.id}
                        src={activeItem.image.src}
                        alt={activeItem.image.alt}
                        sizes="(max-width: 1024px) 100vw, 75vw"
                        className="shadow-card"
                      />
                      <button
                        ref={expandButtonRef}
                        type="button"
                        aria-label={`${controlLabels.expand}: ${activeItem.title}`}
                        onClick={() => setLightboxOpen(true)}
                        className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-line bg-mist text-slate-ink shadow-card transition-colors hover:bg-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                      >
                        <Maximize2 className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>

                    <div
                      aria-live="polite"
                      className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <h2 className="font-heading text-2xl font-semibold text-slate-ink sm:text-3xl">
                          {activeItem.title}
                        </h2>
                        <p className="mt-2 max-w-2xl leading-7 text-slate-ink/70">
                          {activeItem.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 sm:justify-end">
                        <span className="min-w-12 text-center text-sm font-medium tabular-nums text-slate-ink">
                          {activeIndex + 1} / {visibleItems.length}
                        </span>
                        <GalleryArrow
                          direction="previous"
                          label={`${controlLabels.previous}: ${activeItem.title}`}
                          onClick={() => showItem(activeIndex - 1)}
                        />
                        <GalleryArrow
                          direction="next"
                          label={`${controlLabels.next}: ${activeItem.title}`}
                          onClick={() => showItem(activeIndex + 1)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex snap-x gap-3 overflow-x-auto pb-3 lg:mt-10">
                {visibleItems.map((item, index) => {
                  const selected = index === activeIndex;
                  const thumbnail = item.thumbnail ?? item.image;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={item.title}
                      aria-pressed={selected}
                      onClick={() => showItem(index)}
                      className={`w-[72%] shrink-0 snap-start rounded-[10px] border-2 p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan sm:w-[40%] lg:w-0 lg:flex-1 ${
                        selected
                          ? "border-cyan bg-mist"
                          : "border-transparent bg-mist/80 hover:border-line"
                      }`}
                    >
                      <GalleryImage
                        key={`${item.id}-thumbnail`}
                        src={thumbnail.src}
                        alt={thumbnail.alt}
                        sizes="(max-width: 640px) 72vw, (max-width: 1024px) 40vw, 20vw"
                        className="rounded-md shadow-none"
                      />
                      <span className="mt-2 block truncate text-sm font-medium text-slate-ink">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-ink/60">
                {content.note}
              </p>
            </>
          )}
        </Container>
      </Section>

      {lightboxOpen && activeItem && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxOpen(false);
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col items-center gap-4 sm:max-h-[calc(100dvh-4rem)]"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.stopPropagation();
              }
            }}
          >
            <div className="flex w-full items-center justify-between gap-4">
              <h2
                id="gallery-lightbox-title"
                className="min-w-0 truncate font-heading text-lg font-semibold text-copy sm:text-xl"
              >
                {activeItem.title}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label={controlLabels.close}
                onClick={() => setLightboxOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-copy/10 text-copy transition-colors hover:bg-copy/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative w-full max-w-5xl">
              <GalleryImage
                key={`${activeItem.id}-lightbox`}
                src={activeItem.image.src}
                alt={activeItem.image.alt}
                sizes="(max-width: 1024px) 88vw, 78vw"
                className="max-h-[calc(100dvh-10rem)] w-full max-w-5xl"
              />
              <GalleryArrow
                direction="previous"
                label={`${controlLabels.previous}: ${activeItem.title}`}
                onClick={() => showItem(activeIndex - 1)}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2"
              />
              <GalleryArrow
                direction="next"
                label={`${controlLabels.next}: ${activeItem.title}`}
                onClick={() => showItem(activeIndex + 1)}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2"
              />
            </div>

            <p className="max-w-3xl text-center text-sm leading-6 text-copy/75">
              {activeItem.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
