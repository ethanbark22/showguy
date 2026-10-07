import { applicationGroups } from "@/lib/forms";
import { FormProgress } from "./FormProgress";
import { Mascot } from "./Mascot";
import { WhatHappensNext } from "./WhatHappensNext";

const sections = applicationGroups.map((g, i) => ({
  id: `apply-section-${i + 1}`,
  number: g.number ?? String(i + 1).padStart(2, "0"),
  short: g.short ?? g.title,
}));

export { sections as applySections };

function TimeChip() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-xs font-bold text-lav">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
      Around 5 minutes
    </p>
  );
}

/**
 * The left-hand column. On a desktop it sticks to the screen while the form
 * scrolls past; on a phone it is just a short intro above the form.
 */
export function ApplySidebar() {
  return (
    <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="inline-block rounded-full border-2 border-lav px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-lav">
          Start a project
        </p>
        <TimeChip />
      </div>
      <h1 className="display text-[clamp(2.5rem,4.6vw,4rem)]">
        <span className="block">Let&rsquo;s work</span>
        <span className="block">together.</span>
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/90">
        Tell us a little about your project, your team and what you need help with.
      </p>
      <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-mute-text">
        The more context you give us, the better we can point you in the right direction.
      </p>

      {/* Phones: a small mascot beside the intro, then straight into the form */}
      <div className="relative ml-auto -mt-2 w-20 lg:hidden">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-violet" />
        <Mascot variant="reach" className="relative" sizes="80px" />
      </div>

      {/* Desktop: what happens next, progress and the mascot, all in view at once */}
      <div className="hidden lg:block">
        <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
          <WhatHappensNext />
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <FormProgress sections={sections} variant="rail" />
          <div className="relative w-24 shrink-0 [@media(max-height:860px)]:hidden">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-violet" />
            <Mascot variant="reach" className="relative" sizes="96px" />
          </div>
        </div>
      </div>
    </aside>
  );
}
