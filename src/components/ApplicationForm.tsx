"use client";

import { submitApplication } from "@/app/actions";
import { applicationGroups } from "@/lib/forms";
import { track, events } from "@/lib/track";
import { DynamicForm } from "./DynamicForm";
import { WhatHappensNext } from "./WhatHappensNext";

export function ApplicationForm() {
  return (
    <DynamicForm
      idPrefix="apply"
      groups={applicationGroups}
      action={submitApplication}
      submitLabel="Send enquiry"
      showRequiredNote
      closing={{
        title: "Ready to send it?",
        body: "We'll take a look at what you're launching and get back to you to talk it through.",
      }}
      closingExtra={
        <div className="mt-8 border-t border-line pt-6 lg:hidden">
          <WhatHappensNext />
        </div>
      }
      successHref="/apply/success"
      onStart={() => track(events.applicationStarted)}
      onSuccess={() => track(events.applicationSubmitted)}
    />
  );
}
