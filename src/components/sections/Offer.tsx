import { SectionHeading } from "../SectionHeading";
import { OfferPrice, PricingCard } from "../PricingCard";

export function Offer() {
  return (
    <section id="founding-offer" aria-labelledby="offer-title" className="relative overflow-hidden bg-deep">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_100%_0%,rgb(196_181_253/0.22),transparent_70%),radial-gradient(40rem_30rem_at_0%_100%,rgb(13_13_16/0.5),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="reveal min-w-0 lg:col-span-7">
            <SectionHeading id="offer-title" eyebrow="Founding artist offer" size="huge" title={"Join the founding SHOWGUY roster."} />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/90 sm:text-xl">
              SHOWGUY is selecting a small number of artists for its founding client roster. Founding artists get direct founder involvement and the chance to help shape how SHOWGUY works with artists from day one.
            </p>
          </div>
          <div className="reveal min-w-0 lg:col-span-5 lg:text-right">
            <div className="lg:flex lg:justify-end">
              <OfferPrice />
            </div>
          </div>
        </div>
        <div className="reveal mt-16 lg:mt-24">
          <PricingCard />
        </div>
      </div>
    </section>
  );
}
