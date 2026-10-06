import Image from "next/image";
import type { CaseStudy } from "@/config/caseStudies";

/** One real client result. Fed from src/config/caseStudies.ts. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="on-light relative rounded-[2rem] border-2 border-ink bg-paper p-6 text-ink sm:p-9">
      {study.isSample && (
        <p className="absolute right-5 top-5 rounded-full bg-violet-strong px-3 py-1 text-xs font-bold uppercase tracking-widest text-paper">
          Sample · not real
        </p>
      )}

      <header className="flex items-center gap-5">
        {study.artistImage && (
          <Image
            src={study.artistImage.src}
            alt={study.artistImage.alt}
            width={160}
            height={160}
            loading="lazy"
            className="size-20 shrink-0 rounded-2xl border-2 border-ink object-cover sm:size-24"
          />
        )}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
            {study.campaign}
            {study.period && <> · {study.period}</>}
          </p>
          <h3 className="display mt-1 text-4xl sm:text-5xl">{study.artist}</h3>
        </div>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">The problem</h4>
          <p className="mt-1 leading-relaxed">{study.problem}</p>
          <h4 className="mt-4 text-sm font-bold uppercase tracking-wide">What we did</h4>
          <p className="mt-1 leading-relaxed">{study.strategy}</p>
        </div>
        <ul className="space-y-3">
          {study.metrics.map((m) => (
            <li key={m.label} className="rounded-2xl bg-ink/[0.06] p-4">
              <p className="text-xs font-bold uppercase tracking-wide">{m.label}</p>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
                {m.before && <span className="display text-2xl text-ink-soft">{m.before}</span>}
                {m.before && m.after && <span aria-label="to">→</span>}
                {m.after && <span className="display text-3xl">{m.after}</span>}
                {m.change && <span className="rounded-full bg-lav px-2.5 py-0.5 text-sm font-bold">{m.change}</span>}
              </p>
              {m.note && <p className="mt-1 text-xs text-ink-soft">{m.note}</p>}
            </li>
          ))}
        </ul>
      </div>

      {study.topContent && study.topContent.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-bold uppercase tracking-wide">Top-performing content</h4>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {study.topContent.map((c) => (
              <li key={c.title} className="group overflow-hidden rounded-2xl border border-ink/20 bg-white/50">
                {c.image && (
                  <Image src={c.image.src} alt={c.image.alt} width={600} height={800} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-105" />
                )}
                <div className="p-3">
                  <p className="font-bold leading-snug">{c.title}</p>
                  {c.stat && <p className="text-sm text-ink-soft">{c.stat}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
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
