import { audiences } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ButtonLink } from "../Button";
import { Star } from "../Star";

/* Each audience gets its own tone and its own small corner motif (no numbers: these aren't a sequence) */
const tones = {
  deep: { card: "bg-deep text-paper", tag: "border-lav/60 text-lav", star: "var(--color-lav)" },
  lav: { card: "bg-lav text-ink", tag: "border-ink/50 text-ink", star: "var(--color-deep)" },
  dark: { card: "bg-ink text-paper", tag: "border-violet text-violet", star: "var(--color-violet)" },
  violet: { card: "bg-violet text-ink", tag: "border-ink/50 text-ink", star: "var(--color-ink)" },
} as const;

export function WhoFor() {
  return (
    <section aria-labelledby="who-title" className="on-light bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="who-title" eyebrow="Who we work with" size="huge" title={"Built for people with music to launch."} className="reveal max-w-5xl" />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => {
            const t = tones[a.tone];
            return (
              <li
                key={a.title}
                className={`reveal group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-[2rem] border-2 border-ink p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_0_#0d0d10] sm:p-7 ${t.card} ${i % 2 ? "lg:mt-8" : ""}`}
              >
                {/* Corner star, a little bigger and tilted differently on each card */}
                <Star
                  fill={t.star}
                  className={`pointer-events-none absolute -right-5 -top-5 size-24 opacity-30 transition-transform duration-500 motion-safe:group-hover:rotate-12 ${["rotate-6", "-rotate-12", "rotate-12", "-rotate-6"][i]}`}
                />
                <p className={`relative inline-block self-start rounded-full border px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] ${t.tag}`}>{a.tag}</p>
                <div className="relative mt-12">
                  <h3 className="display text-[clamp(1.6rem,2.2vw,2.1rem)]">{a.title}</h3>
                  <p className="mt-3 text-base leading-snug opacity-90">{a.body}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="reveal mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-lg">Not sure which one you are? Tell us what you&rsquo;re launching and we&rsquo;ll point you in the right direction.</p>
          <ButtonLink href="/apply" className="shrink-0">
            Let&rsquo;s talk
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
