import { monthlyFlow } from "@/config/services";
import { offer } from "@/config/pricing";
import { SectionHeading } from "../SectionHeading";
import { Star } from "../Star";

export function Monthly() {
  return (
    <section id="each-month" aria-labelledby="monthly-title" className="relative overflow-hidden bg-plum">
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="monthly-title" eyebrow="The monthly service" size="huge" title={"What actually happens each month?"} className="reveal max-w-4xl" />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
          You capture the raw footage. SHOWGUY handles the strategy and turns that material into campaign output.
        </p>

        {/* The monthly cycle: a stepper on phones and tablets, one row on a desktop */}
        <ol className="reveal mt-12 grid gap-2 lg:grid-cols-7 lg:gap-3" aria-label="The monthly workflow">
          {monthlyFlow.map((s, i) => {
            const you = s.who === "You";
            return (
              <li
                key={s.step}
                className={`relative flex items-center gap-4 rounded-2xl border px-4 py-3 lg:flex-col lg:items-start lg:gap-3 lg:px-4 lg:py-5 ${
                  you ? "border-violet bg-violet-strong text-paper" : "border-paper/20 bg-ink"
                }`}
              >
                <span aria-hidden="true" className={`display text-lg lg:text-2xl ${you ? "text-paper" : "text-violet"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display flex-1 text-xl sm:text-2xl lg:flex-none lg:text-[1.35rem]">{s.step}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] ${
                    you ? "bg-paper text-ink" : "border border-paper/30 text-lav"
                  }`}
                >
                  {s.who === "You" ? "You" : "SHOWGUY"}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-4">
            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-lav">
              <Star className="size-4" />
              Each month
            </h3>
            <p className="mt-4 max-w-xs text-paper/75">All included in the monthly rate.</p>
          </div>
          <ul className="reveal grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2">
            {offer.includes.map((item) => (
              <li key={item} className="flex gap-3 border-b border-paper/15 py-3.5 text-base leading-snug sm:text-lg">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 size-5 shrink-0 text-violet" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="display text-big reveal mt-16 max-w-4xl text-balance">
          You keep making music. <span className="mark">We keep the digital side moving.</span>
        </p>
      </div>
    </section>
  );
}
