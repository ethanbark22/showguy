import { capabilities } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ButtonLink } from "../Button";
import { Star } from "../Star";

/**
 * Capabilities as a magazine-style directory: big names, a line each, thin rules.
 * No numbers (these aren't a sequence). Sits on the deep purple, with a giant
 * faint star behind it, so it has the same punch as the rest of the page.
 */
export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="relative overflow-hidden bg-deep">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_0%_0%,rgb(139_92_246/0.35),transparent_70%),radial-gradient(45rem_30rem_at_100%_100%,rgb(13_13_16/0.55),transparent_70%)]" />
      <Star fill="var(--color-lav)" className="pointer-events-none absolute -right-32 top-10 size-[34rem] opacity-[0.07]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Capabilities"
            size="big"
            title={"One campaign.\nFive connected capabilities."}
            className="lg:col-span-7"
          />
          <p className="max-w-md text-lg leading-relaxed text-paper/85 lg:col-span-5">
            Strategy, digital production, communications and execution come together, so your project doesn&rsquo;t feel like five separate suppliers doing five separate jobs.
          </p>
        </div>

        <ul className="mt-14 border-t-2 border-paper/70">
          {capabilities.map((c, i) => (
            <li
              key={c.area}
              className="reveal group relative border-b border-paper/25 transition-colors duration-300 hover:bg-violet/25"
              style={{ animationRange: `entry ${i * 5}% entry ${35 + i * 5}%` }}
            >
              {/* A bright rule that draws itself along the bottom on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-[3px] origin-left scale-x-0 bg-lav transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <div className="grid items-baseline gap-x-8 gap-y-3 px-1 py-7 sm:py-9 lg:grid-cols-12 lg:px-3">
                <h3 className="display flex items-center gap-3 text-[clamp(1.8rem,7.4vw,3rem)] leading-[0.92] transition-all duration-300 group-hover:text-lav motion-safe:group-hover:translate-x-2 lg:col-span-6 lg:text-[clamp(2.4rem,3.6vw,3.6rem)]">
                  <Star className="size-[0.45em] shrink-0" fill="var(--color-violet)" />
                  {c.area}
                </h3>
                <div className="transition-transform duration-300 motion-safe:group-hover:translate-x-1 lg:col-span-5">
                  <p className="text-lg font-bold leading-snug text-lav sm:text-xl">{c.line}</p>
                  <p className="mt-2 text-[0.98rem] leading-snug text-paper/75 sm:text-base">{c.items.join(" · ")}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden justify-self-end text-5xl font-bold text-lav transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 lg:col-span-1 lg:block"
                >
                  ↗
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Closing statement: a bright block, so it lands */}
        <div className="reveal mt-14 overflow-hidden rounded-[1.75rem] border-2 border-ink bg-lav p-6 text-ink shadow-[8px_8px_0_0_#0d0d10] sm:p-9">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-deep">
                <Star className="size-3.5" fill="var(--color-deep)" />
                How we work
              </p>
              <p className="display mt-3 text-[clamp(1.7rem,3.4vw,2.8rem)]">Clear scope. Defined deliverables. No fake promises.</p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed sm:text-lg">
                We focus on the work we can control, strategy, execution and quality, rather than guaranteeing streams, followers or viral results.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <ButtonLink href="/apply" variant="dark">
                Discuss a project
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
