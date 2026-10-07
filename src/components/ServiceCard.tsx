import type { Service } from "@/config/services";

/* [card colours, number colour, tick colour, note chip]. Shades of the purple/dark palette. */
const tones: Record<Service["tone"], { card: string; number: string; tick: string; chip: string }> = {
  deep: { card: "bg-deep text-paper", number: "text-lav", tick: "text-lav", chip: "bg-paper/10 text-paper" },
  lav: { card: "bg-lav text-ink", number: "text-deep", tick: "text-deep", chip: "bg-ink/10 text-ink" },
  dark: { card: "bg-ink text-paper", number: "text-violet", tick: "text-violet", chip: "bg-paper/10 text-paper" },
};

export function ServiceCard({ service }: { service: Service }) {
  const t = tones[service.tone];
  return (
    <article
      className={`reveal group relative flex flex-col rounded-[2rem] border-2 border-ink p-6 transition duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-[8px_8px_0_0_#0d0d10] sm:p-8 ${t.card}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden="true" className={`display text-6xl opacity-70 transition-opacity group-hover:opacity-100 ${t.number}`}>
          {service.number}
        </span>
        <p className="mt-2 rounded-full border-2 border-current px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]">{service.category}</p>
      </div>

      <h3 className="display mt-10 text-[clamp(1.9rem,3vw,2.7rem)] text-balance">
        {service.headline.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h3>
      <p className="mt-4 text-base leading-relaxed opacity-90 sm:text-lg">{service.body}</p>

      <ul className="mt-6 space-y-2 border-t border-current/20 pt-5">
        {service.examples.map((item) => (
          <li key={item} className="flex gap-3 text-[0.95rem] leading-snug sm:text-base">
            <svg aria-hidden="true" viewBox="0 0 24 24" className={`mt-0.5 size-4 shrink-0 ${t.tick}`} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5l5 5L20 6.5" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <p className={`inline-block rounded-2xl px-4 py-3 text-sm font-medium leading-snug ${t.chip}`}>{service.note}</p>
      </div>
    </article>
  );
}
