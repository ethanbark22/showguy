import { idealArtist } from "@/config/services";
import { SectionHeading } from "../SectionHeading";

export function WhoFor() {
  return (
    <section aria-labelledby="who-title" className="on-light bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="who-title" eyebrow="Who we're looking for" size="mega" title={"This isn't for\nevery artist."} className="reveal" />
        <p className="mt-8 max-w-2xl text-lg sm:text-xl">SHOWGUY is best suited to artists who:</p>
        <ul className="mt-6 border-t-2 border-ink">
          {idealArtist.map((item, i) => (
            <li key={item} className="reveal group flex items-baseline gap-5 border-b-2 border-ink py-5 transition-colors hover:bg-lav sm:gap-8 sm:px-4">
              <span aria-hidden="true" className="display w-10 shrink-0 text-2xl text-violet-strong sm:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xl font-bold leading-snug sm:text-3xl">{item}</span>
            </li>
          ))}
        </ul>
        <p className="display text-big reveal mt-12 text-balance">
          Good music helps. <span className="mark">Ambition is essential.</span>
        </p>
      </div>
    </section>
  );
}
