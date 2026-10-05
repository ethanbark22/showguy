import { offer } from "@/config/pricing";
import { ButtonLink } from "./Button";

export function PricingCard() {
  return (
    <div className="relative rotate-0 rounded-[2rem] border-2 border-ink bg-paper p-6 text-ink shadow-[10px_10px_0_0_#111] sm:p-9 lg:rotate-1">
      <p className="absolute -top-4 left-6 rounded-full bg-flame px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
        Founding roster
      </p>
      <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.16em]">{offer.name}</h3>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="display text-7xl sm:text-8xl">{offer.price}</span>
        <span className="text-xl font-bold">{offer.period}</span>
      </p>
      <p className="mt-1 inline-block rounded-full bg-sun px-3 py-1 text-sm font-bold">{offer.term}</p>

      <p className="mt-6 text-sm font-bold uppercase tracking-wide">Includes approximately</p>
      <ul className="mt-3 space-y-2.5">
        {offer.includes.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-snug">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5l5 5L20 6.5" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl bg-ink/5 p-4 text-sm leading-relaxed">
        {offer.smallPrint.map((line) => (
          <p key={line} className="font-medium">
            {line}
          </p>
        ))}
      </div>

      <ButtonLink href={offer.cta.href} className="mt-6 w-full">
        {offer.cta.label}
      </ButtonLink>
      <p className="mt-4 text-center text-sm text-muted">{offer.note}</p>
    </div>
  );
}
