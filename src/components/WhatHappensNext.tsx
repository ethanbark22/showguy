const steps = [
  "You tell us about your project.",
  "We look at what you need.",
  "We get in touch to talk it through.",
];

/** `done` marks the first N steps as already complete (used on the thank-you page). */
export function WhatHappensNext({ done = 0 }: { done?: number }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-lav">What happens next</h2>
      <ol className="mt-3 space-y-2.5">
        {steps.map((s, i) => (
          <li key={s} className={`flex gap-3 text-[0.95rem] leading-snug ${i < done ? "text-mute-text" : "text-paper/90"}`}>
            <span aria-hidden="true" className="display w-6 shrink-0 text-lg leading-none text-violet">
              {i < done ? "✓" : i + 1}
            </span>
            {i < done && <span className="sr-only">Done: </span>}
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
