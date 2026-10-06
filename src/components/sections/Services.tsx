import { services } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../ServiceCard";

export function Services() {
  return (
    <section id="what-we-do" aria-labelledby="services-title" className="on-light bg-paper pt-28 text-ink lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-28">
        <SectionHeading id="services-title" eyebrow="What we do" size="mega" title="Your digital team." className="reveal" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-base text-ink-soft">
          We don&rsquo;t sell guaranteed streams, playlist placements or follower counts, and we never use bots or fake numbers.
        </p>
      </div>
    </section>
  );
}
