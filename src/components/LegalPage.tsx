/**
 * Shared layout for the legal pages. They are PLACEHOLDERS until proper legal
 * copy is added: replace `sections` in each page file with the real text.
 */
export type LegalSection = { heading: string; body: string[] };

export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
      <h1 className="display text-huge">{title}</h1>
      <p className="mt-6 rounded-2xl border-2 border-ink bg-sun p-4 font-medium">
        This page is a placeholder. The full {title.toLowerCase()} will be added before launch.
      </p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="display text-3xl">{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-3 text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
