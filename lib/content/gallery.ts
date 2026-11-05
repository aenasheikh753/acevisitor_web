import type { GalleryContent } from "@/lib/types";

export const galleryEmptyState = {
  title: "No gallery items are available yet.",
  description: "Please check back soon to explore AceVisitor in focus.",
};

export const galleryContent: GalleryContent = {
  eyebrow: "INSIDE ACEVISITOR",
  title: "AceVisitor in focus",
  description:
    "Explore the experiences that help visitors feel expected and help teams stay on top of the day.",
  ctaLabel: "Request a demo",
  ctaHref: "/contact",
  note: "Illustrative product views. Any people or records shown are fictional.",
  items: [
    {
      id: "front-desk-check-in",
      order: 1,
      title: "Front desk & check-in",
      description:
        "A live, practical view for welcoming and managing expected guests.",
      image: {
        src: "/images/gallery/front-desk-check-in.webp",
        alt: "Visitor check-in and front desk operations dashboard",
      },
      thumbnail: {
        src: "/images/gallery/front-desk-check-in.webp",
        alt: "Preview of the front desk and check-in experience",
      },
      isVisible: true,
    },
    {
      id: "visitor-badges",
      order: 2,
      title: "Visitor badges",
      description:
        "Clear, professional identification that supports your arrival workflow.",
      image: {
        src: "/images/gallery/visitor-badges.webp",
        alt: "Branded visitor badge layout with visitor and host details",
      },
      thumbnail: {
        src: "/images/gallery/visitor-badges.webp",
        alt: "Preview of visitor badges",
      },
      isVisible: true,
    },
    {
      id: "host-approvals",
      order: 3,
      title: "Host approvals",
      description:
        "Keep hosts informed and make pending decisions easier to see.",
      image: {
        src: "/images/gallery/host-approvals.webp",
        alt: "Host approval notification and visit details interface",
      },
      thumbnail: {
        src: "/images/gallery/host-approvals.webp",
        alt: "Preview of host approvals",
      },
      isVisible: true,
    },
    {
      id: "multi-site-operations",
      order: 4,
      title: "Multi-site operations",
      description:
        "See activity across locations while preserving local context.",
      image: {
        src: "/images/gallery/multi-site-operations.webp",
        alt: "Multi-site visitor operations overview with locations and activity",
      },
      thumbnail: {
        src: "/images/gallery/multi-site-operations.webp",
        alt: "Preview of multi-site operations",
      },
      isVisible: true,
    },
    {
      id: "management-console",
      order: 5,
      title: "Management console",
      description:
        "Manage users, roles, sites, and visitor program settings in one place.",
      image: {
        src: "/images/gallery/management-console.webp",
        alt: "AceVisitor administrator management console",
      },
      thumbnail: {
        src: "/images/gallery/management-console.webp",
        alt: "Preview of the management console",
      },
      isVisible: true,
    },
  ],
};
