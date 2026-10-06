import type { Service } from "@/config/services";

/* [card colours, number colour]. All shades of the purple/dark palette. */
const tones: Record<Service["tone"], { card: string; number: string }> = {
  deep: { card: "bg-deep text-paper", number: "text-lav" },
  lav: { card: "bg-lav text-ink", number: "text-deep" },
  dark: { card: "bg-ink text-paper", number: "text-violet" },
  violet: { card: "bg-violet text-ink", number: "text-ink" },
  paper: { card: "bg-[#fbf8f2] text-ink", number: "text-violet-strong" },
  plum: { card: "bg-plum text-paper", number: "text-lav" },
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const t = tones[service.tone];
  return (
    <article
      className={`reveal group relative flex min-h-72 flex-col justify-between rounded-[2rem] border-2 border-ink p-6 transition duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-[8px_8px_0_0_#0d0d10] sm:p-8 ${t.card}`}
    >
      <span aria-hidden="true" className={`display text-5xl opacity-60 transition-opacity group-hover:opacity-100 ${t.number}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="display text-3xl sm:text-4xl">{service.title}</h3>
        <p className="mt-3 text-base leading-relaxed opacity-90 sm:text-lg">{service.body}</p>
      </div>
    </article>
  );
}
