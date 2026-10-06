import { getCaseStudies } from "@/lib/caseStudies";
import { SectionHeading } from "../SectionHeading";
import { CaseStudyCard } from "../CaseStudyCard";
import { ButtonLink } from "../Button";

export function Results() {
  const studies = getCaseStudies();
  return (
    <section id="results" aria-labelledby="results-title" className="border-y-2 border-ink bg-mint">
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
          <div className="reveal rounded-[2rem] border-2 border-dashed border-ink p-8 sm:p-14">
            <SectionHeading id="results-title" eyebrow="Results" size="huge" title={"We're building the first SHOWGUY case studies right now."} />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
              That&rsquo;s why our founding artists get our lowest-ever monthly rate and direct founder involvement. When there are real results to show, they&rsquo;ll go here, with the numbers and the artist&rsquo;s permission.
            </p>
            <ButtonLink href="/apply" className="mt-8">
              Be one of the first
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
