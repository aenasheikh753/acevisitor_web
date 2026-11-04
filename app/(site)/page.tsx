import ArrivalPoints from "@/components/sections/ArrivalPoints";
import Capabilities from "@/components/sections/Capabilities";
import GalleryPreview from "@/components/sections/GalleryPreview";
import HomeHero from "@/components/sections/HomeHero";
import MultiSiteSection from "@/components/sections/MultiSiteSection";
import PlatformShowcase from "@/components/sections/PlatformShowcase";
import SecuritySection from "@/components/sections/SecuritySection";
import VisitorJourney from "@/components/sections/VisitorJourney";
import CTABanner from "@/components/ui/CTABanner";
import IconBox from "@/components/ui/IconBox";
import { getHomeContent } from "@/lib/api/content";

export default async function HomePage() {
  const content = await getHomeContent();
  const { cta } = content;

  return (
    <>
      <HomeHero content={content} />
      <VisitorJourney content={content} />
      <Capabilities content={content} />
      <PlatformShowcase content={content} />
      <SecuritySection content={content} />
      <MultiSiteSection content={content} />
      <ArrivalPoints content={content} />
      <GalleryPreview content={content} />
      <CTABanner
        title={cta.title}
        description={cta.description}
        primary={{ label: cta.primaryLabel, href: cta.primaryHref }}
        secondary={{ label: cta.secondaryLabel, href: cta.secondaryHref }}
        icon={<IconBox icon="arrow-up-right" size="sm" />}
      />
    </>
  );
}
