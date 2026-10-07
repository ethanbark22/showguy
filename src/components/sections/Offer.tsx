import { SectionHeading } from "../SectionHeading";
import { EngagementOptions } from "../PricingCard";

/** The commercial section: project work or an ongoing partnership. No public prices. */
export function Offer() {
  return (
    <section id="work-with-us" aria-labelledby="offer-title" className="relative overflow-hidden bg-deep">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_100%_0%,rgb(196_181_253/0.22),transparent_70%),radial-gradient(40rem_30rem_at_0%_100%,rgb(13_13_16/0.5),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-36">
        <div className="reveal max-w-5xl">
          <SectionHeading id="offer-title" eyebrow="Ways to work together" size="huge" title={"One-off project?\nOngoing partner?\nWe do both."} />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/90 sm:text-xl">
            Tell us what you need. We&rsquo;ll agree the scope, the deliverables and the cost together before any work begins.
          </p>
        </div>
        <div className="mt-14 lg:mt-20">
          <EngagementOptions />
        </div>
      </div>
    </section>
  );
}
