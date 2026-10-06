import Image from "next/image";
import type { CaseStudy } from "@/config/caseStudies";
import { ImagePlaceholder } from "./ImagePlaceholder";

/** One real client result. Fed from src/config/caseStudies.ts. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="relative on-light rounded-[2rem] border-2 border-ink bg-paper p-6 text-ink sm:p-9">
      {study.isSample && (
        <p className="absolute right-5 top-5 rounded-full bg-violet-strong px-3 py-1 text-xs font-bold uppercase tracking-widest text-paper">
          Sample · not real
        </p>
      )}
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{study.campaign}</p>
      <h3 className="display mt-2 text-4xl sm:text-5xl">{study.artist}</h3>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">The challenge</h4>
          <p className="mt-1 leading-relaxed">{study.challenge}</p>
          <h4 className="mt-4 text-sm font-bold uppercase tracking-wide">What we did</h4>
          <p className="mt-1 leading-relaxed">{study.strategy}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3">
          {study.growthPercent && (
            <div className="col-span-2 rounded-2xl bg-lav p-4">
              <dt className="text-xs font-bold uppercase tracking-wide">Growth</dt>
              <dd className="display text-5xl">{study.growthPercent}</dd>
            </div>
          )}
          {study.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl bg-ink/[0.06] p-4">
              <dt className="text-xs font-bold uppercase tracking-wide">{m.label}</dt>
              <dd className="display text-3xl">{m.value}</dd>
              {m.note && <dd className="text-xs text-ink-soft">{m.note}</dd>}
            </div>
          ))}
        </dl>
      </div>

      {study.contentExamples && study.contentExamples.length > 0 ? (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {study.contentExamples.map((img) => (
            <li key={img.src} className="group overflow-hidden rounded-2xl">
              <Image src={img.src} alt={img.alt} width={600} height={800} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-105" />
            </li>
          ))}
        </ul>
      ) : (
        <ImagePlaceholder label="Content examples" className="mt-6" />
      )}

      {study.testimonial && (
        <blockquote className="mt-6 rounded-2xl bg-plum p-5 text-paper">
          <p className="text-lg font-medium leading-snug">&ldquo;{study.testimonial.quote}&rdquo;</p>
          <footer className="mt-2 text-sm font-bold">
            {study.testimonial.name}
            {study.testimonial.role && `, ${study.testimonial.role}`}
          </footer>
        </blockquote>
      )}
    </article>
  );
}
