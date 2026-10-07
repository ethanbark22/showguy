import { getCaseStudies } from "@/lib/caseStudies";
import { SectionHeading } from "../SectionHeading";
import { CaseStudyCard } from "../CaseStudyCard";
import { ButtonLink } from "../Button";
import { Star } from "../Star";

export function Results() {
  const studies = getCaseStudies();
  return (
    <section id="results" aria-labelledby="results-title" className="bg-plum">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        {studies.length > 0 ? (
          <>
            <SectionHeading id="results-title" eyebrow="Our work" size="huge" title="Good work speaks for itself." className="reveal" />
            <div className="mt-12 grid gap-6">
              {studies.map((s) => (
                <CaseStudyCard key={s.slug} study={s} />
              ))}
            </div>
          </>
        ) : (
          <div className="reveal grid-lines relative overflow-hidden rounded-[2rem] border border-paper/20 bg-ink p-8 sm:p-14">
            <Star fill="var(--color-violet)" className="pointer-events-none absolute -right-28 -top-28 size-80 opacity-25" />
            <Star className="absolute right-8 top-8 size-7 sm:right-12 sm:top-12" />
            <div className="relative">
              <SectionHeading id="results-title" eyebrow="Our work" size="huge" title={"Good work speaks for itself."} className="max-w-4xl" />
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
                SHOWGUY is building its first collection of creative projects and digital partnerships.
              </p>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
                As projects launch, we&rsquo;ll share selected work here.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="What will appear here">
                {["Website projects", "Campaign concepts", "Digital experiences", "Creative projects", "Case studies"].map((t) => (
                  <li key={t} className="rounded-full border border-paper/30 px-4 py-1.5 text-sm font-bold text-lav">
                    {t}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/apply" className="mt-8">
                Start a project
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
