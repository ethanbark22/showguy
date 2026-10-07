import { pageMetadata } from "@/lib/metadata";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ApplySidebar, applySections } from "@/components/ApplySidebar";
import { FormProgress } from "@/components/FormProgress";

export const metadata = pageMetadata({
  title: "Work with SHOWGUY: tell us what you're launching",
  description: "Tell us about the artist, release or project and what you need help bringing to life. SHOWGUY plans, builds and runs the digital side of music releases and campaigns.",
  path: "/apply",
});

export default function ApplyPage() {
  return (
    <div className="relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_90%_0%,rgb(139_92_246/0.16),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:pb-28 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[5fr_8fr] lg:gap-14">
          <ApplySidebar />
          <div className="min-w-0">
            {/* Phones and tablets: a slim "where am I" strip above the form */}
            <div className="mb-5 lg:hidden">
              <FormProgress sections={applySections} variant="row" />
            </div>
            <ApplicationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
