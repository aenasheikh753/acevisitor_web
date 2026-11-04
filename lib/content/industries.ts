import type { FeatureContent, PageHeroContent } from "@/lib/types";

export const industriesContent = {
  hero: {
    eyebrow: "Industries",
    title: "A welcome that respects every environment.",
    description:
      "Support the needs of your people, visitors, and facilities with workflows that bring consistency to complex places.",
    actionLabel: "Find your fit",
    actionHref: "/contact",
  } satisfies PageHeroContent,
  heroImageAlt: "Visitor management adapted to a range of enterprise environments",
  industries: [
    { icon: "building", title: "Corporate offices", description: "Keep everyday visits professional, predictable, and easy to manage.", bullets: ["Client and guest arrivals", "Host notifications", "Multi-office visibility"] },
    { icon: "health", title: "Healthcare", description: "Support a considerate welcome in environments with sensitive operations.", bullets: ["Clear visitor records", "Consistent check-in steps", "Role-aware workflows"] },
    { icon: "school", title: "Education", description: "Help campus teams coordinate guests, vendors, and scheduled visits.", bullets: ["Campus visitor registration", "Host and staff coordination", "Entrance-level visibility"] },
    { icon: "building", title: "Government", description: "Bring structure and accountability to public-sector visitor operations.", bullets: ["Defined arrival workflows", "Role-based responsibilities", "Audit-friendly activity"] },
    { icon: "monitor", title: "Data centers", description: "Give teams clear context for planned visits to controlled facilities.", bullets: ["Visitor and host context", "Policy acknowledgement", "Central activity records"] },
    { icon: "contractor", title: "Construction & industrial", description: "Coordinate contractors and guests across active, changing sites.", bullets: ["Contractor visit details", "Site-specific check-in", "Consistent visitor identification"] },
  ] satisfies (FeatureContent & { bullets: string[] })[],
  cta: {
    title: "Your environment is unique. Your visitor experience should be, too.",
    description: "Let’s explore how AceVisitor can support the way your sites operate.",
    primaryLabel: "Talk to our team",
    primaryHref: "/contact",
    secondaryLabel: "View solutions",
    secondaryHref: "/solutions",
  },
};
