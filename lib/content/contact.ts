import type { PageHeroContent } from "@/lib/types";

export const contactContent = {
  hero: {
    eyebrow: "Contact",
    title: "Let's talk about a better welcome.",
    description:
      "Share a little about your organization and visitor program. Our team will help you explore what a good next step could look like.",
  } satisfies PageHeroContent,
  formTitle: "Tell us what you’re looking for",
  formDescription: "A few details will help us make the conversation useful for your team.",
  nameLabel: "Full name",
  namePlaceholder: "Your name",
  emailLabel: "Work email",
  emailPlaceholder: "you@company.com",
  companyLabel: "Company",
  companyPlaceholder: "Your organization",
  messageLabel: "What would you like to improve?",
  messagePlaceholder: "Tell us about your sites, visitor workflows, or goals.",
  submitLabel: "Send inquiry",
  submittingLabel: "Sending...",
  formNote: "Our team will follow up using the work email you provided.",
  successMessage: "Thanks for reaching out. Our team will be in touch shortly.",
  errorMessage: "We couldn't send your inquiry. Please try again.",
  contactEyebrow: "A good place to start",
  contactTitle: "Bring us your questions.",
  contactDescription: "Whether you manage one busy reception or a distributed enterprise program, we’re ready to listen.",
};

export type ContactFormContent = typeof contactContent;
