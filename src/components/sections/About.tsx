import { SectionHeading } from "../SectionHeading";
import { Mascot } from "../Mascot";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="reveal lg:col-span-6">
          <SectionHeading id="about-title" eyebrow="About" size="huge" title="Why SHOWGUY?" />
          <div className="mt-10 hidden w-48 lg:block">
            <Mascot sizes="192px" />
          </div>
        </div>
        <div className="reveal space-y-6 text-lg leading-relaxed sm:text-xl lg:col-span-6 lg:pt-6">
          <p className="display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[0.95]">SHOWGUY isn&rsquo;t being built to become another anonymous marketing agency.</p>
          <p>It&rsquo;s being built as a music company.</p>
          <p>
            We want to work closely with ambitious artists, understand what audiences genuinely respond to and eventually build a wider ecosystem around talent, culture and entertainment.
          </p>
          <p className="rounded-3xl bg-sun p-6 font-medium">
            We&rsquo;re early, and we&rsquo;d rather say so. That means you get our full attention, honest advice and no inflated claims.
          </p>
        </div>
      </div>
    </section>
  );
}
