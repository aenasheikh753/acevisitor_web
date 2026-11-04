import GalleryCarousel from "@/components/sections/GalleryCarousel";
import PageHero from "@/components/ui/PageHero";
import { getGalleryContent } from "@/lib/api/content";

export default async function GalleryPage() {
  const content = await getGalleryContent();

  return (
    <>
      <PageHero {...content.hero} />
      <GalleryCarousel content={content} />
    </>
  );
}
