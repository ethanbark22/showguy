import { processSteps } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ProcessStep } from "../ProcessStep";

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="on-dark bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="how-title" eyebrow="How it works" size="huge" title={"You create.\nWe turn it into a campaign."} className="reveal" />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, i) => (
            <ProcessStep key={step.title} number={String(i + 1).padStart(2, "0")} title={step.title} body={step.body} />
          ))}
        </ol>
      </div>
    </section>
  );
}
