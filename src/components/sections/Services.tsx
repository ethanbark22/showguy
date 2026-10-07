import { capabilities, services } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../ServiceCard";

export function Services() {
  return (
    <section id="what-we-do" aria-labelledby="services-title" className="on-light bg-paper pt-28 text-ink lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-28">
        <SectionHeading id="services-title" eyebrow="What we do" size="huge" title={"We help bring music projects to life online."} className="reveal max-w-5xl" />
        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.number} service={s} />
          ))}
        </div>

        {/* The same work, grouped by capability: a quick scan */}
        <div className="reveal mt-12 border-t-2 border-ink pt-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">Capabilities</h3>
          <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((c) => (
              <div key={c.area}>
                <dt className="display text-2xl text-violet-strong">{c.area}</dt>
                <dd className="mt-2 text-[0.95rem] leading-snug text-ink-soft">{c.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-10 max-w-2xl text-base text-ink-soft">
          We agree the scope and the deliverables up front. We don&rsquo;t promise streams, followers, playlist placements, ticket sales or viral success.
        </p>
      </div>
    </section>
  );
}
