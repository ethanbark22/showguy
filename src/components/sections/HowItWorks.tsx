import { processSteps } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ProcessStep } from "../ProcessStep";
import { Star } from "../Star";

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative overflow-hidden bg-ink">
      <Star fill="var(--color-violet)" className="pointer-events-none absolute -right-24 top-10 size-[28rem] opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="how-title" eyebrow="How it works" size="huge" title={"You create.\nWe turn it into a campaign."} className="reveal" />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, i) => (
            <ProcessStep key={step.title} number={String(i + 1).padStart(2, "0")} title={step.title} body={step.body} />
          ))}
        </ol>
        <p className="mt-14 flex items-center gap-3 text-base font-medium text-lav sm:text-lg">
          <Star className="size-5 shrink-0" />
          Artists bring the raw footage. SHOWGUY turns it into campaigns.
        </p>
      </div>
    </section>
  );
}
