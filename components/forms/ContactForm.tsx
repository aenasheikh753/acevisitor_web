"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { submitContactForm } from "@/lib/api/forms";
import type { ContactContent } from "@/lib/types";

const fieldClass =
  "mt-2 w-full rounded-md border border-line bg-copy/[0.04] px-4 py-3 text-sm text-copy placeholder:text-muted/70 focus-visible:border-cyan focus-visible:outline-none";

export default function ContactForm({ content }: { content: ContactContent }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const result = await submitContactForm(
        {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          company: String(formData.get("company") ?? ""),
          message: String(formData.get("message") ?? ""),
        },
        content,
      );
      setStatusMessage(result.message);
      form.reset();
    } catch (error) {
      console.error("Contact form submission failed.", error);
      setStatusMessage(content.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="glass-card rounded-xl p-6 sm:p-9">
      <h2 className="font-heading text-2xl font-semibold text-copy">{content.formTitle}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{content.formDescription}</p>
      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-copy">{content.nameLabel}</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder={content.namePlaceholder} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-copy">{content.emailLabel}</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder={content.emailPlaceholder} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-company" className="text-sm font-medium text-copy">{content.companyLabel}</label>
          <input id="contact-company" name="company" type="text" autoComplete="organization" placeholder={content.companyPlaceholder} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-medium text-copy">{content.messageLabel}</label>
          <textarea id="contact-message" name="message" rows={4} required placeholder={content.messagePlaceholder} className={`${fieldClass} resize-y`} />
        </div>
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? content.submittingLabel : content.submitLabel}
        </Button>
        <p aria-live="polite" className="text-center text-xs leading-5 text-muted">
          {statusMessage || content.formNote}
        </p>
      </form>
    </div>
  );
}
