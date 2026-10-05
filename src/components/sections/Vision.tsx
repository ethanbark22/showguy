import { visionWords } from "@/config/services";
import { SectionHeading } from "../SectionHeading";

export function Vision() {
  return (
    <section aria-labelledby="vision-title" className="on-dark overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="vision-title" eyebrow="Where we're going" size="mega" title="More than an agency." className="reveal" />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <p className="max-w-xl text-lg leading-relaxed sm:text-xl">
            SHOWGUY is being built around one idea: find great artists, help them grow, and create things people actually care about.
          </p>
          <p className="max-w-xl text-lg leading-relaxed text-sun sm:text-xl">
            Today that starts with digital growth. Tomorrow it gets much bigger.
          </p>
        </div>
        <ul className="mt-14 border-t-2 border-paper/30" aria-label="The wider SHOWGUY plan">
          {visionWords.map((word, i) => (
            <li
              key={word}
              className={`display group border-b-2 border-paper/30 py-3 text-[clamp(2.4rem,9vw,7rem)] text-paper/45 transition-all duration-300 hover:pl-4 hover:text-sun sm:py-4 ${i % 2 ? "sm:pl-[10%]" : ""}`}
            >
              {word}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-paper/70">
          Artist Services is what we do now. The rest is the plan, not the product list.
        </p>
      </div>
    </section>
  );
}
