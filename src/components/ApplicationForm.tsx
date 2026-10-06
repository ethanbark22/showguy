"use client";

import { submitApplication } from "@/app/actions";
import { applicationCross, applicationGroups } from "@/lib/forms";
import { activeSocials, site } from "@/config/site";
import { ButtonLink } from "./Button";
import { DynamicForm } from "./DynamicForm";
import { Mascot } from "./Mascot";
import { Star } from "./Star";
import { WhatHappensNext } from "./WhatHappensNext";

function ApplicationSent() {
  const social = activeSocials()[0];
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-violet/40 bg-plum p-8 sm:p-12">
      <Star fill="var(--color-violet)" className="pointer-events-none absolute -right-20 -top-20 size-80 opacity-20" />
      <div className="relative grid items-end gap-8 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <Star className="mb-5 size-7" />
          <h2 className="display text-[clamp(2.2rem,6vw,3.6rem)]">Application sent.</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/90">
            Nice one. We&rsquo;ll take a look at your project and get in touch if it looks like there&rsquo;s a good fit.
          </p>
          {site.bookingUrl && (
            <p className="mt-4 text-paper/85">
              Want to move quicker?{" "}
              <a href={site.bookingUrl} className="font-bold text-lav underline underline-offset-4">
                Book a discovery call
              </a>
              .
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Back to SHOWGUY</ButtonLink>
            {social && (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border-2 border-current px-7 py-3 text-base font-bold uppercase tracking-wide transition hover:border-violet-strong hover:bg-violet-strong"
              >
                Follow SHOWGUY
              </a>
            )}
          </div>
        </div>
        <div className="relative mx-auto w-36 sm:w-44">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-violet" />
          <Mascot variant="wave" float className="relative" sizes="176px" />
        </div>
      </div>
    </div>
  );
}

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
      success={<ApplicationSent />}
    />
  );
}
