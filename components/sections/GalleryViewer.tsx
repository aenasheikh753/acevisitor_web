"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Container from "@/components/ui/Container";
import Headline from "@/components/ui/Headline";
import { Icon } from "@/components/ui/IconBox";
import ImageSlot from "@/components/ui/ImageSlot";
import Section from "@/components/ui/Section";
import type { GalleryContent } from "@/lib/types";

const controlLabels = {
  expand: "Expand image",
  close: "Close expanded image",
  previous: "Previous gallery image",
  next: "Next gallery image",
};

/**
 * Every gallery image sits in the same 3:2 frame, so the stage and the rail never
 * change size between items. "cover" fills the frame (trimming a little from the
 * wider or taller files); "contain" shows the whole file (used full-screen).
 */
function GalleryImage({
  src,
  alt,
  sizes,
  className = "",
  fit = "cover",
  quality,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  fit?: "cover" | "contain";
  quality?: number;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasFailed = failedSrc === src;

  return (
    <div className={`relative aspect-[3/2] w-full overflow-hidden ${className}`}>
      {hasFailed ? (
        <ImageSlot alt={alt} aspectRatio="3 / 2" className="absolute inset-0 h-full w-full rounded-none border-0 shadow-none" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}

/** Arch-topped arrow button, in the site's button shape. */
function GalleryArrow({
  direction,
  label,
  onClick,
  tone = "light",
  className = "",
}: {
  direction: "previous" | "next";
  label: string;
  onClick: () => void;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`pressable group grid h-11 w-11 place-items-center rounded-t-3xl rounded-b-md border ${
        tone === "light"
          ? "border-spruce/25 bg-paper text-spruce hover:border-spruce hover:bg-spruce hover:text-linen"
          : "border-linen/25 bg-spruce-2 text-linen hover:border-linen hover:bg-linen hover:text-spruce"
      } ${className}`}
    >
      <Icon
        icon={direction === "previous" ? "arrow-left" : "arrow-right"}
        className={`h-5 w-5 transition-transform duration-200 ${
          direction === "previous" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
        }`}
      />
    </button>
  );
}

/** The small doorway that marks the current exhibit. */
function ArchMarker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 20" aria-hidden="true" className={className} fill="currentColor">
      <path d="M0 20V8a8 8 0 0 1 16 0v12H0Z" />
    </svg>
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
  const tabListRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
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

  // On small screens the tab row and rail scroll sideways: keep the current item in view.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (const list of [tabListRef.current, railRef.current]) {
      if (!list || list.scrollWidth <= list.clientWidth) continue;
      const child = list.children[activeIndex] as HTMLElement | undefined;
      if (!child) continue;
      const listBox = list.getBoundingClientRect();
      const childBox = child.getBoundingClientRect();
      if (childBox.left < listBox.left || childBox.right > listBox.right) {
        list.scrollBy({ left: childBox.left - listBox.left - 16, behavior: reduceMotion ? "auto" : "smooth" });
      }
    }
  }, [activeIndex]);

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

  /** Three prints fanned like a stack on a table (hero decoration). */
  const fan = visibleItems.slice(0, 3);
  const fanPlacement = [
    "left-0 top-10 -rotate-6",
    "left-1/2 top-0 -translate-x-1/2 rotate-2 z-10",
    "right-0 top-14 rotate-6",
  ];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <Section tone="dark" spacing="hero" className="relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-6">
              <p className="margin-note text-clay-light">{content.eyebrow}</p>
              <h1 className="mt-7 text-h1 text-linen">
                <Headline text={content.title} animated emphasisClassName="text-clay-light" />
              </h1>
              <p className="mt-7 max-w-xl text-body text-linen/75 sm:text-lead">{content.description}</p>
            </div>

            {fan.length > 0 ? (
              <div aria-hidden="true" className="relative mx-auto h-56 w-full max-w-lg sm:h-64 lg:col-span-6">
                <div className="arch absolute inset-x-16 bottom-0 top-4 border border-clay-light/25 sm:inset-x-24" />
                {fan.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute w-44 rounded-md bg-paper p-1.5 shadow-[var(--shadow-offset-dark)] sm:w-56 ${fanPlacement[index]}`}
                  >
                    <GalleryImage
                      src={(item.thumbnail ?? item.image).src}
                      alt=""
                      sizes="224px"
                      className="rounded-sm"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* ---------- Exhibition ---------- */}
      <Section tone="linen" className="overflow-hidden">
        <Container>
          {visibleItems.length === 0 ? (
            <div className="arch-soft mx-auto max-w-2xl border border-spruce/15 bg-paper p-8 pt-14 text-center sm:p-12 sm:pt-16">
              <h2 className="text-h3 text-spruce">{emptyState.title}</h2>
              <p className="mx-auto mt-3 max-w-xl text-body text-spruce/75">{emptyState.description}</p>
            </div>
          ) : (
            <>
              <div
                className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10"
                onKeyDown={handleGalleryKeyDown}
                tabIndex={0}
              >
                {/* Exhibit index */}
                <div className="min-w-0 lg:col-span-4 lg:pt-10">
                  <div
                    ref={tabListRef}
                    role="tablist"
                    aria-label={content.title}
                    className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-spruce/15 lg:px-0 lg:pb-0"
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
                          className={`group flex shrink-0 items-center gap-3 rounded-t-2xl rounded-b-sm px-4 py-2.5 text-left transition-colors duration-200 lg:w-full lg:rounded-none lg:border-b lg:border-spruce/15 lg:px-1 lg:py-4 ${
                            selected
                              ? "bg-spruce text-linen lg:bg-transparent lg:text-spruce"
                              : "text-spruce/65 hover:text-spruce"
                          }`}
                        >
                          <ArchMarker
                            className={`hidden h-5 w-4 shrink-0 transition-colors duration-200 lg:block ${
                              selected ? "text-clay" : "text-spruce/15 group-hover:text-spruce/35"
                            }`}
                          />
                          <span
                            className={`whitespace-nowrap font-display text-lg leading-tight lg:text-2xl ${
                              selected ? "lg:italic" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-6 hidden max-w-xs text-sm leading-relaxed text-stone lg:block">{content.note}</p>
                </div>

                {/* Stage */}
                {activeItem && (
                  <div
                    id="gallery-item-panel"
                    role="tabpanel"
                    aria-labelledby={`gallery-tab-${activeIndex}`}
                    tabIndex={0}
                    className="min-w-0 lg:col-span-8"
                  >
                    <div className="relative mx-auto max-w-2xl pt-10 sm:pt-14">
                      {/* The doorway the print hangs in front of */}
                      <div aria-hidden="true" className="arch absolute inset-x-8 bottom-16 top-0 bg-spruce sm:inset-x-16" />
                      <div aria-hidden="true" className="arch absolute inset-x-14 bottom-16 top-6 border border-clay-light/25 sm:inset-x-24 sm:top-8" />

                      {/* The matted print — always the same 3:2 size */}
                      <div className="relative rounded-lg bg-paper p-2 shadow-[var(--shadow-offset)] sm:p-3">
                        <GalleryImage
                          key={activeItem.id}
                          src={activeItem.image.src}
                          alt={activeItem.image.alt}
                          sizes="(min-width: 768px) 648px, 92vw"
                          quality={90}
                          className="rounded-md bg-sage-soft"
                        />
                        <button
                          ref={expandButtonRef}
                          type="button"
                          aria-label={`${controlLabels.expand}: ${activeItem.title}`}
                          onClick={() => setLightboxOpen(true)}
                          className="pressable absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-t-3xl rounded-b-md bg-spruce text-linen shadow-[var(--shadow-offset-sm)] hover:bg-clay sm:bottom-6 sm:right-6 [--focus:var(--clay)]"
                        >
                          <Maximize2 className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Caption card */}
                    <div
                      aria-live="polite"
                      className="mx-auto mt-6 flex max-w-2xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
                    >
                      <div className="min-w-0 border-l-2 border-brass pl-5">
                        <h2 className="text-h3 text-spruce sm:text-3xl">{activeItem.title}</h2>
                        <p className="mt-2 max-w-md text-body text-spruce/75">{activeItem.description}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="min-w-14 text-center font-display text-xl italic tabular-nums text-clay">
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

              {/* Rail: identical thumbnails, the current one under a small arch */}
              <div ref={railRef} className="-mx-4 mt-16 flex snap-x gap-4 overflow-x-auto px-4 pb-3 pt-4 lg:mx-0 lg:mt-20 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
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
                      className={`lift relative w-44 shrink-0 snap-start rounded-lg p-1.5 text-left sm:w-52 lg:w-auto ${
                        selected ? "bg-spruce" : "bg-paper ring-1 ring-spruce/10"
                      }`}
                    >
                      {selected ? (
                        <ArchMarker className="absolute -top-4 left-1/2 h-5 w-4 -translate-x-1/2 text-clay" />
                      ) : null}
                      <GalleryImage
                        key={`${item.id}-thumbnail`}
                        src={thumbnail.src}
                        alt={thumbnail.alt}
                        sizes="(min-width: 1024px) 240px, 208px"
                        className="rounded-md"
                      />
                      <span className={`mt-2 block truncate px-1 pb-0.5 text-sm font-medium ${selected ? "text-linen" : "text-spruce"}`}>
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone lg:hidden">{content.note}</p>
            </>
          )}
        </Container>
      </Section>

      {/* ---------- Full-screen view ---------- */}
      {lightboxOpen && activeItem && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-spruce/95 p-4 backdrop-blur-sm sm:p-8 [--focus:var(--clay-light)]"
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
            className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col items-center gap-4 sm:max-h-[calc(100dvh-4rem)]"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.stopPropagation();
              }
            }}
          >
            <div className="flex w-full items-center justify-between gap-4">
              <h2 id="gallery-lightbox-title" className="min-w-0 truncate font-display text-xl text-linen sm:text-2xl">
                {activeItem.title}
                <span className="ml-3 font-display text-base italic text-clay-light">
                  {activeIndex + 1} / {visibleItems.length}
                </span>
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label={controlLabels.close}
                onClick={() => setLightboxOpen(false)}
                className="pressable grid h-11 w-11 shrink-0 place-items-center rounded-t-3xl rounded-b-md border border-linen/25 text-linen hover:bg-linen hover:text-spruce"
              >
                <Icon icon="x" className="h-5 w-5" />
              </button>
            </div>

            <div className="relative w-full rounded-lg bg-spruce-2 p-2 sm:p-3">
              <GalleryImage
                key={`${activeItem.id}-lightbox`}
                src={activeItem.image.src}
                alt={activeItem.image.alt}
                sizes="(max-width: 1024px) 92vw, 1000px"
                fit="contain"
                className="max-h-[calc(100dvh-12rem)]"
              />
              <GalleryArrow
                direction="previous"
                tone="dark"
                label={`${controlLabels.previous}: ${activeItem.title}`}
                onClick={() => showItem(activeIndex - 1)}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2"
              />
              <GalleryArrow
                direction="next"
                tone="dark"
                label={`${controlLabels.next}: ${activeItem.title}`}
                onClick={() => showItem(activeIndex + 1)}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2"
              />
            </div>

            <p className="max-w-2xl text-center text-body text-linen/75">{activeItem.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
