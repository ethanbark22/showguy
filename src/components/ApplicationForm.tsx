"use client";

import { submitApplication } from "@/app/actions";
import { applicationGroups } from "@/lib/forms";
import { site } from "@/config/site";
import { DynamicForm } from "./DynamicForm";

export function ApplicationForm() {
  return (
    <DynamicForm
      idPrefix="apply"
      groups={applicationGroups}
      action={submitApplication}
      submitLabel="Send application"
      successTitle="Application received."
      successBody="Thanks for telling us about your music. We read every application. If it looks like a good fit, we'll be in touch to set up a discovery call."
      successExtra={
        site.bookingUrl ? (
          <p className="mt-4">
            Want to move quicker?{" "}
            <a href={site.bookingUrl} className="font-bold underline underline-offset-4">
              Book a discovery call
            </a>
            .
          </p>
        ) : null
      }
    />
  );
}
