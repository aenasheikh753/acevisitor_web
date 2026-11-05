import { apiFetch } from "@/lib/api/client";
import { apiConfig } from "@/lib/config";
import { galleryContent } from "@/lib/content/gallery";
import type { GalleryContent, GalleryItem } from "@/lib/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isImage(value: unknown): value is { src: string; alt: string } {
  return (
    isRecord(value) &&
    typeof value.src === "string" &&
    value.src.length > 0 &&
    typeof value.alt === "string" &&
    value.alt.length > 0
  );
}

function isGalleryItem(value: unknown): value is GalleryItem {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.order === "number" &&
    Number.isFinite(value.order) &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    isImage(value.image) &&
    (value.thumbnail === undefined || isImage(value.thumbnail)) &&
    typeof value.isVisible === "boolean"
  );
}

function isGalleryContent(value: unknown): value is GalleryContent {
  return (
    isRecord(value) &&
    typeof value.eyebrow === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.ctaLabel === "string" &&
    typeof value.ctaHref === "string" &&
    typeof value.note === "string" &&
    Array.isArray(value.items) &&
    value.items.every(isGalleryItem)
  );
}

export async function getGalleryContent(): Promise<GalleryContent> {
  let content = galleryContent;

  if (apiConfig.baseUrl) {
    try {
      const response = await apiFetch<unknown>("/gallery", {
        next: { revalidate: 60 },
      });

      if (!isGalleryContent(response)) {
        throw new Error("The gallery API returned an invalid response shape.");
      }

      content = response;
    } catch (error) {
      console.error("Unable to load gallery content; using local content.", error);
    }
  }

  return {
    ...content,
    items: content.items
      .filter((item) => item.isVisible)
      .sort((first, second) => first.order - second.order),
  };
}
