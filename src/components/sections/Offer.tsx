import { SectionHeading } from "../SectionHeading";
import { PricingCard } from "../PricingCard";

export function Offer() {
  return (
    <section id="founding-offer" aria-labelledby="offer-title" className="relative overflow-hidden bg-lilac">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="reveal lg:col-span-6">
          <SectionHeading id="offer-title" eyebrow="Founding artist offer" size="huge" title={"Join the founding SHOWGUY roster."} />
          <p className="mt-6 max-w-lg text-lg leading-relaxed sm:text-xl">
            SHOWGUY is selecting a small number of artists for its founding client roster. We&rsquo;re early, so you get the founder working on your campaign alongside the rate to match.
          </p>
          <p className="mt-4 max-w-lg text-lg leading-relaxed sm:text-xl">
            Applications are read by a person. If it looks like a good fit, we&rsquo;ll set up a discovery call.
          </p>
        </div>
        <div className="reveal lg:col-span-6 lg:pl-8">
          <PricingCard />
        </div>
      </div>
    </section>
  );
}
