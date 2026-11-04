import type { FeatureContent, PageHeroContent } from "@/lib/types";

export const platformContent = {
  hero: {
    eyebrow: "The AceVisitor platform",
    title: "A connected system for every visitor touchpoint.",
    description:
      "Bring invitations, arrivals, approvals, badges, and reporting into one calm, consistent operating experience.",
    actionLabel: "Talk to our team",
    actionHref: "/contact",
  } satisfies PageHeroContent,
  heroImageAlt: "AceVisitor platform overview with real-time visitor operations",
  capabilitiesTitle: "The essentials, thoughtfully connected.",
  capabilitiesEyebrow: "A connected toolkit",
  capabilitiesDescription:
    "Give every team the tools to welcome, verify, and understand visitors without adding complexity at the front door.",
  capabilities: [
    { icon: "calendar", title: "Pre-registration", description: "Capture visit details in advance and help guests arrive prepared." },
    { icon: "monitor", title: "Reception check-in", description: "Keep a real-time guest list and make assisted check-in simple." },
    { icon: "door", title: "Self-service kiosk", description: "Guide visitors through an accessible, step-by-step arrival flow." },
    { icon: "user-check", title: "Host approvals", description: "Notify hosts and route the decisions that keep visits moving." },
    { icon: "badge", title: "Badge management", description: "Create clear visitor credentials that support your on-site process." },
    { icon: "shield", title: "Policy workflows", description: "Present agreements and retain confirmation as part of the visit record." },
    { icon: "contractor", title: "Partner visits", description: "Apply consistent arrival workflows to contractors and vendors." },
    { icon: "audit", title: "Operational reporting", description: "Review site activity and maintain a dependable record of events." },
  ] satisfies FeatureContent[],
  liveView: {
    eyebrow: "For the front desk",
    title: "A live view that helps the day run smoothly.",
    description:
      "See who is expected, who has arrived, which hosts need to respond, and what needs attention — all in one practical workspace.",
    imageAlt: "Live front desk view of expected guests, arrivals, and pending approvals",
    cards: [
      { icon: "clock", title: "Know what is next", description: "Prepare for scheduled arrivals before they reach reception." },
      { icon: "message", title: "Keep people connected", description: "Make guest and host communication part of the same workflow." },
      { icon: "search", title: "Find the right context", description: "Bring key visit details into view when the team needs them." },
    ] satisfies FeatureContent[],
  },
  kiosk: {
    eyebrow: "For the entrance",
    title: "Self-service that still feels personal.",
    description:
      "A clear kiosk experience helps visitors check in confidently, while your team stays informed and in control.",
    imageAlt: "Guest using the AceVisitor kiosk to check in and receive a badge",
  },
  governance: {
    eyebrow: "For administrators",
    title: "Consistent governance without slowing teams down.",
    description:
      "Set shared standards, manage roles, and understand activity across locations with tools that support accountable operations.",
    cards: [
      { icon: "layers", title: "Organization structure", description: "Model sites and teams in a way that reflects how your organization works." },
      { icon: "key", title: "Role-based access", description: "Apply clear user permissions and keep responsibilities easy to understand." },
      { icon: "audit", title: "Audit-ready records", description: "Review meaningful activity across visitor workflows and administration." },
    ] satisfies FeatureContent[],
  },
  cta: {
    title: "Bring every visitor workflow together.",
    description: "Let’s map the right platform experience for your people, sites, and arrival points.",
    primaryLabel: "Request a demo",
    primaryHref: "/contact",
    secondaryLabel: "Explore solutions",
    secondaryHref: "/solutions",
  },
};
