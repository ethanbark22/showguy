"use client";

import { submitApplication } from "@/app/actions";
import { applicationCross, applicationGroups } from "@/lib/forms";
import { track, events } from "@/lib/track";
import { DynamicForm } from "./DynamicForm";
import { WhatHappensNext } from "./WhatHappensNext";

export function ApplicationForm() {
  return (
    <DynamicForm
      idPrefix="apply"
      groups={applicationGroups}
      action={submitApplication}
      submitLabel="Send application"
      cross={applicationCross}
      showRequiredNote
      closing={{
        title: "Ready to send it?",
        body: "We'll review your application and get in touch if we think SHOWGUY could be a good fit for your project.",
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
