import { capabilities } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ButtonLink } from "../Button";
import { Star } from "../Star";

/* card colours, number colour, tick colour, grid width on desktop */
const tones = {
  deep: { card: "bg-deep text-paper", num: "text-lav/20", tick: "text-lav", rule: "border-paper/20" },
  lav: { card: "bg-lav text-ink", num: "text-deep/15", tick: "text-deep", rule: "border-ink/20" },
  dark: { card: "bg-ink text-paper", num: "text-violet/20", tick: "text-violet", rule: "border-paper/20" },
  paper: { card: "bg-[#fbf8f2] text-ink", num: "text-violet-strong/15", tick: "text-violet-strong", rule: "border-ink/20" },
  violet: { card: "bg-violet text-ink", num: "text-ink/15", tick: "text-ink", rule: "border-ink/25" },
} as const;

/** Desktop widths on a 12-column grid: a wide pair on top, three across below. */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="on-light bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-4 sm:px-8 lg:pb-28">
        <div className="reveal grid gap-6 border-t-2 border-ink pt-12 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Capabilities"
            size="big"
            title={"One campaign.\nFive connected capabilities."}
            className="lg:col-span-7"
          />
          <p className="max-w-lg text-lg leading-relaxed text-ink-soft lg:col-span-5">
            Strategy, digital production, communications and execution come together, so your project doesn&rsquo;t feel like five separate suppliers doing five separate jobs.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {capabilities.map((c, i) => {
            const t = tones[c.tone];
            return (
              <li
                key={c.area}
                className={`reveal group relative overflow-hidden rounded-[1.75rem] border-2 border-ink p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#0d0d10] sm:p-8 max-sm:p-5 ${t.card} ${spans[i]} ${i % 2 ? "lg:mt-6" : ""}`}
                style={{ animationRange: `entry ${i * 5}% entry ${35 + i * 5}%` }}
              >
                {/* Big faint number that drifts a little on hover */}
                <span
                  aria-hidden="true"
                  className={`display pointer-events-none absolute -right-2 -top-4 text-[8rem] leading-none transition-transform duration-500 motion-safe:group-hover:-translate-x-2 motion-safe:group-hover:translate-y-1 sm:text-[9rem] ${t.num}`}
                >
                  {c.number}
                </span>
                <div className="relative">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                    <Star className="size-3.5" fill="currentColor" />
                    <span>
                      <span className="sr-only">Capability </span>
                      {c.number}
                    </span>
                  </p>
                  <h3 className="display mt-4 text-[clamp(1.3rem,6.2vw,1.9rem)] sm:text-[clamp(1.6rem,2.3vw,2.2rem)]">{c.area}</h3>
                  <p className="mt-2 max-w-xs text-base font-medium leading-snug opacity-90 sm:text-lg">{c.line}</p>
                  <ul className={`mt-5 grid gap-x-6 border-t pt-3 ${i < 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-1"} ${t.rule}`}>
                    {c.items.map((item) => (
                      <li key={item} className={`flex items-center gap-2.5 border-b py-2 text-[0.95rem] leading-snug ${t.rule}`}>
                        <span aria-hidden="true" className={`size-1.5 shrink-0 rotate-45 bg-current ${t.tick}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}

          {/* Sixth block: how we work (not a capability, so it has no number) */}
          <li className="reveal relative overflow-hidden rounded-[1.75rem] border-2 border-ink border-t-[6px] border-t-violet bg-plum p-6 text-paper sm:p-8 lg:col-span-12">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-lav">
                  <Star className="size-3.5" />
                  How we work
                </p>
                <p className="display mt-3 text-[clamp(1.6rem,3vw,2.4rem)]">Clear scope. Defined deliverables. No fake promises.</p>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-paper/85 sm:text-lg">
                  We focus on the work we can control, strategy, execution and quality, rather than guaranteeing streams, followers or viral results.
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <ButtonLink href="/apply" variant="outline">
                  Discuss a project
                </ButtonLink>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
