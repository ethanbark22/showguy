const steps = [
  "You send your application.",
  "We review the artist and the project.",
  "If it looks like a fit, we'll get in touch to arrange a conversation.",
];

export function WhatHappensNext() {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-lav">What happens next</h2>
      <ol className="mt-3 space-y-2.5">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 text-[0.95rem] leading-snug text-paper/90">
            <span aria-hidden="true" className="display w-6 shrink-0 text-lg leading-none text-violet">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
