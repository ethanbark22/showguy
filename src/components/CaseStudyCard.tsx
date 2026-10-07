import Image from "next/image";
import type { CaseStudy } from "@/config/caseStudies";

/** One real project. Fed from src/config/caseStudies.ts. Works for campaigns, websites, launches and ongoing partnerships. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="on-light relative rounded-[2rem] border-2 border-ink bg-paper p-6 text-ink sm:p-9">
      {study.isSample && (
        <p className="absolute right-5 top-5 rounded-full bg-violet-strong px-3 py-1 text-xs font-bold uppercase tracking-widest text-paper">
          Sample · not real
        </p>
      )}

      <header className="flex items-center gap-5">
        {study.clientImage && (
          <Image
            src={study.clientImage.src}
            alt={study.clientImage.alt}
            width={160}
            height={160}
            loading="lazy"
            className="size-20 shrink-0 rounded-2xl border-2 border-ink object-cover sm:size-24"
          />
        )}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
            {study.projectType}
            {study.timeline && <> · {study.timeline}</>}
          </p>
          <h3 className="display mt-1 text-4xl sm:text-5xl">{study.client}</h3>
        </div>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">The challenge</h4>
          <p className="mt-1 leading-relaxed">{study.challenge}</p>
          <h4 className="mt-4 text-sm font-bold uppercase tracking-wide">Our approach</h4>
          <p className="mt-1 leading-relaxed">{study.approach}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">What we delivered</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {study.deliverables.map((d) => (
              <li key={d} className="rounded-full bg-lav px-3.5 py-1.5 text-sm font-bold">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {study.screenshots && study.screenshots.length > 0 && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {study.screenshots.map((img) => (
            <li key={img.src} className="group overflow-hidden rounded-2xl border-2 border-ink">
              <Image src={img.src} alt={img.alt} width={1200} height={800} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-105" />
            </li>
          ))}
        </ul>
      )}

      {study.outputs && study.outputs.length > 0 && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {study.outputs.map((m) => (
            <li key={m.label} className="rounded-2xl bg-ink/[0.06] p-4">
              <p className="text-xs font-bold uppercase tracking-wide">{m.label}</p>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
                {m.value && <span className="display text-3xl">{m.value}</span>}
                {m.before && <span className="display text-2xl text-ink-soft">{m.before}</span>}
                {m.before && m.after && <span aria-label="to">→</span>}
                {m.after && <span className="display text-3xl">{m.after}</span>}
                {m.change && <span className="rounded-full bg-lav px-2.5 py-0.5 text-sm font-bold">{m.change}</span>}
              </p>
              {m.note && <p className="mt-1 text-xs text-ink-soft">{m.note}</p>}
            </li>
          ))}
        </ul>
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
