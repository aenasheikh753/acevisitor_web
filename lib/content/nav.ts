import type { LinkContent } from "@/lib/types";

export const navContent = {
  brand: "AceVisitor",
  metadataTitle: "AceVisitor | Visitor management, made seamless",
  metadataTemplate: "%s | AceVisitor",
  metadataDescription:
    "A secure, enterprise-ready visitor management platform for every entrance and every site.",
  links: [
    { label: "Home", href: "/" },
    { label: "Platform", href: "/platform" },
    { label: "Gallery", href: "/gallery" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Security", href: "/security" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies LinkContent[],
  login: "Login",
  demo: "Request a demo",
  menuOpen: "Open navigation menu",
  menuClose: "Close navigation menu",
  navigationLabel: "Main navigation",
};
