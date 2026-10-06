"use client";

import { submitContact } from "@/app/actions";
import { contactFields } from "@/lib/forms";
import { ButtonLink } from "./Button";
import { DynamicForm } from "./DynamicForm";

export function ContactForm() {
  return (
    <DynamicForm
      idPrefix="contact"
      groups={[{ title: "", fields: contactFields }]}
      action={submitContact}
      submitLabel="Send message"
      success={
        <div className="rounded-[1.75rem] border border-violet/40 bg-plum p-8 sm:p-12">
          <h2 className="display text-[clamp(2.2rem,6vw,3.6rem)]">Message sent.</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-paper/90">
            Thanks for getting in touch. We&rsquo;ll reply to the email address you gave us.
          </p>
          <ButtonLink href="/" className="mt-8">
            Back to SHOWGUY
          </ButtonLink>
        </div>
      }
    />
  );
}
