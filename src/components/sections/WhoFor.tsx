import { goodFit, notYet } from "@/config/services";
import { SectionHeading } from "../SectionHeading";

export function WhoFor() {
  return (
    <section aria-labelledby="who-title" className="on-light bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="who-title" eyebrow="Who it's for" size="huge" title="SHOWGUY works best when…" className="reveal" />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="reveal rounded-[2rem] border-2 border-ink bg-deep p-6 text-paper sm:p-9">
            <h3 className="display text-4xl text-lav sm:text-5xl">Good fit</h3>
            <ul className="mt-6 space-y-4">
              {goodFit.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-snug">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-lav" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal rounded-[2rem] border-2 border-dashed border-ink p-6 sm:p-9">
            <h3 className="display text-4xl text-ink-soft sm:text-5xl">Probably not yet</h3>
            <ul className="mt-6 space-y-4">
              {notYet.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-snug">
                  <span aria-hidden="true" className="mt-[0.8em] h-0.5 w-4 shrink-0 bg-ink-soft" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base text-ink-soft">
              That&rsquo;s not a judgement. If any of these change, we&rsquo;d be glad to hear from you.
            </p>
          </div>
        </div>

        <p className="display text-big reveal mt-14 text-balance">
          Good music helps. <span className="mark">Ambition is essential.</span>
        </p>
      </div>
    </section>
  );
}
