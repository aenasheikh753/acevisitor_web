import type { FeatureContent, PageHeroContent } from "@/lib/types";

export const securityContent = {
  hero: {
    eyebrow: "Security & governance",
    title: "Accountable visitor operations, by design.",
    description:
      "Support the controls your organization expects with clear access boundaries, deliberate workflows, and a dependable record of activity.",
    actionLabel: "Talk security with us",
    actionHref: "/contact",
  } satisfies PageHeroContent,
  heroImageAlt: "Security and governance controls in a visitor management workspace",
  intro: {
    eyebrow: "Responsible by design",
    title: "Make good operating practices easier to follow.",
    description:
      "AceVisitor helps teams apply consistent visitor processes while giving administrators a clearer view of how those processes are used.",
  },
  controls: [
    { icon: "layers", title: "Tenant separation", description: "Maintain appropriate separation between organizations and their operating data." },
    { icon: "key", title: "Role-based access control", description: "Align access with each user's responsibilities and the sites they support." },
    { icon: "lock", title: "Multi-factor authentication", description: "Add an additional identity check for user access where your organization requires it." },
    { icon: "audit", title: "Immutable audit logging", description: "Preserve an accountable history of important activity for review and investigation." },
    { icon: "shield", title: "Data protection", description: "Apply responsible handling practices to visitor information throughout its lifecycle." },
  ] satisfies FeatureContent[],
  cta: {
    title: "Have specific governance requirements?",
    description: "Talk with our team about the controls and operating practices your program needs.",
    primaryLabel: "Contact our team",
    primaryHref: "/contact",
    secondaryLabel: "Explore the platform",
    secondaryHref: "/platform",
  },
};
