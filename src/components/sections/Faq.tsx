import { faqs } from "@/config/faq";
import { JsonLd } from "../JsonLd";
import { FaqAccordion } from "../FaqAccordion";
import { SectionHeading } from "../SectionHeading";

/** Flattens an answer to plain text for search engines. */
const plain = (item: (typeof faqs)[number]) =>
  [item.lead, ...item.body.map((b) => (b.type === "p" ? b.text : b.items.join(", ")))].filter(Boolean).join(" ");

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-plum">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: plain(f) },
          })),
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:py-28">
        <div className="reveal lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow="FAQ" size="sm" title={"Questions artists usually ask."} className="lg:sticky lg:top-28" />
        </div>
        <div className="reveal min-w-0 lg:col-span-8">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
