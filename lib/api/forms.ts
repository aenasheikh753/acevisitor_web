import { chatContent } from "@/lib/content/chat";
import type { ContactFormContent } from "@/lib/content/contact";

export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type FormSubmissionResult = {
  success: true;
  message: string;
};

export async function submitContactForm(
  values: ContactFormValues,
  content: ContactFormContent,
): Promise<FormSubmissionResult> {
  if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
    throw new Error("Name, email, and message are required.");
  }

  return { success: true, message: content.successMessage };
}

export async function sendChatMessage(
  message: string,
): Promise<{ reply: string }> {
  if (!message.trim()) {
    throw new Error("A chat message is required.");
  }

  return { reply: chatContent.placeholderReply };
}
