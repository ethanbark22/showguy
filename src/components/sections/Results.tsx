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
            <SectionHeading id="results-title" eyebrow="Results" size="huge" title="Real artists. Real campaigns." className="reveal" />
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
              <SectionHeading id="results-title" eyebrow="Results" size="huge" title={"The first SHOWGUY campaigns are being built right now."} className="max-w-4xl" />
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
                Our founding roster receives our introductory rate and direct founder involvement. As campaigns generate meaningful results, this is where we&rsquo;ll show exactly what worked, with the artist&rsquo;s permission.
              </p>
              <ButtonLink href="/apply" className="mt-8">
                Be one of the first
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
