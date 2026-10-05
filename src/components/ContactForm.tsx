"use client";

import { submitContact } from "@/app/actions";
import { contactFields } from "@/lib/forms";
import { DynamicForm } from "./DynamicForm";

export function ContactForm() {
  return (
    <DynamicForm
      idPrefix="contact"
      groups={[{ title: "", fields: contactFields }]}
      action={submitContact}
      submitLabel="Send message"
      successTitle="Message sent."
      successBody="Thanks for getting in touch. We'll reply to the email address you gave us."
    />
  );
}
