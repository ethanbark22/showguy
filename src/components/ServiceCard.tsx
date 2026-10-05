import type { Service } from "@/config/services";

const tones: Record<Service["tone"], string> = {
  sun: "bg-sun",
  flame: "bg-flame",
  lilac: "bg-lilac",
  mint: "bg-mint",
  paper: "bg-white",
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      className={`reveal group relative flex min-h-72 flex-col justify-between rounded-[2rem] border-2 border-ink p-6 transition duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-[8px_8px_0_0_#111] sm:p-8 ${tones[service.tone]}`}
    >
      <span aria-hidden="true" className="display text-5xl opacity-30 transition-opacity group-hover:opacity-100">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="display text-3xl sm:text-4xl">{service.title}</h3>
        <p className="mt-3 text-base leading-relaxed sm:text-lg">{service.body}</p>
      </div>
    </article>
  );
}
