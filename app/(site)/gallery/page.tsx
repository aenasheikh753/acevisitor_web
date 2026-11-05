import GalleryViewer from "@/components/sections/GalleryViewer";
import { getGalleryContent } from "@/lib/api/gallery";
import { galleryEmptyState } from "@/lib/content/gallery";

export default async function GalleryPage() {
  const content = await getGalleryContent();

  return <GalleryViewer content={content} emptyState={galleryEmptyState} />;
}
