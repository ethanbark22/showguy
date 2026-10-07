import { visionWords } from "@/config/services";
import { SectionHeading } from "../SectionHeading";

export function Vision() {
  return (
    <section aria-labelledby="vision-title" className="overflow-hidden bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="vision-title" eyebrow="Where we're going" size="mega" title="More than an agency." className="reveal" />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <p className="max-w-xl text-lg leading-relaxed text-paper/90 sm:text-xl">
            SHOWGUY is being built around one idea: find great artists, help them grow, and create things people actually care about.
          </p>
          <p className="max-w-xl text-lg leading-relaxed text-lav sm:text-xl">
            Today that starts with creative and digital work. Tomorrow it gets much bigger.
          </p>
        </div>
        <ul className="mt-14 border-t border-paper/20" aria-label="The wider SHOWGUY plan">
          {visionWords.map((word, i) => (
            <li
              key={word}
              style={{ "--i": i, "--dir": i % 2 ? -1 : 1 } as React.CSSProperties}
              className={`slide-in border-b border-paper/20 py-3 sm:py-4 ${i % 2 ? "text-right sm:pr-[4%]" : "sm:pl-[2%]"}`}
            >
              <span className="vision-word display outline-text text-division inline-block cursor-default">{word}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-mute-text">
          Creative and digital services are what we do now. The rest is the plan, not the product list.
        </p>
      </div>
    </section>
  );
}
