import type {
  FeatureContent,
  GalleryVisualContent,
  HeroVisualContent,
  IconName,
  MultiSiteVisualContent,
  PageHeroContent,
  SecurityVisualContent,
  ShowcaseVisualContent,
} from "@/lib/types";

export const homeContent = {
  hero: {
    eyebrow: "Visitor management for modern enterprise",
    title: "Control every entrance, across every site.",
    description:
      "Give every guest a confident welcome. Give every team a clearer view of who is on site, why they are here, and what happens next.",
    actionLabel: "Request a demo",
    actionHref: "/contact",
    proofLine: "One platform, every entrance.",
  } satisfies PageHeroContent,
  heroImageAlt:
    "AceVisitor operations dashboard showing today's arrivals, site activity, and visitor status",
  heroVisual: {
    srDescription:
      "Illustration of the AceVisitor site overview: live visitor counts, today's arrival activity, a printed visitor badge, and a host approving an arrival.",
    windowTitle: "Site overview · Dallas HQ",
    liveLabel: "Live",
    stats: [
      { label: "On site", value: "42", trend: "+6", trendDirection: "up" },
      { label: "Expected", value: "18", trend: "+3", trendDirection: "up" },
      { label: "Pending", value: "3", trend: "−2", trendDirection: "down" },
    ],
    chartTitle: "Arrivals today",
    chartCaption: "07:00 – 18:00",
    chartBars: [34, 52, 44, 72, 63, 88, 58, 76, 49, 66, 82, 60],
    visitorsTitle: "Recent visitors",
    visitors: [
      { initials: "AR", name: "Amira Rahman", detail: "Meeting · Main entrance", status: "approved", statusLabel: "Approved" },
      { initials: "DK", name: "Daniel Kowalski", detail: "Contractor · Loading dock", status: "checked-in", statusLabel: "Checked in" },
      { initials: "LM", name: "Lena Morales", detail: "Interview · Lobby B", status: "expected", statusLabel: "Expected" },
    ],
    badge: {
      label: "Visitor",
      name: "Amira Rahman",
      company: "Northwind Partners",
      host: "Host: James Wilson",
      valid: "Valid 09:42 – 18:00",
      badgeId: "#V-10248",
    },
    arrival: {
      label: "Visitor arrival",
      name: "Robert Smith",
      company: "Northstar Technology",
      timing: "Arrived 09:42 · Meeting 10:00",
      location: "Dallas HQ · Main lobby",
      ndaLabel: "NDA signed",
      approveLabel: "Approve",
      declineLabel: "Decline",
    },
    toast: "Host approved",
  } satisfies HeroVisualContent,
  journey: {
    eyebrow: "One connected experience",
    title: "A better visit, from first invite to final sign-out.",
    description:
      "Every step is clear for guests and accountable for your team. AceVisitor connects the details without adding friction.",
    steps: [
      { number: "01", icon: "message", title: "Invite", description: "Send a polished invitation with the details guests need." },
      { number: "02", icon: "calendar", title: "Pre-register", description: "Collect visit details and agreements before arrival." },
      { number: "03", icon: "door", title: "Arrive", description: "Offer a welcoming, guided check-in at any entrance." },
      { number: "04", icon: "id", title: "Verify", description: "Confirm identity and visit details with confidence." },
      { number: "05", icon: "check", title: "Agree", description: "Capture policies and acknowledgements digitally." },
      { number: "06", icon: "badge", title: "Badge", description: "Issue a clear, professional visitor badge." },
      { number: "07", icon: "user-check", title: "Host approval", description: "Keep hosts informed and route approvals promptly." },
      { number: "08", icon: "arrow-right", title: "Check out", description: "Close each visit and keep occupancy current." },
      { number: "09", icon: "audit", title: "Audit", description: "Retain a dependable record of site activity." },
    ] satisfies { number: string; icon: IconName; title: string; description: string }[],
  },
  capabilities: {
    eyebrow: "A complete operating layer",
    title: "Everything your front door needs. Nothing it doesn't.",
    description:
      "Replace scattered sign-in processes with one consistent system built for people, policies, and places.",
    items: [
      { icon: "calendar", title: "Visitor pre-registration", description: "Make the first impression before guests reach the door, with simple invitations and clear visit details." },
      { icon: "monitor", title: "Fast check-in", description: "Give reception and self-service kiosks the same smooth, guided arrival experience." },
      { icon: "user-check", title: "Host notifications", description: "Bring hosts into the loop with timely arrival alerts and straightforward approvals." },
      { icon: "badge", title: "Branded visitor badges", description: "Issue polished badges that make identity, host, and access context easy to recognize." },
      { icon: "shield", title: "Policy acknowledgements", description: "Present the right agreements and keep a clear record of visitor acknowledgement." },
      { icon: "contractor", title: "Contractor workflows", description: "Manage recurring partners with visit context, approvals, and consistent check-in." },
      { icon: "map", title: "Multi-site visibility", description: "Understand who is on site across locations without losing local operating detail." },
      { icon: "audit", title: "Live and audit reporting", description: "Make daily operations visible and keep a dependable trail for reviews and response." },
    ] satisfies FeatureContent[],
  },
  showcase: {
    eyebrow: "One platform, every touchpoint",
    title: "A polished arrival, backed by an operations console.",
    description:
      "Welcome guests at reception or self-service. Give teams a live view that keeps arrivals, approvals, badges, and site activity together.",
    imageAlt: "AceVisitor visitor check-in kiosk and front desk management console",
    cards: [
      { icon: "monitor", title: "Front desk console", description: "A live view for the people who keep every arrival moving." },
      { icon: "door", title: "Guided kiosk check-in", description: "An intuitive self-service flow for guests at the door." },
      { icon: "badge", title: "On-brand badges", description: "Clear visitor identification with the details your team needs." },
    ] satisfies FeatureContent[],
    visual: {
      srDescription:
        "Illustration of a self-service check-in kiosk, the front desk console listing today's arrivals, and a printed visitor badge.",
      kiosk: {
        greeting: "Welcome",
        subtitle: "Check in for your visit",
        actions: ["I have an invite", "Scan QR code", "Walk-in visitor"],
      },
      console: {
        title: "Front desk · Today",
        caption: "4 arrivals",
        stats: [
          { label: "On site", value: "42" },
          { label: "Expected", value: "18" },
          { label: "Pending", value: "3" },
        ],
        rows: [
          { initials: "AR", name: "Amira Rahman", host: "James Wilson", time: "09:42", status: "checked-in", statusLabel: "Checked in" },
          { initials: "RS", name: "Robert Smith", host: "Priya Raman", time: "10:00", status: "approved", statusLabel: "Approved" },
          { initials: "LM", name: "Lena Morales", host: "Maria Gomez", time: "10:30", status: "expected", statusLabel: "Expected" },
          { initials: "DK", name: "Daniel Kowalski", host: "Facilities", time: "11:15", status: "expected", statusLabel: "Expected" },
        ],
      },
      badge: { label: "Visitor", name: "Amira Rahman", company: "Northwind Partners", host: "Host: James Wilson" },
      chips: { checkedIn: "Checked in", hostNotified: "Host notified" },
    } satisfies ShowcaseVisualContent,
  },
  security: {
    eyebrow: "Built for responsible operations",
    title: "Security is part of every visit.",
    description:
      "Support consistent policies with clear roles, controlled access, and an audit-ready record of activity across your organization.",
    imageAlt: "Secure visitor management controls in the AceVisitor platform",
    cards: [
      { icon: "layers", title: "Tenant separation", description: "Keep organizational data and operating contexts appropriately separated." },
      { icon: "key", title: "Role-based access", description: "Give each user the access needed for their role and responsibilities." },
      { icon: "audit", title: "Accountable activity", description: "Maintain a traceable history of important visitor and administrative events." },
    ] satisfies FeatureContent[],
    actionLabel: "Explore security",
    actionHref: "/security",
    visual: {
      srDescription:
        "Illustration of the AceVisitor access panel: role permissions, separated organization workspaces, and an audit timeline.",
      title: "Access & audit",
      subtitle: "Dallas HQ workspace",
      mfaLabel: "MFA enforced",
      rolesTitle: "Roles",
      roles: [
        { label: "Administrator", access: "Full access", granted: true },
        { label: "Reception", access: "Check-in & badges", granted: true },
        { label: "Host", access: "Own visitors only", granted: false },
      ],
      workspacesTitle: "Workspaces",
      workspaces: ["Northwind Org", "Contoso Org"],
      isolationLabel: "Isolated",
      auditTitle: "Audit trail",
      audit: [
        { time: "09:42", actor: "Reception", event: "Checked in Amira Rahman", tone: "positive" },
        { time: "09:44", actor: "Host", event: "Approved visit request", tone: "primary" },
        { time: "10:05", actor: "Admin", event: "Updated badge policy", tone: "warning" },
      ],
      chip: "Audit log exported",
    } satisfies SecurityVisualContent,
  },
  multiSite: {
    eyebrow: "Ready to scale with you",
    title: "Local control. Organization-wide clarity.",
    description:
      "Bring sites into one operating model while giving local teams the context and autonomy to run their entrances well.",
    imageAlt: "Multi-site overview showing activity across a distributed enterprise",
    stats: [
      { value: "One", label: "consistent guest experience" },
      { value: "Every", label: "entrance in view" },
      { value: "Clear", label: "local accountability" },
    ],
    actionLabel: "See multi-site solutions",
    actionHref: "/solutions",
    visual: {
      liveLabel: "Live",
      title: "Across all sites",
      counters: [
        { label: "Sites online", value: 24 },
        { label: "Visitors today", value: 1284 },
        { label: "Avg. check-in", value: 38, suffix: "s" },
      ],
      chip: "All sites synced",
    } satisfies MultiSiteVisualContent,
  },
  arrival: {
    eyebrow: "Meet guests where they arrive",
    title: "One welcome, wherever the visit begins.",
    description:
      "Adapt the check-in experience to your space while keeping policies and visitor records connected.",
    items: [
      { icon: "users", title: "Reception desk", description: "Equip reception teams with a live guest list and quick assisted check-in." },
      { icon: "door", title: "Lobby", description: "Make self-service arrivals intuitive, welcoming, and easy to complete." },
      { icon: "shield", title: "Security gate", description: "Give security teams the context to verify visits and respond consistently." },
    ] satisfies FeatureContent[],
  },
  gallery: {
    eyebrow: "See it in action",
    title: "Designed for the moments that matter.",
    description: "Explore the touchpoints that make visitor operations feel effortless.",
    imageAlt: "AceVisitor visitor management product interface preview",
    actionLabel: "Explore the gallery",
    actionHref: "/gallery",
    visual: {
      chips: [
        { icon: "door", label: "Kiosk check-in", detail: "Completed in 32s" },
        { icon: "badge", label: "Badge printed", detail: "Lobby printer" },
        { icon: "user-check", label: "Host approved", detail: "James Wilson" },
      ],
    } satisfies GalleryVisualContent,
  },
  cta: {
    title: "Make every arrival a better experience.",
    description:
      "See how AceVisitor can bring a more confident welcome and a clearer operating picture to your organization.",
    primaryLabel: "Request a demo",
    primaryHref: "/contact",
    secondaryLabel: "Explore the platform",
    secondaryHref: "/platform",
  },
};
