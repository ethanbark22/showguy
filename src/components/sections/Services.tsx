import { services } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../ServiceCard";

export function Services() {
  return (
    <section id="what-we-do" aria-labelledby="services-title" className="on-light bg-paper pt-28 text-ink lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:pb-16">
        <SectionHeading id="services-title" eyebrow="What we do" size="huge" title={"We help bring music projects to life online."} className="reveal max-w-5xl" />
        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.number} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
