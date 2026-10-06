import { SectionHeading } from "../SectionHeading";
import { Mascot } from "../Mascot";
import { Star } from "../Star";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-light overflow-hidden bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="reveal lg:col-span-6">
            <SectionHeading id="about-title" eyebrow="About" size="huge" title="Why SHOWGUY?" />
            <div className="relative mt-10 hidden w-48 lg:block">
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-lav" />
              <Mascot sizes="192px" className="relative" />
            </div>
          </div>
          <div className="reveal space-y-6 text-lg leading-relaxed sm:text-xl lg:col-span-6 lg:pt-6">
            <p className="display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[0.95]">SHOWGUY isn&rsquo;t being built to become another anonymous marketing agency.</p>
            <p className="display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[0.95] text-violet-strong">It&rsquo;s being built as a music company.</p>
            <p>
              We want to work closely with ambitious artists, understand what audiences genuinely respond to and eventually build a wider ecosystem around talent, culture and entertainment.
            </p>
            <div className="relative rounded-3xl bg-plum p-6 pl-8 font-medium text-paper">
              <Star className="absolute -left-3 -top-3 size-7" />
              Our founding artists get direct access, real attention and a company that cares about the artist project, not just this month&rsquo;s content calendar.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
