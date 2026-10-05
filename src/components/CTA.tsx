import { ButtonLink } from "./Button";
import { Mascot } from "./Mascot";

/** The big closing call to action. */
export function CTA() {
  return (
    <section aria-labelledby="final-cta" className="relative overflow-hidden bg-sun">
      <div className="mx-auto grid max-w-7xl items-end gap-8 px-5 pt-20 sm:px-8 lg:grid-cols-12 lg:pt-28">
        <div className="pb-16 lg:col-span-8 lg:pb-28">
          <h2 id="final-cta" className="display text-huge reveal text-balance">
            Ready to give your music a proper team?
          </h2>
          <p className="mt-6 max-w-xl text-lg font-medium sm:text-xl">
            Tell us about your project, your next release and where you&rsquo;re trying to go.
          </p>
          <ButtonLink href="/apply" className="mt-8">
            Work with SHOWGUY
          </ButtonLink>
        </div>
        <div className="relative mx-auto -mb-2 w-56 sm:w-72 lg:col-span-4 lg:w-full lg:max-w-sm">
          <Mascot variant="wave" float sizes="(min-width: 1024px) 384px, 288px" />
        </div>
      </div>
    </section>
  );
}
