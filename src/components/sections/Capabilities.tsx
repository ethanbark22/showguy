import { capabilities } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ButtonLink } from "../Button";
import { Star } from "../Star";

/**
 * Capabilities as a magazine-style directory: big names, a line each, thin rules.
 * No numbers (these aren't a sequence). The closing statement sits under the rows.
 */
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

        <ul className="mt-12 border-t-2 border-ink">
          {capabilities.map((c, i) => (
            <li
              key={c.area}
              className="reveal group relative border-b border-ink/30 transition-colors duration-300 hover:bg-lav/40"
              style={{ animationRange: `entry ${i * 5}% entry ${35 + i * 5}%` }}
            >
              {/* A purple rule that draws itself along the bottom on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-[3px] origin-left scale-x-0 bg-violet-strong transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <div className="grid items-baseline gap-x-8 gap-y-2 py-6 sm:py-8 lg:grid-cols-12 lg:px-2">
                <h3 className="display text-[clamp(1.9rem,6vw,3.4rem)] leading-[0.95] transition-all duration-300 group-hover:text-violet-strong motion-safe:group-hover:translate-x-2 lg:col-span-6 lg:text-[clamp(2.6rem,3.7vw,3.6rem)] xl:text-[3.6rem]">
                  {c.area}
                </h3>
                <div className="transition-transform duration-300 motion-safe:group-hover:translate-x-1 lg:col-span-5">
                  <p className="text-lg font-bold leading-snug sm:text-xl">{c.line}</p>
                  <p className="mt-1.5 text-[0.98rem] leading-snug text-ink-soft sm:text-base">{c.items.join(" · ")}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden justify-self-end text-4xl font-bold text-violet-strong transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 lg:col-span-1 lg:block"
                >
                  ↗
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Closing statement */}
        <div className="reveal mt-12 overflow-hidden rounded-[1.75rem] border-2 border-ink border-t-[6px] border-t-violet bg-plum p-6 text-paper sm:p-8">
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
        </div>
      </div>
    </section>
  );
}
