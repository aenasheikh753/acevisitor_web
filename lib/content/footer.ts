import type { LinkContent } from "@/lib/types";

export const footerContent = {
  summary:
    "A calmer, clearer way to welcome every visitor — across every entrance and every site.",
  productLabel: "Product",
  companyLabel: "Company",
  contactLabel: "Get in touch",
  productLinks: [
    { label: "Platform", href: "/platform" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Gallery", href: "/gallery" },
  ] satisfies LinkContent[],
  companyLinks: [
    { label: "About", href: "/about" },
    { label: "Security", href: "/security" },
    { label: "Contact", href: "/contact" },
  ] satisfies LinkContent[],
  contactHref: "/contact",
  contactCta: "Talk with our team",
  copyright: "© 2026 AceVisitor. All rights reserved.",
  privacy: "Privacy",
  terms: "Terms",
};
