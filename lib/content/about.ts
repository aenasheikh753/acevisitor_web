import type { FeatureContent, PageHeroContent } from "@/lib/types";

export const aboutContent = {
  hero: {
    eyebrow: "About AceVisitor",
    title: "A more human way to manage the front door.",
    description:
      "We believe welcoming people and running secure sites should work together — with less friction for guests and more clarity for teams.",
  } satisfies PageHeroContent,
  heroImageAlt: "AceVisitor team and workplace welcoming visitors",
  story: {
    eyebrow: "Our point of view",
    title: "Every visit is a moment that matters.",
    paragraphs: [
      "The first few minutes at a workplace shape how people feel about the organization they came to see. Yet visitor processes are often spread across paper logs, email threads, and disconnected tools.",
      "AceVisitor brings those moments into one thoughtful experience: clear for guests, useful for on-site teams, and visible to the people responsible for the wider program.",
      "Our focus is simple — make it easier for organizations to welcome people well while keeping daily operations accountable and consistent.",
    ],
  },
  principles: [
    { icon: "users", title: "People first", description: "Make the visitor experience welcoming and the staff experience practical." },
    { icon: "layers", title: "Clarity at scale", description: "Connect local operations with an understandable organization-wide view." },
    { icon: "shield", title: "Trust through design", description: "Build responsible processes into the way teams manage each visit." },
  ] satisfies FeatureContent[],
  cta: {
    title: "Let's make your front door work better.",
    description: "Tell us what a great visitor experience looks like for your organization.",
    primaryLabel: "Get in touch",
    primaryHref: "/contact",
    secondaryLabel: "Explore the platform",
    secondaryHref: "/platform",
  },
};
