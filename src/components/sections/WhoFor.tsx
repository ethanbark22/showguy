import { audiences } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { ButtonLink } from "../Button";

const tones = {
  deep: "bg-deep text-paper",
  lav: "bg-lav text-ink",
  dark: "bg-ink text-paper",
  violet: "bg-violet text-ink",
} as const;

export function WhoFor() {
  return (
    <section aria-labelledby="who-title" className="on-light bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="who-title" eyebrow="Who we work with" size="huge" title={"Built for people with music to launch."} className="reveal max-w-5xl" />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <li
              key={a.title}
              className={`reveal flex min-h-64 flex-col justify-between rounded-[2rem] border-2 border-ink p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_0_#0d0d10] sm:p-7 ${tones[a.tone]}`}
            >
              <span aria-hidden="true" className="display text-5xl opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display text-[clamp(1.6rem,2.2vw,2.1rem)]">{a.title}</h3>
                <p className="mt-3 text-base leading-snug opacity-90">{a.body}</p>
              </div>
            </li>
          ))}
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
