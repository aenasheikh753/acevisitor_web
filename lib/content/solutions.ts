import type { FeatureContent, PageHeroContent } from "@/lib/types";

export const solutionsContent = {
  hero: {
    eyebrow: "Solutions",
    title: "Visitor operations that fit the way your sites work.",
    description:
      "Create a consistent welcome while giving each team the workflows and visibility their environment needs.",
    actionLabel: "Discuss your program",
    actionHref: "/contact",
  } satisfies PageHeroContent,
  heroImageAlt: "Visitor management solution connecting multiple workplace entrances",
  rows: [
    {
      eyebrow: "Distributed operations",
      title: "Multi-site programs",
      imageSlug: "multi-site-programs",
      description:
        "Standardize the essential visitor experience across locations, while keeping site-level operations clear and practical.",
      imageAlt: "Enterprise teams monitoring visitor activity across multiple sites",
      checklist: ["Shared operating standards", "Site-level visitor visibility", "Consistent reporting and oversight"],
    },
    {
      eyebrow: "Third-party access",
      title: "Contractor and vendor access",
      imageSlug: "contractor-vendor-access",
      description:
        "Bring recurring partners into a more organized arrival process with visit context, host coordination, and policy acknowledgement.",
      imageAlt: "Contractor check-in workflow with site policies and host coordination",
      checklist: ["Structured visit details", "Clear host and approval steps", "Digital policy acknowledgement"],
    },
    {
      eyebrow: "Daily welcome",
      title: "Front desk operations",
      imageSlug: "front-desk-operations",
      description:
        "Reduce repetitive tasks and help reception teams deliver a thoughtful, professional welcome throughout the day.",
      imageAlt: "Reception team using a visitor management front desk dashboard",
      checklist: ["Fast assisted check-in", "Live arrivals and notifications", "Clear visitor badges and records"],
    },
  ],
  outcomes: {
    eyebrow: "Better outcomes",
    title: "More confidence at the door. More clarity everywhere else.",
    items: [
      { icon: "sparkles", title: "A consistent welcome", description: "Visitors know what to expect at every location and entrance." },
      { icon: "clock", title: "Less front desk friction", description: "Teams spend less time chasing details and more time helping people." },
      { icon: "map", title: "A clearer operating picture", description: "Leaders and local teams can work from better visitor context." },
    ] satisfies FeatureContent[],
  },
  cta: {
    title: "Build a visitor program that works across your sites.",
    description: "Talk with our team about the workflows your locations need.",
    primaryLabel: "Request a demo",
    primaryHref: "/contact",
    secondaryLabel: "View the platform",
    secondaryHref: "/platform",
  },
};
