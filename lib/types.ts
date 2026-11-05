import type { aboutContent } from "@/lib/content/about";
import type { adminContent } from "@/lib/content/admin";
import type { authContent } from "@/lib/content/auth";
import type { chatContent } from "@/lib/content/chat";
import type { contactContent } from "@/lib/content/contact";
import type { footerContent } from "@/lib/content/footer";
import type { homeContent } from "@/lib/content/home";
import type { industriesContent } from "@/lib/content/industries";
import type { navContent } from "@/lib/content/nav";
import type { platformContent } from "@/lib/content/platform";
import type { securityContent } from "@/lib/content/security";
import type { solutionsContent } from "@/lib/content/solutions";

export type IconName =
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up-right"
  | "audit"
  | "badge"
  | "building"
  | "calendar"
  | "check"
  | "chevron-down"
  | "clock"
  | "contractor"
  | "door"
  | "globe"
  | "health"
  | "id"
  | "key"
  | "layers"
  | "lock"
  | "map"
  | "menu"
  | "message"
  | "monitor"
  | "school"
  | "search"
  | "shield"
  | "sparkles"
  | "user-check"
  | "users"
  | "x";

export type FeatureContent = {
  icon: IconName;
  title: string;
  description: string;
};

export type BulletContent = {
  title: string;
  description?: string;
};

export type LinkContent = {
  label: string;
  href: string;
};

export type PageHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  proofLine?: string;
};

export type GalleryItem = {
  id: string;
  order: number;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  thumbnail?: {
    src: string;
    alt: string;
  };
  isVisible: boolean;
};

export type GalleryContent = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  note: string;
  items: GalleryItem[];
};

export type AboutContent = typeof aboutContent;
export type AdminContent = typeof adminContent;
export type AuthContent = typeof authContent;
export type ChatContent = typeof chatContent;
export type ContactContent = typeof contactContent;
export type FooterContent = typeof footerContent;
export type HomeContent = typeof homeContent;
export type IndustriesContent = typeof industriesContent;
export type NavContent = typeof navContent;
export type PlatformContent = typeof platformContent;
export type SecurityContent = typeof securityContent;
export type SolutionsContent = typeof solutionsContent;
