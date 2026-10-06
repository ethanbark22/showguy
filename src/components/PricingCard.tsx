import { foundingRate, offer } from "@/config/pricing";
import { ButtonLink } from "./Button";
import { Star } from "./Star";

/**
 * The big price. The pound sign is set small and raised, like a currency
 * superscript, so the "400" stays clean and unmistakable.
 */
export function OfferPrice() {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lav">
        <Star className="size-3.5" />
        {offer.name}
      </p>
      <p className="flex flex-wrap items-end leading-none" aria-label={`${offer.price} ${offer.period.replace("/", "per ")}`}>
        <span aria-hidden="true" className="mt-[0.18em] pr-1 font-sans self-start text-[clamp(2.25rem,7vw,5.5rem)] font-extrabold text-lav">
          £
        </span>
        <span aria-hidden="true" className="display text-[clamp(5rem,24vw,8rem)] leading-[0.8] lg:text-[clamp(6rem,10.5vw,9.5rem)] text-paper">
          {offer.price.replace("£", "")}
        </span>
        <span aria-hidden="true" className="pb-2 pl-3 text-xl font-bold text-lav sm:text-3xl">
          {offer.period}
        </span>
      </p>
      <p className="mt-6 inline-block rounded-full border-2 border-lav px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-lav">
        {offer.term}
      </p>
    </div>
  );
}

/** The off-white panel: why the rate is what it is, what's separate, and the way in. */
export function PricingCard() {
  return (
    <div className="on-light rounded-[2rem] border-2 border-ink bg-paper p-6 text-ink sm:p-10 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full bg-deep px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-lav">
            <Star className="size-3" />
            {foundingRate.label}
          </p>
          <div className="mt-5 max-w-xl space-y-3 text-lg leading-relaxed">
            {foundingRate.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 max-w-xl border-t border-ink/15 pt-5 text-base leading-relaxed text-ink-soft">{foundingRate.includesLine}</p>
        </div>
        <div className="flex flex-col justify-between gap-8 lg:col-span-5">
          <div className="rounded-2xl bg-plum p-5 text-sm leading-relaxed text-paper">
            {offer.smallPrint.map((line) => (
              <p key={line} className="font-medium">
                {line}
              </p>
            ))}
          </div>
          <div>
            <ButtonLink href={offer.cta.href} className="w-full">
              {offer.cta.label}
            </ButtonLink>
            <p className="mt-4 text-sm text-ink-soft">{offer.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
