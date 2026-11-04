import type { PageHeroContent } from "@/lib/types";

export const galleryContent = {
  hero: {
    eyebrow: "Product gallery",
    title: "Thoughtful details at every touchpoint.",
    description:
      "Explore the experiences that help visitors feel expected and help teams stay on top of the day.",
  } satisfies PageHeroContent,
  slides: [
    { title: "Front desk & check-in", description: "A live, practical view for welcoming and managing expected guests.", alt: "Visitor check-in and front desk operations dashboard", src: "/images/gallery/front-desk-check-in.webp" },
    { title: "Visitor badges", description: "Clear, professional identification that supports your arrival workflow.", alt: "Branded visitor badge layout with visitor and host details", src: "/images/gallery/visitor-badges.webp" },
    { title: "Host approvals", description: "Keep hosts informed and make pending decisions easier to see.", alt: "Host approval notification and visit details interface", src: "/images/gallery/host-approvals.webp" },
    { title: "Multi-site operations", description: "See activity across locations while preserving local context.", alt: "Multi-site visitor operations overview with locations and activity", src: "/images/gallery/multi-site-operations.webp" },
    { title: "Management console", description: "Manage users, roles, sites, and visitor program settings in one place.", alt: "AceVisitor administrator management console", src: "/images/gallery/management-console.webp" },
  ],
  previous: "Show previous gallery item",
  next: "Show next gallery item",
  select: "Show gallery item",
};
