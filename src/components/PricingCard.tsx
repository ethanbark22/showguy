import { engagements } from "@/config/engagements";
import { ButtonLink } from "./Button";
import { Star } from "./Star";

/**
 * The two ways to work with SHOWGUY, as two distinct panels.
 * No prices: scope and cost are agreed in conversation. Words live in src/config/engagements.ts.
 */
export function EngagementOptions() {
  const [project, partnership] = engagements;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Option A: a light panel */}
      <article className="on-light reveal flex flex-col rounded-[2rem] border-2 border-ink bg-paper p-6 text-ink sm:p-10">
        <p className="display text-6xl text-violet-strong">A</p>
        <h3 className="display mt-3 text-[clamp(2rem,3.6vw,3rem)]">{project.label}</h3>
        <p className="mt-3 text-lg leading-snug">{project.blurb}</p>
        {project.suits && <p className="mt-3 text-sm leading-snug text-ink-soft">{project.suits}</p>}
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{project.listLabel}</p>
        <ul className="mt-3 space-y-2 border-t border-ink/15 pt-4">
          {project.examples.map((e) => (
            <li key={e} className="flex gap-3 text-base">
              <Tick className="text-violet-strong" />
              {e}
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-2xl bg-plum p-4 text-base font-bold uppercase leading-snug tracking-wide text-paper">{project.copy}</p>
        <p className="mt-3 text-sm leading-snug text-ink-soft">{project.scope}</p>
        <div className="mt-auto pt-8">
          <ButtonLink href={project.cta.href} className="w-full">
            {project.cta.label}
          </ButtonLink>
        </div>
      </article>

      {/* Option B: a dark panel */}
      <article className="reveal relative flex flex-col overflow-hidden rounded-[2rem] border-2 border-violet bg-ink p-6 text-paper sm:p-10">
        <Star fill="var(--color-violet)" className="pointer-events-none absolute -right-14 -top-14 size-56 opacity-20" />
        <p className="display relative text-6xl text-lav">B</p>
        <h3 className="display relative mt-3 text-[clamp(2rem,3.6vw,3rem)]">{partnership.label}</h3>
        <p className="relative mt-3 text-lg leading-snug text-paper/90">{partnership.blurb}</p>
        <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.18em] text-lav">{partnership.listLabel}</p>
        <ul className="relative mt-3 space-y-2 border-t border-paper/20 pt-4">
          {partnership.examples.map((e) => (
            <li key={e} className="flex gap-3 text-base">
              <Tick className="text-violet" />
              {e}
            </li>
          ))}
        </ul>
        <p className="relative mt-6 rounded-2xl bg-violet-strong p-4 text-base font-bold uppercase leading-snug tracking-wide text-paper">{partnership.copy}</p>
        <p className="relative mt-3 text-sm leading-snug text-mute-text">{partnership.scope}</p>
        <div className="relative mt-auto pt-8">
          <ButtonLink href={partnership.cta.href} className="w-full">
            {partnership.cta.label}
          </ButtonLink>
        </div>
      </article>
    </div>
  );
}

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`mt-1 size-4 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}
