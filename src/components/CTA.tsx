import { ButtonLink } from "./Button";
import { Mascot } from "./Mascot";
import { Star } from "./Star";

/** The big closing call to action. */
export function CTA() {
  return (
    <section aria-labelledby="final-cta" className="relative overflow-hidden bg-ink">
      {/* An oversized star and wordmark sit faintly behind everything */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55rem_35rem_at_80%_100%,rgb(139_92_246/0.3),transparent_70%)]" />
      <Star fill="var(--color-violet)" className="pointer-events-none absolute -right-20 top-0 size-[40rem] opacity-[0.09]" />
      <p aria-hidden="true" className="display pointer-events-none absolute -bottom-[0.12em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(5rem,30vw,28rem)] leading-none text-paper/[0.04]">
        SHOWGUY
      </p>

      <div className="relative mx-auto grid max-w-7xl items-end gap-8 px-5 pt-24 sm:px-8 lg:grid-cols-12 lg:pt-36">
        <div className="pb-8 lg:col-span-8 lg:pb-36">
          <Star className="mb-6 size-8" />
          <h2 id="final-cta" className="display text-huge reveal text-balance">
            Ready to give your music a proper team?
          </h2>
          <p className="mt-6 max-w-xl text-lg font-medium text-paper/85 sm:text-xl">
            Tell us about your project, your next release and where you&rsquo;re trying to go.
          </p>
          <ButtonLink href="/apply" className="mt-8">
            Work with SHOWGUY
          </ButtonLink>
        </div>
        {/* He stands on the bottom edge of the section, beside the button */}
        <div className="relative mx-auto w-60 sm:w-80 lg:col-span-4 lg:w-full lg:max-w-md">
          <div aria-hidden="true" className="absolute inset-x-[8%] bottom-0 aspect-square rounded-full bg-violet" />
          <Mascot variant="wave" float className="relative" sizes="(min-width: 1024px) 448px, 320px" />
        </div>
      </div>
    </section>
  );
}
